package api

import (
	"encoding/base64"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"google.golang.org/api/gmail/v1"
)

type emailRequest struct {
	MaxResults int64  `json:"maxResults" binding:"required"`
	PageToken  string `json:"pageToken"`
}

type conversationData struct {
	ID       string       `json:"id"`
	Subject  string       `json:"subject"`
	From     string       `json:"from"`
	Date     string       `json:"date"`
	ThreadID string       `json:"threadId"`
	Content  string       `json:"content"`
	Thread   threadDetail `json:"thread"`
	Summary  string       `json:"summary"`
	Products []string     `json:"products"`
	Priority string       `json:"priority"`
	Mood     string       `json:"mood"`
}

type threadDetail struct {
	ID       string      `json:"id"`
	Snippet  string      `json:"snippet"`
	Messages []emailData `json:"messages"`
}

type emailData struct {
	ID       string       `json:"id"`
	Subject  string       `json:"subject"`
	From     string       `json:"from"`
	Date     string       `json:"date"`
	ThreadID string       `json:"threadId"`
	Content  string       `json:"content"`
	Thread   threadDetail `json:"thread"`
}

type emailReqML struct {
	Emails        []emailData `json:"emails"`
	NextPageToken string      `json:"nextPageToken"`
}
type emailResponse struct {
	Emails        []conversationData `json:"emails"`
	NextPageToken string      `json:"nextPageToken"`
}

// @Summary Get Emails
// @Description Fetch emails using Gmail API with provided OAuth token
// @Tags emails
// @Accept json
// @Produce json
// @Param request body emailRequest true "OAuth token"
// @Success 200 {object} emailResponse "List of emails"
// @Security BearerAuth
// @Router /emails [post]
func (server *Server) getEmails(ctx *gin.Context) {
	isRecorded := make(map[string]bool)

	_, token, err := getUserPayload(ctx)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
		return
	}

	var req emailRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	tokenSource := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: token})
	httpClient := oauth2.NewClient(ctx, tokenSource)
	gmailService, err := gmail.New(httpClient)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	user := "me"
	call := gmailService.Users.Messages.List(user)
	if req.MaxResults > 0 {
		call = call.MaxResults(req.MaxResults)
	} else {
		call = call.MaxResults(10)
	}
	if req.PageToken != "" {
		call = call.PageToken(req.PageToken)
	}

	r, err := call.Do()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	var emails []emailData
	for _, m := range r.Messages {
		msg, err := gmailService.Users.Messages.Get(user, m.Id).Do()
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, errorResponse(err))
			return
		}

		var email emailData
		email.ID = msg.Id

		if _, exists := isRecorded[email.ID]; exists {
			continue
		}
		isRecorded[email.ID] = true

		email.ThreadID = msg.ThreadId
		email.Content = getMessageContent(msg)

		// Extract headers
		for _, header := range msg.Payload.Headers {
			switch header.Name {
			case "Subject":
				email.Subject = header.Value
			case "From":
				email.From = header.Value
			case "Date":
				email.Date = header.Value
			}
		}

		// Fetch thread details
		thread, err := gmailService.Users.Threads.Get(user, msg.ThreadId).Do()
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, errorResponse(err))
			return
		}
		email.Thread = threadDetail{
			ID:      thread.Id,
			Snippet: thread.Snippet,
		}
		for _, threadMsg := range thread.Messages {
			var threadEmail emailData
			threadEmail.ID = threadMsg.Id

			threadEmail.ThreadID = threadMsg.ThreadId
			threadEmail.Content = getMessageContent(threadMsg)

			isRecorded[threadEmail.ID] = true

			for _, header := range threadMsg.Payload.Headers {
				switch header.Name {
				case "Subject":
					threadEmail.Subject = header.Value
				case "From":
					threadEmail.From = header.Value
				case "Date":
					threadEmail.Date = header.Value
				}
			}
			email.Thread.Messages = append(email.Thread.Messages, threadEmail)
		}

		emails = append(emails, email)
	}

	// send to ML
	response := emailReqML{
		Emails: emails,
	}

	// send to FE
	var res emailResponse
	for _, mail := range emails {
		res.Emails = append(res.Emails, conversationData{
			ID       : mail.ID,
			Subject : mail.Subject,
			From     : mail.From,
			Date     : mail.Date,
			ThreadID : mail.ThreadID,
			Content  : mail.Content,
			Summary  : "",
			Products : nil,
			Priority : "",
			Mood     : "",
		})
	}

	if r.NextPageToken != "" {
		response.NextPageToken = r.NextPageToken
	}
	ctx.JSON(http.StatusOK, res)
}

func getMessageContent(msg *gmail.Message) string {
	var content string
	if msg.Payload.MimeType == "text/plain" {
		data, err := base64.URLEncoding.DecodeString(msg.Payload.Body.Data)
		if err == nil {
			content = string(data)
		}
	}
	for _, part := range msg.Payload.Parts {
		if part.MimeType == "text/plain" {
			data, err := base64.URLEncoding.DecodeString(part.Body.Data)
			if err == nil {
				content = string(data)
				break
			}
		}
	}
	return content
}

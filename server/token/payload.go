package token

import (
	"errors"
	"time"

	jwt "github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

var (
	ErrInvalidToken = errors.New("token is invalid")
	ErrExpiredToken = errors.New("token is expired")
)

type Payload struct {
	Uid       uuid.UUID `json:"uuid"`
	IssuedAt  time.Time `json:"issuedAt"`
	ExpiredAt time.Time `json:"expiredAt"`
}

func (payload *Payload) GetAudience() (jwt.ClaimStrings, error) {
	return jwt.ClaimStrings{payload.Uid.String()}, nil
}

func (payload *Payload) GetExpirationTime() (*jwt.NumericDate, error) {
	return &jwt.NumericDate{Time: payload.ExpiredAt}, nil
}

func (payload *Payload) GetIssuedAt() (*jwt.NumericDate, error) {
	return &jwt.NumericDate{Time: payload.IssuedAt}, nil
}

func (payload *Payload) GetIssuer() (string, error) {
	return payload.IssuedAt.GoString(), nil
}

func (payload *Payload) GetNotBefore() (*jwt.NumericDate, error) {
	return &jwt.NumericDate{Time: payload.IssuedAt}, nil
}

func (payload *Payload) GetSubject() (string, error) {
	return payload.Uid.String(), nil
}

func (payload *Payload) Valid() error {
	if time.Now().After(payload.ExpiredAt) {
		return ErrExpiredToken
	}

	return nil
}

func NewPayload(uid uuid.UUID, duration time.Duration) (*Payload, error) {
	payload := &Payload{
		Uid:       uid,
		IssuedAt:  time.Now(),
		ExpiredAt: time.Now().Add(duration),
	}

	return payload, nil
}

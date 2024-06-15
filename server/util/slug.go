package util

import (
	"regexp"
	"strings"
)

func GenerateBaseSlug(text string) string {
	text = strings.ToLower(text)
	text = strings.ReplaceAll(text, " ", "-")
	reg, _ := regexp.Compile(`[^a-z0-9\-]+`)
	text = reg.ReplaceAllString(text, "")
	return text
}

package utils

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func CallGetAPI(client *http.Client, url string, target interface{}) error {

	resp, err := client.Get(url)
	if err != nil {
		return fmt.Errorf("failed call API %s: %w", url, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("API %s returned %d: %s", url, resp.StatusCode, string(body))
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("failed read body: %w", err)
	}

	if err := json.Unmarshal(body, target); err != nil {
		return fmt.Errorf("failed unmarshal: %w", err)
	}

	return nil
}

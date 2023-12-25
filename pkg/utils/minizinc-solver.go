package utils

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
)

func MiniZincSolver(jsonData string) map[string]interface{} {
	// Call the MiniZinc solver with JSON data
	cmd := exec.Command("minizinc", "data/Playground.mzn", "--cmdline-json-data", jsonData, "--json-stream")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.Run()
	output, _ := cmd.CombinedOutput()
	fmt.Println(ByteToJson(output))
	return ByteToJson(output)
}

func ByteToJson(byteString []byte) map[string]interface{} {

	// Define a struct with fields corresponding to the JSON structure
	var jsonStruct map[string]interface{}

	// Unmarshal the []byte into the struct
	err := json.Unmarshal(byteString, &jsonStruct)
	if err != nil {
		fmt.Println("Error in byteToJson:", err)
		return nil
	}
	return jsonStruct
}

package controllers

import (
	"MiniZincPlusServer/pkg/models"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
)

var NewSchedule models.Schedule

func GetBook(w http.ResponseWriter, r *http.Request) {
	newSchedules := models.GetAllSchedules()
	res, _ := json.Marshal(newSchedules)
	w.Header().Set("Content-Type", "pkjlication/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

// вынести в midleware
func AutoHandler(w http.ResponseWriter, r *http.Request) {
	if origin := r.Header.Get("Origin"); origin != "" {
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers",
			"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		w.WriteHeader(http.StatusOK)
	}
	getSolve(w, r)
}

func getSolve(w http.ResponseWriter, r *http.Request) {
	// Read the request body
	body, _ := io.ReadAll(r.Body)
	jsonData := string(body)
	fmt.Println("Received JSON:", jsonData)
	var data = miniZincSolver(jsonData)
	fmt.Fprint(w, data)
}

func miniZincSolver(jsonData string) map[string]interface{} {
	// Call the MiniZinc solver with JSON data
	cmd := exec.Command("minizinc", "data/Playground.mzn", "--cmdline-json-data", jsonData, "--json-stream")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.Run()
	output, _ := cmd.CombinedOutput()
	fmt.Println(byteToJson(output))
	return byteToJson(output)
}

func byteToJson(byteString []byte) map[string]interface{} {

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

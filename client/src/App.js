import React, { useState } from "react";

function App() {
  const [jsonData, setJsonData] = useState("");
  const [response, setResponse] = useState(null);
  const [retrievedData, setRetrievedData] = useState(null);
  const [error, setError] = useState("");

  const handleStoreData = async () => {
    try {
      // Check if the entered data is in valid JSON format
      const parsedData = JSON.parse(jsonData);

      // If JSON is valid, proceed with storing data
      const res = await fetch("https://lambdatask.onrender.com/api/storeData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      const data = await res.json();
      setResponse(data);
      setError("");
    } catch (e) {
      console.error("Invalid JSON format:", e);
      setError(
        'Invalid JSON format. Please enter data as: {"name": "John", "age": 30}'
      );
      setResponse(null);
    }
  };

  const handleGetData = async () => {
    try {
      const res = await fetch("https://lambdatask.onrender.com/api/getData");
      const data = await res.json();
      setRetrievedData(data);
      setError("");
    } catch (error) {
      console.error("Error retrieving data:", error);
      setRetrievedData({ error: "Failed to retrieve data" });
    }
  };

  return (
    <div style={styles.container}>
      <h1>JSON Storage and Retrieval</h1>
      <h3>Endpoints Created Using AWS Lambda</h3>
      <p>
        <b>Storage Endpoint:</b>{" "}
        https://9y599prd32.execute-api.ap-south-1.amazonaws.com/dev/storedataJson
        <br />
        <b>Retrieval Endpoint:</b>{" "}
        https://9y599prd32.execute-api.ap-south-1.amazonaws.com/dev/frombucketgetdata
      </p>
      <p>
        Please enter JSON data in the format:{" "}
        <code>{'{"name": "John", "age": 30}'}</code>
      </p>

      <div style={styles.section}>
        <h2>Store JSON Data</h2>
        <div style={styles.inputContainer}>
          <textarea
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            placeholder='Enter JSON data here, e.g., {"name": "John", "age": 30}'
            rows="4"
            style={styles.textarea}
          />
          <button onClick={handleStoreData} style={styles.button}>
            Store Data
          </button>
        </div>
        {error && <p style={styles.error}>{error}</p>}
        {response && (
          <div>
            <h4>Store Response:</h4>
            <pre style={styles.response}>
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div style={styles.section}>
        <h2>Retrieve JSON Data</h2>
        <button onClick={handleGetData} style={styles.button}>
          Retrieve Data
        </button>
        {retrievedData && (
          <div>
            <h4>Retrieved Data:</h4>
            <pre style={styles.response}>
              {JSON.stringify(retrievedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f1f1f1", // Light gray background
    minHeight: "100vh", // Ensure it covers the full height of the viewport
  },
  section: {
    marginBottom: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    width: "80%",
    margin: "auto",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textarea: {
    width: "80%",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "4px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "4px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
  },
  response: {
    textAlign: "left",
    whiteSpace: "pre-wrap",
    backgroundColor: "#e8e8e8",
    padding: "10px",
    borderRadius: "5px",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
};

export default App;

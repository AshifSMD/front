import { useState } from "react";
import axios from "axios";

function App() {
  const [symptoms, setSymptoms] = useState("");
  const [advice, setAdvice] = useState("");

  const getAdvice = async (symptomsArray) => {
    try {
      const response = await axios.post("http://localhost:5000/check-symptoms", {
        symptoms: symptomsArray
      });
      console.log("Advice from server:", response.data.advice);
      setAdvice(response.data.advice);
    } catch (error) {
      console.error("Error contacting backend:", error);
      setAdvice("Error contacting backend.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const symptomsArray = symptoms.split(",").map((s) => s.trim());
    getAdvice(symptomsArray);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Symptom Checker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Enter symptoms, e.g. fever, cough"
          style={{ width: "300px" }}
        />
        <button type="submit">Get Advice</button>
      </form>
      {advice && (
        <div style={{ marginTop: "20px", fontWeight: "bold" }}>
          Advice: {advice}
        </div>
      )}
    </div>
  );
}

export default App;

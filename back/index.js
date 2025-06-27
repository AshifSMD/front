import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/check-symptoms", (req, res) => {
  const userSymptoms = req.body.symptoms.map(sym => sym.toLowerCase().trim());

  let advice = "Please consult a doctor for an accurate diagnosis.";

  if (userSymptoms.includes("fever") && userSymptoms.includes("cough")) {
    advice = "You might have a viral infection. Rest and stay hydrated.";
  } else if (userSymptoms.includes("headache") && userSymptoms.includes("nausea")) {
    advice = "You might be experiencing a migraine.";
  }

  res.json({ advice });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

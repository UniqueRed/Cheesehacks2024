const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const Groq = require("groq-sdk");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 8888;

app.use(cors());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const upload = multer({ dest: "uploads/" });

async function extractTextFromPDF(filePath) {
  const data = fs.readFileSync(filePath);
  const pdf = await pdfParse(data);
  return pdf.text;
}

app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const pdfContent = await extractTextFromPDF(req.file.path);

    const prompt = `Create flashcards based on the following content: "${pdfContent}". The output should be a JSON array where each object contains two fields: 'question' and 'answer'. Do not include links in your output.`;

    const groqResponse = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      response_format: { type: "json_object" },
    });

    const flashcards = JSON.parse(groqResponse.choices[0]?.message?.content || "[]");

    res.json({ flashcards });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Failed to process PDF" });
  } finally {
    if (req.file?.path) {
      fs.unlinkSync(req.file.path);
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
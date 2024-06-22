const express = require("express");
const dotenv = require("dotenv");
const { Gemini } = require("./gemini.js");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())

app.post("/", async (req, res) => {
  const pergunta = req.body.texto;
  console.log(req.body);

  const resposta = await Gemini(pergunta);
  console.log(resposta);
  res.json({ resposta: resposta });
});

app.listen(process.env.PORT, () => {
  console.log(`Server ON PORT ${process.env.PORT}`);
});

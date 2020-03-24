const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const routes = require("./routes/routes");

const app = express();
app.use(express.json()); //agr entende req no formato json

//cors config
app.use(cors());

//bd config
mongoose.connect(
  "mongodb+srv://jc:123456jc@cluster0-asd2a.mongodb.net/week10?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//routes config
app.use(routes);

app.listen(PORT, () => {
  console.log("Rodando");
});

const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");

app.use(cors());
app.use(express.json());

app.post("/course", async (req, res, next) => {
  console.log(req.body);

  const data = require("./data.json");
  data[req.body.id]["status"][req.body.video] =
    !data[req.body.id]["status"][req.body.video];

  fs.writeFileSync("./data.json", JSON.stringify(data));

  res.status(200).json({
    message: "good",
  });
});

app.listen(4000, () => console.log("running"));

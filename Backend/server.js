const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const userRouter = require("./routes/userRouter");
const interviewRouter = require("./routes/interviewRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use("/api/auth", userRouter);
app.use("/api/interviews", interviewRouter);

mongoose.connect("mongodb://127.0.0.1:27017/Interview").then(() => {
  app.listen(8080, () => {
    console.log(`App is listenting to port 8080!`);
  });
  console.log("Database Connected Successfully");
});

app.get("/test", (req, res) => {
  res.send("This is test API");
});

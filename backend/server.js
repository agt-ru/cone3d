const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { getConeData, getConeDataFromCPP } = require("./utils");

dotenv.config();
const app = express();

app.use(express.json());

const coneParams = [3, 2, 5];

// @desc    Fetch triangulation
// @route   GET /api?height=${height}&radius=${radius}&segments=${segments}
// @access  Public
app.get("/api", (req, res) => {
  const { height, radius, segments } = req.query;
  if (!isNaN(height) && height > 0 && height < 10) coneParams[0] = Number(height);
  if (!isNaN(radius) && radius > 0 && radius < 10) coneParams[1] = Number(radius);
  if (!isNaN(segments) && segments % 1 === 0 && segments > 2 && segments <= 250)
    coneParams[2] = Number(segments);
  res.json(getConeDataFromCPP(...coneParams));
});

// set static folders
const __mydirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__mydirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__mydirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

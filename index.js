const express = require("express");
const app = express();

const log = (str) => {
  console.log(`cloudRunHello: ${str}`);
};

let preparingExit = false;
const prepareExit = async (signal) => {
  if (preparingExit) return;
  preparingExit = true;
  log("\nPreparing exit with signal: " + signal);
  process.exit();
};

process.on("exit", (code) => {
  if (code || code === 0) log("exitCode", code);
});

["SIGINT", "SIGTERM", "SIGUSR1", "SIGUSR2"].forEach((signal) => {
  process.on(signal, prepareExit);
});

//catches uncaught exceptions
process.on("uncaughtException", (e) => {
  log("[uncaughtException] app will be terminated");
  console.error(e);
  prepareExit("uncaughtException");
});

app.get("/", (req, res) => {
  log("ok");
  res.send("Hello World!");
});

app.get("/error", (req, res) => {
  log("error");
  res.send("error");
  setTimeout(() => {
    throw new Error("APP ERROR");
  }, 0);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  log(`listening on port ${port}`);
});

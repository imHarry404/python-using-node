const { spawn } = require("child_process");
const express = require("express");
const app = express();

const harry = () => {
  return new Promise((resolve, reject) => {
    const python = spawn("python", ["./main.py"]);
    python.stdout.on("data", (data) => {
      resolve(data.toString());
    });

    python.stderr.on("data", (data) => {
      reject(data.toString());
    });
  });
};
app.get("/:name", async (req, res) => {
  const dataFromPython = await harry();
  res.send(dataFromPython  +req.params.name);
});
app.listen(3000, () =>
  console.log("App is running port 3000 http://localhost:3000/yourname")
);
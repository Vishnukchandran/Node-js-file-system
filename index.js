import express from "express";
import fs from "fs";
import { format } from "date-fns";


const app = express(); // express app
const PORT = 4005; //Set port

let filepath;

// root
app.get("/", (req, res) => {
  res.status(200).json({ message:"Sucessfully"});
});

//Write date time to a folder
app.get("/write", (req, res) => {
  let today = format(new Date(), "dd-mm-yyyy-hh-mm-ss");
  filepath = `CurrentDateTime/${today}.txt`;
  fs.writeFileSync(filepath, `${today}`, "utf-8");
  res
    .status(200)
    .send(
      `<div> <h1>Current date and time is saved successfully!</h1> </div>`
    );
});

// fail message
app.get("/read", (req, res) => {
  if (!filepath) {
    return res.status(404).send("No files are saved");
  }
  let data = fs.readFileSync(filepath, "utf-8");
  res.status(200).send(`<h1>${data}</h1>`);
});

//port message
app.listen(PORT, () => {
  console.log(`App is running at ${PORT} port`);
});

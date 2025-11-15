const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

app.use("/uploads", express.static("uploads"));

// folder where images will be saved
const upload = multer({
  dest: "uploads/", // auto-saves file in /uploads
});



app.post("/upload", upload.single("image"), (req, res) => {
  console.log("File", req.file);
  const fileurl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ url: fileurl });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

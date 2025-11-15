# 📌 README -- Image Upload (React + Express + Multer)

This project demonstrates a **simple image upload flow** using:

-   **React** (frontend)
-   **Express + Multer** (backend)
-   **Static file serving** to display the uploaded image

Users can:

1.  Select an image\
2.  Upload it to the backend\
3.  Backend stores the image in `/uploads` folder\
4.  Frontend displays the uploaded image using the returned URL

------------------------------------------------------------------------

## 🚀 Features

-   Upload any image from frontend
-   Image is saved on server using `multer`
-   Backend returns a file URL
-   Frontend displays the uploaded image immediately

------------------------------------------------------------------------

# 📁 Project Structure

    /frontend
      └── App.js
    /backend
      ├── index.js
      ├── uploads/        ← images saved here automatically

------------------------------------------------------------------------

# 🖥️ Frontend (React)

### **App.js**

``` jsx
import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async () => {
    const form = new FormData();
    form.append("image", file);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setImageUrl(data.url);
  };

  return (
    <>
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button onClick={handleUpload}>Upload</button>

        {imageUrl && <img src={imageUrl} width={200} alt="uploaded" />}
      </div>
    </>
  );
}

export default App;
```

------------------------------------------------------------------------

# 🛠️ Backend (Express + Multer)

### **index.js**

``` js
const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use("/uploads", express.static("uploads"));

const upload = multer({
  dest: "uploads/",
});

app.post("/upload", upload.single("image"), (req, res) => {
  console.log("File", req.file);
  const fileurl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ url: fileurl });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

------------------------------------------------------------------------

# ▶️ How to Run

### Backend

    npm install express multer cors
    node index.js

### Frontend

    npm install
    npm run dev

Make sure backend runs at **http://localhost:5000**

------------------------------------------------------------------------

# 🎉 Result

You can now upload an image → save it → display it instantly!

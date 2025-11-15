import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async () => {
    const form = new FormData();
    form.append("image", file);

    console.log(form);

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

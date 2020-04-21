import React, { useState } from "react";
import axios from "axios";

const Admin = () => {
  const [file, setFile] = useState("");
  const upload = () => {
    const data = new FormData();
    data.append("file", file);
    axios.post("/api/admin/upload", data, {
      // receive two    parameter endpoint url ,form data
    });
  };
  return (
    <div>
      <input
        id="myInput"
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={upload}>Send</button>
    </div>
  );
};

export default Admin;

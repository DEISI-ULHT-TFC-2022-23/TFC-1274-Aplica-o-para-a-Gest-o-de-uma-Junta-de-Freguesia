import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function CCData() {
  const [file, setFile] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = async () => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      console.log(jsonData);

      try {
        await axios.post('http://localhost:3001/caderno_eleitoral/cc-data', jsonData);
        setSuccessMsg('Data uploaded successfully');
      } catch (err) {
        console.error(err);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDeleteAll = async () => {
    const confirmation = window.confirm('Are you sure you want to delete all data?');

    if (confirmation) {
      try {
        await axios.delete('http://localhost:3001/caderno_eleitoral/delete-all');
        setSuccessMsg('All data deleted successfully');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDownload = async () => {
    
  };

  return (
    <div>
      <h1>CCs Upload</h1>
      <div>
        <label htmlFor="file-input">Select a file: </label>
        <input disabled type="file" id="file-input" onChange={handleFileUpload} />
      </div>
      <button disabled onClick={handleSubmit}>Submeter</button>
      <button disabled onClick={handleDeleteAll}>Delete All</button>
      <div>
        <h1>Download CCs para uma folha Exel</h1>
        <button onClick={handleDownload}>Download</button>
      </div>
    
      {successMsg && <p>{successMsg}</p>}
    </div>
  );
}

export default CCData;

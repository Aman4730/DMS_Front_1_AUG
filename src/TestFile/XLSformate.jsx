import React, { useState } from "react";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import "./xlsStyle.css"
const ExcelRequestsImport = ({ uploadHandler }) => {
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  const uploadFile = (event) => {
    const fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        const { cols, rows } = resp;
        setCols(cols);
        setRows(rows);

        // Prepare data by removing the header
        const data = [...rows];
        data.shift(); // Remove header row
        uploadHandler(data); // Pass the data to the parent component
      }
    });
  };

  return (
    <div className="excel-import-container">
      <div className="file-upload">
        <label>Upload File</label>
        <input type="file" onChange={uploadFile} />
        <button>+</button>
      </div>
      <div className="excel-table-wrapper">
        <OutTable
          data={rows}
          columns={cols}
          tableClassName="excel-table"
        />
      </div>
    </div>
  );
};

export default ExcelRequestsImport;

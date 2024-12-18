// src/FileUpload.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./FileUploadDragDrop.css";

const FileUploadDragDrop = ({ setmultipleFiles }) => {
  const [multipleselectedFile, setMultipleSelectedFile] = useState([]);
  const fileSizes = (bytes) => {
    return `${bytes}`;
  };

  const generateId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const inputChange = (e) => {
    let images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(e.target.files[i]);
      let reader = new FileReader();
      let file = e.target.files[i];
      reader.onloadend = () => {
        setMultipleSelectedFile((prevValue) => {
          return [
            ...prevValue,
            {
              id: generateId(),
              filename: e.target.files[i].name,
              filetype: e.target.files[i].type,
              fileimage: reader.result,
              datetime:
                e.target.files[i].lastModifiedDate.toLocaleString("en-IN"),
              filesize: fileSizes(e.target.files[i].size),
            },
          ];
        });
      };
      if (e.target.files[i]) {
        reader.readAsDataURL(file);
      }
    }
  };

  const deleteSelectFile = (id) => {
    if (window.confirm("Are you sure you want to delete this Image?")) {
      const result = multipleselectedFile.filter((data) => data.id !== id);
      setMultipleSelectedFile(result);
    }
  };

  const fileUploadSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    if (multipleselectedFile.length > 0) {
      for (let index = 0; index < multipleselectedFile.length; index++) {
        setmultipleFiles((prevValue) => {
          return [...prevValue, multipleselectedFile[index]];
        });
      }
      setMultipleSelectedFile([]);
    } else {
      alert("Please select file");
    }
  };

  return (
    <form onSubmit={fileUploadSubmit}>
      <div className="kb-file-upload">
        <div className="file-upload-box">
          <input
            type="file"
            id="fileupload"
            className="file-upload-input"
            onChange={inputChange}
            multiple
          />
          <span>
            Drag and drop or{" "}
            <span className="file-link">Choose your files</span>
          </span>
        </div>
      </div>
      <div >
        {multipleselectedFile.map((data) => {
          const { id, filename, fileimage, datetime, filesize } = data;
          return (
            <div key={id}>
              {filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
                <div>
                  <img src={fileimage} alt="" />
                </div>
              ) : (
                <div>
                  <i className="far fa-file-alt"></i>
                </div>
              )}
              <div>
                <h6>{filename}</h6>
                <p>
                  <span>Size : {filesize}</span>
                  <span>Modified Time : {datetime}</span>
                </p>
                <div >
                  <button
                    type="button"
                    onClick={() => deleteSelectFile(id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div >
        <button type="submit" >
          Upload
        </button>
      </div>
    </form>
  );
};

export default FileUploadDragDrop;

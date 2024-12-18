import React, { useState } from "react";
import axios from "axios";
import { Button, Progress, Space, Typography, Upload } from "antd";

const TestFile = () => {
  const [files, setFiles] = useState({});
  const handleFileUpload = ({ file }) => {
    const getFileObject = (progress) => {
      return {
        name: file.name,
        uid: file.uid,
        progress: progress,
      };
    };
    axios.post(`${process.env.REACT_APP_API_URL_LOCAL}/uploadcreate}`, file, {
      onUploadProgress: (event) => {
        console.log(event);
        setFiles((prev) => {
          return { ...prev, [file.uid]: getFileObject(event.progress) };
        });
      },
    });
  };
  return (
    <Space direction="vertical" style={{ width: "100vw" }}>
      <Upload multiple customRequest={handleFileUpload}>
        <Button>Click to upload</Button>
      </Upload>
      {Object.values(files).map((file, index) => {
        return (
          <Space
            direction="vertical"
            key={index}
            style={{ backgroundColor: "lightgrey", width: 500, padding: 8 }}
          >
            <Space>
              <Typography>{file.name}</Typography>
            </Space>
            <Progress percent={Math.ceil(file.progress * 100)} />
          </Space>
        );
      })}
    </Space>
  );
};

export default TestFile;

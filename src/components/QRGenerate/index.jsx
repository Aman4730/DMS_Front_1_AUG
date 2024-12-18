import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";

export default function QRCodeDownload() {
  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    const filemongo_id = "6687e909f81a498d2873a792";
    const file_name = "example_file.txt";
    const file_size = "1024";
    const file_type = "text/plain";

    const downloadFile = () => {
      const apiUrl = "https://fileshare.acme.in:3002/downloadfile";
      const requestData = { filemongo_id };

      let downloadCompleted = false;

      axios
        .post(apiUrl, requestData, {
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            if (!downloadCompleted) {
              const totalBytes = parseInt(file_size, 10);

              const loaded = progressEvent.loaded;
              if (totalBytes > 0) {
                const progress = Math.min(
                  Math.round((loaded / totalBytes) * 100),
                  99
                );
                console.log(`Download Progress: ${progress}%`);
              }
            }
          },
        })
        .then((response) => {
          downloadCompleted = true;
          alert("File Download Success");
          const blob = new Blob([response.data], { type: file_type });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = file_name;
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(url);
          link.remove();
        })
        .catch((error) => {
          downloadCompleted = true;
          console.error(error?.response?.statusText || "Download Failed");
          alert("File Download Error");
        });
    };

    setQrValue("https://fileshare.acme.in:8086");
    alert(window.location.href)
    if (window.location.href === "https://fileshare.acme.in:8086") {
      downloadFile();
    }
  }, [qrValue]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Scan QR Code to Download File</h1>
      {qrValue && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <QRCodeSVG value={qrValue} size={256} />
        </div>
      )}
      <p className="mt-4 text-sm text-gray-600">
        Scan with Google Lens to download the file
      </p>
    </div>
  );
}
// import React from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import {
//   Button,
//   Box,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   Divider,
// } from "@mui/material";

// const QRGenerate = ({ open, qrData, handleClose, downloadQRCode }) => {
//   return (
//     <React.Fragment>
//       <Dialog open={open} onClose={handleClose} aria-labelledby="qr-dialog">
//         <DialogContent>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "15px",
//               border: "1px solid #e0e0e0",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 padding: "15px",
//                 borderRadius: "10px",
//                 backgroundColor: "white",
//                 marginBottom: "10px",
//                 border: "1px solid #e0e0e0",
//               }}
//               id="qr-card"
//             >
//               {qrData && (
//                 <QRCodeCanvas
//                   value={qrData}
//                   size={200}
//                   style={{ width: "150px", height: "150px" }}
//                   imageSettings={{
//                     src: "/logo.png",
//                     height: 40,
//                     width: 40,
//                     excavate: true,
//                   }}
//                   onClick={() => console.log("Working")}
//                 />
//               )}
//             </Box>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ justifyContent: "center", padding: "12px" }}>
//           <Button
//             variant="contained"
//             color="success"
//             onClick={downloadQRCode}
//             sx={{ marginRight: "10px", outline: "none" }}
//           >
//             Download
//           </Button>
//           <Button
//             variant="outlined"
//             onClick={handleClose}
//             sx={{ outline: "none" }}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// };

// export default QRGenerate;

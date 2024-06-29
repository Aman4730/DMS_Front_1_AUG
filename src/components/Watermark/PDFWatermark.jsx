import React, { useState, useEffect } from "react";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import axios from "axios";

function PDFWatermark({ location }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL_LOCAL}/filedata`,
          {
            filemongo_id: location.state.filemongo_id,
          }
        );

        const data = response.data.file_data.data;
        const arrayBuffer = new Uint8Array(data).buffer;

        const pdf = await PDFDocument.load(arrayBuffer);

        const pages = pdf.getPages();
        const font = await pdf.embedFont("Helvetica-Bold");

        pages.forEach((page) => {
          const { width, height } = page.getSize();
          const textSize = 50;
          const textWidth = font.widthOfTextAtSize("ACME", textSize);
          const textHeight = font.heightAtSize(textSize);

          const textX = width / 2 - textWidth / 2;
          const textY = height / 2 - textHeight / 2;

          page.drawText("ACME", {
            x: textX,
            y: textY,
            size: textSize,
            font: font,
            color: rgb(0.95, 0.1, 0.1),
            opacity: 0.5,
            rotate: degrees(30),
          });
        });

        const modifiedPdfBytes = await pdf.save();
        setPdfUrl(
          URL.createObjectURL(
            new Blob([modifiedPdfBytes], { type: "application/pdf" })
          )
        );
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchData();
  }, [location.state.filemongo_id]);

  return (
    <div style={{ border: "1px solid grey", width: "100%", height: "550px" }}>
      {pdfUrl ? (
        <iframe
          src={`${pdfUrl}#toolbar=0`}
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
}

export default PDFWatermark;

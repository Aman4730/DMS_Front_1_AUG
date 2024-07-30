import React, { useRef, useEffect } from "react";

const ImageWithWatermark = ({ Img, text, fontSize }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = Img;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0);
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      ctx.fillText(text, x, y);
    };

    image.onerror = () => {
      console.error("Failed to load image");
    };
  }, [Img]);

  return <canvas ref={canvasRef} />;
};

export default ImageWithWatermark;

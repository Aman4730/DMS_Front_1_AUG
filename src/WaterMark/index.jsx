import React from "react";
import { Watermark } from "@hirohe/react-watermark";

const WaterMark = () => (
  <Watermark text="Mark">
    <div style={{ width: 500, height: 500, backgroundColor: "#5f5f5f" }}>
      Lorem ipsum
    </div>
  </Watermark>
);

export default WaterMark;

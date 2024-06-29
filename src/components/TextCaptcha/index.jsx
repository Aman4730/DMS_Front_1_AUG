import React from "react";
import CachedIcon from "@mui/icons-material/Cached";

const TextCaptcha = ({
  userInput,
  isCorrect,
  captchaText,
  reloadCaptcha,
  handleInputChange,
}) => {
  return (
    <div style={styles.container}>
      <p
        className={`captcha-text ${isCorrect ? "correct" : ""}`}
        style={{
          ...styles.captchaText,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {captchaText}
      </p>

      <CachedIcon onClick={reloadCaptcha} style={styles.reloadIcon} />
      <input
        type="text"
        name="captcha"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Enter Captcha"
        className="form-control-lg form-control"
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  captchaText: {
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "7px",
    border: "1px solid lightGrey",
    width: "48%",
    height: "43px",
    lineHeight: "43px",
    margin: "0",
    backgroundColor: "white",
    boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.1)",
  },
  reloadIcon: {
    cursor: "pointer",
    margin: "10px",
  },
  input: {
    width: "48%",
    padding: "5px",
    borderRadius: "7px",
    border: "1px solid lightGrey",
    boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default TextCaptcha;

import { useState } from "react";
import "./App.css";
import QR from "./assets/qr-code.png";
import { Rings } from "react-loader-spinner";

const axios = require("axios");

function App() {
  /**now we will do dynamic part */
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const generateQRHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${text}` //this api endpoint generate qr code
      );
      if (response) {
        setImgSrc(response.config.url);
        setIsLoading(false);
      }
    } catch (error) {
      setText("");
      setIsLoading(false);
      setImgSrc("");
    }
  };

  const clear = () => {
    setText("");
    setIsLoading(false);
    setImgSrc("");
  };

  return (
    <div className="app">
      <div className="app_form">
        <h1>QR Code generator</h1>
        <input
          type="text"
          placeholder="Enter text or link to generate QR code..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button
          id={imgSrc ? "btn-red" : ""}
          onClick={imgSrc ? clear : generateQRHandler}
        >
          {imgSrc ? "Clear" : "Generate QR Code"}
        </button>
      </div>
      {isLoading && (
        <div className="app_qr-code">
          <Rings color="#00BFFF" height={80} width={80} />
        </div>
      )}

      {imgSrc && (
        <div className="app_qr-code">
          <img src={imgSrc ? imgSrc : QR} alt="qr-code" />
        </div>
      )}
    </div>
  );
}

export default App;

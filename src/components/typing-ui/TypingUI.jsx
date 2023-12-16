import React, { useState, useEffect, useRef } from "react";
import "./TypingUI.css";
import { WORD_LISTS } from "../../util/constants";
import { calculateAccuracy, calculateWPM, calculateCPM } from "../../util/helpers";

let words = WORD_LISTS[0]; // TODO: link to settings component

function TypingUI({ onGameEnd }) {
  const [currentText, setCurrentText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [isFocused, setIsFocused] = useState(true);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    generateNewText();
  }, []);

  const generateNewText = () => {
    let newText = '';
    for (let i = 0; i < 5; i++) {
      newText += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    setCurrentText(newText.trim());
    setTypedText('');
  };

  const handleTyping = (e) => {
    if(timerRef.current === null) {
      let start = Date.now();
      timerRef.current = setInterval(() => {
        timerRef.current = Date.now() - start;
      }, 100);
    }
    const value = e.target.value;
    setTypedText(value);
  };

  const getStyledText = () => {
    return currentText.split("").map((char, index) => {
      let color = "#00000050"; // Default color
      if (index < typedText.length) {
        color = char === typedText[index] ? "#00ff00a0" : "#ff0000a0";
      }
      return (
        <span
          key={index}
          style={{
            color,
            textDecoration: typedText.length === index ? "underline" : "none"
          }}>
          {char}
        </span>
      );
    });
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (typedText.length >= currentText.length && currentText.length > 0) {
      // onTestComplete();
      clearInterval(timerRef.current);
      let accuracy = calculateAccuracy(currentText, typedText);
      const wpm = calculateWPM(typedText, timerRef.current);
      const cpm = calculateCPM(typedText, timerRef.current);
      // testCompleteCallback(accuracy, wpm, cpm);
      onGameEnd(accuracy, wpm, cpm);
    }
  }, [typedText]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div
      className="typing-frame"
      onClick={() => inputRef.current.focus()}
      style={{ position: "relative", cursor: "text" }}>
      <div
        style={{
          position: "absolute",
          pointerEvents: "none",
          opacity: !isFocused ? 0 : 1
        }}>
        {getStyledText()}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={typedText}
        onChange={handleTyping}
        onBlur={handleBlur}
        onFocus={handleFocus}
        style={{ opacity: 0, position: "absolute", width: "0%" }}
      />
      {!isFocused && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            textAlign: "center",
            backgroundColor: "pink",
            width: "100%",
            height: "100%"
          }}>
          Click to focus
        </div>
      )}
    </div>
  );
}

export default TypingUI;

import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");
  const handleUpClick = () => {
    console.log("Upper Case was clicked");
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to UpperCase","success");
  };

  const handleDownClick = () => {
    console.log("DownClick was Clicked");
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to LowerCase","success");
  };

  const handleClearClick = () => {
    console.log("Clear was Clicked");
    let newText = "";
    setText(newText);
    props.showAlert("Cleared","success");
  };

  const handleCopy = () => {
    console.log("copy button is being clicked");
    var text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    props.showAlert("Copied","success");
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra Spaces are removed","success");
  };

  const handleOnChange = (event) => {
    console.log("On Change was clicked");
    setText(event.target.value);
  };

  function handleTextToSpeech() {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
    return undefined;
  }

  function handleSpeechToText() {
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };
    return undefined;
  }

  return (
    <>
      <div
        className="container"
        style={{
          
          color: props.mode === "dark" ? "white" : "#042743",
        }}
      >
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            style={{
              backgroundColor: props.mode === "dark" ? "grey" : "white",
              color: props.mode === "dark" ? "white" : "grey",
            }}
            onChange={handleOnChange}
            id="myBox"
            rows="10"
          ></textarea>
        </div>
        <button className="btn btn-primary" onClick={handleUpClick}>
          Convert to UpperCase
        </button>
        &nbsp;
        <button className="btn btn-primary" onClick={handleDownClick}>
          Convert to LowerCase
        </button>
        &nbsp;
        <button className="btn btn-primary" onClick={handleClearClick}>
          Clear
        </button>
        &nbsp;
        <button className="btn btn-primary" onClick={handleCopy}>
          Copy
        </button>
        &nbsp;
        <button className="btn btn-primary" onClick={handleExtraSpaces}>
          Remove Extra Spaces
        </button>
        &nbsp;
        <button className="btn btn-primary" onClick={handleSpeechToText}>Speech to Text</button>
        &nbsp;
        <button className="btn btn-primary" onClick={handleTextToSpeech}>Text to Speech</button>
      </div>
      <div className="container my-4" style={{
          
          color: props.mode === "dark" ? "white" : "#042743",
        }}>
        <h1>Your text summary</h1>
        
        <p>{text === "" ? '0': text.trim().split(/\s+/).length} words and {text.length} characters</p>
        <p>{0.008 * text.split(" ").length}Minutes to read</p>
        <p>{text.split(".").length - 1} lines</p>
        <p>{text.split("\n").length - 1} paragraph</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Enter something in the textbook above to preview it here:"}</p>
      </div>
    </>
  );
}

import React, {useState} from "react";
import translate from "translate";

translate.engine = "google";
translate.key = null;


export default function TextForm(props) {

    const [text, setText] = useState("");
    const [lang, setLang] = useState({code: "en-US", name: "English"});
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to UpperCase", "success");
    };

    const handleDownClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to LowerCase", "success");
    };

    const handleClearClick = () => {
        let newText = "";
        setText(newText);
        props.showAlert("Cleared", "success");
    };

    const handleCopy = () => {
        console.log("copy button is being clicked");
        var text = document.getElementById("myBox");
        text.select();
        navigator.clipboard.writeText(text.value);
        props.showAlert("Copied", "success");
    };

    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra Spaces are removed", "success");
    };

    const handleOnChange = (event) => {
        console.log("On Change was clicked");
        setText(event.target.value);
    };

    function handleTextToSpeech() {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang.code;
        const voices = synth.getVoices();
        const voice = voices.find(v => v.lang === lang.code);
        if (voice) utterance.voice = voice;
        synth.speak(utterance);

        return undefined;
    }

    function handleSpeechToText() {
        const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new speechRecognition();
        recognition.lang = 'en-US';
        recognition.start();
        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            setText(transcript);
        };
        return undefined;
    }

    const handleTranslate = async (langCode, langName) => {
        if (text.trim() === "") {
            props.showAlert("Please enter some text to translate", "warning");
            return;
        }

        try {
            const translatedText = await translate(text, {to: langCode});
            setText(translatedText);
            let speechCodeMap = {
                "en": "en-US",
                "hi": "hi-IN",
                "fr": "fr-FR",
                "de": "de-DE",
                "es": "es-ES",
                "zh-TW": "zh-CN"
            };
            setLang({code: speechCodeMap[langCode] || "en-US", name: langName});
            props.showAlert(`Text translated to ${langName}`, "success");
        } catch (error) {
            props.showAlert(`Error translating text to ${langName}: ${error.message}`, "danger");
        }
    }

    function handlePaste() {
        navigator.clipboard.readText().then(clipText => setText(clipText));
        props.showAlert("Pasting from clipboard", "success");
    }

    function handleReplace() {
        const a = prompt("Enter the word to be replaced");
        const b = prompt("Enter the word to be replaced with");
        if (!a || !b) {
            return;
        }
        const newText = text.replaceAll(a, b);
        setText(newText);
        props.showAlert("Word replaced", "success");
    }

    function handleEncode() {
        const encodedText = btoa(text);
        setText(encodedText);
        props.showAlert("Text encoded to Base64", "success");
    }

    function handleDecode() {
        try {
            const decodedText = atob(text);
            setText(decodedText);
            props.showAlert("Text decoded from Base64", "success");
        } catch (error) {
            props.showAlert("Invalid Base64 string", "failed");
        }
    }

    function handleSentenceCase() {
        let newText = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) {
            return c.toUpperCase()
        });
        setText(newText);
        props.showAlert("Converted to Sentence case", "success");
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
                <div className="btn-box" style={{
                    display: "flex",
                    flexWrap: "wrap",
                    rowGap: "15px",     // vertical gap between rows
                    columnGap: "3px",  // horizontal gap between buttons
                    marginTop: "10px",
                }}>
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
                    <button className="btn btn-primary" onClick={handlePaste}>
                        Paste
                    </button>
                    &nbsp;
                    <button className="btn btn-primary" onClick={handleExtraSpaces}>
                        Remove Extra Spaces
                    </button>
                    &nbsp;
                    <button className="btn btn-primary" onClick={handleReplace}>
                        Replace
                    </button>
                    &nbsp;
                    <button className="btn btn-primary" onClick={handleEncode}>
                        Encode Base64
                    </button>
                    &nbsp;
                    <button className="btn btn-primary" onClick={handleDecode}>
                        Decode Base64
                    </button>
                    &nbsp;
                    <button className="btn btn-primary" onClick={handleSentenceCase}>
                        Sentence Case
                    </button>
                    &nbsp;
                    <button className="btn btn-primary" onClick={handleSpeechToText}>Speech to Text</button>
                    &nbsp;
                    <button className="btn btn-primary" onClick={handleTextToSpeech}>Text to Speech</button>
                    &nbsp;
                    <button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false">Translate
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button className="dropdown-item" onClick={() => handleTranslate('es', 'Spanish')}>Spanish
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={() => handleTranslate('fr', 'French')}>French
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={() => handleTranslate('de', 'German')}>German
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={() => handleTranslate('hi', 'Hindi')}>Hindi
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={() => handleTranslate('en', 'English')}>English
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container my-4" style={{

                color: props.mode === "dark" ? "white" : "#042743",
            }}>
                <h1>Your Text Summary</h1>

                <p>
                    <b>{text.length}</b> characters <b>{text === "" ? '0' : text.trim().split(/\s+/).length}</b> words <b>{text.split(".").length - 1}</b> lines <b>{text.split("\n").length - 1}</b> paragraph
                </p>
                <p><b>{text.length === 0 ? 0 : 0.008 * text.split(" ").length}</b> minutes to read</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Enter something in the textbook above to preview it here:"}</p>
            </div>
        </>
    );
}

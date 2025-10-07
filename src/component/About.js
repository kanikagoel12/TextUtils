import React, {useState} from "react";

export default function About(props) {

    const [myStyle,setmyStyle]=useState({
        color: 'black',
        backgroundColor: 'white'
    })

    const [btntext,setBtnText] = useState("Enable Dark Mode");

    const toggleStyle = () =>{
        if(myStyle.color === 'white')
        {
            setmyStyle({
                color: 'black',
                backgroundColor: 'white',
                border: '1px solid black'
            })
            setBtnText("Enable Dark Mode");
        }
        else{
            setmyStyle({
                color: 'white',
                backgroundColor:'black'
            })
            setBtnText("Enable Light Mode");
        }
    }

  return (
    <div className={`container text-${(props.mode === "light")?"dark":"light"} bg-${props.mode === "light" ? "white" : "#042743"}`}>
        <h2>About Us</h2>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              style={myStyle}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
                What is TextUtils?
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              <strong></strong>  TextUtils is a text analysis and formatting tool built with React.
                It allows users to manipulate their text quickly and efficiently —
                such as converting to uppercase/lowercase, removing extra spaces,
                and counting words or characters.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed" style={myStyle}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
                Why use TextUtils?
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
                TextUtils is designed for writers, students, and developers who
                frequently work with text data. It’s fast, lightweight, and works
                directly in your browser — no installation or internet connection
                required. Perfect for quick content cleaning or formatting tasks!
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed" style={myStyle}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
                Technology Used
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
                This project is built using <strong>React.js</strong> and{" "}
                <strong>Bootstrap 5</strong>.
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">

      </div>
      
    </div>
  );
}

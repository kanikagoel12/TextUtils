export const Welcome = (props) => {
    let myStyle = {
        color: props.mode === "dark" ? "white" : "#042743",
        backgroundColor: props.mode === "dark" ? "#042743" : "white",
        textAlign: "center",
        padding: "240px",
    }
    return (
        <>
            <div className="container " style={myStyle}>
                <h1 className="fw-bold">Welcome to TextUtils!</h1>
                <p className="fst-italic fw-medium">-Simplify. Edit. Perfect.</p>
            </div>
        </>
    )
}
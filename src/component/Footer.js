function Footer(props) {
    return (
        <footer className={`text-${(props.mode === "light")?"dark":"light"} bg-${props.mode} py-3`}>
            <div className="container d-flex justify-content-center">
                <p className="m-0">Made with ❤️ by <strong><i>Kanika</i></strong></p>
            </div>
        </footer>
    );
}
export default Footer;

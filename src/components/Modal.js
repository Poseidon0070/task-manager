import  ReactDOM  from "react-dom";
let MODAL_STYLE = {
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#FFF",
    padding: "25px",
    zIndex: "2",
    width: "auto",
    fontFamily:'Varela Round',
    boxShadow: "0px 3px 4px 5px rgb(36, 34, 34)",
    borderRadius: "10px",
}
let OVERLAY_STYLE = {
    position: "fixed",
    top:0,
    left:0,
    bottom:0,
    right:0,
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: "1"
}
let Modal = ({open,children,setOpen}) => {
    if(!open) return null;
    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLE} onClick={() => setOpen(false)}/>
            <div style={MODAL_STYLE}>
                <div className="d-flex">
                <h3 className='mt-1 ms-2 text-decoration-underline'>Add Task</h3>
                    <button className="btn btn-lg btn-close ms-auto" onClick={() => setOpen(false)}></button>
                </div> 
                {children}
            </div>
        </>,
        document.getElementById("portal")
    )
}

export default Modal;
import React from "react";
import { Toast } from "react-bootstrap";

const MyToast = (props) => {
  const toastCss = {
    position: "fixed",
    top: "60px",
    right: "10px",
    zIndex: "1",
    
  };

  return (
    <div style={props.show ? toastCss : null}>
      <Toast
        className={`border text-white ${
          props.type === "success"
            ? "border-success bg-success"
            : "border-danger bg-danger"
        }`}
        show={props.show}
      >
        <Toast.Header
          className={`text-white ${
            props.type === "success" ? "bg-success" : "bg-danger"
          }`}
          closeButton={false}
        >
          {/* <strong className="mr-auto">Success</strong> */}
        </Toast.Header>
        <Toast.Body >{props.message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default MyToast;

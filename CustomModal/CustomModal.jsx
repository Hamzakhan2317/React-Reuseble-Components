import { Modal } from "react-bootstrap";
import style from "./CustomModal.module.css";

const CustomModal = ({
  children,
  show,
  modalHeaderText,
  setShowComponent,
  backdrop,
  restoreFocus = false,
  onHide,
  className,
  boxShadow = "0px 3px 6px #00000029",
  size = "lg",
  padding = "15px 60px 30px 60px",
  marginLeft = "30px",
  maxHeight,
  overflowY = "auto",
  fullscreen,
  scrollable,
  dialogClassName,
  maxWidth,
  left,
  width,
  enforceFocus,
}) => {
  return (
    <>
      <Modal
        centered
        show={show}
        onHide={onHide}
        backdrop={backdrop}
        size={size}
        fullscreen={fullscreen}
        restoreFocus={restoreFocus}
        scrollable={scrollable}
        className={className}
        dialogClassName={dialogClassName}
        enforceFocus={enforceFocus}
        style={{
          maxWidth: maxWidth,
          left: left,
          width: width,
          paddingRight: "5%",
        }}
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#842D72",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: "10px",
            boxShadow: boxShadow,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: "1",
              marginLeft: marginLeft,
            }}
          >
            <Modal.Title
              centered
              style={{
                fontSize: "16px",
                color: "#FFFFFF",
                fontWeight: "600",
              }}
            >
              {modalHeaderText}
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body
          className={style.custom_modal_body}
          style={{
            padding: padding,
            maxHeight: maxHeight,
            overflowY: overflowY,
          }}
        >
          {children}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomModal;

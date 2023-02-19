import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
const CustomButton = ({
  hover = true,
  btnText,
  borderRadius = "100px",
  color = "#FFFFFF",
  background = "#842D72",
  border = "1px solid transparent",
  isSecondary = true,
  width,
  height,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  onClick,
  justifyContent,
  fontFamily = "'Lato', sans-serif",
  className,
  fontSize = "14px",
  padding = "6px 20px",
  position,
  top,
  right,
  bottom,
  left,
  boxShadow = "0px 3px 6px #00000029",
  onSubmit,
  disabled = false,
  zIndex,
  loading = false,
  textAlign,
  iconClassName = "",
  iconFontSize = "20px",
}) => {
  return (
    <Button
      className={`${hover ? "btnEffect" : ""} ${className}`}
      style={{
        borderRadius: borderRadius,
        color: isSecondary ? "#842d72" : color,
        background: isSecondary ? "#ffffff" : background,
        border: isSecondary ? "1px solid #842d72" : border,
        width: width,
        height: height,
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
        fontFamily: fontFamily,
        justifyContent: justifyContent,
        fontSize: fontSize,
        boxShadow: boxShadow,
        padding: padding,
        zIndex: zIndex,
        position: position,
        top: top,
        right: right,
        bottom: bottom,
        left: left,
        textAlign: textAlign,
      }}
      disabled={disabled}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {iconClassName && (
        <i
          style={{ fontSize: iconFontSize, paddingRight: "5px" }}
          className={iconClassName}
        />
      )}
      {btnText}
      {loading && (
        <Spinner
          animation="border"
          size="sm"
          color="#fff"
          style={{ marginLeft: "5px" }}
        />
      )}
    </Button>
  );
};

export default CustomButton;

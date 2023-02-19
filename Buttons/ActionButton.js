import { Spinner } from "react-bootstrap";
import ToolTip from "../Layout/ToolTip";

const ActionButton = ({
  image = false,
  src,
  iconClassName,
  className,
  borderColor,
  iconColor,
  backgroundColor = "#ffffff",
  onClick,
  toolTipText,
  placement,
  show,
  marginTop,
  marginBottom,
  width = "25px",
  height = "25px",
  loading = false,
  disabled = false,
}) => {
  return (
    <ToolTip placement={placement} toolTipText={toolTipText} show={show}>
      <button
        className={className}
        style={{
          cursor: "pointer",
          width: width,
          height: height,
          borderRadius: "999px",
          border: `1px solid ${borderColor}`,
          backgroundColor: backgroundColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: marginTop,
          marginBottom: marginBottom,
          objectFit: "contain",
        }}
        disabled={disabled}
        onClick={onClick}
      >
        {loading && (
          <Spinner
            animation="border"
            size="sm"
            color="#fff"
            style={{ objectFit: "contain", width: "10px", height: "10px" }}
          />
        )}
        {!loading && image ? (
          <img src={src} style={{ width: "13px", height: "13px" }} />
        ) : (
          !loading && (
            <i
              className={iconClassName}
              aria-hidden="true"
              style={{ color: iconColor, cursor: "pointer" }}
            />
          )
        )}
      </button>
    </ToolTip>
  );
};

export default ActionButton;

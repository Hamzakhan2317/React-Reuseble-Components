const CustomSearchBar = ({
  position = "relative",
  marginRight = "20px",
  width = "100%",
  inputBorderRadius = "5px",
  inputBorder = "1px solid #E8E8E8",
  inputHeight = "42px",
  padding = "7px 35px 7px 15px",
  iconPosition = "absolute",
  iconRight = "10px",
  iconTop = "13px",
  iconColor = "#999999",
  placeholder,
  background = "#FAFAFA",
  onClick,
  formik,
  value,
  onChange,
  disabled,
  id,
}) => {
  return (
    <div style={{ position: position, marginRight: marginRight, width: width }}>
      <input
        style={{
          borderRadius: inputBorderRadius,
          border: inputBorder,
          height: inputHeight,
          padding: padding,
          width: width,
          background: background,
        }}
        value={formik?.values[id] ? formik?.values[id] : value}
        onChange={onChange ? onChange : formik?.handleChange}
        type="text"
        placeholder={placeholder}
        className="search-btn"
        disabled={disabled}
        id={id}
      />
      <i
        style={{
          position: iconPosition,
          right: iconRight,
          top: iconTop,
          color: iconColor,
          cursor: "pointer",
        }}
        onClick={onClick}
        className="fa fa-search"
      />
    </div>
  );
};

export default CustomSearchBar;

import { Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
const InputField = ({
  id,
  label,
  labelDisplay,
  className,
  labelMarginTop,
  labelMarginRight,
  labelMinWidth,
  labelFieldCompulsory,
  labelFontSize = "14px",
  type = "text",
  onChange,
  width,
  feedback,
  feedbackType,
  value,
  as,
  readOnly = false,
  rows,
  margin,
  marginTop = "13px",
  marginRight,
  marginBottom,
  marginLeft,
  labelMarginBottom = "5px",
  placeholder,
  height,
  backgroundColor = "#FAFAFA",
  border = "1px solid #E8E8E8",
  padding = "8px 15px",
  labelFieldCompulsoryColor = "#ED1C24",
  formik,
  labelColor,
  disabled,
  icon = false,
  unit = false,
  isPhoneNumber = false,
  min,
  flex,
  display,
  alignItems,
  onKeyUp,
  idphone,
  max,
  defaultValue,
  onBlur,
  isNumber,
}) => {
  const formikTouch = formik?.touched;
  const formikError = formik?.errors;

  function numberValidation(evt) {
    evt = evt ? evt : window.event;
    let charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  function phoneFormat(f) {
    var r = /(\D+)/g,
      npa = "",
      nxx = "",
      last4 = "";
    f.value = f.value.replace(r, "");
    npa = f.value.substr(0, 3);
    nxx = f.value.substr(3, 3);
    last4 = f.value.substr(6, 4);
    if (f.value?.length === 0) {
      f.value = "";
    } else if (f.value?.length > 3) {
      f.value = npa + "-" + nxx + "-" + last4;
    }
  }
  return (
    <Form.Group
      className={className}
      style={{
        margin: margin,
        marginTop: marginTop,
        marginRight: marginRight,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        flex: flex,
        display: display,
        alignItems: alignItems,
      }}
    >
      <Form.Label
        style={{
          marginBottom: labelMarginBottom,
          marginTop: labelMarginTop,
          marginRight: labelMarginRight,
          fontSize: labelFontSize,
          color: labelColor,
          display: labelDisplay,
          minWidth: labelMinWidth,
        }}
      >
        {label}
        <span style={{ color: labelFieldCompulsoryColor, fontSize: "16px" }}>
          {labelFieldCompulsory}
        </span>
      </Form.Label>
      <InputGroup>
        <Form.Control
          type={type}
          className={className}
          onChange={onChange ? onChange : formik?.handleChange}
          value={formik?.values[id] ? formik?.values[id] : value}
          as={as}
          rows={rows}
          readOnly={readOnly}
          min={type === "number" ? 0 : ""}
          max={max}
          style={{
            height: height,
            backgroundColor: backgroundColor,
            border: border,
            padding: padding,
            width: width,
          }}
          placeholder={isPhoneNumber ? "999-999-9999" : placeholder}
          id={id}
          onKeyDown={(e) => {
            isPhoneNumber && numberValidation(e);
          }}
          onKeyUp={(e) => {
            isPhoneNumber && phoneFormat(e.currentTarget);
          }}
          disabled={disabled}
          {...formik?.getFieldProps(id)}
          maxLength={isPhoneNumber ? "12" : ""}
          defaultValue={defaultValue}
          onBlur={onBlur}
        />
        {icon && <InputGroup.Text>$</InputGroup.Text>}

        {unit && <InputGroup.Text>0.00</InputGroup.Text>}
      </InputGroup>
      <span
        className="ml-2 text-danger"
        style={{ marginTop: "5px", fontSize: "14px" }}
      >
        {formik ? formikTouch[id] && formikError[id] : ""}
      </span>
    </Form.Group>
  );
};

export default InputField;

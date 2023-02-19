import { Form } from "react-bootstrap";
import "./CustomCheckBoxAndRadio.css";

const CustomCheckboxAndRadio = ({
  id,
  label,
  type = "checkbox",
  onChange,
  feedback,
  feedbackType,
  value,
  name,
  marginTop,
  marginRight = "10px",
  marginBottom,
  marginLeft,
  paddingRight = "0px",
  labelMargin = "10px",
  className,
  border = "none",
  color = "#842D72",
  width = "fit-content",
  height,
  fontSize = "14px",
  justifyContent = "flex-end",
  formik,
  defaultChecked,
  disabled,
  minWidth,
  flex = "1",
  readOnly = false,
}) => {
  const formikTouch = formik?.touched;
  const formikError = formik?.errors;
  return (
    <Form.Group
      className="input_checkbox"
      style={{
        width: "fit-content",
        alignItems: "center",
        flex: flex,
      }}
    >
      <div
        className="custom-checkbox"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: justifyContent,
          minWidth: minWidth,
        }}
      >
        <Form.Check
          id={id}
          type="checkbox"
          className={className}
          onChange={onChange ?? (formik && formik.handleChange)}
          checked={formik?.values[id] ?? value}
          value={value ?? formik?.values[id] ?? false}
          name={name}
          label={label}
          defaultChecked={defaultChecked ?? formik?.values[id] ?? false}
          style={{
            marginTop: marginTop,
            marginRight: marginRight,
            marginBottom: marginBottom,
            marginLeft: marginLeft,
            border: border,
            paddingRight: paddingRight,
            width: width,
            height: height,
            color: color,
            fontSize: fontSize,
          }}
          disabled={disabled}
        />
      </div>
      <span className="ml-2 text-danger">
        {formik && formikTouch[id] && formikError[id]}
      </span>
    </Form.Group>
  );
};

export default CustomCheckboxAndRadio;

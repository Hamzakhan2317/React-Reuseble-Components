import React from "react";
import { Form } from "react-bootstrap";

const CustomRadio = ({
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
  border,
  borderRadius = "100px",
  color = "#842D72",
  width = "fit-content",
  height,
  fontSize,
  justifyContent = "flex-end",
  formik,
  defaultChecked,
  disabled,
}) => {
  const formikTouch = formik?.touched;
  const formikError = formik?.errors;
  return (
    <div className="emr_custom_radio">
      <Form.Group
        className="input_checkbox"
        style={{
          width: "fit-content",
          alignItems: "center",
        }}
      >
        <Form.Check
          id={id}
          type="radio"
          className={className}
          onChange={
            onChange ? onChange : (e) => formik.setFieldValue(id, value)
          }
          value={value}
          name={name}
          label={label}
          defaultChecked={defaultChecked ?? formik?.values[id] ?? null}
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
            borderRadius: borderRadius,
          }}
          disabled={disabled}
          {...formik?.getFieldProps(id)}
        />
      </Form.Group>
      <span className="ml-2 text-danger">
        {formik && formikTouch[id] && formikError[id]}
      </span>
    </div>
  );
};

export default CustomRadio;

import { isDate } from "lodash";
import { forwardRef } from "react";
import { FormLabel } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import Calender from "../../../assets/images/calender.svg";
import "./DatePickerForm.css";

const DatePickerForm = ({
  formik = undefined,
  onChange,
  id,
  label,
  labelLeft,
  marginTop = "13px",
  marginRight,
  labelMarginBottom = "5px",
  marginLeft,
  labelMargin,
  labelMarginRight,
  labelFieldCompulsory,
  labelFieldCompulsoryColor = "#ED1C24",
  fontSize = "12px",
  width = "100%",
  marginBottom,
  labelFontSize = "14px",
  labelDisplay,
  showTimeSelect = false,
  value,
  disabled,
  timeIntervals = "15",
  minDate,
}) => {
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="example-custom-input"
      onClick={onClick}
      ref={ref}
      style={{
        width: width,
        border: "1px solid #E8E8E8",
        height: "42px",
        borderRadius: "5px",
        position: "relative",
        textAlign: "left",
        paddingLeft: "10px",
        fontSize: "14px",
        backgroundColor: "#FAFAFA",
        marginBottom: marginBottom,
      }}
    >
      {value}
      <span style={{ position: "absolute", right: "0", top: "15%" }}>
        <img
          src={Calender}
          style={{ marginRight: "10px", width: "14px", height: "18px" }}
          alt="Calender"
        />
      </span>
    </button>
  ));
  const formikTouch = formik?.touched;
  const formikError = formik?.errors;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: labelLeft ? "row" : "column",
        justifyContent: "flex-start",
        alignItems: labelLeft ? "center" : "",
        marginTop: marginTop,
        marginRight: marginRight,
        marginLeft: marginLeft,
      }}
    >
      <FormLabel
        style={{
          margin: labelMargin,
          marginRight: labelLeft ? "10px" : labelMarginRight,
          fontSize: labelFontSize,
          marginBottom: labelMarginBottom,
          display: labelDisplay,
        }}
      >
        {label}
        <span style={{ color: labelFieldCompulsoryColor, fontSize: "16px" }}>
          {labelFieldCompulsory}
        </span>
      </FormLabel>

      <ReactDatePicker
        selected={
          formik !== undefined && formik?.values[id] === null
            ? null
            : formik !== undefined && isDate(new Date(formik?.values[id]))
            ? new Date(formik?.values[id])
            : value
            ? value
            : new Date()
        }
        onChange={
          onChange ? onChange : (date) => formik?.setFieldValue(id, date)
        }
        value={
          formik !== undefined && formik?.values[id] === null
            ? null
            : formik !== undefined && isDate(new Date(formik?.values[id]))
            ? new Date(formik?.values[id])
            : value
            ? value
            : new Date()
        }
        id={id}
        showTimeSelect={showTimeSelect}
        timeIntervals={timeIntervals}
        dateFormat={showTimeSelect ? "MMMM d, yyyy h:mm aa" : "MMMM d, yyyy"}
        showYearDropdown
        dropdownMode="select"
        placeholderText="Dec 24,2021"
        style={{ border: "none !important" }}
        customInput={<ExampleCustomInput />}
        disabled={disabled}
        minDate={minDate}
      />
      <span
        className="ml-2 text-danger"
        style={{ marginTop: "5px", fontSize: "14px" }}
      >
        {formik && formikTouch[id] && formikError[id]}
      </span>
    </div>
  );
};

export default DatePickerForm;

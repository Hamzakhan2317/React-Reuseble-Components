import { forwardRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calender from "../../../assets/images/calender.svg";
import "./Datepicker.css";

const Datepicker = ({
  width = "100%",
  marginBottom = "0px",
  showTimeSelect = false,
  onChange,
  selected,
  disabled,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="datepicker-custom-input"
      onClick={onClick}
      ref={ref}
      style={{
        width: width,
        border: "none",
        height: "42px",
        borderRadius: "5px",
        position: "relative",
        textAlign: "left",
        paddingLeft: "10px",
        fontSize: "14px",
        backgroundColor: "transparent",
        marginBottom: marginBottom,
      }}
    >
      <span
        className="datepicker_img"
        style={{ position: "absolute", left: "0", top: "15%" }}
      >
        <img src={Calender} alt="Calender" />
      </span>
      <span className="date_value">{value}</span>
    </button>
  ));
  return (
    <div
      className="schedularDatepicker"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%",
      }}
    >
      <ReactDatePicker
        selected={selected ?? startDate}
        onChange={onChange}
        dateFormat="MMM d, yyyy"
        showYearDropdown
        dropdownMode="select"
        placeholderText="Dec 24,2021"
        style={{ border: "none !important" }}
        customInput={<ExampleCustomInput />}
        showTimeSelect={showTimeSelect}
        disabled={disabled}
      />
    </div>
  );
};

export default Datepicker;

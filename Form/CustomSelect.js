import { useEffect } from "react";
import { FormLabel } from "react-bootstrap";
import Select from "react-select";
import "./CustomSelect.css";
const CustomSelect = ({
  id,
  label,
  labelFieldCompulsory,
  labelFieldCompulsoryColor = "#ED1C24",
  autoFocus,
  className,
  classNamePrefix,
  isDisabled = false,
  isMulti = false,
  isSearchable = false,
  name,
  onChange,
  options,
  placeholder,
  noOptionsMessage,
  defaultValue,
  formik,
  value,
  labelMarginBottom = "5px",
  labelMarginTop,
  labelFontSize = "14px",
  labelFontWeight,
  height = "42px",
  backgroundColor = "#FAFAFA",
  background,
  marginBottom,
  marginRight,
  marginLeft,
  marginTop = "13px",
  onInputChange,
  isClearable = false,
  menuIsOpen,
  isLoading = false,
  onFocus,
  labelDisplay,
  topIcon = "56%",
  rightIcon = "10px",
  leftIcon,
  bottomIcon,
  display,
  labelMinWidth,
  alignItems = "center",
  labelMarginRight,
  flex,
}) => {
  const formikTouch = formik?.touched;
  const formikError = formik?.errors;

  useEffect(() => {
    defaultValue && formik && formik?.setFieldValue(id, defaultValue.value);
  }, []);

  return (
    <>
      <div
        className={
          isSearchable
            ? `hide_dropdown_icon customSelector ${className}`
            : `customSelector ${className}`
        }
        style={{
          marginTop: marginTop,
          position: "relative",
          marginRight: marginRight,
          marginLeft: marginLeft,
          display: display,
          alignItems: alignItems,
        }}
      >
        {label && (
          <FormLabel
            style={{
              marginBottom: labelMarginBottom,
              marginTop: labelMarginTop,
              marginRight: labelMarginRight,
              fontSize: labelFontSize,
              fontWeight: labelFontWeight,
              display: labelDisplay,
              minWidth: labelMinWidth,
            }}
          >
            {label}
            <span
              style={{ color: labelFieldCompulsoryColor, fontSize: "16px" }}
            >
              {labelFieldCompulsory}
            </span>
          </FormLabel>
        )}

        <Select
          defaultValue={
            isMulti
              ? formik?.values[id]?.split(",")?.map((val) => {
                  return options?.find((item) => item.value === val);
                })
              : defaultValue ??
                options?.find((item) => item.value === value) ??
                options?.find((item) => item.value === formik?.values[id]) ??
                null
          }
          onChange={
            onChange
              ? onChange
              : isMulti
              ? (selectedOption) => {
                  formik?.setFieldValue(
                    id,
                    selectedOption.map((item) => item.value)?.toString()
                  );
                }
              : (selectedOption) => {
                  formik?.setFieldValue(id, selectedOption.value);
                }
          }
          onInputChange={onInputChange}
          value={
            formik && !isSearchable
              ? options?.find((item) => item.value === formik?.values[id])
              : isSearchable && formik
              ? options?.find((item) => item.value === formik?.values[id])
              : isMulti
              ? formik?.values[id]?.split(",")?.map((val) => {
                  return options?.find((item) => item.value === val);
                })
              : !formik
              ? options?.find((item) => item.value === value)
              : undefined
          }
          id={id}
          options={options}
          isSearchable={isSearchable}
          style={{
            height: height,
            backgroundColor: backgroundColor,
            background: background,
            flex: flex,
          }}
          isDisabled={isDisabled}
          isClearable={isClearable}
          menuIsOpen={menuIsOpen}
          isLoading={isLoading}
          onFocus={onFocus}
          autoFocus={autoFocus}
          isMulti={isMulti}
          placeholder={isSearchable === true ? "Search..." : placeholder}
          onBlur={() => {
            formik?.setFieldTouched(id, true);
          }}
          error={formik?.errors[id]}
          touched={formik?.touched[id]}
        />
        {isSearchable && (
          <span>
            <i
              className="fa fa-search"
              style={{
                fontSize: "18px",
                position: "absolute",
                right: rightIcon,
                top: topIcon,
                left: leftIcon,
                bottom: bottomIcon,
                width: "20px",
                cursor: "pointer",
                color: "rgb(204, 204, 204)",
              }}
            ></i>
          </span>
        )}
      </div>
      <span
        className="ml-2 text-danger"
        style={{ marginTop: "5px", fontSize: "14px" }}
      >
        {formik && formikTouch[id] && formikError[id]}
      </span>
    </>
  );
};

export default CustomSelect;

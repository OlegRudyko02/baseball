import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './datePicker.css'
type PickerProps = {
  setDate: (value: string) => void
}
const Picker: React.FC<PickerProps> = ({setDate}) => {
  const [startDate, setStartDate] = useState(new Date());
  const CustomInput = forwardRef(({ value , onClick }:any, ref:any) => (
    <div className="react-datepicker-wrapper">
      <div className="react-datepicker__input-container">
        <div className="react-datepicker-ignore-onclickoutside container">
          <button className="button" onClick={onClick} ref={ref}>
            <span className="calendar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path
                  fill="#48BBFF"
                  fillRule="nonzero"
                  d="M14.222 1.778h-.889v1.778h-2.666V1.778H5.333v1.778H2.667V1.778h-.89C.8 1.778 0 2.578 0 3.556v10.666C0 15.2.8 16 1.778 16h12.444C15.2 16 16 15.2 16 14.222V3.556c0-.978-.8-1.778-1.778-1.778zm0 12.444H1.778v-7.11h12.444v7.11zM4.89 0H3.11v3.111H4.89V0zm8 0H11.11v3.111h1.778V0z"
                ></path>
              </svg>
            </span>
            Date ({value})
            <span className="arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="9"
                viewBox="0 0 16 9"
              >
                <path
                  fill="#48BBFF"
                  fillRule="nonzero"
                  d="M13.469.432a1.081 1.081 0 0 1 1.565 0 1.165 1.165 0 0 1 0 1.615L8.78 8.43a1.083 1.083 0 0 1-1.567 0L.962 2.047a1.168 1.168 0 0 1 0-1.615 1.081 1.081 0 0 1 1.564 0L8 5.667 13.469.432z"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  ));
  return (
    <DatePicker
      selected={startDate}
      onChange={(date: any) => {setStartDate(date); setDate(date.toLocaleDateString())}}
      customInput={<CustomInput/>}
    />
  );
};

export default Picker;

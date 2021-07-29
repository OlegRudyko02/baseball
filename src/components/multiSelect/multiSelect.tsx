import React from "react";
import { useState } from "react";
import "./style.css";
type MultiProps = {
  input: any;
  meta: any;
  placeholder: string;
};
const Multi: React.FC<MultiProps> = ({
  meta,
  input: { value, onChange, multiple },
  placeholder
}) => {
  const [openedDropdown, setOpenedDropdown] = useState(false);

  const switchItem = (item: any) => {
    const index = value.findIndex((el: any) => el.id === item.id);
    if (index === -1) {
      multiple
        ? onChange([...value, item])
        : onChange([item]);
      setOpenedDropdown(false);
    } else {
      const arr = [...value]
      arr.splice(index, 1)
      onChange([...arr]);
      setOpenedDropdown(false);
    }
  };
  return (
    <div className="dropdown">
      <div className="dropdown-button-container">
        <div className="dropdown-button" onClick={() => setOpenedDropdown(true)}>
          {value.length ? (
            value.map((item: any, index: number) => {
              return (
                <span key={index} className="">
                  {item.id ? item.name : item } 
                </span>
              );
            })
          ) : (
            <span>{placeholder}</span>
          )}
        </div>
        <img
          src="/assets/user.svg"
          alt="#"
          className="dropdown-chevron-button dropdown-down-button"
          v-if="!isOpenedDropdown"
        />
        <img
          src="/assets/user.svg"
          alt="#"
          className="dropdown-chevron-button dropdown-up-button"
          v-if="isOpenedDropdown"
        />
      </div>
      {openedDropdown ? (
        <div className="dropdown-body">
          <div className="dropdown-body-list">
            {meta.data.map((item:any, index:number) => {
              return (
                <span
                  onClick={() => switchItem(item)}
                  key={index}
                  className="dropdown-body-list-item"
                >
                  {item.id ? item.name : item}
                </span>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Multi;

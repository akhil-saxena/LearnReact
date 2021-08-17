import React, { useEffect, useState, useRef } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./style.css";
import { CheckboxGroup } from "./components/CheckboxGroup";

function InternRegister() {
  const formSchema = [
    {
      displayName: "First Name",
      id: "name",
      type: "text",
    },
    {
      displayName: "Last Name",
      id: "surname",
      type: "text",
    },
    {
      displayName: "Date of Birth",
      id: "dob",
      type: "date",
    },
    {
      displayName: "Age",
      id: "age",
      type: "number",
    },
    {
      displayName: "Id",
      id: "id",
      type: "text",
    },
    {
      displayName: "Gender",
      id: "gender",
      type: "radio",
      options: [
        {
          displayName: "Male",
          value: "male",
        },
        {
          displayName: "Female",
          value: "female",
        },
        {
          displayName: "Other",
          value: "other",
        },
      ],
    },
    {
      displayName: "Department",
      id: "department",
      type: "dropdown",
      options: [
        {
          displayName: "Choose Department",
          value: "",
        },
        {
          displayName: "Aerospace",
          value: "Aerospace",
        },
        {
          displayName: "IT",
          value: "IT",
        },
        {
          displayName: "CSE",
          value: "CS",
        },
      ],
    },
    {
      displayName: "Languages",
      id: "languages",
      type: "checkbox",
      options: ["Java", "C", "Python", "JS"],
      defaultValue: [],
    },
  ];

  const INITIAL_STATE = formSchema.reduce((acc, curr) => {
    acc[curr.id] = curr.defaultValue ? curr.defaultValue : "";
    return acc;
  }, {});

  const [data, setData] = useState(() => {
    const regFormData = localStorage.getItem("regFormData");
    if (regFormData) {
      return JSON.parse(regFormData);
    }
    return INITIAL_STATE;
  });

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const value = localStorage.getItem("regFormData");
      if (value) {
        const values = JSON.parse(value);
        localStorage.setItem(
          "regFormData",
          JSON.stringify({ ...values, ...data })
        );
      } else {
        localStorage.setItem("regFormData", JSON.stringify(data));
      }
    } else {
      isMounted.current = true;
    }
  }, [data]);

  const handleSubmit = (e) => {
    if (!data.name) return false;
    setData(data);
    let internList = localStorage.getItem("internList");
    if (internList) {
      internList = JSON.parse(internList);
      internList.push(data);
    } else {
      internList = [data];
    }
    localStorage.setItem("internList", JSON.stringify(internList));
    // reset the form data
    localStorage.setItem("regFormData", null);
    setData(INITIAL_STATE);
  };

  function setDataFor(name, value) {
    setData({
      ...data,
      [name]: value,
    });
  }

  return (
    <div className="intern-register">
      <form
        id="intern-form"
        className="intern-register-form"
        onSubmit={(e) => e.preventDefault()}
      >
        {formSchema.map((elem, index) => {
          switch (elem.type) {
            case "radio": {
              return (
                <div key={elem.id} className="intern-register-form-elem">
                  <label>{elem.displayName}</label>
                  {elem.options.map((e) => (
                    <div key={`${elem.id}-${e.value}`} className="radio-elem">
                      <input
                        value={e.value}
                        type={elem.type}
                        onChange={(e) => setDataFor(elem.id, e.target.value)}
                        checked={data[elem.id] === e.value}
                      />
                      <label>{e.displayName}</label>
                    </div>
                  ))}
                </div>
              );
            }
            case "dropdown": {
              return (
                <div key={elem.id} className="intern-register-form-elem">
                  <label>{elem.displayName}</label>
                  <select
                    name={elem.id}
                    value={data[elem.id]}
                    onChange={(e) => setDataFor(elem.id, e.target.value)}
                  >
                    {elem.options.map((e) => (
                      <option key={`${elem.id}-${e.value}`} value={e.value}>
                        {e.displayName}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }
            case "checkbox": {
              return (
                <div key={elem.id} className="intern-register-form-elem">
                  <label>{elem.displayName}</label>
                  <CheckboxGroup
                    name={elem.id}
                    onChange={setDataFor}
                    checkboxes={elem.options}
                  />
                </div>
              );
            }
            default: {
              return (
                <div key={elem.id} className="intern-register-form-elem">
                  <label>{elem.displayName}</label>
                  <input
                    name={elem.name}
                    type={elem.type}
                    value={data[elem.id]}
                    onChange={(e) => setDataFor(elem.id, e.target.value)}
                  />
                </div>
              );
            }
          }
        })}
        <Popup
          closeOnEscape
          trigger={<button type="button"> Submit Form </button>}
        >
          {(close) => (
            <>
              <div> Are you sure you wish to save the form data? </div>
              <button
                onClick={(e) => {
                  handleSubmit(e);
                  close();
                }}
              >
                Save
              </button>
              <button onClick={close}>Close</button>
            </>
          )}
        </Popup>
      </form>
    </div>
  );
}

export default InternRegister;

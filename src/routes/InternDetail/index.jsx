import React from "react";
// import { useLocation } from "react-router-dom";
// import Navigator from "./aboutnavbar";

function About() {
  // const value = localStorage.getItem("data");
  // const values = JSON.parse(value);
  // const location = useLocation();
  // const {key} = location.state;
  // console.log({ values });
  // console.log(key);

  return (
    <div className="about">
      {/* <Navigator /> */}
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7"></div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">About Intern</h1>
            <p>
             {/* ADD A MAP LIST HERE TO PRINT THE ARRAY ELEMENTS FOR 1 GIVEN IDX VALUE */}
              <br />
              {/* {values[key.idx]} */}

              TEST PAGE
              {/* {console.log(key.idx)} */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

import React, { useState, useEffect } from "react";
import GlobalStats from "./GlobalStats";
import Countries from "./Countries";
import LOGO from "../LOGO.svg";
import Loader from "./Loader";
import Info from "./Info";
import fb from "../facebook.svg";

const Mainpage = () => {
  const [allData, setAllData] = useState();

  const fetchAllData = () => {
    fetch("https://covid19.mathdro.id/api")
      .then(res => res.json())
      .then(data => setAllData(data))
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchAllData();
  }, []);

  if (!allData) {
    return <Loader />;
  }
  return (
    <div className="container">
      <div className="header">
        <img src={LOGO} alt="" />
        <div className="developer">
          <p>
            Developed with{" "}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Love_Heart_symbol.svg/1111px-Love_Heart_symbol.svg.png"
              alt="love"
            />{" "}
            by <br />
            <a
              href="https://www.facebook.com/prabesh.regmi.7"
              style={{ textDecoration: "none" }}>
              <img src={fb} />
              &nbsp; Prabesh Regmi
            </a>
          </p>
        </div>
      </div>
      <Info />

      <GlobalStats allData={allData} />
      <Countries />
    </div>
  );
};

export default Mainpage;

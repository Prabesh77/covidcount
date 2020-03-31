import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Overlay from "./Overlay";
import Loader from "./Loader";

const Modal = styled.div`
  min-height: 200px;
  width: 500px;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 8px;
  -webkit-box-shadow: 2px 2px 10px -1px rgba(255, 255, 255, 0.2);
  -moz-box-shadow: 2px 2px 1255px -1px rgba(255, 255, 255, 0.2);
  box-shadow: 2px 2px 12px -1px rgba(255, 255, 255, 0.2);

  .country {
    /* padding: 0 0 0 1rem; */
    /* width: 30%; */
    text-align: center;
  }

  .stats-wrapper {
    flex-direction: column;
    padding-bottom: 2rem;

    .stat-card {
      min-width: 200px;
      margin: 12px 0;
    }
  }

  h1:nth-child(1) {
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
  }

  @media (max-width: 500px) {
    width: 90%;
  }

  @media (min-width: 600px) {
    height: 500px;
  }
`;

const Country = ({ countryName, setName, flag }) => {
  const [data, setData] = useState();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    fetch(`https://covid19.mathdro.id/api/countries/${countryName}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
      .catch(err => console.log(err));
  }, []);
  if (!data) {
    return <Loader />;
  }

  return (
    <div className="modal-comps">
      <Modal className="modal">
        <div className="country">
          {flag ? (
            <img src={flag ? flag : "loading..."} alt="" />
          ) : (
            <p>loading flag...</p>
          )}
          <h1>{countryName}</h1>
        </div>

        <div className="stats-wrapper">
          <div className="stat-card">
            <p>Total Confirmed Cases</p>{" "}
            <p>{numberWithCommas(data.confirmed.value)}</p>
          </div>
          <div className="stat-card">
            <p>Total Recovered</p>{" "}
            <p> {numberWithCommas(data.recovered.value)}</p>
          </div>
          <div className="stat-card">
            <p>Total Deaths</p> <p>{numberWithCommas(data.deaths.value)}</p>
          </div>
        </div>
      </Modal>
      <Overlay setName={setName} />
    </div>
  );
};

export default Country;

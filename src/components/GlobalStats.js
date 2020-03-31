import React from "react";

const GlobalStats = ({ allData }) => {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div>
      <h3 className="title">Live Record of Covid-19 Victims</h3>
      <div className="stats-wrapper" style={{ marginTop: "3rem" }}>
        <div className="stat-card">
          <p>Total Confirmed Cases</p>{" "}
          <p>{numberWithCommas(allData.confirmed.value)}</p>
        </div>
        <div className="stat-card">
          <p>Total Recovered</p>{" "}
          <p> {numberWithCommas(allData.recovered.value)}</p>
        </div>
        <div className="stat-card">
          <p>Total Deaths</p> <p>{numberWithCommas(allData.deaths.value)}</p>
        </div>
      </div>
    </div>
  );
};

export default GlobalStats;

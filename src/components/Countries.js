import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "./Filter";
import Country from "./Country";
import Loader from "./Loader";

const CardHolder = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  text-align: center;
`;

const CountryCard = styled.div`
  min-height: 180px;
  position: relative;
  -webkit-box-shadow: 2px 2px 10px -1px rgba(0, 0, 0, 0.58);
  -moz-box-shadow: 2px 2px 10px -1px rgba(0, 0, 0, 0.58);
  box-shadow: 2px 2px 10px -1px rgba(0, 0, 0, 0.58);
`;

const ViewMore = styled.button`
  height: 32px;
  padding: 0 1rem;
  background: teal;
  border: none;
  border-radius: 2rem;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translate(-50%);
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
  -webkit-box-shadow: 2px 2px 10px -1px rgba(0, 0, 0, 0.58);
  -moz-box-shadow: 2px 2px 10px -1px rgba(0, 0, 0, 0.58);
  box-shadow: 2px 2px 10px -1px rgba(0, 0, 0, 0.58);
  outline: none;

  &:hover {
    background: #0c87ae;
  }
`;
const Countries = () => {
  const [countries, setCountries] = useState();
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [flag, setFlag] = useState([]);
  // const [details, setDetails] = useState({ name: "", flag: [] });

  const handleCardClick = (a, b) => {
    setName(a);
    setFlag(b);
  };

  useEffect(() => {
    fetchCountries();
  }, []);
  const fetchCountries = () => {
    fetch("https://covid19.mathdro.id/api/countries")
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.log(err));
  };

  if (!countries) {
    return <Loader />;
  }

  return (
    <>
      <h3 className="title" style={{ marginTop: "2rem" }}>
        Get the Record of Every Country In The World
      </h3>
      <Filter country={country} setCountry={setCountry} />
      {countries ? (
        <CardHolder className="card-container">
          {countries.countries
            .filter(coun =>
              coun.name.toLowerCase().includes(country.toLowerCase())
            )
            .map(country => (
              <CountryCard
                key={country.name}
                className="country-card"
                onClick={() =>
                  handleCardClick(
                    country.name,
                    `https://www.countryflags.io/${country.iso2}/shiny/64.png`
                  )
                }>
                <img
                  src={`https://www.countryflags.io/${country.iso2}/flat/64.png`}
                  alt="OOPS! Flag not found!"
                />
                <h3>{country.name}</h3>
                <ViewMore className="view-more">View Stats</ViewMore>
              </CountryCard>
            ))}
        </CardHolder>
      ) : (
        "No countries found"
      )}
      {name && (
        <Country countryName={name ? name : ""} flag={flag} setName={setName} />
      )}
    </>
  );
};

export default Countries;

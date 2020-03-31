import React from "react";
import styled from "styled-components";

const Infobox = styled.div`
  min-height: 80px;
  padding: 1.5rem 0;

  text-align: center;

  h3 {
    color: #aaa;
    font-size: 22px;
    font-weight: lighter;
  }

  h2 span:nth-child(1) {
    color: teal;
  }

  h2 span:nth-child(2) {
    color: purple;
  }
`;

const Info = () => {
  return (
    <Infobox className="info">
      <h3>Home has always been a safest place!</h3>
      <h2>
        {" "}
        <span>#Stayhome</span> <span>#Staysafe</span>
      </h2>
    </Infobox>
  );
};

export default Info;

import React, { useState,useEffect, useContext } from "react";
import Tabsection1 from "./Tabsection1";
import logo from "../img/hdfclogo.png";
import { amET } from "@mui/material/locale";
import { useNavigate } from "react-router-dom";
import { DarkContext } from "../../scenes/global/DarkBar";

const Mainform = () => {
  const { SetIsDark } = useContext(DarkContext);

 
  return (
    <>
      {/* <h1 style={{display: 'flex', justifyContent: 'center'}}> Assessment Information </h1> */}
      <div style={{ display: "flex" }}>
        <img
          src={logo}
          alt="Logo"
          style={{ marginLeft: "15px", width: "200px", height: "auto" }}
        />
      </div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Assessment Information
      </h1>
      <Tabsection1 />
    </>
  );
};

export default Mainform;

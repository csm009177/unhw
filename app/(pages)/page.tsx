'use client'

import React, { useState, useEffect, createContext } from "react";
import "../globals.css";
import ToggleLeftVar from '../ui/ToggleLeftVar';

export default function Main() {
  createContext()
  return (
    <div className="Main">
      <div className="Main-LeftVar">
      <ToggleLeftVar/>
      </div>
      <div className="Main-RightCont"></div>
    </div>
  );
}



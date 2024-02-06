'use client'

import React, { useState, useEffect } from "react";
import "/app/globals.css";
import LotationMent from '/app/ui/LotationMent';

export default function Home() {
  
  return (
    <div className="Lobby">
      <div className="Lobby-LeftCont"><LotationMent/></div>
      <div className="Lobby-RightCont">right</div>
    </div>
  );
}



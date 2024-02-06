'use client'

import React, { useState, useEffect } from "react";
import "../globals.css";
import LotationMent from '../ui/LotationMent';
import UrlButton from '../ui/UrlButton';

export default function Home() {
  const [url, setUrl] = useState(window.location.pathname); // 현재 URL 경로를 가져옴

  return (
    <div className="Lobby">
      <div className="Lobby-LeftCont"><LotationMent/></div>
      <div className="Lobby-RightCont">
        <UrlButton url="/login" title="login"/>
        <br />
        <UrlButton url="/signin" title="signin"/>

      </div>
    </div>
  );
}



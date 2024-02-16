'use client'

import React, { useState, useEffect } from "react";
import "/app/globals.css";
import UrlButton from '../../ui/UrlButton';
import LotationMent from '../../ui/LotationMent';

export default function Lobby() {
  
  return (
    <div className="Lobby">
      <div className="Lobby-LeftCont">
        <LotationMent/>
      </div>
      <div className="Lobby-RightCont">
        <UrlButton url="/login" title="login"/>
        <br />
        <UrlButton url="/signup" title="signUp"/>
      </div>
    </div>
  );
}



import React, { useState, useEffect } from 'react';

function DateTime() {
  const date = new Date();
  const showTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  return (
    <div className="App">
      <h1 align="center">Current Time</h1>
      <h2 align="center"> {showTime}</h2>
    </div>
  );
}

export default DateTime;

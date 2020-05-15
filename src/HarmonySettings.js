import React, { useState, useEffect } from 'react';
import { updateIntonation } from './MusicLogic.js';

function HarmonySettings(props) {
  const [just, justSet] = useState(true);
  const [et, etSet] = useState(false);

  useEffect(() => {
    console.log(`Just intonation: ${just} ET: ${et}`);
  });
  const changeTemperament = (which) => {
    switch (which) {
      case 'Just Intonation':
        just ? justSet(false) : justSet(true);
        etSet(false);
        updateIntonation('just');
        break;
      default:
        et ? etSet(false) : etSet(true);
        justSet(false);
        updateIntonation('et');
        break;
    }
  };
  return (
    <div>
      <div style={{ display: props.display }}>
        <RadioButton label="Just Intonation" on={just} changer={changeTemperament} />

        <RadioButton label="Equal Temperament" on={et} changer={changeTemperament} />

        <OkButt hide={props.hide} />
      </div>
    </div>
  );
}

const RadioButton = (props) => {
  const handleChange = () => {
    props.changer(props.label);
  };
  const handleClick = () => {
    props.on ? handleChange() : handleChange();
  };
  return (
    <div>
      <input type="radio" onChange={handleChange} onClick={handleClick} checked={props.on}></input>
      <label>{props.label}</label>
    </div>
  );
};

const OkButt = (props) => {
  const clicked = () => {
    props.hide();
  };
  return <button onClick={clicked}>OK</button>;
};

export { HarmonySettings };

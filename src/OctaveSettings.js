import React, { useState, useEffect } from 'react';
import { setOctave } from './MusicLogic';

export const OctaveSettings = (props) => {
  const [exLow, setExLow] = useState(false);
  const [veryLow, setVeryLow] = useState(false);
  const [low, setLow] = useState(false);
  const [medium, setMedium] = useState(true);
  const [high, setHigh] = useState(false);
  const [veryHigh, setVeryHigh] = useState(false);
  const [exHigh, setExHigh] = useState(false);
  const [exLowStyle, setExLowStyle] = useState({
    backgroundColor: 'rgb(0,255,0)'
  });
  const [veryLowStyle, setVeryLowStyle] = useState({
    backgroundColor: 'rgb(0,255,0)'
  });
  const [lowStyle, setLowStyle] = useState({
    backgroundColor: 'rgb(0,255,0)'
  });
  const [mediumStyle, setMediumStyle] = useState({
    backgroundColor: 'rgb(255,0,0)'
  });
  const [highStyle, setHighStyle] = useState({
    backgroundColor: 'rgb(0,255,0)'
  });
  const [veryHighStyle, setVeryHighStyle] = useState({
    backgroundColor: 'rgb(0,255,0)'
  });
  const [exHighStyle, setExHighStyle] = useState({
    backgroundColor: 'rgb(0,255,0)'
  });

  useEffect(() => {
    console.log(exLow + ' ' + veryLow + ' ' + low + ' ' + medium + ' ' + high + ' ' + veryHigh + ' ' + exHigh);
  });
  const changer = (which) => {
    switch (which) {
      case 'Extremely Low':
        setExLow(true);
        setVeryLow(false);
        setLow(false);
        setMedium(false);
        setHigh(false);
        setVeryHigh(false);
        setExHigh(false);
        setExHighStyle({ backgroundColor: 'rgb(0,255,0)' });
        setVeryHighStyle({ backgroundColor: 'rgb(0,255,0)' });
        setHighStyle({ backgroundColor: 'rgb(0,255,0)' });
        setMediumStyle({ backgroundColor: 'rgb(0,255,0)' });
        setLowStyle({ backgroundColor: 'rgb(0,255,0)' });
        setVeryLowStyle({ backgroundColor: 'rgb(0,255,0)' });
        setExLowStyle({ backgroundColor: 'rgb(255,0,0)' });
        setOctave(1 / 64);

        break;
      case 'Very Low':
        setExLow(false);
        setVeryLow(true);
        setLow(false);
        setMedium(false);
        setHigh(false);
        setVeryHigh(false);
        setExHigh(false);
        setExHighStyle({ backgroundColor: 'rgb(0,255,0)' });
        setVeryHighStyle({ backgroundColor: 'rgb(0,255,0)' });
        setHighStyle({ backgroundColor: 'rgb(0,255,0)' });
        setMediumStyle({ backgroundColor: 'rgb(0,255,0)' });
        setLowStyle({ backgroundColor: 'rgb(0,255,0)' });
        setVeryLowStyle({ backgroundColor: 'rgb(255,0,0)' });
        setExLowStyle({ backgroundColor: 'rgb(0,255,0)' });
        setOctave(1 / 16);
        break;
      case 'Low':
        setExLow(false);
        setVeryLow(false);
        setLow(true);
        setMedium(false);
        setHigh(false);
        setVeryHigh(false);
        setExHigh(false);
        setExHighStyle({ backgroundColor: 'rgb(0,255,0)' });
        setVeryHighStyle({ backgroundColor: 'rgb(0,255,0)' });
        setHighStyle({ backgroundColor: 'rgb(0,255,0)' });
        setMediumStyle({ backgroundColor: 'rgb(0,255,0)' });
        setLowStyle({ backgroundColor: 'rgb(255,0,0)' });
        setVeryLowStyle({ backgroundColor: 'rgb(0,255,0)' });
        setExLowStyle({ backgroundColor: 'rgb(0,255,0)' });
        setOctave(1 / 4);

        break;
      case 'Medium':
        setExLow(false);
        setVeryLow(false);
        setLow(false);
        setMedium(true);
        setHigh(false);
        setVeryHigh(false);
        setExHigh(false);
        setExHighStyle({ backgroundColor: 'rgb(0,255,0)' });
        setVeryHighStyle({ backgroundColor: 'rgb(0,255,0)' });
        setHighStyle({ backgroundColor: 'rgb(0,255,0)' });
        setMediumStyle({ backgroundColor: 'rgb(255,0,0)' });
        setLowStyle({ backgroundColor: 'rgb(0,255,0)' });
        setVeryLowStyle({ backgroundColor: 'rgb(0,255,0)' });
        setExLowStyle({ backgroundColor: 'rgb(0,255,0)' });
        setOctave(1);
        break;
      case 'High':
        setExLow(false);
        setVeryLow(false);
        setLow(false);
        setMedium(false);
        setHigh(true);
        setVeryHigh(false);
        setExHigh(false);
        setExHighStyle({ backgroundColor: 'rgb(0,255,0)' });
        setVeryHighStyle({ backgroundColor: 'rgb(0,255,0)' });
        setHighStyle({ backgroundColor: 'rgb(255,0,0)' });
        setMediumStyle({ backgroundColor: 'rgb(0,255,0)' });
        setLowStyle({ backgroundColor: 'rgb(0,255,0)' });
        setVeryLowStyle({ backgroundColor: 'rgb(0,255,0)' });
        setExLowStyle({ backgroundColor: 'rgb(0,255,0)' });
        setOctave(2);
        break;
      case 'Very High':
        setExLow(false);
        setVeryLow(false);
        setLow(false);
        setMedium(false);
        setHigh(false);
        setVeryHigh(true);
        setExHigh(false);
        setExHighStyle({ backgroundColor: 'rgb(0,255,0)' });
        setVeryHighStyle({ backgroundColor: 'rgb(255,0,0)' });
        setHighStyle({ backgroundColor: 'rgb(0,255,0)' });
        setMediumStyle({ backgroundColor: 'rgb(0,255,0)' });
        setLowStyle({ backgroundColor: 'rgb(0,255,0)' });
        setVeryLowStyle({ backgroundColor: 'rgb(0,255,0)' });
        setExLowStyle({ backgroundColor: 'rgb(0,255,0)' });
        setOctave(4);
        break;
      default:
        setExLow(false);
        setVeryLow(false);
        setLow(false);
        setMedium(false);
        setHigh(false);
        setVeryHigh(false);
        setExHigh(true);
        setExHighStyle({ backgroundColor: 'rgb(255,0,0)' });
        setVeryHighStyle({ backgroundColor: 'rgb(0,255,0)' });
        setHighStyle({ backgroundColor: 'rgb(0,255,0)' });
        setMediumStyle({ backgroundColor: 'rgb(0,255,0)' });
        setLowStyle({ backgroundColor: 'rgb(0,255,0)' });
        setVeryLowStyle({ backgroundColor: 'rgb(0,255,0)' });
        setExLowStyle({ backgroundColor: 'rgb(0,255,0)' });
        setOctave(8);
        break;
    }
  };
  return (
    <div style={{ display: props.display }}>
      <SelectorButt buttText={'Extremely Low'} state={exLow} changer={changer} style={exLowStyle} />
      <SelectorButt buttText={'Very Low'} state={veryLow} changer={changer} style={veryLowStyle} />
      <SelectorButt buttText={'Low'} state={low} changer={changer} style={lowStyle} />
      <SelectorButt buttText={'Medium'} state={medium} changer={changer} style={mediumStyle} />
      <SelectorButt buttText={'High'} state={high} changer={changer} style={highStyle} />
      <SelectorButt buttText={'Very High'} state={veryHigh} changer={changer} style={veryHighStyle} />
      <SelectorButt buttText={'Extremely High'} state={exHigh} changer={changer} style={exHighStyle} />
      <br></br>
      <OkButt hide={props.hide} />
    </div>
  );
};

const SelectorButt = (props) => {
  const handleClick = (e) => {
    props.changer(props.buttText);
  };
  return (
    <button style={props.style} onClick={handleClick}>
      {props.buttText}
    </button>
  );
};
const OkButt = (props) => {
  const clicked = () => {
    props.hide();
  };
  return <button onClick={clicked}>OK</button>;
};

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
    backgroundColor: 'rgb(0,255,0)',
    color: 'black'
  });
  const [veryLowStyle, setVeryLowStyle] = useState({
    backgroundColor: 'rgb(0,255,0)',
    color: 'black'
  });
  const [lowStyle, setLowStyle] = useState({
    backgroundColor: 'rgb(0,255,0)',
    color: 'black'
  });
  const [mediumStyle, setMediumStyle] = useState({
    backgroundColor: 'rgb(255,0,0)',
    color: 'black'
  });
  const [highStyle, setHighStyle] = useState({
    backgroundColor: 'rgb(0,255,0)',
    color: 'black'
  });
  const [veryHighStyle, setVeryHighStyle] = useState({
    backgroundColor: 'rgb(0,255,0)',
    color: 'black'
  });
  const [exHighStyle, setExHighStyle] = useState({
    backgroundColor: 'rgb(0,255,0)',
    color: 'black'
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
        setExHighStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setVeryHighStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setHighStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setMediumStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setLowStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setVeryLowStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setExLowStyle({ backgroundColor: 'rgb(255,0,0)', color: 'black' });
        setOctave(1 / 8);

        break;
      case 'Very Low':
        setExLow(false);
        setVeryLow(true);
        setLow(false);
        setMedium(false);
        setHigh(false);
        setVeryHigh(false);
        setExHigh(false);
        setExHighStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setVeryHighStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setHighStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setMediumStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setLowStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setVeryLowStyle({ backgroundColor: 'rgb(255,0,0)', color: 'black' });
        setExLowStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setOctave(1 / 4);
        break;
      case 'Low':
        setExLow(false);
        setVeryLow(false);
        setLow(true);
        setMedium(false);
        setHigh(false);
        setVeryHigh(false);
        setExHigh(false);
        setExHighStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setVeryHighStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setHighStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setMediumStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setLowStyle({ backgroundColor: 'rgb(255,0,0)', color: 'black' });
        setVeryLowStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setExLowStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setOctave(1 / 2);

        break;
      case 'Medium':
        setExLow(false);
        setVeryLow(false);
        setLow(false);
        setMedium(true);
        setHigh(false);
        setVeryHigh(false);
        setExHigh(false);
        setExHighStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setVeryHighStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setHighStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setMediumStyle({ backgroundColor: 'rgb(255,0,0)', color: 'black' });
        setLowStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setVeryLowStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setExLowStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
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
        setExHighStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setVeryHighStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setHighStyle({ backgroundColor: 'rgb(255,0,0)', color: 'black' });
        setMediumStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setLowStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setVeryLowStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setExLowStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
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
        setExHighStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setVeryHighStyle({ backgroundColor: 'rgb(255,0,0)', color: 'black' });
        setHighStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setMediumStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setLowStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setVeryLowStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setExLowStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
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
        setExHighStyle({ backgroundColor: 'rgb(255,0,0)', color: 'black' });
        setVeryHighStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setHighStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setMediumStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setLowStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setVeryLowStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
        setExLowStyle({ backgroundColor: 'rgb(0,255,0)', color: 'black' });
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

import React, { useState, useEffect } from 'react';
import { turnOnMike, updateMikeVolume, turnOffMike, turnNoiseOn, turnNoiseOff } from './MusicLogic';
import { turnSpeakingOn } from './Speaking';

export const Noise = (props) => {
  const [micOn, setMicOn] = useState(false);
  const [micText, setMicText] = useState('🎤Mic On');
  const [noiseText, setNoiseText] = useState('❤😇Noise On');
  const [noiseOn, setNoiseOn] = useState(false);
  const [talkText, setTalkText] = useState('👄');
  const changeMicText = () => {
    !micOn ? setMicText('🙅‍♀️Mic Off') : setMicText('🎤Mic On');
    micOn ? setMicOn(false) : setMicOn(true);
  };
  const changeNoiseText = () => {
    !noiseOn ? setNoiseText('🙉Noise Off🈲') : setNoiseText('❤😇Noise On');
    noiseOn ? setNoiseOn(false) : setNoiseOn(true);
  };
  const changeTalkText = () => {
    if (talkText === '👄') {
      setTalkText('🙊');
    } else {
      setTalkText('👄');
    }
  };

  return (
    <div style={{ display: props.display }}>
      <div style={{ display: 'inline-flex' }}>
        <NoiseButt texty={noiseText} changeNoiseText={changeNoiseText} noiseOn={noiseOn} />
        <TalkButt changeText={changeTalkText} texty={talkText} />
        <MikeButt texty={micText} changeMicText={changeMicText} micOn={micOn} />
        <Fader belongTo={'mic'} texty={'Microphone Volume'} min={-100} max={0} defaultValue={-10} />
      </div>
    </div>
  );
};
const NoiseButt = (props) => {
  const handleClick = () => {
    !props.noiseOn ? turnNoiseOn() : turnNoiseOff();
    props.changeNoiseText();
  };
  return <button onClick={handleClick}>{props.texty}</button>;
};
const MikeButt = (props) => {
  const turnOnMic = () => {
    !props.micOn ? turnOnMike() : turnOffMike();
    props.changeMicText();
  };
  return (
    <div>
      <button onClick={turnOnMic}>{props.texty}</button>
    </div>
  );
};

const TalkButt = (props) => {
  const handleClick = () => {
    turnSpeakingOn();
    props.changeText();
  };
  return (
    <div>
      <button style={{ fontSize: '28px' }} onClick={handleClick}>
        {props.texty}
      </button>
    </div>
  );
};

const Fader = (props) => {
  const onChange = (e) => {
    updateMikeVolume(e.target.value);
  };
  return (
    <div>
      <input min={props.min} max={props.max} defaultValue={props.defaultValue} type="range" onChange={onChange}></input>
      <label>{props.texty}</label>
    </div>
  );
};

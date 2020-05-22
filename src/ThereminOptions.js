import React, { useState, useEffect } from 'react';
import { UpdateThereminData, updateTheremin } from './MusicLogic.js';

export const ThereminOptions = (props) => {
  const [sine, setSine] = useState(true);
  const [square, setSquare] = useState(false);
  const [sawtooth, setSawtooth] = useState(false);
  const [triangle, setTriangle] = useState(false);
  const [sineVolume, setSineVolume] = useState(-10);
  const [squareVolume, setSquareVolume] = useState(-10);
  const [sawtoothVolume, setSawtoothVolume] = useState(-10);
  const [triangleVolume, setTriangleVolume] = useState(-10);
  const [display, setDisplay] = useState('none');
  const [attack, setAttack] = useState(0.7);
  const [sustain, setSustain] = useState(0.3);
  const [decay, setDecay] = useState(0.5);
  const [release, setRelease] = useState(0.7);
  const [sineVolumeText, setSineVolumeText] = useState('-10dB');
  const [squareVolumeText, setSquareVolumeText] = useState('-10dB');
  const [sawtoothVolumeText, setSawtoothVolumeText] = useState('-10dB');
  const [triangleVolumeText, setTriangleVolumeText] = useState('-10dB');
  const [attackText, setAttackText] = useState('.7');
  const [sustainText, setSustainText] = useState('0.7');
  const [decayText, setDecayText] = useState('.1');
  const [releaseText, setReleaseText] = useState('.7');

  useEffect(() => {
    setDisplay(props.display);
    UpdateThereminData({
      sine,
      square,
      sawtooth,
      triangle,
      sineVolume,
      squareVolume,
      sawtoothVolume,
      triangleVolume,
      display,
      attack,
      sustain,
      decay,
      release
    });
    updateTheremin();
  }, [
    props.display,
    sine,
    square,
    sawtooth,
    triangle,
    sineVolume,
    squareVolume,
    sawtoothVolume,
    triangleVolume,
    display,
    attack,
    sustain,
    decay,
    release
  ]);
  const setWave = (name) => {
    switch (name) {
      case 'sine':
        sine ? setSine(false) : setSine(true);
        break;
      case 'square':
        square ? setSquare(false) : setSquare(true);
        break;
      case 'sawtooth':
        sawtooth ? setSawtooth(false) : setSawtooth(true);
        break;
      case 'triangle':
        triangle ? setTriangle(false) : setTriangle(true);
        break;
      default:
        console.log('no such thing');
        break;
    }
  };
  const changeVolume = (name, amount) => {
    switch (name) {
      case 'sine':
        setSineVolume(amount);
        setSineVolumeText(amount + 'dB');
        break;
      case 'square':
        setSquareVolume(amount);
        setSquareVolumeText(amount + 'dB');
        break;
      case 'sawtooth':
        setSawtoothVolume(amount);
        setSawtoothVolumeText(amount + 'dB');
        break;
      case 'triangle':
        setTriangleVolume(amount);
        setTriangleVolumeText(amount + 'dB');
        break;
      case 'attack':
        setAttack(amount * 0.01);
        setAttackText(Number(amount));
        break;
      case 'sustain':
        setSustain(amount * 0.1);
        setSustainText(Number(amount));
        break;
      case 'decay':
        setDecay(amount * 0.01);
        setDecayText(Number(amount));
        break;
      case 'release':
        setRelease(amount * 0.01);
        setReleaseText(Number(amount));
        break;
      default:
        console.log('no such thing');
        break;
    }
  };
  const hide = () => {
    props.hide();
  };
  return (
    <div style={{ display: props.display }}>
      <div
        style={{
          display: 'inline-flex'
        }}
      >
        <div style={{ borderStyle: 'groove', borderColor: 'slategrey' }}>
          <WaveSelector setWave={setWave} name="sine" startChecked={true} texty={'Sine'} />
          <Fader
            changeVolume={changeVolume}
            min={-50}
            max={0}
            defaultValue={-10}
            name="sine"
            volumeText={sineVolumeText}
          />
        </div>
        <div style={{ borderStyle: 'groove', borderColor: 'slategrey' }}>
          <WaveSelector setWave={setWave} name="square" startChecked={false} texty={'Square'} />

          <Fader
            changeVolume={changeVolume}
            min={-50}
            max={0}
            defaultValue={-10}
            name="square"
            volumeText={squareVolumeText}
          />
        </div>
        <div style={{ borderStyle: 'groove', borderColor: 'slategrey' }}>
          <WaveSelector setWave={setWave} name="sawtooth" startChecked={false} texty={'Sawtooth'} />

          <Fader
            changeVolume={changeVolume}
            min={-50}
            max={0}
            defaultValue={-10}
            name="sawtooth"
            volumeText={sawtoothVolumeText}
          />
        </div>
        <div style={{ borderStyle: 'groove', borderColor: 'slategrey' }}>
          <WaveSelector setWave={setWave} name="triangle" startChecked={false} texty={'Triangle'} />

          <Fader
            changeVolume={changeVolume}
            min={-50}
            max={0}
            defaultValue={-10}
            name="triangle"
            volumeText={triangleVolumeText}
          />
        </div>
      </div>
      <div style={{ display: 'inline-flex' }}>
        <div style={{ borderStyle: 'groove', borderColor: 'slategrey' }}>
          <label>Attack</label>
          <Fader
            changeVolume={changeVolume}
            min={0}
            max={100}
            step={5}
            name="attack"
            defaultValue={70}
            volumeText={attackText}
            texty={'Attack'}
          />
        </div>
        <div style={{ borderStyle: 'groove', borderColor: 'slategrey' }}>
          <label>Sustain</label>
          <Fader
            changeVolume={changeVolume}
            min={0}
            max={10}
            step={3}
            name="sustain"
            defaultValue={7}
            volumeText={sustainText}
            texty={'Sustain'}
          />
        </div>
        <div style={{ borderStyle: 'groove', borderColor: 'slategrey' }}>
          <label>Decay</label>
          <Fader
            changeVolume={changeVolume}
            min={0}
            max={100}
            step={1}
            name="decay"
            defaultValue={50}
            volumeText={decayText}
            texty={'Decay'}
          />
        </div>
        <div style={{ borderStyle: 'groove', borderColor: 'slategrey' }}>
          <label>Release</label>
          <Fader
            changeVolume={changeVolume}
            min={1}
            max={100}
            step={1}
            name="release"
            defaultValue={75}
            volumeText={releaseText}
            texty={'Release'}
          />
        </div>
      </div>
      <br></br>

      <OkButt hide={hide} />
    </div>
  );
};

const Fader = (props) => {
  const volumeChange = (e) => {
    let type = props.name;
    let newVolume = e.target.value;
    props.changeVolume(type, newVolume);
  };
  return (
    <div>
      <input
        className="fader"
        type="range"
        min={props.min}
        max={props.max}
        onChange={volumeChange}
        defaultValue={props.defaultValue}
      />
      <br></br>
      <label>{props.volumeText}</label>
    </div>
  );
};

Fader.defaultProps = { default: 0 };

const WaveSelector = (props) => {
  const [checked, setChecked] = useState(props.startChecked);

  const waveChange = () => {
    checked ? setChecked(false) : setChecked(true);
    let value = props.name;
    props.setWave(value);
    if (props.startChecked) {
    }
  };
  return (
    <div>
      <label>{props.texty}</label>
      <input type="checkbox" onChange={waveChange} checked={checked} />
    </div>
  );
};

const OkButt = (props) => {
  const clicked = () => {
    props.hide();
  };
  return <button onClick={clicked}>OK</button>;
};

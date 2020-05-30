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
  const [sustain, setSustain] = useState(0.7);
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
  const [forceSineChecked, setForceSineChecked] = useState(true);
  const [forceSquareChecked, setForceSquareChecked] = useState(false);
  const [forceSawtoothChecked, setForceSawtoothChecked] = useState(false);
  const [forceTriangleChecked, setForceTriangleChecked] = useState(false);
  const [forceChangesOnPresetReceived, setForceChangesOnPresetReceived] = useState(false);

  const revertBackToNoPreset = () => {
    setForceChangesOnPresetReceived(false);
  };
  useEffect(() => {
    setSineVolumeText(sineVolume + 'dB');
    setSquareVolumeText(squareVolume + 'db');
    setSawtoothVolumeText(sawtoothVolume + 'db');
    setTriangleVolumeText(triangleVolume + 'db');
    if (props.needUpdate) {
      console.log(props.updateJason);
      props.updateCompleted('theremin settings');
      setSine(props.updateJason.thereminSettings.sine);
      setSquare(props.updateJason.thereminSettings.square);
      setSawtooth(props.updateJason.thereminSettings.sawtooth);
      setTriangle(props.updateJason.thereminSettings.triangle);
      setSineVolume(props.updateJason.thereminSettings.sineVolume);
      setSquareVolume(props.updateJason.thereminSettings.squareVolume);
      setSawtoothVolume(props.updateJason.thereminSettings.sawtoothVolume);
      setTriangleVolume(props.updateJason.thereminSettings.triangleVolume);
      setAttack(props.updateJason.thereminSettings.attack);
      setDecay(props.updateJason.thereminSettings.decay);
      setRelease(props.updateJason.thereminSettings.release);
      setSustain(props.updateJason.thereminSettings.sustain);
      setForceSineChecked(props.updateJason.thereminSettings.sine);
      setForceSquareChecked(props.updateJason.thereminSettings.square);
      setForceSawtoothChecked(props.updateJason.thereminSettings.sawtooth);
      setForceTriangleChecked(props.updateJason.thereminSettings.triangle);
      setForceChangesOnPresetReceived(true);
    }
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
    props.needUpdate,
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
        setAttack(amount);
        setAttackText(Number(amount));
        break;
      case 'sustain':
        setSustain(amount);
        setSustainText(Number(amount));
        break;
      case 'decay':
        setDecay(amount);
        setDecayText(Number(amount));
        break;
      case 'release':
        setRelease(amount);
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
  const handleWaveSelectorChange = (name) => {
    switch (name) {
      case 'sine':
        forceSineChecked ? setForceSineChecked(false) : setForceSineChecked(true);
        break;
      case 'square':
        forceSquareChecked ? setForceSquareChecked(false) : setForceSquareChecked(true);
        break;
      case 'sawtooth':
        forceSawtoothChecked ? setForceSawtoothChecked(false) : setForceSawtoothChecked(true);
        break;
      case 'triangle':
        forceTriangleChecked ? setForceTriangleChecked(false) : setForceTriangleChecked(true);
        break;
    }
  };
  return (
    <div style={{ display: props.display }}>
      <div
        style={{
          display: 'inline-flex'
        }}
      >
        <div style={{ borderStyle: 'groove', borderColor: 'slategrey' }}>
          <div>
            <WaveSelector
              setWave={setWave}
              name="sine"
              checked={forceSineChecked}
              texty={'Sine'}
              handleWaveSelectorChange={handleWaveSelectorChange}
            />
            {!forceChangesOnPresetReceived ? (
              <Fader
                changeVolume={changeVolume}
                min={-60}
                max={0}
                defaultValue={sineVolume}
                name="sine"
                volumeText={sineVolumeText}
              />
            ) : (
              <ControlledFader
                changeVolume={changeVolume}
                min={-60}
                max={0}
                name="sine"
                value={sineVolume}
                volumeText={sineVolumeText}
                revertBackToNoPreset={revertBackToNoPreset}
              />
            )}
          </div>
        </div>
        <div style={{ borderStyle: 'groove', borderColor: 'slategrey' }}>
          <div>
            <WaveSelector
              setWave={setWave}
              name="square"
              checked={forceSquareChecked}
              texty={'Square'}
              handleWaveSelectorChange={handleWaveSelectorChange}
            />
            {!forceChangesOnPresetReceived ? (
              <Fader
                changeVolume={changeVolume}
                min={-60}
                max={0}
                defaultValue={squareVolume}
                name="square"
                volumeText={squareVolumeText}
              />
            ) : (
              <ControlledFader
                changeVolume={changeVolume}
                min={-60}
                max={0}
                name="square"
                value={squareVolume}
                volumeText={squareVolumeText}
                revertBackToNoPreset={revertBackToNoPreset}
              />
            )}
          </div>
        </div>
        <div style={{ borderStyle: 'groove', borderColor: 'slategrey' }}>
          <div>
            <WaveSelector
              setWave={setWave}
              name="sawtooth"
              checked={forceSawtoothChecked}
              texty={'Sawtooth'}
              handleWaveSelectorChange={handleWaveSelectorChange}
            />
            {!forceChangesOnPresetReceived ? (
              <Fader
                changeVolume={changeVolume}
                min={-60}
                max={0}
                defaultValue={sawtoothVolume}
                name="sawtooth"
                volumeText={sawtoothVolumeText}
              />
            ) : (
              <ControlledFader
                changeVolume={changeVolume}
                min={-60}
                max={0}
                name="sawtooth"
                value={sawtoothVolume}
                volumeText={sawtoothVolumeText}
                revertBackToNoPreset={revertBackToNoPreset}
              />
            )}
          </div>
        </div>
        <div style={{ borderStyle: 'groove', borderColor: 'slategrey' }}>
          <div>
            <WaveSelector
              setWave={setWave}
              name="triangle"
              checked={forceTriangleChecked}
              texty={'Triangle'}
              handleWaveSelectorChange={handleWaveSelectorChange}
            />
            {!forceChangesOnPresetReceived ? (
              <Fader
                changeVolume={changeVolume}
                min={-60}
                max={0}
                defaultValue={triangleVolume}
                name="triangle"
                volumeText={triangleVolumeText}
              />
            ) : (
              <ControlledFader
                changeVolume={changeVolume}
                min={-60}
                max={0}
                value={triangleVolume}
                revertBackToNoPreset={revertBackToNoPreset}
                name="triangle"
                volumeText={triangleVolumeText}
              />
            )}
          </div>
        </div>
      </div>
      <div style={{ display: 'inline-flex' }}>
        <div style={{ borderStyle: 'groove', borderColor: 'slategrey' }}>
          {!forceChangesOnPresetReceived ? (
            <div>
              <label>Attack</label>
              <Fader
                changeVolume={changeVolume}
                min={0}
                max={1}
                step={0.01}
                name="attack"
                defaultValue={attack}
                volumeText={attack}
                texty={'Attack'}
              />
            </div>
          ) : (
            <div>
              <label>Attack</label>
              <ControlledFader
                changeVolume={changeVolume}
                min={0}
                max={1}
                step={0.01}
                name="attack"
                value={attack}
                volumeText={attack}
                revertBackToNoPreset={revertBackToNoPreset}
                texty={'Attack'}
              />
            </div>
          )}
        </div>
        <div style={{ borderStyle: 'groove', borderColor: 'slategrey' }}>
          {!forceChangesOnPresetReceived ? (
            <div>
              <label>Sustain</label>
              <Fader
                changeVolume={changeVolume}
                min={0}
                max={1}
                step={0.01}
                name="sustain"
                defaultValue={sustain}
                volumeText={sustain}
                texty={'Sustain'}
              />
            </div>
          ) : (
            <div>
              <label>Sustain</label>
              <ControlledFader
                changeVolume={changeVolume}
                min={0}
                max={1}
                step={0.01}
                name="sustain"
                value={sustain}
                volumeText={sustain}
                texty={'Sustain'}
                revertBackToNoPreset={revertBackToNoPreset}
              />
            </div>
          )}
        </div>
        <div style={{ borderStyle: 'groove', borderColor: 'slategrey' }}>
          {!forceChangesOnPresetReceived ? (
            <div>
              <label>Decay</label>
              <Fader
                changeVolume={changeVolume}
                min={0}
                max={1}
                step={0.01}
                name="decay"
                defaultValue={decay}
                volumeText={decay}
                texty={'Decay'}
              />
            </div>
          ) : (
            <div>
              <label>Decay</label>
              <ControlledFader
                changeVolume={changeVolume}
                min={0}
                max={1}
                step={0.01}
                name="decay"
                value={decay}
                volumeText={decay}
                texty={'Decay'}
                revertBackToNoPreset={revertBackToNoPreset}
              />
            </div>
          )}
        </div>
        <div style={{ borderStyle: 'groove', borderColor: 'slategrey' }}>
          {!forceChangesOnPresetReceived ? (
            <div>
              <label>Release</label>
              <Fader
                changeVolume={changeVolume}
                min={0.01}
                max={1}
                step={0.01}
                name="release"
                defaultValue={release}
                volumeText={release}
                texty={'Release'}
              />
            </div>
          ) : (
            <div>
              <label>Release</label>
              <ControlledFader
                changeVolume={changeVolume}
                min={0.01}
                max={1}
                step={0.01}
                name="release"
                value={release}
                volumeText={release}
                texty={'Release'}
                revertBackToNoPreset={revertBackToNoPreset}
              />
            </div>
          )}
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
        step={props.step}
      />
      <br></br>
      <label>{props.volumeText}</label>
    </div>
  );
};

Fader.defaultProps = { default: 0 };

const ControlledFader = (props) => {
  const volumeChange = (e) => {
    let type = props.name;
    let newVolume = e.target.value;
    props.changeVolume(type, newVolume);
    props.revertBackToNoPreset();
  };
  return (
    <div>
      <input
        className="fader"
        type="range"
        min={props.min}
        max={props.max}
        onChange={volumeChange}
        value={props.value}
        step={props.step}
      />
      <br></br>
      <label>{props.volumeText}</label>
    </div>
  );
};

const WaveSelector = (props) => {
  const waveChange = () => {
    let value = props.name;
    props.handleWaveSelectorChange(value);
    props.setWave(value);
    if (props.forceChecked) {
    }
  };
  return (
    <div>
      <label>{props.texty}</label>
      <input type="checkbox" onClick={waveChange} checked={props.checked} />
    </div>
  );
};

const OkButt = (props) => {
  const clicked = () => {
    props.hide();
  };
  return <button onClick={clicked}>OK</button>;
};

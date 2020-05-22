import React, { useState } from 'react';
import { ThereminOptions } from './ThereminOptions';
import { DroneSettings } from './droneSettings';
import { HarmonySettings } from './HarmonySettings';
import { OctaveSettings } from './OctaveSettings';
import { Noise } from './Noise';
import { makePedalTone, addInfinity, toolbarSizeChanged, startApp } from './MusicLogic';
import { changeLatency, changeMaster, stopDrone } from './droneInstruments';
import { ThereminEffects } from './ThereminEffects';
import { DroneEffects } from './DroneEffects';
import * as Tone from 'tone';

export class ToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolbarHeight: 0,
      toolbarWidth: 0,
      advancedDisplay: 'none',
      thereminSettingsDisplay: 'none',
      droneSettingsDisplay: 'none',
      droneEffectsDisplay: 'none',
      harmonySettingsDisplay: 'none',
      effectsSettingsDisplay: 'none',
      noiseSettingsDisplay: 'none',
      octavesSettingsDisplay: 'none',
      masterSettingsDisplay: 'none',
      musicStarted: false,
      pedalAdded: false,
      pedalText: 'Add P.Tone',
      infinityText: '∞ On',
      startedStyle: 'none',
      buttonDisplay: ''
    };
    this.openSettings = this.openSettings.bind(this);
    this.hideThereminSettings = this.hideThereminSettings.bind(this);
    this.hideThereminEffects = this.hideThereminEffects.bind(this);
    this.hideDroneSettings = this.hideDroneSettings.bind(this);
    this.hideDroneEffectsSettings = this.hideDroneEffectsSettings.bind(this);
    this.hideHarmonySettings = this.hideHarmonySettings.bind(this);
    this.hideOctaveSettings = this.hideOctaveSettings.bind(this);
    this.hideNoiseSettings = this.hideNoiseSettings.bind(this);
    this.hideMasterSettings = this.hideMasterSettings.bind(this);
    this.startMusic = this.startMusic.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.startButtText = 'LOAD AUDIO AND START';

    this.myDiv = React.createRef();
  }

  componentDidUpdate() {
    toolbarSizeChanged(this.myDiv.current.offsetHeight);
    window.removeEventListener('resize', this.handleResize);
  }

  openSettings(whatToOpen) {
    switch (whatToOpen) {
      case 'advanced':
        if (this.state.advancedDisplay === 'none') {
          this.setState({
            advancedDisplay: 'inline-flex',
            thereminSettingsDisplay: 'none',
            droneSettingsDisplay: 'none',
            harmonySettingsDisplay: 'none',
            effectsSettingsDisplay: 'none',
            noiseSettingsDisplay: 'none',
            octavesSettingsDisplay: 'none',
            droneEffectsDisplay: 'none',
            masterSettingsDisplay: 'none'
          });
        } else {
          this.setState({
            advancedDisplay: 'none',
            thereminSettingsDisplay: 'none',
            droneSettingsDisplay: 'none',
            harmonySettingsDisplay: 'none',
            effectsSettingsDisplay: 'none',
            noiseSettingsDisplay: 'none',
            octavesSettingsDisplay: 'none',
            droneEffectsDisplay: 'none',
            masterSettingsDisplay: 'none'
          });
        }

        break;
      case 'theremin':
        this.setState({
          thereminSettingsDisplay: '',
          droneSettingsDisplay: 'none',
          harmonySettingsDisplay: 'none',
          effectsSettingsDisplay: 'none',
          noiseSettingsDisplay: 'none',
          octavesSettingsDisplay: 'none',
          droneEffectsDisplay: 'none',
          advancedDisplay: 'none',
          masterSettingsDisplay: 'none'
        });
        break;
      case 'drone':
        this.setState({
          droneSettingsDisplay: '',
          droneEffectsDisplay: 'none',
          thereminSettingsDisplay: 'none',
          harmonySettingsDisplay: 'none',
          effectsSettingsDisplay: 'none',
          noiseSettingsDisplay: 'none',
          octavesSettingsDisplay: 'none',
          advancedDisplay: 'none',
          masterSettingsDisplay: 'none'
        });
        break;
      case 'master':
        this.setState({
          droneSettingsDisplay: 'none',
          droneEffectsDisplay: 'none',
          thereminSettingsDisplay: 'none',
          harmonySettingsDisplay: 'none',
          effectsSettingsDisplay: 'none',
          noiseSettingsDisplay: 'none',
          octavesSettingsDisplay: 'none',
          advancedDisplay: 'none',
          masterSettingsDisplay: ''
        });
        break;
      case 'harmony':
        this.setState({
          harmonySettingsDisplay: '',
          thereminSettingsDisplay: 'none',
          droneSettingsDisplay: 'none',
          effectsSettingsDisplay: 'none',
          noiseSettingsDisplay: 'none',
          octavesSettingsDisplay: 'none',
          droneEffectsDisplay: 'none',
          advancedDisplay: 'none',
          masterSettingsDisplay: 'none'
        });
        break;
      case 'effects':
        this.setState({
          effectsSettingsDisplay: '',
          thereminSettingsDisplay: 'none',
          droneSettingsDisplay: 'none',
          harmonySettingsDisplay: 'none',
          noiseSettingsDisplay: 'none',
          octavesSettingsDisplay: 'none',
          droneEffectsDisplay: 'none',
          advancedDisplay: 'none',
          masterSettingsDisplay: 'none'
        });
        break;
      case 'noise':
        if (this.state.noiseSettingsDisplay === 'none') {
          this.setState({
            effectsSettingsDisplay: 'none',
            thereminSettingsDisplay: 'none',
            droneSettingsDisplay: 'none',
            harmonySettingsDisplay: 'none',
            noiseSettingsDisplay: '',
            octavesSettingsDisplay: 'none',
            droneEffectsDisplay: 'none',
            advancedDisplay: 'none',
            masterSettingsDisplay: 'none'
          });
        } else {
          this.setState({
            effectsSettingsDisplay: 'none',
            thereminSettingsDisplay: 'none',
            droneSettingsDisplay: 'none',
            harmonySettingsDisplay: 'none',
            noiseSettingsDisplay: 'none',
            octavesSettingsDisplay: 'none',
            droneEffectsDisplay: 'none',
            advancedDisplay: 'none',
            masterSettingsDisplay: 'none'
          });
        }

        break;
      case 'octave':
        if (this.state.octavesSettingsDisplay === 'none') {
          this.setState({
            effectsSettingsDisplay: 'none',
            thereminSettingsDisplay: 'none',
            droneSettingsDisplay: 'none',
            harmonySettingsDisplay: 'none',
            noiseSettingsDisplay: 'none',
            octavesSettingsDisplay: '',
            droneEffectsDisplay: 'none',
            advancedDisplay: 'none',
            masterSettingsDisplay: 'none'
          });
        } else {
          this.setState({
            effectsSettingsDisplay: 'none',
            thereminSettingsDisplay: 'none',
            droneSettingsDisplay: 'none',
            harmonySettingsDisplay: 'none',
            noiseSettingsDisplay: 'none',
            octavesSettingsDisplay: 'none',
            droneEffectsDisplay: 'none',
            advancedDisplay: 'none',
            masterSettingsDisplay: 'none'
          });
        }
        break;
      case 'droneEffects':
        this.setState({
          effectsSettingsDisplay: 'none',
          thereminSettingsDisplay: 'none',
          droneSettingsDisplay: 'none',
          harmonySettingsDisplay: 'none',
          noiseSettingsDisplay: 'none',
          octavesSettingsDisplay: 'none',
          droneEffectsDisplay: '',
          advancedDisplay: 'none',
          masterSettingsDisplay: 'none'
        });
        break;
      case 'infinity':
        addInfinity();
        if (this.state.infinityText === '∞ On') {
          this.setState({ infinityText: '∞ Off' });
        }
        if (this.state.infinityText === '∞ Off') {
          this.setState({ infinityText: '∞ On' });
        }
        break;
      case 'pedal':
        makePedalTone();
        if (this.state.pedalText === 'Add P.Tone') {
          this.setState({ pedalText: 'No P.Tone' });
        }
        if (this.state.pedalText === 'No P.Tone') {
          this.setState({ pedalText: 'Add P.Tone' });
        }

        this.state.pedalAdded ? this.setState({ pedalAdded: false }) : this.setState({ pedalAdded: true });
        break;
      default:
        console.log('IDIOT');
        break;
    }
  }
  hideThereminSettings() {
    this.setState({ thereminSettingsDisplay: 'none' });
  }
  hideThereminEffects() {
    this.setState({ effectsSettingsDisplay: 'none' });
  }
  hideNoiseSettings() {
    this.setState({ noiseSettingsDisplay: 'none' });
  }
  hideDroneSettings() {
    console.log('I love beans');
    this.setState({ droneSettingsDisplay: 'none' });
  }
  hideDroneEffectsSettings() {
    this.setState({ droneEffectsDisplay: 'none' });
  }
  hideHarmonySettings() {
    this.setState({ harmonySettingsDisplay: 'none' });
  }
  hideOctaveSettings() {
    this.setState({ octavesSettingsDisplay: 'none' });
  }
  hideMasterSettings() {
    this.setState({ masterSettingsDisplay: 'none' });
  }
  startMusic() {
    startApp();
    this.setState({ startedStyle: '' });
    this.setState({ buttonDisplay: 'none' });
    if (this.state.musicStarted) {
      this.startButtText = 'START';
      this.setState({ musicStarted: false });
    } else {
      this.startButtText = 'STOP';
      this.setState({ musicStarted: true });
    }
  }
  handleResize() {
    this.setState({ toolbarHeight: window.innerheight });
    this.setState({ toolbarWidth: window.innerWidth });
    console.log('resized to: ', window.innerWidth, 'x', window.innerHeight);
  }
  render() {
    window.addEventListener('resize', this.handleResize);
    return (
      <div style={{ touchAction: 'none' }} className="Tool-Bar" ref={this.myDiv}>
        <div style={{ display: this.state.startedStyle }}>
          <div style={{ display: 'flex', position: 'fixed', top: '10px', margin: '0', padding: '0' }}>
            <ToolbarButt name="Advanced" which="advanced" openSettings={this.openSettings} />
            <div style={{ display: this.state.advancedDisplay, flexDirection: 'column', margin: '0', padding: '0' }}>
              <ToolbarButt name="Theremin Settings" which="theremin" openSettings={this.openSettings} />
              <ToolbarButt name="Theremin Effects" which="effects" openSettings={this.openSettings} />
              <ToolbarButt name="Drone Settings" which="drone" openSettings={this.openSettings} />
              <ToolbarButt name="Drone Effects" which="droneEffects" openSettings={this.openSettings} />
              <ToolbarButt name="Intonation" which="harmony" openSettings={this.openSettings} />
              <ToolbarButt name="Master" which="master" openSettings={this.openSettings} />
            </div>
          </div>
          <span role="img" aria-label="pretty">
            🌈🌻
          </span>
          <br></br>
          <div style={{ display: 'inline-flex' }}>
            <ToolbarButt name="Octave" which="octave" openSettings={this.openSettings} />
            <StopChords />
            <ToolbarButt name={this.state.pedalText} which="pedal" openSettings={this.openSettings} />
            <ToolbarButt name={this.state.infinityText} which="infinity" openSettings={this.openSettings} />
            <ToolbarButt name="NOISE" which="noise" openSettings={this.openSettings} />
          </div>
          <ThereminOptions display={this.state.thereminSettingsDisplay} hide={this.hideThereminSettings} />
          <ThereminEffects display={this.state.effectsSettingsDisplay} hide={this.hideThereminEffects} />
          <MasterSettings display={this.state.masterSettingsDisplay} hide={this.hideMasterSettings} />
          <DroneEffects display={this.state.droneEffectsDisplay} hide={this.hideDroneEffectsSettings} />
          <HarmonySettings display={this.state.harmonySettingsDisplay} hide={this.hideHarmonySettings} />
          <Noise display={this.state.noiseSettingsDisplay} hide={this.hideNoiseSettings} />
          <OctaveSettings display={this.state.octavesSettingsDisplay} hide={this.hideOctaveSettings} />

          <DroneSettings display={this.state.droneSettingsDisplay} hide={this.hideDroneSettings} />
        </div>
        <StartStopButt
          style={{
            backgroundColor: 'black',
            fontSize: '22px',
            color: 'snow',
            width: '40vw',
            height: '16vh',
            position: 'fixed',
            top: '50vh',
            left: '50vw',
            marginLeft: '-20vw',
            marginTop: '-8vh',

            display: this.state.buttonDisplay
          }}
          name="Load Audio and START"
          start={this.startMusic}
          txt={this.startButtText}
        />
      </div>
    );
  }
}

function ToolbarButt(props) {
  function handleClick() {
    props.openSettings(props.which);
  }
  return <button onClick={handleClick}>{props.name}</button>;
}

function StartStopButt(props) {
  function handleClick() {
    props.start();
    Tone.context.resume();
    /*
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === 'granted') {
            console.log('PERMISION""!E#!!!!');
            window.addEventListener('devicemotion', () => {});
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener('devicemotion', (e) => {
        console.log(e);
      });
    }
    */
  }

  return (
    <button style={props.style} onClick={handleClick}>
      {props.txt}
    </button>
  );
}

const MasterSettings = (props) => {
  const handleChange = (value, which) => {
    if (which === 'masterVol') {
      changeMaster(value);
    }
  };
  return (
    <div style={{ display: props.display }}>
      <div style={{ display: 'inline-flex' }}>
        <div style={{ borderStyle: 'groove', borderColor: 'slategrey' }}>
          <MasterVolume
            texty="Master Volume 🚨"
            which="masterVol"
            myMin="-50"
            myMax="-1"
            myStep="1"
            handleChange={handleChange}
            myDefault="-10"
          />
        </div>
        <div style={{ borderStyle: 'groove', borderColor: 'slategrey' }}>
          <Latency />
        </div>
      </div>
    </div>
  );
};

const MasterVolume = (props) => {
  const handleChange = (e) => {
    let value = e.target.value;
    let which = props.which;
    props.handleChange(value, which);
  };
  return (
    <div>
      <label>{props.texty}:</label>
      <br></br>
      <input
        className="fader"
        which={props.which}
        type="range"
        min={props.myMin}
        max={props.myMax}
        step={props.myStep}
        onChange={handleChange}
        defaultValue={props.myDefault}
      />
    </div>
  );
};

const Latency = (props) => {
  const onChange = (e) => {
    if (e.target.value === 'fast') {
      alert(
        '💀🚨👻 Warning:　Changing latency to "fast" can cause performance issues (including clipping) on slower devices.'
      );
      changeLatency('fast');
    } else {
      changeLatency('balanced');
    }
  };
  return (
    <div>
      <form>
        <div>Latency:</div>
        <input id="fast" name="latency" type="radio" value="fast" onChange={onChange} defaultChecked></input>
        <label htmlFor="fast">Fast 🚨💀</label>
        <input id="balanced" name="latency" type="radio" value="balanced" onChange={onChange}></input>
        <label htmlFor="balanced">Balanced 😇</label>
      </form>
    </div>
  );
};

const StopChords = (props) => {
  const stop = () => {
    stopDrone('Drone 1');
    stopDrone('Drone 2');
    stopDrone('Drone 3');
  };
  return <button onClick={stop}>⏹Chords</button>;
};

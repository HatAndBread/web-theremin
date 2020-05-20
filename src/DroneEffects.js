import React, { useState } from 'react';

import { UpdateDroneEffects, addEffect, removeEffect } from './droneInstruments.js';

let distortionLevel = 0;
let pitchShifterLevel = 0;
let delayLevel1 = 0;
let delayLevel2 = 0;
let crusherLevel = 8;

export const DroneEffects = (props) => {
  const [distortionDisplay, setDistortionDisplay] = useState({
    display: 'none'
  });
  const [delayDisplay, setDelayDisplay] = useState({
    display: 'none'
  });
  const [pitchShifterDisplay, setPitchShifterDisplay] = useState({
    display: 'none'
  });
  const [crusherDisplay, setCrusherDisplay] = useState({
    display: 'none'
  });

  const onChange = (which) => {
    if (which === 'Distortion') {
      if (distortionDisplay.display === 'none') {
        setDistortionDisplay({ display: 'block' });
        addEffect(which, distortionLevel);
      } else {
        setDistortionDisplay({ display: 'none' });
        removeEffect(which);
      }
    }
    if (which === 'Crusher') {
      if (crusherDisplay.display === 'none') {
        setCrusherDisplay({ display: 'block' });
        addEffect(which, crusherLevel);
      } else {
        setCrusherDisplay({ display: 'none' });
        removeEffect(which);
      }
    }
    if (which === 'Delay') {
      if (delayDisplay.display === 'none') {
        setDelayDisplay({ display: 'block' });
        addEffect(which, delayLevel1, delayLevel2);
      } else {
        setDelayDisplay({ display: 'none' });
        removeEffect(which);
      }
    }
    if (which === 'PitchShifter') {
      if (pitchShifterDisplay.display === 'none') {
        setPitchShifterDisplay({ display: 'block' });
        addEffect(which, pitchShifterLevel);
      } else {
        setPitchShifterDisplay({ display: 'none' });
        removeEffect(which);
      }
    }
  };

  return (
    <div style={{ display: props.display }}>
      <div style={{ display: 'inline-flex', borderStyle: 'groove' }}>
        <Fader
          name="Wetness"
          min={1}
          max={100}
          label={'Effects wetness'}
          onChange={onChange}
          step={1}
          defaultValue={70}
        />
      </div>
      <br></br>
      <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch' }}>
        <div style={{ borderStyle: 'groove' }}>
          <EffectSelector name="Distortion" onChange={onChange} />
          <div style={distortionDisplay}>
            <DistortionControls name="Distortion"></DistortionControls>
          </div>
        </div>
        <div style={{ borderStyle: 'groove' }}>
          <EffectSelector name="Crusher" onChange={onChange} />
          <div style={crusherDisplay}>
            <CrusherControls name="Crusher"></CrusherControls>
          </div>
        </div>
        <div style={{ borderStyle: 'groove' }}>
          <EffectSelector name="Delay" onChange={onChange} />
          <div style={delayDisplay}>
            <DelayControls name="Delay"></DelayControls>
          </div>
        </div>
        <div style={{ borderStyle: 'groove' }}>
          <EffectSelector name="PitchShifter" onChange={onChange} />
          <div style={pitchShifterDisplay}>
            <PitchShifterControls name="PitchShifter"></PitchShifterControls>
          </div>
        </div>
      </div>
      <OkButt hide={props.hide} />
    </div>
  );
};

const EffectSelector = (props) => {
  const onChange = () => {
    props.onChange(props.name);
  };
  return (
    <div>
      <input type="checkbox" onChange={onChange}></input>
      <label>{props.name}</label>
    </div>
  );
};

const DistortionControls = (props) => {
  const onChange = (newValue) => {};
  return (
    <div>
      <Fader name="distortion" min={0} max={11} label={''} onChange={onChange} step={0.2} defaultValue={0} />
    </div>
  );
};

const CrusherControls = (props) => {
  const onChange = (newValue) => {};
  return (
    <div>
      <Fader name="Crusher" min={0} max={8} label={''} onChange={onChange} step={1} defaultValue={8} />
    </div>
  );
};

const PitchShifterControls = (props) => {
  const onChange = () => {};
  return (
    <div>
      <Fader name="PitchShifter" min={-24} max={24} label={''} onChange={onChange} step={1} defaultValue={0} />
    </div>
  );
};

const DelayControls = (props) => {
  const onChange = () => {};
  return (
    <div>
      <Fader name="DelayTime" min={0} max={100} label={'Time'} onChange={onChange} step={1} defaultValue={0} />
      <Fader name="DelayFeedback" min={0} max={100} label={'Fdback'} onChange={onChange} step={1} defaultValue={0} />
    </div>
  );
};

const Fader = (props) => {
  const onChange = (e) => {
    let newValue = e.target.value;
    props.onChange(newValue);
    if (props.name === 'distortion') {
      UpdateDroneEffects(props.name, Math.round((newValue * 0.1 + Number.EPSILON) * 100) / 100);
      distortionLevel = newValue;
    }
    if (props.name === 'Crusher') {
      UpdateDroneEffects(props.name, newValue);
      crusherLevel = newValue;
    }
    if (props.name === 'PitchShifter') {
      UpdateDroneEffects(props.name, newValue);
      pitchShifterLevel = newValue;
    }
    if (props.name === 'DelayTime') {
      UpdateDroneEffects(props.name, Math.round((newValue * 0.01 + Number.EPSILON) * 100) / 100);
      delayLevel1 = newValue;
    }
    if (props.name === 'DelayFeedback') {
      UpdateDroneEffects(props.name, Math.round((newValue * 0.01 + Number.EPSILON) * 100) / 100);
      delayLevel2 = newValue;
    }
    if (props.name === 'Wetness') {
      UpdateDroneEffects(props.name, Math.round((newValue * 0.01 + Number.EPSILON) * 100) / 100);
    }

    props.onChange(props.name);
  };
  return (
    <div>
      <input
        className="fader"
        type="range"
        max={props.max}
        min={props.min}
        onChange={onChange}
        defaultValue={props.defaultValue}
        step={props.step}
      ></input>
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

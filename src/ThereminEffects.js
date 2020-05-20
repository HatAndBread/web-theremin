import React, { useState, useEffect } from 'react';
import { UpdateThereminData, updateTheremin, addEffect, removeEffect } from './MusicLogic.js';
import { changeTrailOff } from './MusicLogic';

let distortionLevel = 0;
let pitchShifterLevel = 0;
let delayLevel1 = 0;
let delayLevel2 = 0;
let pulverizerLevel = 0;
let crusherLevel = 8;
let vibratoLevel1 = 0;
let vibratoLevel2 = 0;

export const ThereminEffects = (props) => {
  const [distortionDisplay, setDistortionDisplay] = useState({
    display: 'none'
  });
  const [delayDisplay, setDelayDisplay] = useState({
    display: 'none'
  });
  const [pitchShifterDisplay, setPitchShifterDisplay] = useState({
    display: 'none'
  });
  const [vibratoDisplay, setVibratoDisplay] = useState({
    display: 'block'
  });
  const [pulverizerDisplay, setPulverizerDisplay] = useState({
    display: 'none'
  });
  const [crusherDisplay, setCrusherDisplay] = useState({
    display: 'none'
  });
  const onChange = (which) => {
    console.log(which + ' somethig changed');
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
    if (which === 'Vibrato') {
      if (vibratoDisplay.display === 'none') {
        setVibratoDisplay({ display: 'block' });
        addEffect(which, vibratoLevel1, vibratoLevel2);
      } else {
        setVibratoDisplay({ display: 'none' });
        removeEffect(which);
      }
    }
    if (which === 'Pulverizer') {
      if (pulverizerDisplay.display === 'none') {
        setPulverizerDisplay({ display: 'block' });
        addEffect(which, pulverizerLevel);
      } else {
        setPulverizerDisplay({ display: 'none' });
        removeEffect(which);
      }
    }
  };
  useEffect(() => {
    updateTheremin();
  });
  return (
    <div style={{ display: props.display }}>
      <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ borderStyle: 'groove', textAlign: 'left' }}>
          <Fader name="Wetness" min={1} max={100} label={'Wet:'} onChange={onChange} step={1} defaultValue={100} />
        </div>
        <div style={{ borderStyle: 'groove', textAlign: 'left' }}>
          <Trail />
        </div>
      </div>
      <div
        style={{
          display: 'inline-flex',
          width: '100vw',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <div style={{ borderStyle: 'groove', textAlign: 'left' }}>
          <EffectSelector defaultChecked={true} name="Vibrato" onChange={onChange} />
          <div style={vibratoDisplay}>
            <VibratoControls name="Vibrato"></VibratoControls>
          </div>
        </div>
        <div style={{ borderStyle: 'groove', textAlign: 'left' }}>
          <EffectSelector defaultChecked={false} name="Pulverizer" onChange={onChange} />
          <div style={pulverizerDisplay}>
            <PulverizerControls name="Pulverizer" />
          </div>
        </div>
        <div style={{ borderStyle: 'groove', textAlign: 'left' }}>
          <EffectSelector defaultChecked={false} name="Distortion" onChange={onChange} />
          <div style={distortionDisplay}>
            <DistortionControls name="Distortion"></DistortionControls>
          </div>
        </div>
        <div style={{ borderStyle: 'groove', textAlign: 'left' }}>
          <EffectSelector defaultChecked={false} name="Crusher" onChange={onChange} />
          <div style={crusherDisplay}>
            <CrusherControls name="Crusher"></CrusherControls>
          </div>
        </div>
        <div style={{ borderStyle: 'groove', textAlign: 'left' }}>
          <EffectSelector defaultChecked={false} name="Delay" onChange={onChange} />

          <div style={delayDisplay}>
            <DelayControls name="Delay"></DelayControls>
          </div>
        </div>
        <div style={{ borderStyle: 'groove', textAlign: 'left' }}>
          <EffectSelector defaultChecked={false} name="PitchShifter" onChange={onChange} />
          <div style={pitchShifterDisplay}>
            <PitchShifterControls name="PitchShifter"></PitchShifterControls>
          </div>
        </div>

        <div />
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
      <input type="checkbox" onChange={onChange} defaultChecked={props.defaultChecked}></input>
      <label>{props.name}</label>
    </div>
  );
};

const VibratoControls = (props) => {
  const onChange = (newValue) => {
    updateTheremin();
  };
  return (
    <div>
      <Fader name="VibratoRange" min={0} max={100} label={'Depth'} onChange={onChange} step={1} defaultValue={9} />
      <Fader name="VibratoSpeed" min={0} max={20} label={'Freq.'} onChange={onChange} step={1} defaultValue={6} />
    </div>
  );
};

const PulverizerControls = (props) => {
  const onChange = (newValue) => {
    updateTheremin();
  };
  return (
    <div>
      <Fader name="Pulverizer" min={0} max={100} label={''} onChange={onChange} step={1} defaultValue={0} />
    </div>
  );
};

const DistortionControls = (props) => {
  const onChange = (newValue) => {
    updateTheremin();
  };
  return (
    <div>
      <Fader name="distortion" min={0} max={11} label={''} onChange={onChange} step={0.2} defaultValue={0} />
    </div>
  );
};

const CrusherControls = (props) => {
  const onChange = (newValue) => {
    updateTheremin();
  };
  return (
    <div>
      <Fader name="Crusher" min={0} max={8} label={''} onChange={onChange} step={1} defaultValue={8} />
    </div>
  );
};

const PitchShifterControls = (props) => {
  const onChange = () => {
    updateTheremin();
  };
  return (
    <div>
      <Fader name="PitchShifter" min={-24} max={24} label={''} onChange={onChange} step={1} defaultValue={0} />
    </div>
  );
};

const DelayControls = (props) => {
  const onChange = () => {
    updateTheremin();
  };
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
      UpdateThereminData({ distortionAmount: newValue });
      updateTheremin();
      distortionLevel = newValue;
    }
    if (props.name === 'Crusher') {
      UpdateThereminData({ crusherAmount: newValue });
      updateTheremin();
      crusherLevel = newValue;
    }
    if (props.name === 'PitchShifter') {
      UpdateThereminData({ pitchShifterAmount: newValue });
      updateTheremin();
      pitchShifterLevel = newValue;
    }
    if (props.name === 'DelayTime') {
      UpdateThereminData({ delayTime: newValue * 0.01 });
      updateTheremin();
      delayLevel1 = newValue;
    }
    if (props.name === 'DelayFeedback') {
      UpdateThereminData({ delayFeedback: newValue * 0.01 });
      updateTheremin();
      delayLevel2 = newValue;
    }
    if (props.name === 'VibratoRange') {
      UpdateThereminData({ warbleCounter: 0 });
      UpdateThereminData({ vibratoDepth: newValue * 0.01 });
      updateTheremin();
      vibratoLevel1 = newValue * 0.01;
    }
    if (props.name === 'VibratoSpeed') {
      UpdateThereminData({ warbleCounter: 0 });
      UpdateThereminData({ vibratoFrequency: newValue });
      updateTheremin();
      vibratoLevel2 = newValue;
    }
    if (props.name === 'Pulverizer') {
      UpdateThereminData({ randomWarbleValue: Math.floor(newValue) });
      updateTheremin();
      console.log('new valUE' + newValue);
      pulverizerLevel = newValue;
    }
    if (props.name === 'Wetness') {
      UpdateThereminData({ effectsWetness: newValue * 0.01 });
      updateTheremin();
      console.log('wetness: ' + newValue);
    }

    props.onChange(props.name);
  };
  return (
    <div>
      <label>{props.label}</label>
      <input
        className="fader"
        type="range"
        max={props.max}
        min={props.min}
        onChange={onChange}
        defaultValue={props.defaultValue}
        step={props.step}
      ></input>
    </div>
  );
};

const OkButt = (props) => {
  const clicked = () => {
    props.hide();
  };
  return <button onClick={clicked}>OK</button>;
};

const Trail = (props) => {
  const handleChange = (e) => {
    changeTrailOff(e.target.value);
  };
  return (
    <div>
      <label>Trail:</label>
      <input which="trail" type="range" min={0.05} max={2} step={0.05} onChange={handleChange} defaultValue={0.2} />
    </div>
  );
};

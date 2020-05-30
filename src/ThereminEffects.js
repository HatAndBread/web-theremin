import React, { useState, useEffect } from 'react';
import { UpdateThereminData, updateTheremin, addEffect, removeEffect } from './MusicLogic.js';
import { changeTrailOff } from './MusicLogic';

let distortionLevel = 0;
let pitchShifterLevel = 0;
let delayLevel1 = 0;
let delayLevel2 = 0;
let pulverizerLevel = 0;
let crusherLevel = 8;
let vibratoLevel1 = 0.09;
let vibratoLevel2 = 6;
let trailLevel = 0.2;
let wet = 1;

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
  const [distortionChecked, setDistortionChecked] = useState(false);
  const [delayChecked, setDelayChecked] = useState(false);
  const [pitchShifterChecked, setPitchShifterChecked] = useState(false);
  const [vibratoChecked, setVibratoChecked] = useState(true);
  const [pulverizerChecked, setPulverizerChecked] = useState(false);
  const [crusherChecked, setCrusherChecked] = useState(false);
  const [forceChangesOnPresetReceived, setForceChangesOnPresetReceived] = useState(false);

  const onChange = (which) => {
    if (which === 'Distortion') {
      console.log('adding distortion');
      distortionChecked ? setDistortionChecked(false) : setDistortionChecked(true);
      if (distortionDisplay.display === 'none') {
        setDistortionDisplay({ display: 'block' });
        addEffect(which, distortionLevel);
      } else {
        setDistortionDisplay({ display: 'none' });
        removeEffect(which);
      }
    }
    if (which === 'Crusher') {
      console.log('adding crusher');
      crusherChecked ? setCrusherChecked(false) : setCrusherChecked(true);
      if (crusherDisplay.display === 'none') {
        setCrusherDisplay({ display: 'block' });
        addEffect(which, crusherLevel);
        console.log('adding crusher');
      } else {
        setCrusherDisplay({ display: 'none' });
        removeEffect(which);
      }
    }
    if (which === 'Delay') {
      delayChecked ? setDelayChecked(false) : setDelayChecked(true);
      if (delayDisplay.display === 'none') {
        setDelayDisplay({ display: 'block' });
        addEffect(which, delayLevel1, delayLevel2);
      } else {
        setDelayDisplay({ display: 'none' });
        removeEffect(which);
      }
    }
    if (which === 'PitchShifter') {
      pitchShifterChecked ? setPitchShifterChecked(false) : setPitchShifterChecked(true);
      if (pitchShifterDisplay.display === 'none') {
        setPitchShifterDisplay({ display: 'block' });
        addEffect(which, pitchShifterLevel);
      } else {
        setPitchShifterDisplay({ display: 'none' });
        removeEffect(which);
      }
    }
    if (which === 'Vibrato') {
      vibratoChecked ? setVibratoChecked(false) : setVibratoChecked(true);
      if (vibratoDisplay.display === 'none') {
        setVibratoDisplay({ display: 'block' });
        addEffect(which, vibratoLevel1, vibratoLevel2);
      } else {
        setVibratoDisplay({ display: 'none' });
        removeEffect(which);
      }
    }
    if (which === 'Pulverizer') {
      pulverizerChecked ? setPulverizerChecked(false) : setPulverizerChecked(true);
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
    if (props.needUpdate) {
      distortionLevel = props.updateJason.thereminSettings.distortionAmount;
      pitchShifterLevel = props.updateJason.thereminSettings.pitchShifterAmount;
      delayLevel1 = props.updateJason.thereminSettings.delayTime;
      delayLevel2 = props.updateJason.thereminSettings.delayFeedback;
      pulverizerLevel = props.updateJason.thereminSettings.randomWarbleValue;
      crusherLevel = props.updateJason.thereminSettings.crusherAmount;
      vibratoLevel1 = props.updateJason.thereminSettings.vibratoDepth;
      vibratoLevel2 = props.updateJason.thereminSettings.vibratoFrequency;
      trailLevel = parseFloat(props.updateJason.thereminSettings.trailOff);
      wet = props.updateJason.thereminSettings.effectsWetness;

      props.updateCompleted('theremin effects');
      if (props.updateJason.thereminSettings.distortionOn) {
        setDistortionChecked(true);
        addEffect('Distortion', distortionLevel);
        setDistortionDisplay({
          display: 'block'
        });
      } else {
        setDistortionChecked(false);
        removeEffect('Distortion');
        setDistortionDisplay({
          display: 'none'
        });
      }
      if (props.updateJason.thereminSettings.crusherOn) {
        addEffect('Crusher', crusherLevel);
        setCrusherChecked(true);
        setCrusherDisplay({
          display: 'block'
        });
      } else {
        removeEffect('Crusher');
        setCrusherChecked(false);
        setCrusherDisplay({
          display: 'none'
        });
      }
      if (props.updateJason.thereminSettings.pitchShifterOn) {
        addEffect('PitchShifter', pitchShifterLevel);
        setPitchShifterChecked(true);
        setPitchShifterDisplay({
          display: 'block'
        });
      } else {
        removeEffect('PitchShifter');
        setPitchShifterChecked(false);
        setPitchShifterDisplay({
          display: 'none'
        });
      }
      if (props.updateJason.thereminSettings.delayOn) {
        addEffect('Delay', delayLevel1, delayLevel2);
        setDelayChecked(true);
        setDelayDisplay({
          display: 'block'
        });
      } else {
        removeEffect('Delay');
        setDelayChecked(false);
        setDelayDisplay({
          display: 'none'
        });
      }
      if (props.updateJason.thereminSettings.vibratoOn) {
        addEffect('Vibrato', vibratoLevel1, vibratoLevel2);
        setVibratoChecked(true);
        setVibratoDisplay({
          display: 'block'
        });
      } else {
        removeEffect('Vibrato');
        setVibratoChecked(false);
        setVibratoDisplay({
          display: 'none'
        });
      }
      if (props.updateJason.thereminSettings.randomWarble) {
        addEffect('Pulverizer', pulverizerLevel);
        setPulverizerChecked(true);
        setPulverizerDisplay({
          display: 'block'
        });
      } else {
        removeEffect('Pulverizer');
        setPulverizerChecked(false);
        setPulverizerDisplay({
          display: 'none'
        });
      }
      UpdateThereminData({ distortionAmount: distortionLevel });
      UpdateThereminData({ randomWarbleValue: pulverizerLevel });
      UpdateThereminData({ vibratoDepth: vibratoLevel1 });
      UpdateThereminData({ vibratoFrequency: vibratoLevel2 });
      UpdateThereminData({ delayTime: delayLevel1 });
      UpdateThereminData({ delayFeedback: delayLevel2 });
      UpdateThereminData({ crusherAmount: crusherLevel });
      UpdateThereminData({ pitchShifterAmount: pitchShifterLevel });
      UpdateThereminData({ trailOff: `+${trailLevel}` });
      UpdateThereminData({ effectsWetness: wet });

      updateTheremin();
      setForceChangesOnPresetReceived(true);

      /*
         randomWarble: false,
    randomWarbleValue: 0,
    noFx: true,
    vibratoDepth: 0.09,
    vibratoFrequency: 6,
    vibratoOn: false,
    pitchShifterAmount: 0,
    pitchShifterOn: false,
    distortionAmount: 0,
    distortionOn: false,
    crusherAmount: 8,
    crusherOn: false,
    delayTime: 0,
    delayFeedback: 0,
    delayOn: false,
    effectsWetness: 1,
    trailOff: '+.2'
    */
    }
    updateTheremin();
  });

  const revertBackToUncontrolled = () => {
    setForceChangesOnPresetReceived(false);
  };
  return (
    <div style={{ display: props.display }}>
      <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ borderStyle: 'groove', textAlign: 'left' }}>
          {!forceChangesOnPresetReceived ? (
            <Fader name="Wetness" min={0} max={1} label={'Wet:'} onChange={onChange} step={0.1} defaultValue={wet} />
          ) : (
            <ControlledFader
              revertBackToUncontrolled={revertBackToUncontrolled}
              name="Wetness"
              min={0}
              max={1}
              label={'Wet:'}
              onChange={onChange}
              step={0.1}
              value={wet}
            />
          )}
        </div>
        <div style={{ borderStyle: 'groove', textAlign: 'left' }}>
          <Trail
            forceChangesOnPresetReceived={forceChangesOnPresetReceived}
            revertBackToUncontrolled={revertBackToUncontrolled}
          />
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
          <EffectSelector checked={vibratoChecked} name="Vibrato" onChange={onChange} />
          <div style={vibratoDisplay}>
            <VibratoControls
              forceChangesOnPresetReceived={forceChangesOnPresetReceived}
              vibratoDisplay={vibratoDisplay}
              name="Vibrato"
              revertBackToUncontrolled={revertBackToUncontrolled}
            ></VibratoControls>
          </div>
        </div>
        <div style={{ borderStyle: 'groove', textAlign: 'left' }}>
          <EffectSelector checked={pulverizerChecked} name="Pulverizer" onChange={onChange} />
          <div style={pulverizerDisplay}>
            <PulverizerControls
              forceChangesOnPresetReceived={forceChangesOnPresetReceived}
              name="Pulverizer"
              revertBackToUncontrolled={revertBackToUncontrolled}
            />
          </div>
        </div>
        <div style={{ borderStyle: 'groove', textAlign: 'left' }}>
          <EffectSelector checked={distortionChecked} name="Distortion" onChange={onChange} />
          <div style={distortionDisplay}>
            <DistortionControls
              forceChangesOnPresetReceived={forceChangesOnPresetReceived}
              name="Distortion"
              revertBackToUncontrolled={revertBackToUncontrolled}
            ></DistortionControls>
          </div>
        </div>
        <div style={{ borderStyle: 'groove', textAlign: 'left' }}>
          <EffectSelector checked={crusherChecked} name="Crusher" onChange={onChange} />
          <div style={crusherDisplay}>
            <CrusherControls
              forceChangesOnPresetReceived={forceChangesOnPresetReceived}
              name="Crusher"
              revertBackToUncontrolled={revertBackToUncontrolled}
            ></CrusherControls>
          </div>
        </div>
        <div style={{ borderStyle: 'groove', textAlign: 'left' }}>
          <EffectSelector checked={delayChecked} name="Delay" onChange={onChange} />

          <div style={delayDisplay}>
            <DelayControls
              forceChangesOnPresetReceived={forceChangesOnPresetReceived}
              name="Delay"
              revertBackToUncontrolled={revertBackToUncontrolled}
            ></DelayControls>
          </div>
        </div>
        <div style={{ borderStyle: 'groove', textAlign: 'left' }}>
          <EffectSelector checked={pitchShifterChecked} name="PitchShifter" onChange={onChange} />
          <div style={pitchShifterDisplay}>
            <PitchShifterControls
              forceChangesOnPresetReceived={forceChangesOnPresetReceived}
              name="PitchShifter"
              revertBackToUncontrolled={revertBackToUncontrolled}
            ></PitchShifterControls>
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
      <input type="checkbox" onChange={onChange} checked={props.checked}></input>
      <label>{props.name}</label>
    </div>
  );
};

const VibratoControls = (props) => {
  useEffect(() => {
    updateTheremin();
  }, [props.vibratoDisplay]);
  const onChange = (newValue) => {
    updateTheremin();
  };
  return (
    <div>
      {!props.forceChangesOnPresetReceived ? (
        <div>
          <Fader
            name="VibratoRange"
            min={0}
            max={1}
            label={'Depth'}
            onChange={onChange}
            step={0.01}
            defaultValue={vibratoLevel1}
          />
          <Fader
            name="VibratoSpeed"
            min={0}
            max={20}
            label={'Freq.'}
            onChange={onChange}
            step={0.5}
            defaultValue={vibratoLevel2}
          />
        </div>
      ) : (
        <div>
          <ControlledFader
            name="VibratoRange"
            min={0}
            max={1}
            label={'Depth'}
            onChange={onChange}
            step={0.01}
            value={vibratoLevel1}
            revertBackToUncontrolled={props.revertBackToUncontrolled}
          />
          <ControlledFader
            name="VibratoSpeed"
            min={0}
            max={20}
            label={'Freq.'}
            onChange={onChange}
            step={0.5}
            value={vibratoLevel2}
            revertBackToUncontrolled={props.revertBackToUncontrolled}
          />
        </div>
      )}
    </div>
  );
};

const PulverizerControls = (props) => {
  const onChange = (newValue) => {
    updateTheremin();
  };
  return (
    <div>
      {!props.forceChangesOnPresetReceived ? (
        <div>
          <Fader
            name="Pulverizer"
            min={0}
            max={100}
            label={''}
            onChange={onChange}
            step={1}
            defaultValue={pulverizerLevel}
          />
        </div>
      ) : (
        <div>
          <ControlledFader
            name="Pulverizer"
            min={0}
            max={100}
            label={''}
            onChange={onChange}
            step={1}
            value={pulverizerLevel}
            revertBackToUncontrolled={props.revertBackToUncontrolled}
          />
        </div>
      )}
    </div>
  );
};

const DistortionControls = (props) => {
  const onChange = (newValue) => {
    updateTheremin();
  };
  return (
    <div>
      {!props.forceChangesOnPresetReceived ? (
        <div>
          <Fader
            name="distortion"
            min={0}
            max={11}
            label={''}
            onChange={onChange}
            step={0.2}
            defaultValue={distortionLevel}
          />
        </div>
      ) : (
        <div>
          <ControlledFader
            name="distortion"
            min={0}
            max={11}
            label={''}
            onChange={onChange}
            step={0.2}
            value={distortionLevel}
            revertBackToUncontrolled={props.revertBackToUncontrolled}
          />
        </div>
      )}
    </div>
  );
};

const CrusherControls = (props) => {
  useEffect(() => {
    updateTheremin();
  }, [props.forceChangesOnPresetReceived]);
  const onChange = (newValue) => {
    updateTheremin();
  };
  return (
    <div>
      {!props.forceChangesOnPresetReceived ? (
        <div>
          <Fader name="Crusher" min={0} max={8} label={''} onChange={onChange} step={1} defaultValue={crusherLevel} />
        </div>
      ) : (
        <div>
          <ControlledFader
            name="Crusher"
            min={0}
            max={8}
            label={''}
            onChange={onChange}
            step={1}
            value={crusherLevel}
            revertBackToUncontrolled={props.revertBackToUncontrolled}
          />
        </div>
      )}
    </div>
  );
};

const PitchShifterControls = (props) => {
  const onChange = () => {
    updateTheremin();
  };
  return (
    <div>
      {!props.forceChangesOnPresetReceived ? (
        <div>
          <Fader
            name="PitchShifter"
            min={-24}
            max={24}
            label={''}
            onChange={onChange}
            step={1}
            defaultValue={pitchShifterLevel}
          />
        </div>
      ) : (
        <div>
          <ControlledFader
            name="PitchShifter"
            min={-24}
            max={24}
            label={''}
            onChange={onChange}
            step={1}
            value={pitchShifterLevel}
            revertBackToUncontrolled={props.revertBackToUncontrolled}
          />
        </div>
      )}
    </div>
  );
};

const DelayControls = (props) => {
  const onChange = () => {
    updateTheremin();
  };
  return (
    <div>
      {!props.forceChangesOnPresetReceived ? (
        <div>
          <Fader
            name="DelayTime"
            min={0}
            max={1}
            label={'Time'}
            onChange={onChange}
            step={0.01}
            defaultValue={delayLevel1}
          />
          <Fader
            name="DelayFeedback"
            min={0}
            max={1}
            label={'Fdback'}
            onChange={onChange}
            step={0.01}
            defaultValue={delayLevel2}
          />
        </div>
      ) : (
        <div>
          <ControlledFader
            name="DelayTime"
            min={0}
            max={1}
            label={'Time'}
            onChange={onChange}
            step={0.01}
            value={delayLevel1}
            revertBackToUncontrolled={props.revertBackToUncontrolled}
          />
          <ControlledFader
            name="DelayFeedback"
            min={0}
            max={1}
            label={'Fdback'}
            onChange={onChange}
            step={0.01}
            value={delayLevel2}
            revertBackToUncontrolled={props.revertBackToUncontrolled}
          />
        </div>
      )}
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
      UpdateThereminData({ delayTime: newValue });
      updateTheremin();
      delayLevel1 = newValue;
    }
    if (props.name === 'DelayFeedback') {
      UpdateThereminData({ delayFeedback: newValue });
      updateTheremin();
      delayLevel2 = newValue;
    }
    if (props.name === 'VibratoRange') {
      UpdateThereminData({ warbleCounter: 0 });
      UpdateThereminData({ vibratoDepth: newValue });
      updateTheremin();
      vibratoLevel1 = newValue;
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
      UpdateThereminData({ effectsWetness: newValue });
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
    if (props.forceChangesOnPresetReceived) {
      props.revertBackToUncontrolled();
    }
  };
  return (
    <div>
      {!props.forceChangesOnPresetReceived ? (
        <div>
          <label>Trail:</label>
          <input
            which="trail"
            type="range"
            min={0.05}
            max={2}
            step={0.05}
            onChange={handleChange}
            defaultValue={trailLevel}
          />
        </div>
      ) : (
        <div>
          <label>Trail:</label>
          <input which="trail" type="range" min={0.05} max={2} step={0.05} onChange={handleChange} value={trailLevel} />
        </div>
      )}
    </div>
  );
};

const ControlledFader = (props) => {
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
      UpdateThereminData({ delayTime: newValue });
      updateTheremin();
      delayLevel1 = newValue;
    }
    if (props.name === 'DelayFeedback') {
      UpdateThereminData({ delayFeedback: newValue });
      updateTheremin();
      delayLevel2 = newValue;
    }
    if (props.name === 'VibratoRange') {
      UpdateThereminData({ warbleCounter: 0 });
      UpdateThereminData({ vibratoDepth: newValue });
      updateTheremin();
      vibratoLevel1 = newValue;
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
      pulverizerLevel = newValue;
    }
    if (props.name === 'Wetness') {
      UpdateThereminData({ effectsWetness: newValue });
      updateTheremin();
      console.log('wetness: ' + newValue);
    }

    props.onChange(props.name);
    props.revertBackToUncontrolled();
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
        value={props.value}
        step={props.step}
      ></input>
    </div>
  );
};

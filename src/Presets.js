import React from 'react';
import { UpdateThereminData, updateTheremin } from './MusicLogic.js';

export const Presets = (props) => {
  const handleChange = (e) => {
    const value = e.target.value;
    switch (value) {
      case 'standard':
        props.incomingPresetUpdate(standard);
        break;
      case 'metal':
        props.incomingPresetUpdate(metal);
        break;
      case 'funk':
        props.incomingPresetUpdate(funk);
        break;
      case 'backwards':
        props.incomingPresetUpdate(backwards);
        break;
      case 'mysterious':
        props.incomingPresetUpdate(mysterious);
        break;
      case 'totalTrash':
        props.incomingPresetUpdate(totalTrash);
        break;
      case 'fifths':
        props.incomingPresetUpdate(fifths);
        break;
      case 'rainyDay':
        props.incomingPresetUpdate(rainyDay);
        break;
      case 'doofus':
        props.incomingPresetUpdate(doofus);
        break;
      default:
        props.incomingPresetUpdate(standard);
        break;
    }
  };
  return (
    <div>
      <label htmlFor="presets">Presets</label>
      <br></br>
      <select name="presets" onChange={handleChange}>
        <option value="standard">Standard</option>
        <option value="metal">Metal</option>
        <option value="funk">Funk</option>
        <option value="backwards">Backwards</option>
        <option value="mysterious">Mysterious</option>
        <option value="totalTrash">Total Trash</option>
        <option value="fifths">Fifths</option>
        <option value="rainyDay">Rainy Day</option>
        <option value="doofus">Doofus</option>
      </select>
    </div>
  );
};

const standard = {
  thereminSettings: {
    sine: true,
    square: false,
    sawtooth: false,
    triangle: false,
    sineVolume: -10,
    squareVolume: -10,
    sawtoothVolume: -10,
    triangleVolume: -10,
    attack: 0.7,
    sustain: 0.7,
    decay: 0.5,
    release: 0.7,
    randomWarble: false,
    randomWarbleValue: 0,
    vibratoDepth: 0.09,
    vibratoFrequency: 6,
    vibratoOn: true,
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
  },
  drone1: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  drone2: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  drone3: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  droneEffects: {
    distortionOn: true,
    crusherOn: false,
    delayOn: false,
    pitchshifterOn: false,
    distortionLevel: 0.8,
    crusherLevel: 8,
    delayTime: 0,
    delayFdback: 0,
    pitchShifterLevel: 0
  }
};

const metal = {
  thereminSettings: {
    sine: false,
    square: true,
    sawtooth: false,
    triangle: true,
    sineVolume: -10,
    squareVolume: -10,
    sawtoothVolume: -10,
    triangleVolume: -15,
    attack: 0.1,
    sustain: 0.9,
    decay: 0.1,
    release: 0.2,
    randomWarble: true,
    randomWarbleValue: 20,
    vibratoDepth: 0.09,
    vibratoFrequency: 6,
    vibratoOn: false,
    pitchShifterAmount: 0,
    pitchShifterOn: false,
    distortionAmount: 6,
    distortionOn: true,
    crusherAmount: 3,
    crusherOn: true,
    delayTime: 0,
    delayFeedback: 0,
    delayOn: false,
    effectsWetness: 1,
    trailOff: '+.1'
  },
  drone1: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  drone2: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  drone3: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  droneEffects: {
    distortionOn: true,
    crusherOn: false,
    delayOn: false,
    pitchshifterOn: false,
    distortionLevel: 0.8,
    crusherLevel: 8,
    delayTime: 0,
    delayFdback: 0,
    pitchShifterLevel: 0
  }
};

const funk = {
  thereminSettings: {
    sine: false,
    square: true,
    sawtooth: false,
    triangle: false,
    sineVolume: -10,
    squareVolume: -10,
    sawtoothVolume: -10,
    triangleVolume: -10,
    attack: 0.1,
    sustain: 0.1,
    decay: 0.1,
    release: 0.1,
    randomWarble: false,
    randomWarbleValue: 0,
    vibratoDepth: 0,
    vibratoFrequency: 0,
    vibratoOn: false,
    pitchShifterAmount: 0,
    pitchShifterOn: false,
    distortionAmount: 6,
    distortionOn: true,
    crusherAmount: 8,
    crusherOn: false,
    delayTime: 0,
    delayFeedback: 0,
    delayOn: false,
    effectsWetness: 0.3,
    trailOff: '+.1'
  },
  drone1: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  drone2: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  drone3: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  droneEffects: {
    distortionOn: true,
    crusherOn: false,
    delayOn: false,
    pitchshifterOn: false,
    distortionLevel: 0.8,
    crusherLevel: 8,
    delayTime: 0,
    delayFdback: 0,
    pitchShifterLevel: 0
  }
};

const backwards = {
  thereminSettings: {
    sine: true,
    square: false,
    sawtooth: true,
    triangle: false,
    sineVolume: -10,
    squareVolume: -10,
    sawtoothVolume: -10,
    triangleVolume: -10,
    attack: 0.9,
    sustain: 0.1,
    decay: 0.1,
    release: 0.1,
    randomWarble: false,
    randomWarbleValue: 0,
    vibratoDepth: 0.09,
    vibratoFrequency: 6,
    vibratoOn: true,
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
    trailOff: '+1'
  },
  drone1: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  drone2: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  drone3: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  droneEffects: {
    distortionOn: true,
    crusherOn: false,
    delayOn: false,
    pitchshifterOn: false,
    distortionLevel: 0.8,
    crusherLevel: 8,
    delayTime: 0,
    delayFdback: 0,
    pitchShifterLevel: 0
  }
};

const mysterious = {
  thereminSettings: {
    sine: false,
    square: false,
    sawtooth: false,
    triangle: true,
    sineVolume: -10,
    squareVolume: -10,
    sawtoothVolume: -10,
    triangleVolume: -10,
    attack: 0.8,
    sustain: 0.7,
    decay: 0.5,
    release: 0.8,
    randomWarble: true,
    randomWarbleValue: 5,
    vibratoDepth: 0.14,
    vibratoFrequency: 10,
    vibratoOn: true,
    pitchShifterAmount: 0,
    pitchShifterOn: false,
    distortionAmount: 0,
    distortionOn: false,
    crusherAmount: 8,
    crusherOn: false,
    delayTime: 0.15,
    delayFeedback: 0.2,
    delayOn: true,
    effectsWetness: 0.6,
    trailOff: '+.5'
  },
  drone1: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  drone2: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  drone3: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  droneEffects: {
    distortionOn: true,
    crusherOn: false,
    delayOn: false,
    pitchshifterOn: false,
    distortionLevel: 0.8,
    crusherLevel: 8,
    delayTime: 0,
    delayFdback: 0,
    pitchShifterLevel: 0
  }
};

const totalTrash = {
  thereminSettings: {
    sine: false,
    square: true,
    sawtooth: false,
    triangle: false,
    sineVolume: -10,
    squareVolume: -60,
    sawtoothVolume: -10,
    triangleVolume: -10,
    attack: 0.1,
    sustain: 1,
    decay: 0.5,
    release: 0.1,
    randomWarble: true,
    randomWarbleValue: 45,
    vibratoDepth: 0.3,
    vibratoFrequency: 20,
    vibratoOn: true,
    pitchShifterAmount: -4,
    pitchShifterOn: true,
    distortionAmount: 10,
    distortionOn: true,
    crusherAmount: 3,
    crusherOn: true,
    delayTime: 0.1,
    delayFeedback: 0.3,
    delayOn: true,
    effectsWetness: 1,
    trailOff: '+.1'
  },
  drone1: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  drone2: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  drone3: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  droneEffects: {
    distortionOn: true,
    crusherOn: false,
    delayOn: false,
    pitchshifterOn: false,
    distortionLevel: 0.8,
    crusherLevel: 8,
    delayTime: 0,
    delayFdback: 0,
    pitchShifterLevel: 0
  }
};

const fifths = {
  thereminSettings: {
    sine: false,
    square: false,
    sawtooth: true,
    triangle: true,
    sineVolume: -10,
    squareVolume: -10,
    sawtoothVolume: -15,
    triangleVolume: -15,
    attack: 0.07,
    sustain: 0.9,
    decay: 0.8,
    release: 0.2,
    randomWarble: true,
    randomWarbleValue: 10,
    vibratoDepth: 0,
    vibratoFrequency: 0,
    vibratoOn: false,
    pitchShifterAmount: 7,
    pitchShifterOn: true,
    distortionAmount: 0,
    distortionOn: false,
    crusherAmount: 8,
    crusherOn: false,
    delayTime: 0.1,
    delayFeedback: 0.1,
    delayOn: true,
    effectsWetness: 0.5,
    trailOff: '+.4'
  },
  drone1: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  drone2: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  drone3: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  droneEffects: {
    distortionOn: true,
    crusherOn: false,
    delayOn: false,
    pitchshifterOn: false,
    distortionLevel: 0.8,
    crusherLevel: 8,
    delayTime: 0,
    delayFdback: 0,
    pitchShifterLevel: 0
  }
};

const rainyDay = {
  thereminSettings: {
    sine: false,
    square: false,
    sawtooth: false,
    triangle: true,
    sineVolume: -10,
    squareVolume: -10,
    sawtoothVolume: -10,
    triangleVolume: -10,
    attack: 0.7,
    sustain: 0.7,
    decay: 0.5,
    release: 0.7,
    randomWarble: false,
    randomWarbleValue: 0,
    vibratoDepth: 0.05,
    vibratoFrequency: 6,
    vibratoOn: true,
    pitchShifterAmount: 0,
    pitchShifterOn: false,
    distortionAmount: 0,
    distortionOn: false,
    crusherAmount: 8,
    crusherOn: false,
    delayTime: 0.2,
    delayFeedback: 0.5,
    delayOn: true,
    effectsWetness: 0.9,
    trailOff: '+.3'
  },
  drone1: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  drone2: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  drone3: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  droneEffects: {
    distortionOn: true,
    crusherOn: false,
    delayOn: false,
    pitchshifterOn: false,
    distortionLevel: 0.8,
    crusherLevel: 8,
    delayTime: 0,
    delayFdback: 0,
    pitchShifterLevel: 0
  }
};

const doofus = {
  thereminSettings: {
    sine: true,
    square: false,
    sawtooth: false,
    triangle: false,
    sineVolume: -10,
    squareVolume: -10,
    sawtoothVolume: -10,
    triangleVolume: -10,
    attack: 0.02,
    sustain: 0.14,
    decay: 1,
    release: 0.08,
    randomWarble: false,
    randomWarbleValue: 0,
    vibratoDepth: 0.5,
    vibratoFrequency: 0.5,
    vibratoOn: true,
    pitchShifterAmount: -12,
    pitchShifterOn: true,
    distortionAmount: 0,
    distortionOn: false,
    crusherAmount: 8,
    crusherOn: false,
    delayTime: 0,
    delayFeedback: 0,
    delayOn: false,
    effectsWetness: 0.5,
    trailOff: '+.2'
  },
  drone1: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  drone2: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  drone3: {
    on: false,
    volume: -20,
    pitch: 'C4',
    octave: 1,
    wave: 'square'
  },
  droneEffects: {
    distortionOn: true,
    crusherOn: false,
    delayOn: false,
    pitchshifterOn: false,
    distortionLevel: 0.8,
    crusherLevel: 8,
    delayTime: 0,
    delayFdback: 0,
    pitchShifterLevel: 0
  }
};

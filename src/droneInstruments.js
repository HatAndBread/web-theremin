import * as Tone from 'tone';

const droneVolume = new Tone.Volume(-2).toMaster();
const droneCrusher = new Tone.BitCrusher(8);
const dronePitchShifter = new Tone.PitchShift(1);
const dronePingPong = new Tone.FeedbackDelay(1, 1);
const droneDist = new Tone.Distortion(1).chain(dronePingPong, dronePitchShifter, droneVolume);
//initial values

droneDist.distortion = 0;
droneCrusher.bits = 8;
dronePitchShifter.pitch = 0;
dronePingPong.delayTime.value = 0;
dronePingPong.feedback.value = 0;
droneDist.wet.value = 0.8;
droneCrusher.wet.value = 0.8;
dronePitchShifter.wet.value = 0.8;
dronePitchShifter.wet.value = 0.8;

export const UpdateDroneEffects = (name, value) => {
  switch (name) {
    case 'distortion':
      droneDist.distortion = value;

      break;
    case 'Crusher':
      droneCrusher.bits = value;
      break;
    case 'PitchShifter':
      dronePitchShifter.pitch = value;
      break;
    case 'DelayTime':
      dronePingPong.delayTime.value = value;
      break;
    case 'DelayFeedback':
      dronePingPong.feedback.value = value;
      break;
    case 'Wetness':
      droneDist.wet.value = value;
      droneCrusher.wet.value = value;
      dronePitchShifter.wet.value = value;
      dronePitchShifter.wet.value = value;
      break;
    default:
      console.log('WHY?');
      break;
  }
};
export const addEffect = (effect, currentLevel1, currentLevel2) => {
  if (!droneMachine.data.fxOn) {
    droneMachine.data.fxOn = true;
  }
  if (effect === 'Distortion') {
    droneMachine.distortionOn = true;
    droneDist.distortion = currentLevel1;
  }
  if (effect === 'Crusher') {
    droneMachine.data.crusherOn = true;
    droneCrusher.bits = currentLevel1;
    droneVolume.disconnect();

    droneVolume.connect(droneCrusher);
    droneCrusher.toMaster();
  }
  if (effect === 'PitchShifter') {
    droneMachine.pitchShifterOn = false;
    dronePitchShifter.pitch = currentLevel1;
  }
  if (effect === 'Delay') {
    droneMachine.delayOn = true;
    dronePingPong.delayTime.value = currentLevel1;
    dronePingPong.feedback.value = currentLevel2;
  }
};

export const removeEffect = (effect) => {
  switch (effect) {
    case 'Distortion':
      droneMachine.distortionOn = false;
      droneDist.distortion = 0;

      break;
    case 'Crusher':
      droneMachine.data.crusherOn = false;
      droneCrusher.disconnect();
      droneVolume.toMaster();

      break;
    case 'PitchShifter':
      droneMachine.pitchShifterOn = false;
      dronePitchShifter.pitch = 0;

      break;
    case 'Delay':
      droneMachine.delayOn = false;
      dronePingPong.delayTime.value = 0;
      dronePingPong.feedback.value = 0;

      break;
    default:
      console.log('baka');
      break;
  }
};

let droneSpread = 2;
let droneCount = 3;
export const droneMachine = {
  data: {
    machineOn: false,
    fxOn: false,
    crusherOn: false,
    pitchShifterOn: false,
    delayOn: false,
    distortionOn: false
  },
  one: {
    sine: {
      oscillator: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: droneSpread,
        count: droneCount,
        type: 'sine'
      }).connect(droneDist),
      oscillator1: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: 0,
        count: 0,
        type: 'sine'
      }).connect(droneDist),
      on: false,
      selected: true
    },

    square: {
      oscillator: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: droneSpread,
        count: droneCount,
        type: 'square'
      }).connect(droneDist),
      oscillator1: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: 0,
        count: 0,
        type: 'square'
      }).connect(droneDist),
      on: false,
      selected: false
    },

    sawtooth: {
      oscillator: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: droneSpread,
        count: droneCount,
        type: 'sawtooth'
      }).connect(droneDist),
      oscillator1: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: 0,
        count: 0,
        type: 'sawtooth'
      }).connect(droneDist),
      on: false,
      selected: false
    },

    triangle: {
      oscillator: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: droneSpread,
        count: droneCount,
        type: 'triangle'
      }).connect(droneDist),
      oscillator1: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: 0,
        count: 0,
        type: 'triangle'
      }).connect(droneDist),
      on: false,
      selected: false
    },
    allWavesOff: true,
    myPitch: 261.63,
    myPitchInJust: 0,
    myPitchInEqual: 0,
    myOctave: 1
  },
  two: {
    sine: {
      oscillator: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: droneSpread,
        count: droneCount,
        type: 'sine'
      }).connect(droneDist),
      oscillator1: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: 0,
        count: 0,
        type: 'sine'
      }).connect(droneDist),
      on: false,
      selected: true
    },

    square: {
      oscillator: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: droneSpread,
        count: droneCount,
        type: 'square'
      }).connect(droneDist),
      oscillator1: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: 0,
        count: 0,
        type: 'square'
      }).connect(droneDist),
      on: false,
      selected: false
    },

    sawtooth: {
      oscillator: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: droneSpread,
        count: droneCount,
        type: 'sawtooth'
      }).connect(droneDist),
      oscillator1: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: 0,
        count: 0,
        type: 'sawtooth'
      }).connect(droneDist),
      on: false,
      selected: false
    },

    triangle: {
      oscillator: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: droneSpread,
        count: droneCount,
        type: 'triangle'
      }).connect(droneDist),
      oscillator1: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: 0,
        count: 0,
        type: 'triangle'
      }).connect(droneDist),
      on: false,
      selected: false
    },
    allWavesOff: true,
    myPitch: 261.63,
    myPitchInJust: 0,
    myPitchInEqual: 0,
    myOctave: 1
  },
  three: {
    sine: {
      oscillator: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: droneSpread,
        count: droneCount,
        type: 'sine'
      }).connect(droneDist),
      oscillator1: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: 0,
        count: 0,
        type: 'sine'
      }).connect(droneDist),
      on: false,
      selected: true
    },

    square: {
      oscillator: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: droneSpread,
        count: droneCount,
        type: 'square'
      }).connect(droneDist),
      oscillator1: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: 0,
        count: 0,
        type: 'square'
      }).connect(droneDist),
      on: false,
      selected: false
    },

    sawtooth: {
      oscillator: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: droneSpread,
        count: droneCount,
        type: 'sawtooth'
      }).connect(droneDist),
      oscillator1: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: 0,
        count: 0,
        type: 'sawtooth'
      }).connect(droneDist),
      on: false,
      selected: false
    },

    triangle: {
      oscillator: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: droneSpread,
        count: droneCount,
        type: 'triangle'
      }).connect(droneDist),
      oscillator1: new Tone.FatOscillator({
        frequency: 523,
        detune: 0,
        phase: 0,
        spread: 0,
        count: 0,
        type: 'triangle'
      }).connect(droneDist),
      on: false,
      selected: false
    },
    allWavesOff: true,
    myPitch: 261.63,
    myPitchInJust: 0,
    myPitchInEqual: 0,
    myOctave: 1
  }
};

export const updateDroneMachineWave = (whichWave, whichMachine) => {
  function waveChanger(who) {
    if (whichWave === 'sine') {
      who.square.selected = false;
      who.sawtooth.selected = false;
      who.triangle.selected = false;
      who.sine.selected = true;
      if (!who.allWavesOff) {
        who.sine.oscillator.start();
        who.sine.oscillator1.start();
        who.sine.oscillator1.start();
        who.sawtooth.oscillator.stop();
        who.sawtooth.oscillator1.stop();
        who.square.oscillator.stop();
        who.square.oscillator1.stop();
        who.triangle.oscillator.stop();
        who.triangle.oscillator1.stop();
        who.sine.on = true;
        who.square.on = false;
        who.sawtooth.on = false;
        who.triangle.on = false;
      }
    }
    if (whichWave === 'square') {
      who.square.selected = true;
      who.sawtooth.selected = false;
      who.triangle.selected = false;
      who.sine.selected = false;
      if (!who.allWavesOff) {
        who.sine.oscillator.stop();
        who.sine.oscillator1.stop();
        who.sawtooth.oscillator.stop();
        who.sawtooth.oscillator1.stop();
        who.square.oscillator.start();
        who.square.oscillator1.start();
        who.triangle.oscillator.stop();
        who.triangle.oscillator1.stop();
        who.sine.on = false;
        who.square.on = true;
        who.sawtooth.on = false;
        who.triangle.on = false;
      }
    }
    if (whichWave === 'sawtooth') {
      who.square.selected = false;
      who.sawtooth.selected = true;
      who.triangle.selected = false;
      who.sine.selected = false;
      if (!who.allWavesOff) {
        who.sine.oscillator.stop();
        who.sine.oscillator1.stop();
        who.sawtooth.oscillator.start();
        who.sawtooth.oscillator1.start();
        who.square.oscillator.stop();
        who.square.oscillator1.stop();
        who.triangle.oscillator.stop();
        who.triangle.oscillator1.stop();
        who.sine.on = false;
        who.square.on = false;
        who.sawtooth.on = true;
        who.triangle.on = false;
      }
    }
    if (whichWave === 'triangle') {
      who.square.selected = false;
      who.sawtooth.selected = false;
      who.triangle.selected = true;
      who.sine.selected = false;
      if (!who.allWavesOff) {
        who.sine.oscillator.stop();
        who.sine.oscillator1.stop();
        who.sawtooth.oscillator.stop();
        who.sawtooth.oscillator1.stop();
        who.square.oscillator.stop();
        who.square.oscillator1.stop();
        who.triangle.oscillator.start();
        who.triangle.oscillator1.start();
        who.sine.on = false;
        who.square.on = false;
        who.sawtooth.on = false;
        who.triangle.on = true;
      }
    }
  }
  switch (whichMachine) {
    case 'Drone 1':
      waveChanger(droneMachine.one);
      break;
    case 'Drone 2':
      waveChanger(droneMachine.two);
      break;
    case 'Drone 3':
      waveChanger(droneMachine.three);
      break;
    default:
      console.log('WHY?');
      break;
  }
};
// set initial volumes
droneMachine.one.sine.oscillator.volume.value = -20;
droneMachine.one.sine.oscillator1.volume.value = -25;
droneMachine.one.square.oscillator.volume.value = -20;
droneMachine.one.square.oscillator1.volume.value = -25;
droneMachine.one.sawtooth.oscillator.volume.value = -20;
droneMachine.one.sawtooth.oscillator1.volume.value = -25;
droneMachine.one.triangle.oscillator.volume.value = -20;
droneMachine.one.triangle.oscillator1.volume.value = -25;

droneMachine.two.sine.oscillator.volume.value = -20;
droneMachine.two.sine.oscillator1.volume.value = -25;
droneMachine.two.square.oscillator.volume.value = -20;
droneMachine.two.square.oscillator1.volume.value = -25;
droneMachine.two.sawtooth.oscillator.volume.value = -20;
droneMachine.two.sawtooth.oscillator1.volume.value = -25;
droneMachine.two.triangle.oscillator.volume.value = -20;
droneMachine.two.triangle.oscillator1.volume.value = -25;

droneMachine.three.sine.oscillator.volume.value = -20;
droneMachine.three.sine.oscillator1.volume.value = -25;
droneMachine.three.square.oscillator.volume.value = -20;
droneMachine.three.square.oscillator1.volume.value = -25;
droneMachine.three.sawtooth.oscillator.volume.value = -20;
droneMachine.three.sawtooth.oscillator1.volume.value = -25;
droneMachine.three.triangle.oscillator.volume.value = -20;
droneMachine.three.triangle.oscillator1.volume.value = -25;

export const updateDroneMachineVolume = (whichMachine, value) => {
  function updater(machine) {
    machine.sine.oscillator.volume.value = value;
    machine.sine.oscillator1.volume.value = value - 5;
    machine.square.oscillator.volume.value = value;
    machine.square.oscillator1.volume.value = value - 5;
    machine.sawtooth.oscillator.volume.value = value;
    machine.sawtooth.oscillator1.volume.value = value - 5;
    machine.triangle.oscillator.volume.value = value;
    machine.triangle.oscillator1.volume.value = value - 5;
  }
  switch (whichMachine) {
    case 'Drone 1':
      updater(droneMachine.one);
      break;
    case 'Drone 2':
      updater(droneMachine.two);
      break;
    case 'Drone 3':
      updater(droneMachine.three);
      break;
    default:
      console.log('WHY?');
      break;
  }
};

export const changeDroneIntonation = (current) => {
  if (current === 'just') {
    justIntonation = true;
  } else {
    justIntonation = false;
  }
};

let justIntonation = true;
const justFrequencies = [
  261.63,
  272.54,
  294.33,
  313.96,
  327.03,
  348.83,
  367.92,
  392.44,
  418.6,
  436.05,
  470.93,
  490.55,
  523.25
];
const equalFrequencies = [
  261.63,
  277.18,
  293.66,
  311.13,
  329.63,
  349.23,
  369.99,
  392,
  315.3,
  440,
  466.16,
  493.88,
  523.25
];

export const updateMyOctave = (value, whichMachine) => {
  switch (whichMachine) {
    case 'Drone 1':
      droneMachine.one.myOctave = value;
      if (justIntonation) {
        changePitch('Drone 1', droneMachine.one.myPitchInJust);
      } else {
        changePitch('Drone 1', droneMachine.one.myPitchInEqual);
      }
      break;
    case 'Drone 2':
      droneMachine.two.myOctave = value;
      if (justIntonation) {
        changePitch('Drone 2', droneMachine.two.myPitchInJust);
      } else {
        changePitch('Drone 2', droneMachine.two.myPitchInEqual);
      }
      break;
    case 'Drone 3':
      droneMachine.three.myOctave = value;
      if (justIntonation) {
        changePitch('Drone 3', droneMachine.three.myPitchInEqual);
      }
      break;
    default:
      console.log('WHY?');
      break;
  }
};

export const changePitch = (which, value) => {
  function updater(machine) {
    if (justIntonation) {
      machine.sine.oscillator.frequency.value = justFrequencies[value] * machine.myOctave;
      machine.sine.oscillator1.frequency.value = justFrequencies[value] * machine.myOctave;

      machine.square.oscillator.frequency.value = justFrequencies[value] * machine.myOctave;
      machine.square.oscillator1.frequency.value = justFrequencies[value] * machine.myOctave;
      machine.sawtooth.oscillator.frequency.value = justFrequencies[value] * machine.myOctave;
      machine.sawtooth.oscillator1.frequency.value = justFrequencies[value] * machine.myOctave;
      machine.triangle.oscillator.frequency.value = justFrequencies[value] * machine.myOctave;
      machine.triangle.oscillator1.frequency.value = justFrequencies[value] * machine.myOctave;
      machine.myPitchInJust = value;
      machine.myPitch = justFrequencies[value] * machine.myOctave;
    } else {
      machine.sine.oscillator.frequency.value = equalFrequencies[value] * machine.myOctave;
      machine.sine.oscillator1.frequency.value = equalFrequencies[value] * machine.myOctave;

      machine.square.oscillator.frequency.value = equalFrequencies[value] * machine.myOctave;
      machine.square.oscillator1.frequency.value = equalFrequencies[value] * machine.myOctave;
      machine.sawtooth.oscillator.frequency.value = equalFrequencies[value] * machine.myOctave;
      machine.sawtooth.oscillator1.frequency.value = equalFrequencies[value] * machine.myOctave;
      machine.triangle.oscillator.frequency.value = equalFrequencies[value] * machine.myOctave;
      machine.triangle.oscillator1.frequency.value = equalFrequencies[value] * machine.myOctave;
      machine.myPitchInEqual = value;
      machine.myPitch = equalFrequencies[value] * machine.myOctave;
    }
  }
  switch (which) {
    case 'Drone 1':
      updater(droneMachine.one);
      break;
    case 'Drone 2':
      updater(droneMachine.two);
      break;
    case 'Drone 3':
      updater(droneMachine.three);
      break;
    default:
      console.log('WHY?');
      break;
  }
};

export const startDrone = (which) => {
  if (!droneMachine.data.machineOn) {
    droneMachine.data.machineOn = true;
  }
  function waveChooser(machine) {
    function startBoth(whatWave) {
      if (whatWave === 'sine') {
        machine.sine.oscillator.start();
        machine.sine.oscillator1.start();
      }
      if (whatWave === 'square') {
        machine.square.oscillator.start();
        machine.square.oscillator1.start();
      }
      if (whatWave === 'sawtooth') {
        machine.sawtooth.oscillator.start();
        machine.sawtooth.oscillator1.start();
      }
      if (whatWave === 'triangle') {
        machine.triangle.oscillator.start();
        machine.triangle.oscillator1.start();
      }
    }
    machine.sine.oscillator.frequency.value = machine.myPitch;
    machine.sine.oscillator1.frequency.value = machine.myPitch;
    machine.square.oscillator.frequency.value = machine.myPitch;
    machine.square.oscillator1.frequency.value = machine.myPitch;
    machine.sawtooth.oscillator.frequency.value = machine.myPitch;
    machine.sawtooth.oscillator1.frequency.value = machine.myPitch;
    machine.triangle.oscillator.frequency.value = machine.myPitch;
    machine.triangle.oscillator1.frequency.value = machine.myPitch;
    if (machine.sine.selected) {
      startBoth('sine');
      machine.sine.on = true;
    }
    if (machine.square.selected) {
      startBoth('square');
      machine.square.on = true;
    }
    if (machine.sawtooth.selected) {
      startBoth('sawtooth');
      machine.sawtooth.on = true;
    }
    if (machine.triangle.selected) {
      startBoth('triangle');
      machine.triangle.on = true;
    }
    machine.allWavesOff = false;
  }
  switch (which) {
    case 'Drone 1':
      waveChooser(droneMachine.one);
      break;
    case 'Drone 2':
      waveChooser(droneMachine.two);
      break;
    case 'Drone 3':
      waveChooser(droneMachine.three);
      break;
    default:
      console.log('WHY?');
      break;
  }
};

export const stopDrone = (which) => {
  function waveStopper(machine) {
    if (machine.sine.on) {
      machine.sine.oscillator.stop();
      machine.sine.oscillator1.stop();
    }
    if (machine.square.on) {
      machine.square.oscillator.stop();
      machine.square.oscillator1.stop();
    }
    if (machine.sawtooth.on) {
      machine.sawtooth.oscillator.stop();
      machine.sawtooth.oscillator1.stop();
    }
    if (machine.triangle.on) {
      machine.triangle.oscillator.stop();
      machine.triangle.oscillator1.stop();
    }
    machine.sine.on = false;
    machine.square.on = false;
    machine.sawtooth.on = false;
    machine.triangle.on = false;
    machine.allWavesOff = true;

    if (droneMachine.one.allWavesOff && droneMachine.two.allWavesOff && droneMachine.three.allWavesOff) {
      droneMachine.data.machineOn = false;
    }
  }
  switch (which) {
    case 'Drone 1':
      waveStopper(droneMachine.one);

      break;
    case 'Drone 2':
      waveStopper(droneMachine.two);

      break;
    case 'Drone 3':
      waveStopper(droneMachine.three);
      break;
    default:
      console.log('WHY?');
      break;
  }
};


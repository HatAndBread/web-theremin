import * as Tone from 'tone';

///TONE SETTINGS

Tone.Master.volume.value = -10; // turning this too high causes big problems!!!
Tone.context.latencyHint = 'interactive'; //// make this  a variable with warning???
export const changeLatency = (which) => {
  if (which === 'balanced') {
    Tone.context.latencyHint = 'balanced';
  } else {
    Tone.context.latencyHint = 'interactive';
  }
};

export const changeMaster = (value) => {
  Tone.Master.volume.value = value;
  console.log(value);
};

export const analyser = new Tone.Analyser({
  size: 16,
  type: 'fft',
  smoothing: 0.8
}).toMaster();

export const theLimiter = new Tone.Limiter({
  threshold: -12
}).connect(analyser);

const droneCrusher = new Tone.BitCrusher(8);

const dronePitchShifter = new Tone.PitchShift(1);
const dronePingPong = new Tone.FeedbackDelay(1, 1);
const droneDist = new Tone.Distortion(1).chain(dronePingPong, dronePitchShifter, theLimiter);
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
    dronePitchShifter.disconnect();

    dronePitchShifter.connect(droneCrusher);
    droneCrusher.connect(theLimiter);
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
      dronePitchShifter.connect(theLimiter);

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
      gain: new Tone.Gain(0),
      oscillator: new Tone.Oscillator(440, 'sine'),
      osc2: new Tone.FatOscillator({
        frequency: 440,
        detune: 6,
        phase: 0,
        spread: 1,
        count: 2,
        type: 'sine',
        partials: [],
        partialCount: 0
      }),
      on: false,
      selected: true
    },

    square: {
      gain: new Tone.Gain(0),
      oscillator: new Tone.Oscillator(440, 'square'),
      osc2: new Tone.FatOscillator({
        frequency: 440,
        detune: 6,
        phase: 0,
        spread: 1,
        count: 2,
        type: 'square',
        partials: [],
        partialCount: 0
      }),
      on: false,
      selected: false
    },

    sawtooth: {
      gain: new Tone.Gain(0),
      oscillator: new Tone.Oscillator(440, 'sawtooth'),
      osc2: new Tone.FatOscillator({
        frequency: 440,
        detune: 6,
        phase: 0,
        spread: 1,
        count: 2,
        type: 'sawtooth',
        partials: [],
        partialCount: 0
      }),

      on: false,
      selected: false
    },

    triangle: {
      gain: new Tone.Gain(0),
      oscillator: new Tone.Oscillator(440, 'triangle'),
      osc2: new Tone.FatOscillator({
        frequency: 440,
        detune: 6,
        phase: 0,
        spread: 1,
        count: 2,
        type: 'triangle',
        partials: [],
        partialCount: 0
      }),

      on: false,
      selected: false
    },
    allWavesOff: true,
    volume: -25,
    myPitch: 261.63,
    myPitchInJust: 0,
    myPitchInEqual: 0,
    myOctave: 1
  },
  two: {
    sine: {
      gain: new Tone.Gain(0),
      oscillator: new Tone.Oscillator(440, 'sine'),
      osc2: new Tone.FatOscillator({
        frequency: 440,
        detune: 4,
        phase: 0,
        spread: 1,
        count: 2,
        type: 'sine',
        partials: [],
        partialCount: 0
      }),

      on: false,
      selected: true
    },

    square: {
      gain: new Tone.Gain(0),
      oscillator: new Tone.Oscillator(440, 'square'),
      osc2: new Tone.FatOscillator({
        frequency: 440,
        detune: 4,
        phase: 0,
        spread: 1,
        count: 2,
        type: 'square',
        partials: [],
        partialCount: 0
      }),

      on: false,
      selected: false
    },

    sawtooth: {
      gain: new Tone.Gain(0),
      oscillator: new Tone.Oscillator(440, 'sawtooth'),
      osc2: new Tone.FatOscillator({
        frequency: 440,
        detune: 4,
        phase: 0,
        spread: 1,
        count: 2,
        type: 'sawtooth',
        partials: [],
        partialCount: 0
      }),

      on: false,
      selected: false
    },

    triangle: {
      gain: new Tone.Gain(0),
      oscillator: new Tone.Oscillator(440, 'triangle'),
      osc2: new Tone.FatOscillator({
        frequency: 440,
        detune: 4,
        phase: 0,
        spread: 1,
        count: 2,
        type: 'triangle',
        partials: [],
        partialCount: 0
      }),

      on: false,
      selected: false
    },
    allWavesOff: true,
    volume: -25,
    myPitch: 261.63,
    myPitchInJust: 0,
    myPitchInEqual: 0,
    myOctave: 1
  },
  three: {
    sine: {
      gain: new Tone.Gain(0),
      oscillator: new Tone.Oscillator(440, 'sine'),
      osc2: new Tone.FatOscillator({
        frequency: 440,
        detune: 8,
        phase: 0,
        spread: 1,
        count: 2,
        type: 'sine',
        partials: [],
        partialCount: 0
      }),

      on: false,
      selected: true
    },

    square: {
      gain: new Tone.Gain(0),
      oscillator: new Tone.Oscillator(440, 'square'),
      osc2: new Tone.FatOscillator({
        frequency: 440,
        detune: 8,
        phase: 0,
        spread: 1,
        count: 2,
        type: 'square',
        partials: [],
        partialCount: 0
      }),

      on: false,
      selected: false
    },

    sawtooth: {
      gain: new Tone.Gain(0),
      oscillator: new Tone.Oscillator(440, 'sawtooth'),
      osc2: new Tone.FatOscillator({
        frequency: 440,
        detune: 8,
        phase: 0,
        spread: 1,
        count: 2,
        type: 'sawtooth',
        partials: [],
        partialCount: 0
      }),
      on: false,
      selected: false
    },

    triangle: {
      gain: new Tone.Gain(0),
      oscillator: new Tone.Oscillator(440, 'triangle'),
      osc2: new Tone.FatOscillator({
        frequency: 440,
        detune: 8,
        phase: 0,
        spread: 1,
        count: 2,
        type: 'triangle',
        partials: [],
        partialCount: 0
      }),
      on: false,
      selected: false
    },
    allWavesOff: true,
    volume: -25,
    myPitch: 261.63,
    myPitchInJust: 0,
    myPitchInEqual: 0,
    myOctave: 1
  }
};

droneMachine.one.sine.oscillator.chain(droneMachine.one.sine.gain, droneDist).start();
droneMachine.one.square.oscillator.chain(droneMachine.one.square.gain, droneDist).start();
droneMachine.one.sawtooth.oscillator.chain(droneMachine.one.sawtooth.gain, droneDist).start();
droneMachine.one.triangle.oscillator.chain(droneMachine.one.triangle.gain, droneDist).start();
droneMachine.two.sine.oscillator.chain(droneMachine.two.sine.gain, droneDist).start();
droneMachine.two.square.oscillator.chain(droneMachine.two.square.gain, droneDist).start();
droneMachine.two.sawtooth.oscillator.chain(droneMachine.two.sawtooth.gain, droneDist).start();
droneMachine.two.triangle.oscillator.chain(droneMachine.two.triangle.gain, droneDist).start();
droneMachine.three.sine.oscillator.chain(droneMachine.three.sine.gain, droneDist).start();
droneMachine.three.square.oscillator.chain(droneMachine.three.square.gain, droneDist).start();
droneMachine.three.sawtooth.oscillator.chain(droneMachine.three.sawtooth.gain, droneDist).start();
droneMachine.three.triangle.oscillator.chain(droneMachine.three.triangle.gain, droneDist).start();
droneMachine.one.sine.osc2.chain(droneMachine.one.sine.gain, droneDist).start();
droneMachine.one.square.osc2.chain(droneMachine.one.square.gain, droneDist).start();
droneMachine.one.sawtooth.osc2.chain(droneMachine.one.sawtooth.gain, droneDist).start();
droneMachine.one.triangle.osc2.chain(droneMachine.one.triangle.gain, droneDist).start();
droneMachine.two.sine.osc2.chain(droneMachine.two.sine.gain, droneDist).start();
droneMachine.two.square.osc2.chain(droneMachine.two.square.gain, droneDist).start();
droneMachine.two.sawtooth.osc2.chain(droneMachine.two.sawtooth.gain, droneDist).start();
droneMachine.two.triangle.osc2.chain(droneMachine.two.triangle.gain, droneDist).start();
droneMachine.three.sine.osc2.chain(droneMachine.three.sine.gain, droneDist).start();
droneMachine.three.square.osc2.chain(droneMachine.three.square.gain, droneDist).start();
droneMachine.three.sawtooth.osc2.chain(droneMachine.three.sawtooth.gain, droneDist).start();
droneMachine.three.triangle.osc2.chain(droneMachine.three.triangle.gain, droneDist).start();
export const updateDroneMachineWave = (whichWave, whichMachine) => {
  updateDroneMachineVolume('Drone 1', droneMachine.one.volume);
  updateDroneMachineVolume('Drone 2', droneMachine.two.volume);
  updateDroneMachineVolume('Drone 3', droneMachine.three.volume);
  updateAllFrequencies();
  function waveChanger(who) {
    if (whichWave === 'sine') {
      who.square.selected = false;
      who.sawtooth.selected = false;
      who.triangle.selected = false;
      who.sine.selected = true;
      if (!who.allWavesOff) {
        who.sine.gain.gain.rampTo(1, 0.3);
        who.square.gain.gain.rampTo(0, 0.3);
        who.sawtooth.gain.gain.rampTo(0, 0.3);
        who.triangle.gain.gain.rampTo(0, 0.3);
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
        who.sine.gain.gain.rampTo(0, 0.3);
        who.square.gain.gain.rampTo(1, 0.3);
        who.sawtooth.gain.gain.rampTo(0, 0.3);
        who.triangle.gain.gain.rampTo(0, 0.3);

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
        who.sine.gain.gain.rampTo(0, 0.3);
        who.square.gain.gain.rampTo(0, 0.3);
        who.sawtooth.gain.gain.rampTo(1, 0.3);
        who.triangle.gain.gain.rampTo(0, 0.3);

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
        who.sine.gain.gain.rampTo(0, 0.3);
        who.square.gain.gain.rampTo(0, 0.3);
        who.sawtooth.gain.gain.rampTo(0, 0.3);
        who.triangle.gain.gain.rampTo(1, 0.3);

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

export const updateDroneMachineVolume = (whichMachine, value) => {
  function updater(machine) {
    machine.volume = value;

    machine.sine.oscillator.volume.value = value;
    machine.square.oscillator.volume.value = value;
    machine.sawtooth.oscillator.volume.value = value;
    machine.triangle.oscillator.volume.value = value;
    machine.sine.osc2.volume.value = value;
    machine.square.osc2.volume.value = value;
    machine.sawtooth.osc2.volume.value = value;
    machine.triangle.osc2.volume.value = value;
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
  415.3,
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
let pitchRamper = 0.01;
export const changePitch = (which, value) => {
  function updater(machine) {
    if (justIntonation) {
      machine.sine.oscillator.frequency.rampTo(justFrequencies[value] * machine.myOctave, pitchRamper);
      machine.square.oscillator.frequency.rampTo(justFrequencies[value] * machine.myOctave, pitchRamper);
      machine.sawtooth.oscillator.frequency.rampTo(justFrequencies[value] * machine.myOctave, pitchRamper);
      machine.triangle.oscillator.frequency.rampTo(justFrequencies[value] * machine.myOctave, pitchRamper);

      machine.sine.osc2.frequency.rampTo(justFrequencies[value] * machine.myOctave, pitchRamper);
      machine.square.osc2.frequency.rampTo(justFrequencies[value] * machine.myOctave, pitchRamper);
      machine.sawtooth.osc2.frequency.rampTo(justFrequencies[value] * machine.myOctave, pitchRamper);
      machine.triangle.osc2.frequency.rampTo(justFrequencies[value] * machine.myOctave, pitchRamper);

      machine.myPitchInJust = value;
      machine.myPitch = justFrequencies[value] * machine.myOctave;
    } else {
      machine.sine.oscillator.frequency.rampTo(equalFrequencies[value] * machine.myOctave, pitchRamper);

      machine.square.oscillator.frequency.rampTo(equalFrequencies[value] * machine.myOctave, pitchRamper);

      machine.sawtooth.oscillator.frequency.value(equalFrequencies[value] * machine.myOctave, pitchRamper);

      machine.triangle.oscillator.frequency.value = (equalFrequencies[value] * machine.myOctave, pitchRamper);

      machine.sine.osc2.frequency.rampTo(equalFrequencies[value] * machine.myOctave, pitchRamper);
      machine.square.osc2.frequency.rampTo(equalFrequencies[value] * machine.myOctave, pitchRamper);
      machine.sawtooth.osc2.frequency.rampTo(equalFrequencies[value] * machine.myOctave, pitchRamper);
      machine.triangle.osc2.frequency.rampTo(equalFrequencies[value] * machine.myOctave, pitchRamper);
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

function updateAllFrequencies() {
  droneMachine.one.sine.oscillator.frequency.value = droneMachine.one.myPitch;
  droneMachine.one.square.oscillator.frequency.value = droneMachine.one.myPitch;
  droneMachine.one.sawtooth.oscillator.frequency.value = droneMachine.one.myPitch;
  droneMachine.one.triangle.oscillator.frequency.value = droneMachine.one.myPitch;
  droneMachine.two.sine.oscillator.frequency.value = droneMachine.two.myPitch;
  droneMachine.two.square.oscillator.frequency.value = droneMachine.two.myPitch;
  droneMachine.two.sawtooth.oscillator.frequency.value = droneMachine.two.myPitch;
  droneMachine.two.triangle.oscillator.frequency.value = droneMachine.two.myPitch;
  droneMachine.three.sine.oscillator.frequency.value = droneMachine.three.myPitch;
  droneMachine.three.square.oscillator.frequency.value = droneMachine.three.myPitch;
  droneMachine.three.sawtooth.oscillator.frequency.value = droneMachine.three.myPitch;
  droneMachine.three.triangle.oscillator.frequency.value = droneMachine.three.myPitch;
  droneMachine.one.sine.osc2.frequency.value = droneMachine.one.myPitch;
  droneMachine.one.square.osc2.frequency.value = droneMachine.one.myPitch;
  droneMachine.one.sawtooth.osc2.frequency.value = droneMachine.one.myPitch;
  droneMachine.one.triangle.osc2.frequency.value = droneMachine.one.myPitch;
  droneMachine.two.sine.osc2.frequency.value = droneMachine.two.myPitch;
  droneMachine.two.square.osc2.frequency.value = droneMachine.two.myPitch;
  droneMachine.two.sawtooth.osc2.frequency.value = droneMachine.two.myPitch;
  droneMachine.two.triangle.osc2.frequency.value = droneMachine.two.myPitch;
  droneMachine.three.sine.osc2.frequency.value = droneMachine.three.myPitch;
  droneMachine.three.square.osc2.frequency.value = droneMachine.three.myPitch;
  droneMachine.three.sawtooth.osc2.frequency.value = droneMachine.three.myPitch;
  droneMachine.three.triangle.osc2.frequency.value = droneMachine.three.myPitch;
}

export const startDrone = (which) => {
  updateAllFrequencies();
  if (!droneMachine.data.machineOn) {
    droneMachine.data.machineOn = true;
  }
  function waveChooser(machine) {
    function startBoth(whatWave) {
      if (whatWave === 'sine') {
        machine.sine.oscillator.frequency.value = machine.myPitch;
        machine.sine.oscillator.volume.value = machine.volume;
        machine.sine.osc2.frequency.value = machine.myPitch;
        machine.sine.osc2.volume.value = machine.volume;
        machine.sine.gain.gain.rampTo(1, 0.3);
      }
      if (whatWave === 'square') {
        machine.square.oscillator.frequency.value = machine.myPitch;
        machine.square.oscillator.volume.value = machine.volume;
        machine.square.osc2.frequency.value = machine.myPitch;
        machine.square.osc2.volume.value = machine.volume;
        machine.square.gain.gain.rampTo(1, 0.3);
      }
      if (whatWave === 'sawtooth') {
        machine.sawtooth.oscillator.frequency.value = machine.myPitch;
        machine.sawtooth.oscillator.volume.value = machine.volume;
        machine.sawtooth.osc2.frequency.value = machine.myPitch;
        machine.sawtooth.osc2.volume.value = machine.volume;
        machine.sawtooth.gain.gain.rampTo(1, 0.3);
      }
      if (whatWave === 'triangle') {
        machine.triangle.oscillator.frequency.value = machine.myPitch;
        machine.triangle.oscillator.volume.value = machine.volume;
        machine.triangle.osc2.frequency.value = machine.myPitch;
        machine.triangle.osc2.volume.value = machine.volume;
        machine.triangle.gain.gain.rampTo(1, 0.3);
      }
    }

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
      machine.sine.gain.gain.rampTo(0, 0.3);
    }
    if (machine.square.on) {
      machine.square.gain.gain.rampTo(0, 0.3);
    }
    if (machine.sawtooth.on) {
      machine.sawtooth.gain.gain.rampTo(0, 0.3);
    }
    if (machine.triangle.on) {
      machine.triangle.gain.gain.rampTo(0, 0.3);
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

import * as Tone from 'tone';

///TONE SETTINGS
Tone.context.dispose();
const audioContext = new AudioContext();
Tone.setContext(audioContext);

Tone.Master.volume.value = -10; // turning this too high causes big problems!!!
Tone.context.latencyHint = 'balanced'; //// make this  a variable with warning???

export const theLimiter = new Tone.Limiter({
  threshold: -12
}).toMaster();

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
      oscillator: [],
      on: false,
      selected: true
    },

    square: {
      oscillator: [],
      on: false,
      selected: false
    },

    sawtooth: {
      oscillator: [],

      on: false,
      selected: false
    },

    triangle: {
      oscillator: [],

      on: false,
      selected: false
    },
    allWavesOff: true,
    volume: -35,
    myPitch: 261.63,
    myPitchInJust: 0,
    myPitchInEqual: 0,
    myOctave: 1
  },
  two: {
    sine: {
      oscillator: [],

      on: false,
      selected: true
    },

    square: {
      oscillator: [],

      on: false,
      selected: false
    },

    sawtooth: {
      oscillator: [],

      on: false,
      selected: false
    },

    triangle: {
      oscillator: [],

      on: false,
      selected: false
    },
    allWavesOff: true,
    volume: -35,
    myPitch: 261.63,
    myPitchInJust: 0,
    myPitchInEqual: 0,
    myOctave: 1
  },
  three: {
    sine: {
      oscillator: [],

      on: false,
      selected: true
    },

    square: {
      oscillator: [],

      on: false,
      selected: false
    },

    sawtooth: {
      oscillator: [],

      on: false,
      selected: false
    },

    triangle: {
      oscillator: [],

      on: false,
      selected: false
    },
    allWavesOff: true,
    volume: -35,
    myPitch: 261.63,
    myPitchInJust: 0,
    myPitchInEqual: 0,
    myOctave: 1
  }
};

const makeNewOscillator = (whichMachine, whatWave) => {
  const freshOsc = new Tone.Oscillator(whichMachine.myPitch, whatWave).connect(droneDist);
  freshOsc.volume.value = whichMachine.volume;
  switch (whatWave) {
    case 'sine':
      whichMachine.sine.oscillator.push(freshOsc);
      break;
    case 'square':
      whichMachine.square.oscillator.push(freshOsc);
      break;
    case 'sawtooth':
      whichMachine.sawtooth.oscillator.push(freshOsc);
      break;
    case 'triangle':
      whichMachine.triangle.oscillator.push(freshOsc);
      break;
    default:
      console.log('You made an error somewhere');
      break;
  }
};

const destroyOscillator = (whatToDestroy) => {
  if (whatToDestroy.oscillator.length > 0) {
    whatToDestroy.oscillator[0].stop();
    whatToDestroy.oscillator[0].dispose();
    whatToDestroy.oscillator.splice(0, whatToDestroy.oscillator.length);
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
        makeNewOscillator(who, 'sine');
        who.sine.oscillator[0].start();
        destroyOscillator(who.square);
        destroyOscillator(who.sawtooth);
        destroyOscillator(who.triangle);
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
        makeNewOscillator(who, 'square');
        who.square.oscillator[0].start();
        destroyOscillator(who.sine);
        destroyOscillator(who.sawtooth);
        destroyOscillator(who.triangle);

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
        makeNewOscillator(who, 'sawtooth');
        who.sawtooth.oscillator[0].start();
        destroyOscillator(who.sine);
        destroyOscillator(who.square);
        destroyOscillator(who.triangle);

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
        makeNewOscillator(who, 'triangle');
        who.triangle.oscillator[0].start();
        destroyOscillator(who.sine);
        destroyOscillator(who.sawtooth);
        destroyOscillator(who.square);

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
    if (machine.sine.oscillator.length > 0) {
      machine.sine.oscillator[0].volume.value = value;
    }
    if (machine.square.oscillator.length > 0) {
      machine.square.oscillator[0].volume.value = value;
    }
    if (machine.sawtooth.oscillator.length > 0) {
      machine.sawtooth.oscillator[0].volume.value = value;
    }
    if (machine.triangle.oscillator.length > 0) {
      machine.triangle.oscillator[0].volume.value = value;
    }
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

export const changePitch = (which, value) => {
  function updater(machine) {
    if (justIntonation) {
      if (machine.sine.oscillator.length > 0) {
        machine.sine.oscillator[0].frequency.value = justFrequencies[value] * machine.myOctave;
      }
      if (machine.square.oscillator.length > 0) {
        machine.square.oscillator[0].frequency.value = justFrequencies[value] * machine.myOctave;
      }
      if (machine.sawtooth.oscillator.length > 0) {
        machine.sawtooth.oscillator[0].frequency.value = justFrequencies[value] * machine.myOctave;
      }
      if (machine.triangle.oscillator.length > 0) {
        machine.triangle.oscillator[0].frequency.value = justFrequencies[value] * machine.myOctave;
      }

      machine.myPitchInJust = value;
      machine.myPitch = justFrequencies[value] * machine.myOctave;
    } else {
      if (machine.sine.oscillator.length > 0) {
        machine.sine.oscillator[0].frequency.value = equalFrequencies[value] * machine.myOctave;
      }
      if (machine.square.oscillator.length > 0) {
        machine.square.oscillator[0].frequency.value = equalFrequencies[value] * machine.myOctave;
      }
      if (machine.sawtooth.oscillator.length > 0) {
        machine.sawtooth.oscillator[0].frequency.value = equalFrequencies[value] * machine.myOctave;
      }
      if (machine.triangle.oscillator.length > 0) {
        machine.triangle.oscillator[0].frequency.value = equalFrequencies[value] * machine.myOctave;
      }

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
        makeNewOscillator(machine, 'sine');
        machine.sine.oscillator[0].frequency.value = machine.myPitch;
        machine.sine.oscillator[0].volume.value = machine.volume;
        machine.sine.oscillator[0].start();
      }
      if (whatWave === 'square') {
        makeNewOscillator(machine, 'square');
        machine.square.oscillator[0].frequency.value = machine.myPitch;
        machine.square.oscillator[0].volume.value = machine.volume;
        machine.square.oscillator[0].start();
      }
      if (whatWave === 'sawtooth') {
        makeNewOscillator(machine, 'sawtooth');
        machine.sawtooth.oscillator[0].frequency.value = machine.myPitch;
        machine.sawtooth.oscillator[0].volume.value = machine.volume;
        machine.sawtooth.oscillator[0].start();
      }
      if (whatWave === 'triangle') {
        makeNewOscillator(machine, 'triangle');
        machine.triangle.oscillator[0].frequency.value = machine.myPitch;
        machine.triangle.oscillator[0].volume.value = machine.volume;
        machine.triangle.oscillator[0].start();
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
      destroyOscillator(machine.sine);
    }
    if (machine.square.on) {
      destroyOscillator(machine.square);
    }
    if (machine.sawtooth.on) {
      destroyOscillator(machine.sawtooth);
    }
    if (machine.triangle.on) {
      destroyOscillator(machine.triangle);
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

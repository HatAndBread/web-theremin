import * as Tone from 'tone';
import { s2pd } from './s2pd.js';
import { friends } from './friends.js';
import { changeDroneIntonation, theLimiter } from './droneInstruments';

/////****************************************SCREEN */
let toolbarSize = 0;
let appStarted = false;

export const startApp = () => {
  appStarted = true;
};
export const toolbarSizeChanged = (size) => {
  toolbarSize = size;

  windowResizer();
};

const reSizeMusicBoard = () => {
  if (appStarted) {
    musicBoard.width = s2pd.canvas.width;
    musicBoard.height = s2pd.canvas.height;
    if (justIntonation) {
      drawBoard(justRatios);
    }
    if (!justIntonation) {
      drawBoard(equalTempRatios);
    }
  }
  if (!appStarted) {
    s2pd.canvas.width = Math.floor(window.innerWidth);
    s2pd.canvas.height = Math.floor(window.innerHeight);
    s2pd.width = s2pd.canvas.width;
    s2pd.height = s2pd.canvas.height;

    if (justIntonation) {
      drawBoard(justRatios);
    }
    if (!justIntonation) {
      drawBoard(equalTempRatios);
    }
  }
};

const windowResizer = () => {
  if (appStarted) {
    s2pd.canvas.width = Math.floor(window.innerWidth);
    s2pd.canvas.height = Math.floor(window.innerHeight * 0.8) - toolbarSize;
    s2pd.width = s2pd.canvas.width;
    s2pd.height = s2pd.canvas.height;
    reSizeMusicBoard();
    initialize();
  } else {
    s2pd.canvas.width = Math.floor(window.innerWidth);
    s2pd.canvas.height = Math.floor(window.innerHeight);
    s2pd.width = s2pd.canvas.width;
    s2pd.height = s2pd.canvas.height;

    if (justIntonation) {
      drawBoard(justRatios);
    }
    if (!justIntonation) {
      drawBoard(equalTempRatios);
    }
  }
};

window.addEventListener('resize', windowResizer);
window.addEventListener('orientationchange', windowResizer);
///////////////////***********************************MUSIC LOGIC START */
///////////////////***********************************MUSIC LOGIC START */
///////////////////***********************************MUSIC LOGIC START */
///////////////////***********************************MUSIC LOGIC START */
///////////////////***********************************MUSIC LOGIC START */
///////////////////***********************************MUSIC LOGIC START */

export const UpdateThereminData = (obj) => {
  for (const [key, value] of Object.entries(obj)) {
    /// COOL!
    thereminData[key] = value;
  }
  if (thereminData.musicStarted) {
  }
};

export const setOctave = (howMuch) => {
  thereminData.octaveChanger = howMuch;
};

export const makePedalTone = () => {
  thereminData.pedalToneAdded ? (thereminData.pedalToneAdded = false) : (thereminData.pedalToneAdded = true);
  if (thereminData.pedalToneAdded) {
    s2pd.exit = false;
    gameLoop();
  } else {
    thereminData.firstTimePedalAdded = true;
    if (!thereminData.infinityMachine) {
      // If infinity  AND pedal are off stop loop.
      s2pd.exit = true;
      pedalDude.xPos = -10000;
      initialize();
    }
    if (thereminData.infinityMachine) {
      // Keep loop going if infinity is on.
      pedalDude.xPos = -10000;
      initialize();
    }
  }
};

const removeInfinity = () => {
  s2pd.exit = true;
  thereminData.infinityMachine = false;
  console.log('current synth before function:');
  console.log(currentSynth);
  currentSynth.forEach((index) => {
    index.triggerRelease(thereminData.trailOff);
    setTimeout(function () {
      index.dispose();
    }, thereminData.trailOff * 5000);
  });
  currentSynth.splice(0, currentSynth.length);
  console.log('At the end of function:');
  console.log(currentSynth);
};

export const addInfinity = () => {
  thereminData.infinityMachine ? removeInfinity() : (thereminData.infinityMachine = true);
  if (thereminData.infinityMachine) {
    thereminData.intinityMachineFirstTime = true;
  }
  if (!thereminData.infinityMachine) {
    thereminData.intinityMachineFirstTime = false;
  }
};

////************************************GAME VARIABLES */
const mike = new s2pd.Text('Mike', '🎤', -1000, -10000, 'Georgia', 100);
const pinkDude = new s2pd.Text('pinkDude', '🙉', -10000, -10000, 'Georgia', 100);
pinkDude.makeDraggable();
const musicBoard = new s2pd.Rectangle('musicBoard', 0, 0, s2pd.width, s2pd.height, 'rgb(30,10,10)');
const pedalDude = new s2pd.Text(
  'pedalDude',
  friends[s2pd.randomBetween(0, friends.length - 1)],
  100,
  -10000,
  'Georgia',
  80
);
pedalDude.makeDraggable();
musicBoard.makeHoldable();
s2pd.finalize(musicBoard);
const thereminDude = new s2pd.Circle('stupid', -600, -200, s2pd.width / 37, s2pd.getRandomColor());

const thereminData = {
  allEffectsOff: true,
  musicStarted: false,
  sine: false,
  square: false,
  sawtooth: false,
  triangle: false,
  sineVolume: -25,
  squareVolume: -25,
  sawtoothVolume: -25,
  triangleVolume: -25,
  attack: 0.7,
  sustain: 0.7,
  decay: 0.1,
  release: 0.7,
  randomWarble: false,
  randomWarbleValue: 0,
  noFx: true,
  vibratoDepth: 0.09,
  vibratoFrequency: 6,
  warbleCounter: 0,
  warbleAscending: true,
  vibratoOn: false,
  octaveChanger: 1,
  pitchShifterAmount: 0,
  pitchShifterOn: false,
  distortionAmount: 0,
  distortionOn: false,
  crusherAmount: 8,
  crusherOn: false,
  delayTime: 0,
  delayFeedback: 0,
  delayOn: false,
  pedalToneAdded: false,
  firstTimePedalAdded: true,
  infinityMachine: false,
  intinityMachineFirstTime: true,
  effectsWetness: 1,
  trailOff: '+.2'
};

//////***** EFFECTS */
export const removeEffect = (effect) => {
  switch (effect) {
    case 'Distortion':
      thereminData.distortionOn = false;
      thereminData.distortionAmount = 0;

      break;
    case 'Crusher':
      thereminData.crusherOn = false;
      crusher.disconnect();

      pitchShifter.connect(theLimiter);

      break;
    case 'PitchShifter':
      thereminData.pitchShifterOn = false;
      thereminData.pitchShifterAmount = 0;

      break;
    case 'Delay':
      thereminData.delayOn = false;
      thereminData.delayFeedback = 0;
      thereminData.delayTime = 0;

      break;
    case 'Pulverizer':
      thereminData.randomWarble = false;
      thereminData.noFx = true;
      break;
    case 'Vibrato':
      thereminData.vibratoOn = false;
      thereminData.vibratoDepth = 0;
      thereminData.vibratoFrequency = 0;
      break;
    default:
      break;
  }
  if (!thereminData.pitchShifterOn && !thereminData.delayOn && !thereminData.distortionOn && !thereminData.vibratoOn) {
    thereminData.allEffectsOff = true;
  }
};

export const addEffect = (effect, currentLevel1, currentLevel2) => {
  if (thereminData.allEffectsOff) {
    thereminData.allEffectsOff = false;
  }
  if (effect === 'Distortion') {
    thereminData.distortionAmount = currentLevel1;
    thereminData.distortionOn = true;
  }
  if (effect === 'Crusher') {
    thereminData.crusherOn = true;
    thereminData.crusherAmount = currentLevel1;

    pitchShifter.disconnect();
    pitchShifter.connect(crusher);
    crusher.connect(theLimiter);
  }
  if (effect === 'PitchShifter') {
    thereminData.pitchShifterOn = true;
    thereminData.pitchShifterAmount = currentLevel1;
  }
  if (effect === 'Delay') {
    thereminData.delayOn = true;
    thereminData.delayTime = currentLevel1;
    thereminData.delayFeedback = currentLevel2;
  }
  if (effect === 'Vibrato') {
    thereminData.vibratoOn = true;
    thereminData.vibratoDepth = currentLevel1;
    thereminData.vibratoFrequency = currentLevel2;
  }
  if (effect === 'Pulverizer') {
    thereminData.noFx = false;
    thereminData.randomWarble = true;
    thereminData.randomWarbleValue = currentLevel1;
  }
};

const crusher = new Tone.BitCrusher(thereminData.crusherAmount);

const pitchShifter = new Tone.PitchShift(thereminData.pitchShifterAmount);
const pingPong = new Tone.FeedbackDelay(thereminData.delayTime, thereminData.delayFeedback);

const vibrato = new Tone.Vibrato(thereminData.vibratoFrequency, thereminData.vibratoDepth);
const lowpass = new Tone.Filter({
  type: 'lowpass',
  frequency: 523,
  rolloff: -12,
  Q: 1,
  gain: 0
});
const comp = new Tone.Compressor();
const dist = new Tone.Distortion(thereminData.distortionAmount).chain(
  lowpass,
  vibrato,
  comp,
  pingPong,
  pitchShifter,
  theLimiter
);
vibrato.wet.value = thereminData.effectsWetness;
crusher.wet.value = thereminData.effectsWetness;
pitchShifter.wet.value = thereminData.effectsWetness;

pingPong.wet.value = thereminData.effectsWetness;
dist.wet.value = thereminData.effectsWetness;
// ********************INSTRUMENTS*****************
const pinky = new Tone.Noise({
  noise: {
    type: 'pink'
  },
  envelope: {
    attack: 0.005,
    decay: 0.1,
    sustain: 0
  }
});
const noisePitchShifter = new Tone.PitchShift();
const noiseDistortion = new Tone.Distortion();
const noiseCrusher = new Tone.BitCrusher();
noiseCrusher.bits = 6;
const noiseVolume = new Tone.Volume(-20);
pinky.chain(noisePitchShifter, noiseDistortion, noiseCrusher, noiseVolume);
pinky.start();

let noiseOn = false;
export const turnNoiseOn = () => {
  if (s2pd.exit) {
    s2pd.exit = false;
    gameLoop();
  }
  pinkDude.xPos = s2pd.width / 2;
  pinkDude.yPos = 100;
  pinky.start();
  noiseOn = true;
  noiseVolume.connect(theLimiter);
};

export const turnNoiseOff = () => {
  if (!s2pd.exit) {
    s2pd.exit = true;
  }
  pinkDude.xPos = -10000;
  pinkDude.yPos = -10000;
  pinky.stop();
  noiseVolume.disconnect();
  noiseOn = false;
  initialize();
};

const microphone = new Tone.UserMedia(-10);
const micPitchShifter = new Tone.PitchShift(-10);
const micPingPong = new Tone.PingPongDelay(0.1, 0.1);
const micVolume = new Tone.Volume(0);

export const turnOnMike = () => {
  if (s2pd.exit) {
    s2pd.exit = false;
    gameLoop();
  }
  microphone
    .open()
    .then(function () {
      console.log('available');
      microphone.chain(micPitchShifter, micPingPong, micVolume, theLimiter);
    })
    .catch((e) => {
      alert(e);
    });
  mike.xPos = s2pd.width / 2;
  mike.yPos = s2pd.height / 2;
};
export const turnOffMike = () => {
  if (!s2pd.exit) {
    s2pd.exit = true;
  }
  microphone.disconnect();
  mike.xPos = -10000;
  mike.yPos = -10000;
  initialize();
};

export const updateMikeVolume = (value) => {
  micVolume.volume.value = value;
};

export const updateTheremin = () => {
  for (let i = 0; i < currentSynth.length; i++) {
    function updater(whichVolumeToUpdate) {
      currentSynth[i].volume.value = whichVolumeToUpdate;
      currentSynth[i].envelope.attack = thereminData.attack;
      currentSynth[i].envelope.sustain = thereminData.sustain;
      currentSynth[i].envelope.decay = thereminData.decay;
      currentSynth[i].envelope.release = thereminData.release;
    }
    if (thereminData.sine) {
      updater(thereminData.sineVolume);
    }
    if (thereminData.square) {
      updater(thereminData.squareVolume);
    }
    if (thereminData.sawtooth) {
      updater(thereminData.sawtoothVolume);
    }
    if (thereminData.triangle) {
      updater(thereminData.triangleVolume);
    }
  }
  dist.distortion = thereminData.distortionAmount * 0.1;
  pitchShifter.pitch = thereminData.pitchShifterAmount;
  pingPong.delayTime.value = thereminData.delayTime;
  vibrato.frequency.value = thereminData.vibratoFrequency;
  vibrato.depth.value = thereminData.vibratoDepth;
  pingPong.feedback.value = thereminData.delayFeedback;
  crusher.bits = thereminData.crusherAmount;
  crusher.wet.value = thereminData.effectsWetness;
  pitchShifter.wet.value = thereminData.effectsWetness;
  pingPong.wet.value = thereminData.effectsWetness;
  dist.wet.value = thereminData.effectsWetness;
  vibrato.wet.value = thereminData.effectsWetness;
};

const returnStartFrequency = (octave) => {
  /// THIS IS USED TO RETURN THE FREQUENCY THAT THE THEREMIN SHOULD START ON
  if (thereminDude.xPos >= 523.26 && thereminDude.xPos < 1046.52) {
    return Math.floor(thereminDude.xPos * octave);
  } else if (thereminDude.xPos < 523.26) {
    return Math.floor((thereminDude.xPos + 261.3 - thereminDude.xPos / 2) * octave);
  } else if (thereminDude.xPos >= 1046.52 && thereminDude.xPos) {
    return Math.floor((thereminDude.xPos - (1046.52 - thereminDude.xPos)) * octave);
  } else {
    return 440;
  }
};

const frequencyChanger = (warble, octave) => {
  // THIS IS USED TO UPDATE THE FREQUENCY OF THE THEREMIN WHEN USER MOVES FINGER
  if (thereminData.randomWarble) {
    if (thereminDude.xPos >= 523.26 && thereminDude.xPos < 1046.52) {
      currentSynth.forEach((index) => {
        index.frequency.value = Math.floor(thereminDude.xPos * octave) + warble;
      });
    } else if (thereminDude.xPos < 523.26) {
      currentSynth.forEach((index) => {
        index.frequency.value = Math.floor((thereminDude.xPos + 261.3 - thereminDude.xPos / 2) * octave) + warble;
      });
    } else if (thereminDude.xPos >= 1046.52 && thereminDude.xPos) {
      currentSynth.forEach((index) => {
        index.frequency.value = Math.floor((thereminDude.xPos - (1046.52 - thereminDude.xPos)) * octave) + warble;
      });
    } else {
      currentSynth.forEach((index) => {
        index.frequency.value = Math.floor(thereminDude.xPos * octave) + warble;
      });
    }
  } else {
    if (thereminDude.xPos >= 523.26 && thereminDude.xPos < 1046.52) {
      currentSynth.forEach((index) => {
        index.frequency.value = Math.floor(thereminDude.xPos * octave);
      });
    } else if (thereminDude.xPos < 523.26) {
      currentSynth.forEach((index) => {
        index.frequency.value = Math.floor((thereminDude.xPos + 261.3 - thereminDude.xPos / 2) * octave);
      });
    } else if (thereminDude.xPos >= 1046.52 && thereminDude.xPos) {
      currentSynth.forEach((index) => {
        index.frequency.value = Math.floor((thereminDude.xPos - (1046.52 - thereminDude.xPos)) * octave);
      });
    } else {
      currentSynth.forEach((index) => {
        index.frequency.value = Math.floor(thereminDude.xPos * octave);
      });
    }
  }
};

let startCounter = 0;
let stopCounter = 0;

///************************************* FRET BOARD AND INTONATION *////************************************* FRET BOARD AND INTONATION */
///************************************* FRET BOARD AND INTONATION *////************************************* FRET BOARD AND INTONATION */
///************************************* FRET BOARD AND INTONATION *////************************************* FRET BOARD AND INTONATION */
///************************************* FRET BOARD AND INTONATION *////************************************* FRET BOARD AND INTONATION *
///************************************* FRET BOARD AND INTONATION *////************************************* FRET BOARD AND INTONATION */
///************************************* FRET BOARD AND INTONATION *////************************************* FRET BOARD AND INTONATION */

let justIntonation = true;
export const updateIntonation = (which) => {
  if (which === 'just') {
    justIntonation = true;
    drawBoard(justRatios);
    changeDroneIntonation('just');
    initialize();
  }
  if (which === 'et') {
    justIntonation = false;
    drawBoard(equalTempRatios);
    changeDroneIntonation('et');
    initialize();
  }
};
const justRatios = [1, 25 / 24, 9 / 8, 6 / 5, 5 / 4, 4 / 3, 45 / 32, 3 / 2, 8 / 5, 5 / 3, 9 / 5, 15 / 8, 2];
const equalTempRatios = [1, 1.06, 1.12, 1.19, 1.26, 1.33, 1.41, 1.5, 1.59, 1.68, 1.78, 1.89, 2];

const fretThickener = (i) => {
  switch (i) {
    case 0:
      return 15;

    case 3:
      return 8;

    case 5:
      return 12;

    case 7:
      return 8;

    case 9:
      return 8;
    case 12:
      return 15;
    default:
      return 2;
  }
};
const fretPainter = (i) => {
  switch (i) {
    case 0:
      return 'rgb(255,255,0)';

    case 3:
      return 'rgb(197,194,254)';

    case 5:
      return 'rgb(255,60,70)';

    case 7:
      return 'rgb(197,194,254)';

    case 9:
      return 'rgb(197,194,254)';
    case 12:
      return 'rgb(255,255,0)';
    default:
      return 'rgb(20,254,84)';
  }
};

const frets = [];
const drawBoard = (whichArray) => {
  for (let i = 0; i < frets.length; i++) {
    if (frets[i]) {
      frets[i].xPos = -10000;
    }
  }
  for (let i = 0; i < frets.length; i++) {
    if (frets[i]) {
      if (frets[i].xPos < -10) {
        frets[i] = null;
      }
    }
  }

  for (let i = frets.length; i >= 0; i--) {
    // Go backwards to splice an array with a for loop
    if (!frets[i]) {
      frets.splice(i, 1);
    }
  }

  for (let i = 0; i < whichArray.length; i++) {
    const fret = new s2pd.Rectangle(
      'fret',
      523.26 * whichArray[i] - 523.26,
      0,
      fretThickener(i),
      s2pd.height,
      fretPainter(i)
    );
    s2pd.finalize(fret);
    frets.push(fret);
  }
  for (let i = 0; i < whichArray.length; i++) {
    const fret = new s2pd.Rectangle('fret', 523.26 * whichArray[i], 0, fretThickener(i), s2pd.height, fretPainter(i));
    s2pd.finalize(fret);
    frets.push(fret);
  }
  for (let i = 0; i < whichArray.length; i++) {
    const fret = new s2pd.Rectangle(
      'fret',
      526.26 * whichArray[i] + 526.26,
      0,
      fretThickener(i),
      s2pd.height,
      fretPainter(i)
    );
    s2pd.finalize(fret);
    frets.push(fret);
  }
};
drawBoard(justRatios);

///******** FINALIZE Z ORDER OF VISUALS */
s2pd.finalize(pedalDude);
s2pd.finalize(thereminDude);
mike.makeDraggable();
s2pd.finalize(mike);
s2pd.finalize(pinkDude);

//*********************CREATE SYNTHS*************////
//*********************CREATE SYNTHS*************////
//*********************CREATE SYNTHS*************////
//*********************CREATE SYNTHS*************////
//*********************CREATE SYNTHS*************////
//*********************CREATE SYNTHS*************////
//*********************CREATE SYNTHS*************////
//*********************CREATE SYNTHS*************////
//*********************CREATE SYNTHS*************////
//*********************CREATE SYNTHS*************////
//*********************CREATE SYNTHS*************////
//*********************CREATE SYNTHS*************////
//*********************CREATE SYNTHS*************////

const currentSynth = [];

export const onBeingLetUp = (heldObject) => {
  function howManyThingsToPop() {
    if (!thereminData.sine && !thereminData.square && !thereminData.sawtooth && !thereminData.triangle) {
      return 0;
    }
    if (thereminData.sine && !thereminData.square && !thereminData.sawtooth && !thereminData.triangle) {
      return 1;
    }
    if (!thereminData.sine && thereminData.square && !thereminData.sawtooth && !thereminData.triangle) {
      return 1;
    }
    if (!thereminData.sine && !thereminData.square && thereminData.sawtooth && !thereminData.triangle) {
      return 1;
    }
    if (!thereminData.sine && !thereminData.square && !thereminData.sawtooth && thereminData.triangle) {
      return 1;
    }
    if (thereminData.sine && thereminData.square && !thereminData.sawtooth && !thereminData.triangle) {
      return 2;
    }
    if (thereminData.sine && !thereminData.square && thereminData.sawtooth && !thereminData.triangle) {
      return 2;
    }
    if (thereminData.sine && !thereminData.square && !thereminData.sawtooth && thereminData.triangle) {
      return 2;
    }
    if (!thereminData.sine && thereminData.square && thereminData.sawtooth && !thereminData.triangle) {
      return 2;
    }
    if (!thereminData.sine && thereminData.square && !thereminData.sawtooth && thereminData.triangle) {
      return 2;
    }
    if (!thereminData.sine && !thereminData.square && thereminData.sawtooth && thereminData.triangle) {
      return 2;
    }
    if (!thereminData.sine && thereminData.square && thereminData.sawtooth && thereminData.triangle) {
      return 3;
    }
    if (thereminData.sine && !thereminData.square && thereminData.sawtooth && thereminData.triangle) {
      return 3;
    }
    if (thereminData.sine && thereminData.square && !thereminData.sawtooth && thereminData.triangle) {
      return 3;
    }
    if (thereminData.sine && thereminData.square && thereminData.sawtooth && !thereminData.triangle) {
      return 3;
    }
    if (thereminData.sine && thereminData.square && thereminData.sawtooth && thereminData.triangle) {
      return 4;
    }
  }
  if (heldObject === musicBoard && !thereminData.infinityMachine) {
    if (!s2pd.exit) {
      s2pd.exit = true;
      if (thereminData.sine || thereminData.square || thereminData.sawtooth || thereminData.triangle) {
        try {
          if (!thereminData.pedalToneAdded) {
            for (let i = 0; i < howManyThingsToPop(); i++) {
              let lastSynth = currentSynth.pop();
              lastSynth.triggerRelease(thereminData.trailOff);
              setTimeout(function () {
                lastSynth.dispose();
                console.log('this is the synth array: ');
                console.log(currentSynth);
              }, thereminData.trailOff * 5000);
            }
          }
          if (thereminData.pedalToneAdded && !thereminData.infinityMachine) {
            for (let i = 0; i < howManyThingsToPop(); i++) {
              let lastSynth = currentSynth.pop();
              lastSynth.triggerRelease(thereminData.trailOff);
              setTimeout(function () {
                lastSynth.dispose();
                console.log('this is the synth array: ');
                console.log(currentSynth);
              }, thereminData.trailOff * 5000);
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};
export const onBeingHeldDown = (heldObject) => {
  /// What to do if user touches canvas
  const synthFactory = (waveType) => {
    /// Function to create a new synth each time user touches canvas.
    try {
      const freshSynth = new Tone.MonoSynth({
        oscillator: {
          type: waveType
        },
        envelope: {
          attack: thereminData.attack,
          decay: thereminData.decay,
          sustain: thereminData.sustain,
          release: thereminData.release
        }
      }).connect(dist);
      if (thereminData.sine) {
        freshSynth.volume.value = thereminData.sineVolume;
      }
      if (thereminData.square) {
        freshSynth.volume.value = thereminData.squareVolume;
      }
      if (thereminData.sawtooth) {
        freshSynth.volume.value = thereminData.sawtoothVolume;
      }
      if (thereminData.triangle) {
        freshSynth.volume.value = thereminData.triangleVolume;
      }
      freshSynth.triggerAttack(returnStartFrequency(thereminData.octaveChanger));
      currentSynth.unshift(freshSynth);

      console.log(currentSynth);
    } catch {
      console.log('doesnt exist');
    }
  };
  if (heldObject === musicBoard) {
    if (s2pd.exit && !thereminData.pedalToneAdded) {
      if (s2pd.exit) {
        s2pd.exit = false;
        gameLoop();
      }

      if (thereminData.sine) {
        ////// If user holds on canvas create new synths.

        // make sure that length never exceeds one
        synthFactory('sine');
      }
      if (thereminData.square) {
        synthFactory('square');
      }
      if (thereminData.sawtooth) {
        synthFactory('sawtooth');
      }
      if (thereminData.triangle) {
        synthFactory('triangle');
      }
    }
    if (thereminData.pedalToneAdded && !thereminData.infinityMachine && currentSynth.length === 0) {
      if (s2pd.exit) {
        s2pd.exit = false;
        gameLoop();
      }

      if (thereminData.sine) {
        ////// If user holds on canvas create new synths.

        // make sure that length never exceeds one
        synthFactory('sine');
      }
      if (thereminData.square) {
        synthFactory('square');
      }
      if (thereminData.sawtooth) {
        synthFactory('sawtooth');
      }
      if (thereminData.triangle) {
        synthFactory('triangle');
      }
    }
    if (thereminData.infinityMachine && currentSynth.length === 0) {
      if (s2pd.exit) {
        s2pd.exit = false;
        gameLoop();
      }

      if (thereminData.sine) {
        ////// If user holds on canvas create new synths.

        // make sure that length never exceeds one
        synthFactory('sine');
      }
      if (thereminData.square) {
        synthFactory('square');
      }
      if (thereminData.sawtooth) {
        synthFactory('sawtooth');
      }
      if (thereminData.triangle) {
        synthFactory('triangle');
      }
    }
  }
};

//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /
//****************************************LOOP START******************************** /

const initialize = () => {
  s2pd.width = s2pd.canvas.width;
  s2pd.height = s2pd.canvas.height;
  s2pd.ctx.clearRect(0, 0, s2pd.width, s2pd.height);

  for (let i = 0; i < s2pd.allGameObjects.length; i++) {
    s2pd.allGameObjects[i].make();
    s2pd.allGameObjects[i].id = i;
    s2pd.allGameObjects[i].updatePos();
  }
  for (let i = 0; i < s2pd.clickableObjects.length; i++) {
    s2pd.clickableObjects[i].clickableId = i;
  }
  if (s2pd.hitDetectObjects.length > 0) {
    for (let i = 0; i < s2pd.hitDetectObjects.length; i++) {
      s2pd.hitDetectObjects[i].hitBoxId = i;
    }
  }
  if (s2pd.enableDragAndDrop) {
    for (let i = 0; i < s2pd.draggableObjects.length; i++) {
      s2pd.draggableObjects[i].draggableId = i;
    }
  }
};

//////************************KEEP TRACK OF WHEN USER FINGER HAS MOVED */

const fingerTracker = {
  currentPosition: thereminDude.xPos,
  priorPosition: 0
};

export const gameLoop = () => {
  initialize();

  //**********************PROGRAM APPLICATION HERE ************/
  //**********************//**********************//**********************
  //**********************//**********************//**********************//**********************
  //**********************//**********************//**********************//**********************
  //**********************//**********************//**********************
  //**********************//**********************
  //**********************
  let warble = 0;
  if (thereminData.randomWarble) {
    warble = s2pd.randomBetween(-thereminData.randomWarbleValue, thereminData.randomWarbleValue);
  }

  if (noiseOn) {
    noiseVolume.volume.value = Math.floor(pinkDude.yPos / 10) * -1;
    let noiseRan = s2pd.randomBetween(0, Math.floor(pinkDude.xPos / 20));
    if (noiseRan === 3) {
      pinky.type = 'white';
    }
    if (noiseRan === 4) {
      pinky.type = 'brown';
    }
    if (noiseRan === 5) {
      pinky.type = 'pink';
    }
    if (noiseRan === 6) {
      noisePitchShifter.pitch = s2pd.randomBetween(-100, 100);
    }
    if (noiseRan === 7) {
      noisePitchShifter.pitch = s2pd.randomBetween(200, 300);
    }
  }
  if (mike.yPos > 0) {
    micPitchShifter.pitch = (mike.xPos - s2pd.width / 2) / 50;
    micPingPong.delayTime.value = mike.yPos / 700;
    micPingPong.feedback.value = mike.yPos / 700;
  }

  if (thereminData.pedalToneAdded) {
    if (thereminData.firstTimePedalAdded) {
      pedalDude.xPos = 523.26 - pedalDude.width / 2;
      pedalDude.yPos = s2pd.height / 2;
      thereminData.firstTimePedalAdded = false;
    }
  } else {
    pedalDude.yPos = -10000;
  }
  ////INCREASE AND DECREASE SIZE OF USER FINGER CIRCLE

  if (thereminDude.radius <= s2pd.height / 38) {
    thereminDude.ascending = true;
  }
  if (thereminDude.radius >= s2pd.height / 28) {
    thereminDude.ascending = false;
  }
  if (thereminDude.ascending) {
    thereminDude.radius += 0.2;
  } else {
    thereminDude.radius -= 0.2;
  }

  //********************GET PRIOR POSITION OF USER FINGER ************************************ */
  fingerTracker.priorPosition = thereminDude.xPos;

  if (musicBoard.holdDown && !thereminData.infinityMachine && !mike.dragging && !pinkDude.dragging) {
    stopCounter = 0;
    startCounter += 1;
    if (s2pd.touchDetected) {
      thereminDude.xPos = s2pd.touchMoveX;
      thereminDude.yPos = s2pd.touchMoveY;
    } else {
      thereminDude.xPos = s2pd.mouseXcurrent;
      thereminDude.yPos = s2pd.mouseYcurrent;
    }
  }

  if (!musicBoard.holdDown) {
    stopCounter += 1;
    startCounter = 0;
    if (stopCounter === 1) {
    }
    if (thereminData.pedalToneAdded) {
      thereminDude.xPos = pedalDude.xPos + pedalDude.width / 2;
    }
  }

  if (musicBoard.holdDown && thereminData.infinityMachine && !mike.dragging && !pinkDude.dragging) {
    if (thereminData.intinityMachineFirstTime) {
      thereminData.intinityMachineFirstTime = false;
    }

    if (s2pd.touchDetected) {
      thereminDude.xPos = s2pd.touchMoveX;
      thereminDude.yPos = s2pd.touchMoveY;
    } else {
      thereminDude.xPos = s2pd.mouseXcurrent;
      thereminDude.yPos = s2pd.mouseYcurrent;
    }
  }

  fingerTracker.currentPosition = thereminDude.xPos; // set current position of user's finer
  if (fingerTracker.currentPosition !== fingerTracker.priorPosition) {
    //// if user's finger has moved compared with last time through loop
    frequencyChanger(warble, thereminData.octaveChanger); //update the frequency of the theremin
  }

  if (s2pd.exit) {
    thereminDude.yPos = -10000;
    initialize();
  }
  if (!s2pd.exit) {
    requestAnimationFrame(gameLoop);
  }
};
s2pd.canvas.width = Math.floor(window.innerWidth);
s2pd.canvas.height = Math.floor(window.innerHeight);
s2pd.width = s2pd.canvas.width;
s2pd.height = s2pd.canvas.height;

if (justIntonation) {
  drawBoard(justRatios);
}
if (!justIntonation) {
  drawBoard(equalTempRatios);
}
s2pd.canvas.style.backgroundColor = `rgb(30,10,10)`;

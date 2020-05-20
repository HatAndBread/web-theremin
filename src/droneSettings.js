import React, { useState, useEffect } from 'react';
import {
  updateDroneMachineWave,
  updateDroneMachineVolume,
  startDrone,
  stopDrone,
  changePitch,
  updateMyOctave
} from './droneInstruments.js';

export const DroneSettings = (props) => {
  const [noteForDrone1, setNoteForDrone1] = useState(false);
  const [noteForDrone2, setNoteForDrone2] = useState(false);
  const [noteForDrone3, setNoteForDrone3] = useState(false);
  const [assignNote1, setAssignNote1] = useState('');
  const [assignNote2, setAssignNote2] = useState('');
  const [assignNote3, setAssignNote3] = useState('');
  const [beingPlayedNow, setBeingPlayedNow] = useState('');
  const [alreadyStarted, setAlreadyStarted] = useState(false);

  const chordPlayed = (which) => {
    switch (which) {
      case 'C':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('C');
        setAssignNote2('E');
        setAssignNote3('G');
        setBeingPlayedNow('C');
        break;
      case 'C#':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('C#');
        setAssignNote2('F');
        setAssignNote3('Ab');
        setBeingPlayedNow('C#');
        break;
      case 'D':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('D');
        setAssignNote2('F#');
        setAssignNote3('A');
        setBeingPlayedNow('D');
        break;
      case 'Eb':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('Eb');
        setAssignNote2('G');
        setAssignNote3('Bb');
        setBeingPlayedNow('Eb');
        break;
      case 'E':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('E');
        setAssignNote2('Ab');
        setAssignNote3('B');
        setBeingPlayedNow('E');
        break;
      case 'F':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('F');
        setAssignNote2('A');
        setAssignNote3('C');
        setBeingPlayedNow('F');

        break;
      case 'F#':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('F#');
        setAssignNote2('Bb');
        setAssignNote3('C#');
        setBeingPlayedNow('F#');
        break;
      case 'G':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('G');
        setAssignNote2('B');
        setAssignNote3('D');
        setBeingPlayedNow('G');
        break;
      case 'Ab':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('Ab');
        setAssignNote2('C');
        setAssignNote3('Eb');
        setBeingPlayedNow('Ab');
        break;
      case 'A':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('A');
        setAssignNote2('C#');
        setAssignNote3('E');
        setBeingPlayedNow('A');
        break;
      case 'Bb':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('Bb');
        setAssignNote2('D');
        setAssignNote3('F');
        setBeingPlayedNow('Bb');
        break;
      case 'B':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('B');
        setAssignNote2('Eb');
        setAssignNote3('F#');
        setBeingPlayedNow('B');
        break;
      case 'Cm':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('C');
        setAssignNote2('Eb');
        setAssignNote3('G');
        setBeingPlayedNow('Cm');
        break;
      case 'C#m':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('C#');
        setAssignNote2('E');
        setAssignNote3('Ab');
        setBeingPlayedNow('C#m');
        break;
      case 'Dm':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('D');
        setAssignNote2('F');
        setAssignNote3('A');
        setBeingPlayedNow('Dm');
        break;
      case 'Ebm':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('Eb');
        setAssignNote2('F#');
        setAssignNote3('Bb');
        setBeingPlayedNow('Ebm');
        break;
      case 'Em':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('E');
        setAssignNote2('G');
        setAssignNote3('B');
        setBeingPlayedNow('Em');
        break;
      case 'Fm':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('F');
        setAssignNote2('Ab');
        setAssignNote3('C');
        setBeingPlayedNow('Fm');
        break;
      case 'F#m':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('F#');
        setAssignNote2('A');
        setAssignNote3('C#');
        setBeingPlayedNow('F#m');
        break;
      case 'Gm':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('G');
        setAssignNote2('Bb');
        setAssignNote3('D');
        setBeingPlayedNow('Gm');
        break;
      case 'Abm':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('Ab');
        setAssignNote2('B');
        setAssignNote3('Eb');
        setBeingPlayedNow('Abm');
        break;
      case 'Am':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('A');
        setAssignNote2('C');
        setAssignNote3('E');
        setBeingPlayedNow('Am');
        break;
      case 'Bbm':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('Bb');
        setAssignNote2('C#');
        setAssignNote3('F');
        setBeingPlayedNow('Bbm');
        break;
      case 'Bm':
        setNoteForDrone1(true);
        setNoteForDrone2(true);
        setNoteForDrone3(true);
        setAssignNote1('B');
        setAssignNote2('D');
        setAssignNote3('F#');
        setBeingPlayedNow('Bm');
        break;
      default:
        console.log('huh?');
        break;
    }
    startDrone('Drone 1'); //// will start all drones if a chord is played when drones are turned off.
    startDrone('Drone 2');
    startDrone('Drone 3');
    setAlreadyStarted(true); // This is to allow start/stop drone button to turn off drones in case a drone has been started by chord button
  };
  const revertBackToUncontrolled = () => {
    setNoteForDrone1(false);
    setNoteForDrone2(false);
    setNoteForDrone3(false);
  };
  const revertBackToNotAlreadyStarted = () => {
    setAlreadyStarted(false); //// In event of playing chord, will turn stop start button's state back to normal ¥
  };

  return (
    <div>
      <div style={{ display: props.display }}>
        <div style={{ display: 'inline-flex', width: '100vw' }}>
          <div style={{ borderStyle: 'groove', borderColor: 'slategrey', flexGrow: 1 }}>
            <IndividualDrone
              assignedNote={noteForDrone1}
              theNote={assignNote1}
              name={'Drone 1'}
              revertBackToUncontrolled={revertBackToUncontrolled}
              alreadyStarted={alreadyStarted}
              revertBackToNotAlreadyStarted={revertBackToNotAlreadyStarted}
            />
          </div>
          <div style={{ borderStyle: 'groove', borderColor: 'slategrey', flexGrow: 1 }}>
            <IndividualDrone
              assignedNote={noteForDrone2}
              theNote={assignNote2}
              name={'Drone 2'}
              revertBackToUncontrolled={revertBackToUncontrolled}
              alreadyStarted={alreadyStarted}
              revertBackToNotAlreadyStarted={revertBackToNotAlreadyStarted}
            />
          </div>
          <div style={{ borderStyle: 'groove', borderColor: 'slategrey', flexGrow: 1 }}>
            <IndividualDrone
              assignedNote={noteForDrone3}
              theNote={assignNote3}
              name={'Drone 3'}
              revertBackToUncontrolled={revertBackToUncontrolled}
              alreadyStarted={alreadyStarted}
              revertBackToNotAlreadyStarted={revertBackToNotAlreadyStarted}
            />
          </div>
        </div>
        <br />
        <OkButt hide={props.hide} />
      </div>
      <br />
      <div
        style={{
          position: 'fixed',
          width: '100vw',
          bottom: '0',
          left: '0',
          margin: '0',
          padding: '0'
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            width: '100%',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            alignContent: 'stretch'
          }}
        >
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'C'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'C#'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'D'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'Eb'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'E'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'F'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'F#'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'G'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'Ab'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'A'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'Bb'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'B'} />
        </div>
        <br />
        <div
          style={{
            display: 'inline-flex',
            width: '100%',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            alignContent: 'stretch'
          }}
        >
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'Cm'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'C#m'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'Dm'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'Ebm'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'Em'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'Fm'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'F#m'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'Gm'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'Abm'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'Am'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'Bbm'} />
          <ChordButton beingPlayedNow={beingPlayedNow} chordPlayed={chordPlayed} myChord={'Bm'} />
        </div>
      </div>
    </div>
  );
};

const IndividualDrone = (props) => {
  const [buttText, setButtText] = useState('START');
  const [octave0, setOctave0] = useState(false);
  const [octave1, setOctave1] = useState(false);
  const [octave2, setOctave2] = useState(true);
  const [octave3, setOctave3] = useState(false);
  const [currentNote, setCurrentNote] = useState('C');
  const [currentOctave, setCurrentOctave] = useState('4');
  const [volumeText, setVolumeText] = useState('-35');
  const [pitchValue, setPitchValue] = useState(0);

  useEffect(() => {
    if (props.assignedNote) {
      switch (props.theNote) {
        case 'C':
          setCurrentNote('C');
          setPitchValue(0);
          changePitch(props.name, 0);
          break;
        case 'C#':
          setCurrentNote('C#');
          setPitchValue(1);
          changePitch(props.name, 1);
          break;
        case 'D':
          setCurrentNote('D');
          setPitchValue(2);
          changePitch(props.name, 2);
          break;
        case 'Eb':
          setCurrentNote('Eb');
          setPitchValue(3);
          changePitch(props.name, 3);
          break;
        case 'E':
          setCurrentNote('E');
          setPitchValue(4);
          changePitch(props.name, 4);
          break;
        case 'F':
          setCurrentNote('F');
          setPitchValue(5);
          changePitch(props.name, 5);
          break;
        case 'F#':
          setCurrentNote('F#');
          setPitchValue(6);
          changePitch(props.name, 6);
          break;
        case 'G':
          setCurrentNote('G');
          setPitchValue(7);
          changePitch(props.name, 7);
          break;
        case 'Ab':
          setCurrentNote('Ab');
          setPitchValue(8);
          changePitch(props.name, 8);
          break;
        case 'A':
          setCurrentNote('A');
          setPitchValue(9);
          changePitch(props.name, 9);
          break;
        case 'Bb':
          setCurrentNote('Bb');
          setPitchValue(10);
          changePitch(props.name, 10);
          break;
        case 'B':
          setCurrentNote('B');
          setPitchValue(11);
          changePitch(props.name, 11);
          break;
        default:
          console.log('Huh?');
          break;
      }
    }
    if (props.alreadyStarted) {
      setButtText('STOP');
      props.revertBackToNotAlreadyStarted(); // Once the text has been changed revert it back to its original state
    }
  }, [props]);
  const changeButtText = (currentText, whichOne) => {
    if (currentText === 'START') {
      setButtText('STOP');
      startDrone(whichOne);
    }
    if (currentText === 'STOP') {
      setButtText('START');
      stopDrone(whichOne);
    }
  };

  const turnOtherOctavesOff = (which) => {
    switch (which) {
      case 'Octave 0':
        setOctave0(true);
        setOctave1(false);
        setOctave2(false);
        setOctave3(false);
        break;
      case 'Octave 1':
        setOctave0(false);
        setOctave1(true);
        setOctave2(false);
        setOctave3(false);
        break;
      case 'Octave 2':
        setOctave0(false);
        setOctave1(false);
        setOctave2(true);
        setOctave3(false);
        break;
      case 'Octave 3':
        setOctave0(false);
        setOctave1(false);
        setOctave2(false);
        setOctave3(true);
        break;
      default:
        console.log('Huh?');
        break;
    }
  };
  const changeNoteText = (value) => {
    switch (value) {
      case '0':
        setCurrentNote('C');
        break;
      case '1':
        setCurrentNote('C#');
        break;
      case '2':
        setCurrentNote('D');
        break;
      case '3':
        setCurrentNote('Eb');
        break;
      case '4':
        setCurrentNote('E');
        break;
      case '5':
        setCurrentNote('F');
        break;
      case '6':
        setCurrentNote('F#');
        break;
      case '7':
        setCurrentNote('G');
        break;
      case '8':
        setCurrentNote('Ab');
        break;
      case '9':
        setCurrentNote('A');
        break;
      case '10':
        setCurrentNote('Bb');
        break;
      case '11':
        setCurrentNote('B');
        break;
      case '12':
        setCurrentNote('C');
        break;
      default:
        console.log('Huh?');
        break;
    }
  };
  const changeOctaveText = (value) => {
    switch (value) {
      case 'Octave 0':
        setCurrentOctave('2');
        break;
      case 'Octave 1':
        setCurrentOctave('3');
        break;
      case 'Octave 2':
        setCurrentOctave('4');
        break;
      case 'Octave 3':
        setCurrentOctave('5');
        break;
      default:
        console.log('Huh?');
        break;
    }
  };
  const updateVolumeText = (value) => {
    setVolumeText(value);
  };

  return (
    <div style={{ display: props.display }}>
      <div>
        <VolumeFader
          texty={'Volume'}
          belongTo={props.name}
          updateVolumeText={updateVolumeText}
          defaultValue={-35}
          currentVolume={volumeText}
        />
        <br />

        {!props.assignedNote ? (
          <PitchFader
            texty={'Pitch'}
            belongTo={props.name}
            changeNoteText={changeNoteText}
            defaultValue={pitchValue}
            currentNote={currentNote}
            currentOctave={currentOctave}
          />
        ) : (
          <ControlledPitchFader
            texty={'Pitch'}
            belongTo={props.name}
            changeNoteText={changeNoteText}
            pitchValue={pitchValue}
            currentNote={currentNote}
            currentOctave={currentOctave}
            revertBackToUncontrolled={props.revertBackToUncontrolled}
          />
        )}

        <OctaveButton
          turnOtherOctavesOff={turnOtherOctavesOff}
          texty={'Oct 1'}
          amount={0.25}
          onOrOff={octave0}
          name={'Octave 0'}
          belongTo={props.name}
          changeOctaveText={changeOctaveText}
        ></OctaveButton>
        <OctaveButton
          texty={'Oct 2'}
          turnOtherOctavesOff={turnOtherOctavesOff}
          amount={0.5}
          onOrOff={octave1}
          name={'Octave 1'}
          belongTo={props.name}
          changeOctaveText={changeOctaveText}
        ></OctaveButton>
        <OctaveButton
          texty={'Oct 3'}
          turnOtherOctavesOff={turnOtherOctavesOff}
          amount={1}
          onOrOff={octave2}
          name={'Octave 2'}
          belongTo={props.name}
          changeOctaveText={changeOctaveText}
        ></OctaveButton>
        <OctaveButton
          texty={'Oct 4'}
          turnOtherOctavesOff={turnOtherOctavesOff}
          amount={2}
          onOrOff={octave3}
          name={'Octave 3'}
          belongTo={props.name}
          changeOctaveText={changeOctaveText}
        ></OctaveButton>
        <br />
        <WaveSelector whichOne={props.name}></WaveSelector>

        <StartStopButt belongTo={props.name} handleClick={changeButtText} buttText={buttText} />
      </div>
    </div>
  );
};

const VolumeFader = (props) => {
  const volumeChange = (e) => {
    updateDroneMachineVolume(props.belongTo, e.target.value);
    props.updateVolumeText(Number(e.target.value));
  };
  return (
    <div>
      <label>{props.texty}</label>
      <input
        className="fader"
        type="range"
        defaultValue={props.defaultValue}
        min={-50}
        max={-10}
        step={1}
        onChange={volumeChange}
      />
      <label>{props.currentVolume}</label>
    </div>
  );
};
const PitchFader = (props) => {
  const pitchChange = (e) => {
    changePitch(props.belongTo, e.target.value);
    props.changeNoteText(e.target.value);
  };

  return (
    <div>
      <label>{props.texty}</label>
      <input className="fader" type="range" onChange={pitchChange} min={0} max={12} defaultValue={props.defaultValue} />
      <label>{props.currentNote + props.currentOctave}</label>
    </div>
  );
};

const ControlledPitchFader = (props) => {
  const pitchChange = (e) => {
    changePitch(props.belongTo, e.target.value);
    props.changeNoteText(e.target.value);
  };
  useEffect(() => {
    changePitch(props.belongTo, props.pitchValue);
    props.revertBackToUncontrolled();
  }, [props]);
  return (
    <div>
      <label>{props.texty}</label>
      <input className="fader" type="range" onChange={pitchChange} min={0} max={12} value={props.pitchValue} />
      <label>{props.currentNote + props.currentOctave}</label>
    </div>
  );
};

const WaveSelector = (props) => {
  const onChange = (e) => {
    updateDroneMachineWave(e.target.value, props.whichOne);
  };
  return (
    <div>
      <form>
        <input type="radio" id="droneSineButton" name="waveType" onChange={onChange} value="sine" defaultChecked />
        <label htmlFor="droneSineButton">Sine</label>

        <input type="radio" id="droneSquareButton" name="waveType" onChange={onChange} value="square" />
        <label htmlFor="droneSquareButton">Square</label>

        <input type="radio" id="droneSawtoothButton" name="waveType" onChange={onChange} value="sawtooth" />
        <label htmlFor="droneSawtoothButton">Sawtooth</label>
        <input type="radio" id="droneTriangleButton" name="waveType" onChange={onChange} value="triangle"></input>
        <label htmlFor="droneTiangleButton">Triangle</label>
      </form>
    </div>
  );
};

const StartStopButt = (props) => {
  const handleClick = () => {
    props.handleClick(props.buttText, props.belongTo);
  };
  return <button onClick={handleClick}>{props.buttText}</button>;
};

const OctaveButton = (props) => {
  const handleClick = () => {
    if (props.onOrOff) {
    } else {
      props.turnOtherOctavesOff(props.name);
      updateMyOctave(props.amount, props.belongTo);
      props.changeOctaveText(props.name);
    }
  };
  return <button onClick={handleClick}>{props.texty}</button>;
};

const OkButt = (props) => {
  const clicked = () => {
    props.hide();
  };
  return <button onClick={clicked}>OK</button>;
};

const ChordButton = (props) => {
  const [myColor, setMyColor] = useState('black');
  useEffect(() => {
    if (props.beingPlayedNow === props.myChord) {
      setMyColor('green');
    } else {
      setMyColor('black');
    }
  }, [props.beingPlayedNow, props.myChord]);
  const clicked = () => {
    props.chordPlayed(props.myChord);
  };
  return (
    <button
      style={{ backgroundColor: myColor, color: 'snow', height: '10vh', flexGrow: '1', padding: '0', margin: '0' }}
      onClick={clicked}
    >
      {props.myChord}
    </button>
  );
};

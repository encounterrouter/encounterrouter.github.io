import './App.css';
import Toolbar from './Toolbar';
import EncounterTable from './EncounterTable';
import DetailView from './DetailView';
import React from 'react';
import { useState, useEffect } from 'react';
import usePersistedState from 'use-persisted-state-hook'

export const UserContext = React.createContext([]);

function App() {
  const [caught, setCaught] = usePersistedState('caught', []);
  const [output, setOutput] = useState(null);
  const [encounterFilter, setEncounterFilter] = useState(null);
  const [visiblePopup, setVisiblePopup] = useState(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [detailViewLocation, setDetailViewLocation] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form)

    const formJson = Object.fromEntries(formData.entries());
    var final = {
      location: formJson.location.toString(),
      methods: []
    };

    var lines = formJson.data.trim().split(/\r?\n/);
    lines.forEach(line => {
      var foo = line.split(':');
      var mons = foo[1].split(',');
      var method = {
        method: line.slice(0, line.indexOf('(') - 1),
        encounters: []
      }
      mons.forEach(element => {
        method.encounters.push({
          name: element.trim().slice(0, element.indexOf('(') - 2).toString(),
          weight: element.trim().slice(element.indexOf('('), element.indexOf('%') - 1).toString()
        })
      });
      final.methods.push(method);
    });
    console.log(final);
    setOutput(JSON.stringify(final));
  }

  function openDetailView(location){
    setDetailViewLocation(location);
    setIsDetailViewOpen(true);
    setVisiblePopup(null);
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <div className="title">Sterling Silver Encounter Router</div>
        <form onSubmit={handleSubmit}>
          <input name="location"></input>
          <textarea name="data"></textarea>
          <button>Submit</button>
        </form>
        <p>{output}</p>
      </header> */}
      <div className="App-content">
        <UserContext.Provider value={{ encounterFilter: encounterFilter, setEncounterFilter: setEncounterFilter, visiblePopup: visiblePopup, setVisiblePopup: setVisiblePopup }}>
          <Toolbar caught={caught} setCaught={setCaught} />
          <EncounterTable caught={caught} setCaught={setCaught} openDetailView={openDetailView} />
          {isDetailViewOpen ? <DetailView setIsDetailViewOpen={setIsDetailViewOpen} location={detailViewLocation}/> : ""}
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default App;
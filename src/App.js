import './App.css';
import Toolbar from './Toolbar';
import EncounterTable from './EncounterTable';
import DetailView from './DetailView';
import React from 'react';
import { useState } from 'react';
import usePersistedState from 'use-persisted-state-hook'
import SsPokedex from './data/SsPokedex';

export const UserContext = React.createContext([]);

function App() {
  const [caught, setCaught] = usePersistedState('caught', []);
  const [encounterFilter, setEncounterFilter] = useState(null);
  const [visiblePopup, setVisiblePopup] = useState(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [detailViewLocation, setDetailViewLocation] = useState(null);
  const [detailViewEncounter, setDetailViewEncounter] = useState(null);  const [output, setOutput] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const ssDex = SsPokedex;

    const formJson = Object.fromEntries(formData.entries());
    var dexData = formJson.data.trim().split(/\r?\n/);
    dexData = dexData.map(l => l.split(','));

    dexData.forEach(l => {
      ssDex.poks[l[1]].abilities = l[27] === '-' ? [l[26]] : [l[26], l[27]];
    })
    console.log(ssDex);
  }
  function openDetailView(location, encounter){
    setDetailViewLocation(location);
    setDetailViewEncounter(encounter);
    setIsDetailViewOpen(true);
    setVisiblePopup(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="title">Sterling Silver Encounter Router</div><form onSubmit={handleSubmit}>
          <textarea name="data"></textarea>
          <button>Submit</button>
        </form>
        <p>{output}</p>
        <p>{output}</p> 
      </header>
      <div className="App-content">
        <UserContext.Provider value={{ encounterFilter: encounterFilter, setEncounterFilter: setEncounterFilter, visiblePopup: visiblePopup, setVisiblePopup: setVisiblePopup }}>
          <Toolbar caught={caught} setCaught={setCaught} openDetailView={openDetailView} />
          <EncounterTable caught={caught} setCaught={setCaught} openDetailView={openDetailView} />
          {isDetailViewOpen ? <DetailView setIsDetailViewOpen={setIsDetailViewOpen} location={detailViewLocation} encounter={detailViewEncounter}/> : ""}
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default App;

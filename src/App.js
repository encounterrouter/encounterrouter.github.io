import './App.css';
import Toolbar from './Toolbar';
import EncounterTable from './EncounterTable';
import DetailView from './DetailView';
import BoxView from './BoxView';
import NotificationPopup from './NotificationPopup';
import React from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom'
import usePersistedState from 'use-persisted-state-hook'
import rnbData from './data/RnbEncounters.csv'
import rnbInfo from './data/rnb/PokeInfo.txt'
import Pokedex from './data/Pokedex';
import DataManager from './data/DataManager';
import PokemonSpecies from './data/PokemonSpecies';
import EvolutionChains from './data/EvolutionChains';
import Utility from './Utility';
import EncounterData from './data/rnb/EncounterData';

export const UserContext = React.createContext([]);

function App() {
  const [caught, setCaught] = usePersistedState('caught', []);
  const [encounterFilter, setEncounterFilter] = useState(null);
  const [visiblePopup, setVisiblePopup] = useState(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [isBoxViewOpen, setIsBoxViewOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [copy, setCopy] = useState("Test copy");
  const [detailViewLocation, setDetailViewLocation] = useState(null);
  const [detailViewEncounter, setDetailViewEncounter] = useState(null);
  const queryParameters = new URLSearchParams(window.location.search)

  function openDetailView(location, encounter) {
    setDetailViewLocation(location);
    setDetailViewEncounter(encounter);
    setIsDetailViewOpen(true);
    setVisiblePopup(null);
  }

  function openNotificationPopup(copy) {
    setCopy(copy);
    setIsNotificationOpen(true);
  }

  if (queryParameters.get("game")) {
    switch (queryParameters.get("game")) {
      case "rnb":
        DataManager.game = DataManager.GAMES.RUNANDBUN;
        break;
      case "ss":
      default:
        DataManager.game = DataManager.GAMES.STERLINGSILVER;
        break;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="title">Sterling Silver Encounter Router</div>
        {/* <form onSubmit={handleSubmit}>
          <textarea name="data"></textarea>
          <button>Submit</button>
        </form> */}
      </header>

      <div className="App-content">
        <UserContext.Provider value={{ encounterFilter: encounterFilter, setEncounterFilter: setEncounterFilter, visiblePopup: visiblePopup, setVisiblePopup: setVisiblePopup, openNotificationPopup: openNotificationPopup }}>
          <Toolbar caught={caught} setCaught={setCaught} openDetailView={openDetailView} setIsBoxViewOpen={setIsBoxViewOpen} />
          <div className="splits">
            <div style={{ fontSize: "calc(3px + 1.5vw)" }}>Jump to</div>
            {DataManager.GetSplitData() ?
              DataManager.GetSplitData().splits.map(split =>
                <button key={split.name} style={{ marginTop: '1vh' }} onClick={() => document.querySelector("#" + split.name.replace(/\s/g, "").replace('&', "")).scrollIntoView()}>{split.name}</button>
              )
              :
              ""
            }
          </div>
          <EncounterTable caught={caught} setCaught={setCaught} openDetailView={openDetailView} />
          {isDetailViewOpen ? <DetailView setIsDetailViewOpen={setIsDetailViewOpen} location={detailViewLocation} encounter={detailViewEncounter} /> : ""}
          {isBoxViewOpen ? <BoxView setIsBoxViewOpen={setIsBoxViewOpen} caught={caught} setCaught={setCaught} /> : ""}
          {isNotificationOpen ? <NotificationPopup copy={copy} setIsNotificationOpen={setIsNotificationOpen} /> : ""}
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default App;

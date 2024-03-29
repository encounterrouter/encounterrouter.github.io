import './App.css';
import Toolbar from './Toolbar';
import EncounterTable from './EncounterTable';
import DetailView from './DetailView';
import BoxView from './BoxView';
import NotificationPopup from './NotificationPopup';
import React from 'react';
import { useState } from 'react';
import usePersistedState from 'use-persisted-state-hook'
// import SsPokedex from './data/SsPokedex';

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

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const form = e.target;
  //   const formData = new FormData(form);
  //   const ssDex = SsPokedex;

  //   const formJson = Object.fromEntries(formData.entries());
  //   var data = formJson.data.trim().split(/\r?\n/);
  //   data = data.map(l => l.split(','));
  //   data = data.filter(l => l[4] !== "-----");

  //   const final = {};
  //   data.filter(l => l[2] === "Level Up").forEach(e => {
  //     const name = e[4];
  //     const newElement = { "method": "level", "required": e[3] }
  //     final[name] = newElement;
  //   })

  //   data.filter(l => l[2] === "Use Item").forEach(e => {
  //     const name = e[4];
  //     const newElement = { "method": "use item", "required": e[3] }
  //     final[name] = newElement;
  //   })

  //   console.log(final);
  // }

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

import './App.css';
import Toolbar from './Toolbar';
import EncounterTable from './EncounterTable';
import DetailView from './DetailView';
import BoxView from './BoxView';
import NotificationPopup from './NotificationPopup';
import React from 'react';
import { useState } from 'react';
import usePersistedState from 'use-persisted-state-hook'

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

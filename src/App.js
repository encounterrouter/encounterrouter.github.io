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


  // const landValues = [
  //   20,
  //   10,
  //   10,
  //   10,
  //   10,
  //   10,
  //   10,
  //   5,
  //   5,
  //   5,
  //   4,
  //   1
  // ]

  // const fishingValues = [
  //   20,
  //   20,
  //   10,
  //   10,
  //   10,
  //   10,
  //   10,
  //   5,
  //   4,
  //   1,
  // ]

  // const surfValues = [
  //   30,
  //   30,
  //   20,
  //   10,
  //   10,
  // ]

  // const rsValues = [
  //   60,
  //   30,
  //   5,
  //   4,
  //   1,
  // ]

  // fetch(rnbInfo)
  //   .then(r => r.text())
  //   .then(text => {
  //     var data = text.split(',');
  //     var copy = Pokedex;
  //     data = data.map(m => m.split(/\r?\n/));
  //     data.forEach(mon => {
  //       // if (Pokedex[mon[0]]) {
  //       //console.log(mon);
  //       // }
  //     })
  //   })

  //       else {

  //         // fetch('https://pokeapi.co/api/v2/pokemon/' + mon[0].toLowerCase())
  //         //   .then((response) => response.json())
  //         //   .then((data) => {
  //         //     copy[mon[0]] = {
  //         //       "name": mon[0],
  //         //       "id": data.id
  //         //     }
  //         //   })
  //         //   .catch((err) => {
  //         //     console.log(err.message);
  //         //   });




  //       }
  //     })

  //     console.log(copy)
  //   })
  // var pok = Pokedex;
  // var list = []
  // function BuildList(evoList) {


  //   if (evoList.species)
  //     list.push(evoList.species.name)
  //   if (evoList.evolves_to) {
  //     evoList.evolves_to.forEach(e => {
  //       BuildList(e)
  //     })
  //   }
  //   return list


  //   // evoList.forEach(e => {
  //   //   if (e.species)
  //   //     list.push(e.species.name)
  //   //   if (e.evolves_to)
  //   //     return list.concat(BuildList(e.evolves_to))
  //   // })
  //   // return list;
  // }

  // var idList = []

  // Object.keys(Pokedex).forEach(p => {
  //   if (!Pokedex[p].evolutions) {
  //     idList.push(Pokedex[p].id)
  //   }
  // })

  // idList.forEach((id, i) => {
  //   if (i < 5) {
  //     fetch('https://pokeapi.co/api/v2/pokemon-species/' + id)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data.evolution_chain)
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   }
  // })

  // var evoData = EvolutionChains
  // var lists = []
  // var listOfUrls = []
  // Object.keys(evoData).sort().forEach((id, i) => {
  //   // console.log(id);
  //   var evoD = evoData[id];
  //   if (!listOfUrls.includes(evoD.url)) {
  //     var keys = Object.keys(Pokedex);
  //     var key = keys.find(p =>
  //       Pokedex[p].id === parseInt(id)
  //     )
  //     list = []
  //     var fullEvoList = BuildList(evoData[id].evolutionChain.data.chain)

  //     // if (i < 10) {

  //     // fetch(evoData[id].url)
  //     //   .then((response) => response.json())
  //     //   .then((data) => {
  //     //     evoData[id].evolutionChain = { data }

  //     //     //evo.charAt(0).toUpperCase() + evo.slice(1)

  //     //   })
  //     //   .catch((err) => {
  //     //     console.log(err.message);
  //     //   });
  //     // var typeCopy = Pokedex[pokemon].types;
  //     // typeCopy?.forEach((type, i) => {
  //     //   typeCopy[i] = type.charAt(0).toUpperCase() + type.slice(1)
  //     // })
  //     // pok[pokemon].types = typeCopy;

  //     // if (!DataManager.GetTypes(pokemon))
  //     //   console.log(pokemon);
  //     // }
  //     lists.push(fullEvoList);
  //     listOfUrls.push(evoD.url);
  //   }
  // });
  // console.log(lists);

  // var pokCopy = Pokedex;
  // lists.forEach(l => {
  //   l.forEach(name => {
  //     var pokedexName = Utility.GetPokedexName(name);
  //     console.log(pokedexName);
  //     pokCopy[pokedexName].evolutions = l;
  //   })
  // })
  // console.log(pokCopy);
  // console.log(pok);

  // Object.keys(Pokedex).forEach(p => {
  //   if (!Pokedex[p].types)
  //     console.log(p)
  // })

  // };


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

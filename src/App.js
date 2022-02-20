import "./App.css";
import Tile from "./components/tile/Tile";
import Header from "./components/header/header";
import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "./api/config";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DriverList from "./components/driverList/driverList";

//import { constructorData } from "./data/constructorColor";

//variables

class App extends Component {
  handleOnDragEnd = (result) => {
    if (!result.destination) return;
    console.log(result);

    const drivers = this.state.Drivers;
    const [reorderedDriver] = drivers.splice(result.source.index, 1);
    drivers.splice(result.destination.index, 0, reorderedDriver);

    this.setState(
      {
        Drivers: drivers,
      },
      () => console.log(this.state.Drivers[0])
    );
  };

  //ALL  BELOW USED WITHOUT API

  componentDidMount() {
    axios.get(`${API_URL}current/driverStandings.json`).then((res) => {
      if (res.data) {
        this.setState(
          {
            Drivers:
              res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings,
          },
          () => console.log(this.state.Drivers[0])
        );
      }
    });
  }

  tileList = () => {
    const list = this.state.Drivers.map((item, index) => (
      //driver = item.Driver
      <Draggable
        key={item.Driver.permanentNumber}
        draggableId={item.Driver.permanentNumber}
        index={index}
      >
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Tile
              key={item.Driver.permanentNumber}
              name={item.Driver.familyName}
              number={item.Driver.permanentNumber}
              color={item.Constructors[0].constructorId}
            />
          </ul>
        )}
      </Draggable>
    ));

    return list;
  };

  //WORKS BUT TEAM COLORS INDEX NEEDS TO BE CHANGED
  // componentDidMount() {
  //   axios.get("http://localhost:8000/f1/drivers").then((res) => {
  //     if (res.data) {
  //       this.setState(
  //         {
  //           Drivers: res.data,
  //         },
  //         () => console.log(this.state.Drivers[0])
  //       );
  //     }
  //   });
  // }

  // tileList = () => {
  //   const list = this.state.Drivers.map((item, index) => (
  //     //driver = item.Driver
  //     <Draggable
  //       key={item.number}
  //       draggableId={item.number.toString()}
  //       index={index}
  //     >
  //       {(provided) => (
  //         <ul
  //           ref={provided.innerRef}
  //           {...provided.draggableProps}
  //           {...provided.dragHandleProps}
  //         >
  //           <Tile
  //             key={item.number}
  //             name={item.lastName}
  //             number={item.number}
  //             color={item.team}
  //           />
  //         </ul>
  //       )}
  //     </Draggable>
  //   ));

  //   return list;
  // };

  constructor(props) {
    super(props);
    this.state = {
      Drivers: [],
      list: [],
    };
  }
  render() {
    return (
      <div>
        <Header page="Order Picker" />
        <DriverList />
        {/*<div className="App">
          <h1>Qualifying order</h1>
          <DragDropContext onDragEnd={this.handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <div
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {this.tileList()}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
              </div>*/}
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import Tile from "../tile/Tile";
import axios from "axios";
import { API_URL } from "../../api/config";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class DriverList extends Component {
  //The fucntion for the end of dragging. This reorders the list correctly. The reordered list
  //needs to be saved to state then sent to the database to keep track of each users list.
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

  //the fucntion that handles the driver list
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

  //check the api on mount. This will be simplified when the database is active
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

  constructor(props) {
    super(props);
    this.state = {
      Drivers: [],
      list: [],
    };
  }

  render() {
    return (
      <div className="App">
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
      </div>
    );
  }
}

export default DriverList;

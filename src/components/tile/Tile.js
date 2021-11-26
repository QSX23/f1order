import React from "react";
import "./Tile.css";
import { constructorData } from "../../data/constructorColor";

const matchData = (color) => {
  for (const item in constructorData) {
    if (item === color) {
      return { backgroundColor: constructorData[item] };
    }
  }
};

function Tile(props) {
  return (
    <div className="box" style={matchData(props.color)}>
      <div className="items">
        <div className="name">{props.name}</div>
        <div className="number">{props.number}</div>
      </div>
    </div>
  );
}

export default Tile;

import React from "react";

const PlayerMarker = ({ color }) => {
  return (
    <div
      className="player-marker"
      style={{ height: `1.5rem`, width: `1.5rem`, margin: `0 10px` }}
    >
      <div
        className="color-marker"
        style={{
          border: `1px solid black`,
          height: `95%`,
          width: `95%`,
          borderRadius: "50%",
          backgroundColor: `${color}`,
        }}
      />
    </div>
  );
};

export default PlayerMarker;

import React from "react";

function ShowText(props) {
    return (
      <div>
        {Object.keys(props.data).map((key) => (
          <div key={key}>
            <strong>{key} :</strong> {props.data[key]}
          </div>
        ))}
      </div>
    );
  }
export default ShowText;
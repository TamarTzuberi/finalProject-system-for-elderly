import React from "react";

function ShowText(props) {

    return (
        <div>
        {Object.keys(props.data).map((key) => <div key={key}>{key} : {props.data[key]}</div>)}
        </div>

    );
}
export default ShowText;
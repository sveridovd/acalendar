import React from "react";
import ReactDOM from "react-dom";
import { Calendar } from "../Calendar.jsx";
import { CalendarHolder } from "../CalendarHolder.jsx";

class TestElement extends React.Component {
    render() {
        return (
            <Calendar/>
        );
    }
}

ReactDOM.render(<TestElement />, document.getElementById("container"));


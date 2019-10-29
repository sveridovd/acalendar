import "../style/theme_light.css";

import React from "react";
import ReactDOM from "react-dom";
import { Calendar } from "../Calendar.js";

class TestElement extends React.Component {
    render() {
        return (
            <Calendar/>
        );
    }
}

ReactDOM.render(<TestElement />, document.getElementById("container"));


import "../style/theme_light.css";

import React from "react";
import ReactDOM from "react-dom";
import {Calendar} from "../Calendar.js";
import {CalendarHolder} from "../CalendarHolder.js";

window.addEventListener("click", function (e) {
    console.log(e);
});

ReactDOM.render(<Calendar locale="en"/>, document.getElementById("container1"));

const h1 = <CalendarHolder>
    <input/>
</CalendarHolder>;

const h2 = <CalendarHolder>
    <input/>
</CalendarHolder>;

ReactDOM.render(h1, document.getElementById("container2"));
ReactDOM.render(h2, document.getElementById("container3"));



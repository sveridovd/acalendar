import "../style/theme_dark.css";

import React from "react";
import ReactDOM from "react-dom";
import { Calendar } from "../Calendar.js";
import { CalendarHolder } from "../CalendarHolder.js";
import moment from "moment";

moment.locale("en");

ReactDOM.render(<Calendar/>, document.getElementById("container"));

const h1 = <CalendarHolder>
    <input />
</CalendarHolder>;

const h2 = <CalendarHolder>
    <input />
</CalendarHolder>;

ReactDOM.render(h1, document.getElementById("container2"));
ReactDOM.render(h2, document.getElementById("container3"));



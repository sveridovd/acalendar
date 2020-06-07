import { Component } from "react";
import { Moment } from "moment";


interface CalendarProps {
    date: Moment;
    onChange(date: Moment);
}

export interface Calendar extends Component<CalendarProps> {}
export interface CalendarHolder extends Component<CalendarProps> {}
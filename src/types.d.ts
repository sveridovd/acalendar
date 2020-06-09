import { Component } from "react";
import { Moment } from "moment";

interface CalendarProps {
    date: Moment;
    onChange(date: Moment);
}

export declare interface Calendar extends Component<CalendarProps> {}
export declare interface CalendarHolder extends Component<CalendarProps> {}
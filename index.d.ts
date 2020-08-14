import { Component } from "react";
import { Moment } from "moment";

export = acalendar;
export as namespace acalendar;

declare namespace acalendar {
    export interface OnChange {
        (moment: Moment): void;
    }

    export interface CalendarProps {
        date?: Moment,
        onChange: OnChange,
        startFromMonday?: boolean,
        locale?: string
    }

    export class Calendar extends Component<CalendarProps> {
    }
}

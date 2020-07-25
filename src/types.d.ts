declare module "acalendar" {

    interface Calendar {
        date: moment.Moment;
        onChange(date: moment.Moment);
    }

    export {Calendar}
}

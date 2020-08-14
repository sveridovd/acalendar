import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Calendar } from "./Calendar.js";
import { Dispatcher } from "./Dispatcher.js";

const dispatcher = new Dispatcher();


export function CalendarHolder({ children, date, onChange }) {

    const [hide, setHide] = useState(true);
    const [mdate, setMDate] = useState(date || null);
    const ref = useRef(null);

    function onShow(details) {
        if (ref.current !== details.element)
            setHide(true);
    }

    useEffect(() => {

        dispatcher.addListener("show", onShow);

        return () => {
            dispatcher.removeListener("show", onShow);
        };

    }, []);

    return (
        <div ref={ref} className="atcalendar-holder" onClick={e => {
            e.stopPropagation();

            const value = !hide;
            setHide(value);

            if (hide) {
                dispatcher.dispatch("show", { element: ref.current });
            }

        }}>
            {children}
            <div className="atcalendar-holder__calendar" onClick={e => {
                e.stopPropagation();
            }}>

                {hide ? null : <Calendar date={mdate} onChange={(date1) => {
                    setMDate(date1);
                    onChange && onChange(date1);
                }}/>}
            </div>
        </div>
    );
}

CalendarHolder.propTypes = {
    date: PropTypes.object,
    onChange: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.element),
};

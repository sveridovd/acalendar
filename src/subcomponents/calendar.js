import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
    MODE_YEAR,
    MODE_MONTH,
    MODE_DAY,
    cssClassHelper,
    formatNumberOfMonth
} from "../share/util.js";

function momentTypeChecker(propValue) {
    return moment.isMoment(propValue);
}

export function Choosen({weekdays, months, choosenMoment}) {
    return (
        <div className="atcalendar__choosen">
            <div className="atcalendar__choosen__icon"/>
            <div className="atcalendar__choosen__date">
                {choosenMoment &&
                <span>{months[choosenMoment.month()]} {choosenMoment.year()}, {weekdays[choosenMoment.day()]} {choosenMoment.date()}</span>
                }
                {!choosenMoment &&
                <span>----- ----, --- --</span>
                }
            </div>
        </div>
    );
}

Choosen.propTypes = {
    weekdays: PropTypes.arrayOf(PropTypes.string).isRequired,
    months: PropTypes.arrayOf(PropTypes.string).isRequired,
    choosenMoment: PropTypes.objectOf(momentTypeChecker).isRequired
};

export function Header({mode, months, showedMoment, showMode}) {
    return (
        <>
            {
                mode === MODE_DAY &&
                <>
                    <div className="atcalendar__head__center">
                        <div className="atcalendar__head__center__date">
                            <span onClick={() => showMode(MODE_MONTH)}
                                  className={"clickable"}>{months[showedMoment.month()]}</span>
                            <span onClick={() => showMode(MODE_YEAR)}
                                  className={"clickable"}>{showedMoment.year()}</span>
                        </div>
                    </div>
                </>
            }

            {
                mode === MODE_MONTH &&
                <div className="atcalendar__head__center">
                    <div className="atcalendar__head__center__month">
                        <span onClick={() => showMode(MODE_YEAR)}>{showedMoment.year()}</span>
                    </div>
                </div>
            }

            {
                mode === MODE_YEAR &&
                <div className="atcalendar__head__center">
                    <div className="atcalendar__head__center__year">
                        <span>Choose year</span>
                    </div>
                </div>
            }
        </>
    );
}

Header.propTypes = {
    mode: PropTypes.oneOf([MODE_DAY, MODE_MONTH, MODE_YEAR]).isRequired,
    months: PropTypes.arrayOf(PropTypes.string).isRequired,
    showedMoment: PropTypes.objectOf(momentTypeChecker).isRequired,
    choosenMoment: PropTypes.objectOf(momentTypeChecker),
    showMode: PropTypes.func.isRequired
};

export function ContentDays({weekdays, daysInMonth, showedMoment, choosenMoment, onChooseDate}) {
    return (
        <>
            <ul className="atcalendar__week-days">
                {
                    weekdays.map((day, i) => (
                        <li key={i} className="atcalendar__week-days__item">{day}</li>
                    ))
                }
            </ul>
            <ul className="atcalendar__dates">
                {
                    daysInMonth.map((date, i) => {
                        if (date === "-") {
                            return <li key={i} className="atcalendar__dates__item empty"/>;
                        }
                        const showed = moment(showedMoment).date(date);
                        return (<li key={i} className={cssClassHelper({
                            "atcalendar__dates__item": true,
                            "choosen": showed.isSame(choosenMoment, "day")
                        })}
                                    onClick={() => onChooseDate(date)}>{date}</li>);
                    })

                }
            </ul>
        </>
    );
}

ContentDays.propTypes = {
    weekdays: PropTypes.arrayOf(PropTypes.string).isRequired,
    daysInMonth: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
    showedMoment: PropTypes.objectOf(momentTypeChecker).isRequired,
    choosenMoment: PropTypes.objectOf(momentTypeChecker),
    onChooseDate: PropTypes.func.isRequired,
};

export function ContentMonths({months, onChooseMonth}) {
    return (
        <ul className="atcalendar__months">
            {
                months.map((month, i) => (
                    <li key={i} className={cssClassHelper({
                        "atcalendar__months__item": true
                    })} onClick={() => onChooseMonth(month)}>{month}
                        <sup className="atcalendar__months__item__number-of-month"> {formatNumberOfMonth(i + 1)}</sup>
                    </li>
                ))
            }
        </ul>
    );
}

ContentMonths.propTypes = {
    months: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChooseMonth: PropTypes.func.isRequired
};

export function ContentYears({years, onChooseYear}) {
    return (
        <ul className="atcalendar__years">
            {
                years.map((year) => (
                    <li key={year} className={cssClassHelper({
                        "atcalendar__years__item": true,
                    })} onClick={() => onChooseYear(year)}>{year}</li>
                ))
            }
        </ul>
    );
}

ContentYears.propTypes = {
    years: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    onChooseYear: PropTypes.func.isRequired
};
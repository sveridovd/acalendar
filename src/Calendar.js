import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import memoize from "memoize-one";

import {
    makeDayMatrix,
    makeYearsMatrix,
    MODE_YEAR,
    MODE_MONTH,
    MODE_DAY
} from "./util.js";

import {
    Header,
    Choosen,
    ContentDays,
    ContentMonths,
    ContentYears
} from "./components.js";

export class Calendar extends React.Component {

    constructor(props) {
        super(props);

        let mode = MODE_DAY;

        // eslint-disable-next-line no-unused-vars
        this.months = memoize((locale) => {
            return moment.months().map((month) => {
                return month.charAt(0).toUpperCase() + month.slice(1);
            });
        });

        // eslint-disable-next-line no-unused-vars
        this.weekdays = memoize((locale, startFromMonday) => {
            let weekdays = moment.weekdaysShort().map(weekday => {
                return weekday.charAt(0).toUpperCase() + weekday.slice(1);
            });

            if (startFromMonday) {
                let tmp = weekdays[0];
                weekdays = weekdays.slice(1).concat([tmp]);
            }

            return weekdays;
        });

        this.daysInMonth = memoize((showedMoment, startFromMonday) => {
            return makeDayMatrix(showedMoment, startFromMonday);
        });

        this.years = memoize((showedMoment, yearincr) => {
            return makeYearsMatrix(
                moment(showedMoment).year(showedMoment.year() + yearincr)
            );
        });


        this.state = Object.assign({
            mode,
            showedMoment: (props.date ? props.date.clone() : moment()),
            choosenMoment: (props.date ? props.date.clone() : null),

            // MODE_YEAR
            yearincr: 0
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.date && !this.props.date.isSame(prevProps.date, "days")) {
            this.setState({
                showedMoment: this.props.date,
                choosenMoment: this.props.date
            });
        }
    }

    onPrev(e) {
        e.stopPropagation();

        switch (this.state.mode) {
            case MODE_YEAR:
                this.setState(prev => ({yearincr: prev.yearincr - 20}));
                break;
            case MODE_MONTH:
                throw new Error("Forbidden in MODE_YEAR");
            case MODE_DAY:
                this.setState({
                    showedMoment: this.state.showedMoment.clone().subtract(1, "months")
                });
                break;
            default:
                throw new Error("Mode not found: " + this.state.mode);
        }
    }

    onNext(e) {
        e.stopPropagation();

        switch (this.state.mode) {
            case MODE_YEAR:
                this.setState(prev => ({yearincr: prev.yearincr + 20}));
                break;
            case MODE_MONTH:
                throw new Error("Forbidden in MODE_MONTH");
            case MODE_DAY:
                this.setState({
                    showedMoment: moment(this.state.showedMoment).add(1, "months")
                });
                break;
            default:
                throw new Error("Mode not found: " + this.state.mode);
        }
    }

    onChoose(type, val) {

        this.setState(prev => {

            const showedMoment = moment(prev.showedMoment);
            const choosenMoment = moment(prev.choosenMoment || prev.showedMoment);
            let mode = prev.mode;

            switch (type) {
                case "date":
                    choosenMoment.date(val);
                    choosenMoment.month(showedMoment.month());
                    choosenMoment.year(showedMoment.year());
                    break;
                case "month":
                    showedMoment.month(val);
                    choosenMoment.month(val);
                    mode = MODE_DAY;
                    break;
                case "year":
                    showedMoment.year(val);
                    choosenMoment.year(val);
                    mode = MODE_MONTH;
                    break;
                default:
                    throw new Error("Type not found");
            }

            return {choosenMoment, showedMoment, mode};
        }, () => {
            this.props.onChange
            && this.props.onChange(moment(this.state.choosenMoment));
        });
    }

    showMode(mode) {
        this.setState({mode});
    }

    mute(e) {
        e.stopPropagation();
    }

    render() {
        const oldLocale = moment.locale();
        moment.locale(this.props.locale);

        const daysInMonth = this.daysInMonth(this.state.showedMoment, this.props.startFromMonday);
        const years = this.years(this.state.showedMoment, this.state.yearincr);
        const months = this.months(this.props.locale);
        const weekdays = this.weekdays(this.props.locale, this.props.startFromMonday);

        try {
            return (
                <div className="atcalendar" onClick={this.mute.bind(this)}>

                    <Choosen
                        weekdays={weekdays}
                        months={months}
                        choosenMoment={this.state.choosenMoment}/>

                    <div className="atcalendar__head">
                        {
                            this.state.mode !== MODE_MONTH &&
                            <button className="atcalendar__head__prev-month"
                                    type="button"
                                    disabled={this.state.mode === MODE_MONTH}
                                    onClick={this.onPrev.bind(this)}/>
                        }

                        <Header
                            mode={this.state.mode}
                            months={this.months}
                            showedMoment={this.state.showedMoment}
                            showMode={this.showMode.bind(this)}
                        />

                        {
                            this.state.mode !== MODE_MONTH &&
                            <button className="atcalendar__head__next-month"
                                    type="button"
                                    disabled={this.state.mode === MODE_MONTH}
                                    onClick={this.onNext.bind(this)}/>
                        }
                    </div>

                    {
                        this.state.mode === MODE_DAY &&
                        <ContentDays
                            weekdays={weekdays}
                            daysInMonth={daysInMonth}
                            showedMoment={this.state.showedMoment}
                            choosenMoment={this.state.choosenMoment}
                            onChooseDate={this.onChoose.bind(this, "date")}
                        />
                    }

                    {
                        this.state.mode === MODE_MONTH &&
                        <ContentMonths
                            months={months}
                            onChooseMonth={this.onChoose.bind(this, "month")}
                        />
                    }

                    {
                        this.state.mode === MODE_YEAR &&
                        <ContentYears
                            years={years}
                            onChooseYear={this.onChoose.bind(this, "year")}
                        />
                    }

                </div>
            );
        } finally {
            moment.locale(oldLocale);
        }
    }

}

Calendar.defaultProps = {
    startFromMonday: false,
    locale: "en",
};

Calendar.propTypes = {
    date: PropTypes.object,
    onChange: PropTypes.func,
    startFromMonday: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired
};


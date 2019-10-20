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
} from "./share/util.js";

import {
	Header,
	Choosen,
	ContentDays,
	ContentMonths,
	ContentYears
} from "./subcomponents/calendar.js";

export class Calendar extends React.Component {

	constructor(props) {
		super(props);

		let mode = MODE_DAY;

		this.today = props.today ? props.today : moment();
		this.months = moment.months();
		this.weekdays = moment.weekdays().map(day => day.substring(0, 3));

		this.state = Object.assign({
			mode,
			showedMoment: (props.date ? moment(props.date) : this.today),
			choosenMoment: (props.date ? moment(props.date) : null),

			// MODE_YEAR
			yearincr: 0
		});

		this.daysInMonth = memoize((showedMoment) => {
			return makeDayMatrix(showedMoment);
		});

		this.years = memoize((showedMoment, yearincr) => {
			return makeYearsMatrix(
				moment(showedMoment).year(showedMoment.year() + yearincr)
			);
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.date && !this.props.date.isSame(prevProps.date, "days")) {
			this.setState({
				showedMoment: this.props.date,
				choosenMoment: this.props.date
			});
		}
	}

	onPrev() {

		switch(this.state.mode) {
			case MODE_YEAR:
				this.setState(prev => ({yearincr: prev.yearincr - 20}));
				break;
			case MODE_MONTH:
				throw new Error("Forbidden in MODE_YEAR");
			case MODE_DAY:
				this.setState({
					showedMoment: moment(this.state.showedMoment).subtract(1, 'months')
				});
				break;
			default:
				throw new Error("Mode not found: " + this.state.mode);
		}
	}

	onNext() {

		switch(this.state.mode) {
			case MODE_YEAR:
				this.setState(prev => ({yearincr: prev.yearincr + 20}));
				break;
			case MODE_MONTH:
				throw new Error("Forbidden in MODE_MONTH");
				break;
			case MODE_DAY:
				this.setState({
					showedMoment: moment(this.state.showedMoment).add(1, 'months')
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

			switch(type) {
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

	render() {

		const daysInMonth = this.daysInMonth(this.state.showedMoment);
		const years = this.years(this.state.showedMoment, this.state.yearincr);

		return (
			<div className="atcalendar">

				<Choosen
					weekdays={this.weekdays}
					months={this.months}
					choosenMoment={this.state.choosenMoment} />

				<div className="atcalendar__head">
					<button className="atcalendar__head__prev-month"
						disabled={this.state.mode === MODE_MONTH}
						onClick={this.onPrev.bind(this)}/>

					<Header
						mode={this.state.mode}
						months={this.months}
						showedMoment={this.state.showedMoment}
						showMode={this.showMode.bind(this)}
						/>

					<button className="atcalendar__head__next-month"
						disabled={this.state.mode === MODE_MONTH}
						onClick={this.onNext.bind(this)}/>
				</div>

				{
					this.state.mode === MODE_DAY &&
						<ContentDays
							weekdays={this.weekdays}
							daysInMonth={daysInMonth}
							showedMoment={this.state.showedMoment}
							choosenMoment={this.state.choosenMoment}
							onChooseDate={this.onChoose.bind(this, "date")}
							/>
				}

				{
					this.state.mode === MODE_MONTH &&
					<ContentMonths
						months={this.months}
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
	}

}

Calendar.propTypes = {
	date: PropTypes.object,
	onChange: PropTypes.func
};


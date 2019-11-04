import React from "react";
import PropTypes from "prop-types";
import { Calendar } from "./Calendar.js";

let holders = [];

export class CalendarHolder extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			hide: true,
			date:  props.date || null
		};

		this.onGlobalClick = this.onGlobalClick.bind(this);
	}

	onGlobalClick(e) {
		if (e.target.closest && !e.target.closest(".atcalendar-holder")) {
			this.hide();
		}
	}

	componentDidMount() {

		// document.addEventListener("click", this.onGlobalClick);

		holders.push(this);
		holders.forEach(holder => {
			holder !== this && holder.hide();
		});
	}

	componentWillUnmount() {
		// document.removeEventListener("click", this.onGlobalClick);
		holders = holders.filter(holder => holder !== this);
	}

	hide() {
		this.setState({hide: true});
	}

	onClick(e) {
		e.stopPropagation();
		this.setState(prev => ({hide: !prev.hide}));
		holders.forEach(holder => {
			holder !== this && holder.hide();
		});
	}

	onChange(date) {
		this.setState({date}, () => {
			this.props.onChange && this.props.onChange(date);
		});
	}

	// for umd
	setDate(date) {
		this.setState({date});
	}

	// for umd
	toggle() {
		this.setState(prev => ({hide: !prev.hide}));
	}

	stop(e) {
		e.stopPropagation();
	}

	render() {
		return (
			<div className="atcalendar-holder" onClick={this.onClick.bind(this)}>
				{this.props.children}
				<div className="atcalendar-holder__calendar" onClick={this.stop.bind(this)}>
				{this.state.hide ? null : <Calendar date={this.state.date} onChange={this.onChange.bind(this)} />}
				</div>
			</div>
		);
	}

}

CalendarHolder.propTypes = {
	date: PropTypes.object,
	onChange: PropTypes.func,
	children: PropTypes.arrayOf(PropTypes.element),
};

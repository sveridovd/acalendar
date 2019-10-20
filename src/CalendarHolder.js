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
	}

	componentDidMount() {
		holders.push(this);
		holders.forEach(holder => {
			holder !== this && holder.hide();
		});
	}

	componentWillUnmount() {
		holders = holders.filter(holder => holder !== this);
	}

	hide() {
		this.setState({hide: true});
	}

	onClick() {
		this.setState(prev => ({hide: !prev.hide}));
		holders.forEach(holder => {
			holder !== this && holder.hide();
		});
	}

	children() {

		if (!this.props.children) {
			return null;
		}

		return React.cloneElement(this.props.children, {
			onClick: this.onClick.bind(this)
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


	render() {
		return (
			<div className="atcalendar-holder">
				{this.children()}
				{this.state.hide ? null : <Calendar date={this.state.date} onChange={this.onChange.bind(this)} />}
			</div>
		);
	}

}

CalendarHolder.propTypes = {
	date: PropTypes.object,
	onChange: PropTypes.func
};

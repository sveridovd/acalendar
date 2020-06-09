import React from "react";
import Renderer from "react-test-renderer";
import moment from "moment";
import { Calendar } from "../src/Calendar.js";
import {MODE_MONTH, MODE_YEAR} from "../src/util/util";

class CalendarTest extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			date: props.date
		};
	}

	onChange(date) {
		this.setState({date});
	}

	render() {
		return <Calendar onChange={this.onChange.bind(this)} date={this.state.date} />
	}
}

test("Calendar", () => {
	const ref = React.createRef();
	const renderer = Renderer.create(<CalendarTest ref={ref} date={moment("13/10/2019 12:00", "DD/MM/YYYY hh:mm")}/>);
	const root = renderer.root;
	const calendarTest = root.instance;
	const calendar = root.findByType(Calendar).instance;

	{
		let atcalendar__head__center__date = root.findByProps({
			className: "atcalendar__head__center__date"
		});
		expect(atcalendar__head__center__date.children[0].children[0]).toBe("October");
		expect(atcalendar__head__center__date.children[1].children[0]).toBe("2019");
		expect(renderer.toJSON()).toMatchSnapshot();
	}


	{
		calendar.showMode(MODE_MONTH);
		let atcalendar__head__center__month = root.findByProps({
			className: "atcalendar__head__center__month"
		});
		expect(atcalendar__head__center__month.children[0].children[0]).toBe("2019");
		expect(renderer.toJSON()).toMatchSnapshot();
	}


	{
		calendar.showMode(MODE_YEAR);
		let atcalendar__head__center__year = root.findByProps({
			className: "atcalendar__head__center__year"
		});
		expect(atcalendar__head__center__year.children[0].children[0]).toBe("Choose year");
		expect(renderer.toJSON()).toMatchSnapshot();
	}


	{
		calendar.onChoose("year", 2017);
		let atcalendar__head__center__month = root.findByProps({
			className: "atcalendar__head__center__month"
		});
		expect(atcalendar__head__center__month.children[0].children[0]).toBe("2017");
		expect(renderer.toJSON()).toMatchSnapshot();
	}

	{
		calendar.onChoose("month", "December");
		let atcalendar__head__center__date = root.findByProps({
			className: "atcalendar__head__center__date"
		});
		expect(atcalendar__head__center__date.children[0].children[0]).toBe("December");
		expect(atcalendar__head__center__date.children[1].children[0]).toBe("2017");
		expect(renderer.toJSON()).toMatchSnapshot();
	}

	{
		ref.current.onChange(moment("25/11/2013", "DD/MM/YYYY"));

		let atcalendar__choosen__date = root.findByProps({
			className: "atcalendar__choosen__date"
		});

		expect(atcalendar__choosen__date.children[0].children).toEqual([ 'November', ' ', '2013', ', ', 'Mon', ' ', '25' ]);
		expect(renderer.toJSON()).toMatchSnapshot();
	}

});

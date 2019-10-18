import React from "react";
import Renderer from "react-test-renderer";
import moment from "moment";
import { Calendar } from "../src/Calendar.js";

test('Calendar creating', () => {
	const component = React.createElement(Calendar, {
		date: moment("13/10/2019 12:00", "DD/MM/YYYY hh:mm"),
		today: moment("13/10/2019 12:00", "DD/MM/YYYY hh:mm")
	});
	const rcomponent = Renderer .create(component);
	expect(rcomponent.toJSON()).toMatchSnapshot();
});
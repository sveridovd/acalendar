import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";

import { Calendar } from "../Calendar.js";
import { CalendarHolder } from "../CalendarHolder.js";

function determiteAndGet(queryOrElement) {
	let elements = [];
	if (queryOrElement instanceof HTMLElement) {
		elements.push(queryOrElement);
	} else if (Array.isArray(queryOrElement)) {
		queryOrElement.map(element => {
			if (element instanceof HTMLElement) {
				elements.push(element);
			} else if (typeof element === 'string') {
				elements = elements.concat(Array.from(document.querySelectorAll(element)));
		 	} else {
				console.log("Atcalendar: skip ", element);
			}
		});
	} else {
		elements = Array.from(document.querySelectorAll(queryOrElement));
	}

	return elements;
}

function attach(element, {format = "DD/MM/YYYY"}) {
	const container = document.createElement('div');
	container.classList.add('atcalendar-holder');
	element.parentElement.append(container);

	let date = null;
	if (element.value && format) {
		date = moment(element.value, format)
	} else if (element.value) {
		date = moment(element.value)
	}

	if (date && !date.isValid()) {
		date = null;
	}

	const ref = React.createRef();
	element.addEventListener("change", function() {
		let date = null;
		if (element.value && format) {
			date = moment(element.value, format);
		} else if (element.value) {
			date = moment(element.value);
		}
		if (date.isValid())
			ref.current.setDate(date);
	});

	ReactDOM.render(
		<CalendarHolder onChange={((val) => {
			element.value = val.format("DD/MM/YYYY");
		})} ref={ref} />,
		container
	);

	ref.current.setDate(date);

	element.addEventListener("click", function(e) {
		ref.current.toggle();
	});
}

export function attachCalendar(queryOrElement, opts = {}) {
	const elements = determiteAndGet(queryOrElement);
	for (let element of elements) {
		attach(element, opts);
	}
}


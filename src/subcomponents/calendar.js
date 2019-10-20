import React from "react";
import moment from "moment";
import {
	MODE_YEAR,
	MODE_MONTH,
	MODE_DAY,
	cssClassHelper,
	formatNumberOfMonth
} from "../share/util.js";

export function Choosen({weekdays, months, choosenMoment}) {
	return (
		<div className="atcalendar__choosen">
			<div className="atcalendar__choosen__icon"/>
			<div className="atcalendar__choosen__date">
				{ choosenMoment &&
					<span>{months[choosenMoment.month()]} {choosenMoment.year()}, {weekdays[choosenMoment.day()]} {choosenMoment.date()}</span>
				}
				{ !choosenMoment &&
					<span>----- ----, --- --</span>
				}
			</div>
		</div>
	);
}

export function Header({mode, months, showedMoment, showMode}) {
	return (
		<>
			{
				mode === MODE_DAY &&
				<>
					<div className="atcalendar__head__center">
						<div className="atcalendar__head__center__date">
							<span onClick={() => showMode(MODE_MONTH)} className={"clickable"}>{months[showedMoment.month()]}</span>
							<span onClick={() => showMode(MODE_YEAR)} className={"clickable"}>{showedMoment.year()}</span>
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
						return <li key={i} className={cssClassHelper({
							"atcalendar__dates__item": true,
							"choosen": showed.isSame(choosenMoment, "day"),
						})}
							onClick={() => onChooseDate(date)}>{date}</li>
					})
					
				}
			</ul>
		</>
	);
}

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
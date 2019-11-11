##### ACalendar Usage

![version](https://img.shields.io/github/package-json/v/sveridovd/acalendar?color=%2339aa56)
![version](https://img.shields.io/github/commit-activity/w/sveridovd/acalendar)

```javascript
    import "acalendar/style/theme_light.css";
    // OR
    import "acalendar/style/theme_dark.css";

    import { Calendar } from "acalendar";
    import moment from "moment"; 

    // Setting a locale
    moment.locale("en");

    /**
     * @param {moment} date
    */
    function onChange(date) {
        console.log(date.format("DD/MM/YYYY"))
    }   

    ReactDOM.render(<Calendar 
        date={moment.now()} // moment object
        onChange={onChange}/>, container);
```
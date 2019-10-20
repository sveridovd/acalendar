##### ACalendar Usage

```javascript
    import "acalendar/style/theme_light.css";
    // OR
    import "acalendar/style/theme_dark.css";

    import { Calendar } from "acalendar";
    import moment from "moment"; 

    /**
     * @param {moment} date
    */
    function onChange(date) {
        console.log(moment.format("DD/MM/YYYY"))
    }   

    ReactDOM.render(<Calendar 
        date={moment.now()} // moment object
        onChange={onChange}/>, container);
```
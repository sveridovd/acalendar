import React from 'react';
import { render } from 'react-dom';
import { Calendar } from '../index';

import '../style/theme_dark.css';

console.log(document.getElementById('root'));
render(
    <Calendar
        onChange={(moment) => {
            console.log(moment.format('DD.MM'));
        }}
    />,
    document.getElementById('root'),
);

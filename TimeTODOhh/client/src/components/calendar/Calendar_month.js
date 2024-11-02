import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";

function Calendar() {
    const [value, onChange] = useState(new Date());
    return (
        <div>
            <h1>캘린더</h1>

            <Calendar onChange={onChange} value={value} />


























            {/*<p*/}
            {/*    style={{*/}
            {/*        whiteSpace: "pre",*/}
            {/*        fontFamily: "monospace",*/}
            {/*    }}>*/}
            {/*    +----------------------------------+<br/>*/}
            {/*    |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;October&nbsp;2024&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>*/}
            {/*    +----------------------------------+<br/>*/}
            {/*    |&nbsp;Mo&nbsp;|&nbsp;Tu&nbsp;|&nbsp;We&nbsp;|&nbsp;Th&nbsp;|&nbsp;Fr&nbsp;|&nbsp;Sa&nbsp;|&nbsp;Su&nbsp;|<br/>*/}
            {/*    +----+----+----+----+----+----+----+<br/>*/}
            {/*    |&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;1&nbsp;&nbsp;|&nbsp;2&nbsp;&nbsp;|&nbsp;3&nbsp;&nbsp;|&nbsp;4&nbsp;&nbsp;|&nbsp;5&nbsp;&nbsp;|<br/>*/}
            {/*    +----+----+----+----+----+----+----+<br/>*/}
            {/*    |&nbsp;6&nbsp;&nbsp;|&nbsp;7&nbsp;&nbsp;|&nbsp;8&nbsp;&nbsp;|&nbsp;9&nbsp;&nbsp;|10&nbsp;&nbsp;|11&nbsp;&nbsp;|12&nbsp;&nbsp;|<br/>*/}
            {/*    +----+----+----+----+----+----+----+<br/>*/}
            {/*    |13&nbsp;&nbsp;|14&nbsp;&nbsp;|15&nbsp;&nbsp;|16&nbsp;&nbsp;|17&nbsp;&nbsp;|18&nbsp;&nbsp;|19&nbsp;&nbsp;|<br/>*/}
            {/*    +----+----+----+----+----+----+----+<br/>*/}
            {/*    |20&nbsp;&nbsp;|21&nbsp;&nbsp;|22&nbsp;&nbsp;|23&nbsp;&nbsp;|24&nbsp;&nbsp;|25&nbsp;&nbsp;|26&nbsp;&nbsp;|<br/>*/}
            {/*    +----+----+----+----+----+----+----+<br/>*/}
            {/*    |27&nbsp;&nbsp;|28&nbsp;&nbsp;|29&nbsp;&nbsp;|30&nbsp;&nbsp;|31&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br/>*/}
            {/*    +----+----+----+----+----+----+----+<br/>*/}
            {/*    <p></p>*/}
            {/*    <p></p>*/}
            {/*    프론트 빡세네 이거*/}
            {/*</p>*/}

        </div>
    );
}

export default Calendar;

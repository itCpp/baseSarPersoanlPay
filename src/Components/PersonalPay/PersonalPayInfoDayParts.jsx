import React from 'react';

class PersonalPayInfoDayParts extends React.Component {

    render() {
        
        const parts = this.props.row.okladParts.map(row => <div key={row.date} className={`d-flex justify-content-between px-1 more-info-hover ${row.day === "6" || row.day === "7" ? 'row-vihodnoy' : ''}`}>
            <div>{row.date}{' '}{row.dayRus}</div>
            <div>{row.part}</div>
        </div>);

        return <>
            <hr className="my-2" />
            <div><strong>Начисления за день</strong></div>
            {parts}
        </>

    }

}

export default PersonalPayInfoDayParts;
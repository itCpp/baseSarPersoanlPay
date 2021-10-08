import React from 'react';

class PersonalPayInfoDayParts extends React.Component {

    render() {
        
        const parts = this.props.row.okladParts.map(row => <div key={row.date} className={`d-flex justify-content-between px-1 more-info-hover ${row.day === "6" || row.day === "7" || row.dayOff ? 'row-vihodnoy' : ''}`}>
            <div>
                {row.date}
                {' '}
                {row.dayRus}
                {row.myDayOff ? <code className="pl-1">Вых</code> : null}
            </div>
            <div>{row.part}</div>
        </div>);

        return <>
            <hr className="my-2" />
            <div><strong>Начисления за день</strong></div>
            {this.props.row.calendarAuto
                ? <div className="mb-1 text-danger"><i>Данные о рабочих днях сформированы автоматически</i></div>
                : null
            }
            {parts}
        </>

    }

}

export default PersonalPayInfoDayParts;
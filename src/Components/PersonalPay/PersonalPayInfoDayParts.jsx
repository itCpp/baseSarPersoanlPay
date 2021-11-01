import React from 'react';

class PersonalPayInfoDayParts extends React.Component {

    render() {
        
        const parts = this.props.row.okladParts.map(row => <div key={row.date} className={`d-flex justify-content-between px-1 more-info-hover ${row.day === "6" || row.day === "7" || row.dayOff ? 'row-vihodnoy' : ''}`} style={{ opacity: row.noView ? 0.4 : 1 }}>
            <div>
                {row.date}
                {' '}
                {row.dayRus}
                {row.myDayOff ? <span className="ml-1 badge badge-info" title="Дополнительный выходной">Вых</span> : null}
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
import React from 'react';
import Icon from './../../Utils/FontAwesomeIcon'

// import IconCompany from './../../images/call-center.png'

class PersonalPayRow extends React.Component {

    render() {

        const row = this.props.row;

        let color = null;

        if (row.ostatok < 0)
            color = "ostatok-minus";
        else if (row.ostatok > 0)
            color = "ostatok-plus";

        /** Вывод строки с отделом */
        if (row.otdelRow) {

            return <div className="table-row table-row-otdel">
                <div className="table-cell py-1 px-2 font-weight-bold">{row.otdel}</div>
                <div className="table-cell py-1 px-2 text-center">{row.pins || 0}</div>
                <div className="table-cell py-1 px-2 text-center">{row.oklad || 0}</div>
                <div className="table-cell py-1 px-2 text-center">{row.salary || 0}</div>
                <div className="table-cell py-1 px-2 text-center">{row.fines || 0}</div>
                <div className="table-cell py-1 px-2 text-center">{row.kitchen || 0}</div>
                <div className="table-cell py-1 px-2 text-center">{row.avans || 0}</div>
                <div className="table-cell py-1 px-2 text-center">{row.tax || 0}</div>
                <div className="table-cell py-1 px-2 text-center">{row.ostatok || 0}</div>
            </div>;

        }

        return (
            <>

                <div className={`table-row ${row.color}`}>

                    <div className="table-cell py-1 px-2 d-flex justify-content-between align-items-center">

                        <div className="d-flex align-items-center">
                            <Icon icon={['fas', 'headset']} className="mr-2" title="Саратов" />
                            <span className="hover-name-for-click" onClick={this.props.showMoreInfo} data-id={row.id || 0}>{row.fio || "Неизвестно"}</span>
                        </div>

                        {row.oforml === 1 && <code>ОФ.</code>}

                    </div>

                    <div className="table-cell py-1 px-2 text-center">{row.pin || "---"}</div>

                    <div className={`table-cell py-1 px-2 text-center ${row.oklad === 0 ? 'null-data' : ''}`}>{row.oklad}</div>

                    <div className={`table-cell py-1 px-2 text-center ${row.salary === 0 ? 'null-data' : ''}`}>{row.salary || 0}</div>

                    <div className={`table-cell py-1 px-2 text-center ${row.fines === 0 ? 'null-data' : ''}`}>{row.fines}</div>

                    <div className={`table-cell py-1 px-2 text-center ${row.kitchen === 0 ? 'null-data' : ''}`}>{row.kitchen}</div>

                    <div className={`table-cell py-1 px-2 text-center ${row.avans === 0 ? 'null-data' : ''}`}>{row.avans}</div>

                    <div className={`table-cell py-1 px-2 text-center ${!row.tax || row.tax === 0 ? 'null-data' : ''}`}>{row.tax || 0}</div>

                    <div className={`table-cell py-1 px-2 text-center ${row.ostatok === 0 ? 'null-data' : color || ''}`}>{row.ostatok}</div>

                </div>

            </>

        )

    }

}

export default PersonalPayRow;
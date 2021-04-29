import React from 'react';

class PersonalPayLegerys extends React.Component {

    render() {

        if (!this.props.row.legeries.length)
            return null;
        
        const parts = this.props.row.legeries.map((row, i) => <div key={`legery-${i}-${row.date}`} className={`d-flex justify-content-between px-1 more-info-hover ${row.type.indexOf("траф") > 0 ? 'row-vihodnoy' : ''}`}>
            <div>{row.date}{' '}{row.type}</div>
            <div>{row.money}</div>
        </div>);

        return <>
            <hr className="my-2" />
            <div><strong>Выплаты и штрафы</strong></div>
            {parts}
        </>

    }

}

export default PersonalPayLegerys;
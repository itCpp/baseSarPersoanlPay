function ReytingCallSalary(props) {

    const { row } = props;
    let salary = 0;

    if (row?.reytingCallOne) {
        salary += row.reytingCallOne?.zpNach || 0;
        salary += row.reytingCallOne?.zpZayavky || 0;
    }

    if (row?.reytingCallTwo) {
        salary += row.reytingCallTwo?.zpNach || 0;
        salary += row.reytingCallTwo?.zpZayavky || 0;
    }

    if (row?.reytingTreners) {
        salary += row.reytingTreners?.zpPrihod || 0;
        salary += row.reytingTreners?.zpColl || 0;
        salary += row.reytingTreners?.kassa || 0;
    }

    return <>

        {salary ? <div className="d-flex justify-content-between px-1 more-info-hover">
            <span>Начислено по рейтингу колла</span>
            <span>{salary}</span>
        </div> : null}

    </>

}

export default ReytingCallSalary;
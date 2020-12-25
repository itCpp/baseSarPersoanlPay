import ReytingCallCaller from './ReytingCallCaller'
import ReytingCallTrener from './ReytingCallTrener'

function ReytingCallData(props) {

    const row = props.row;

    const reytingCallOne = row?.reytingCallOne
        ? <ReytingCallCaller row={row.reytingCallOne} week={1} />
        : null

    const reytingCallTwo = row?.reytingCallTwo
        ? <ReytingCallCaller row={row.reytingCallTwo} week={2} />
        : null

    const reytingTreners = row?.reytingTreners
        ? <ReytingCallTrener row={row.reytingTreners} />
        : null

    if (!reytingCallOne && !reytingCallTwo && !reytingTreners)
        return null

    const statPerid = !reytingCallTwo
        ? null
        : {
            kassa: row?.reytingCallTwo?.kassa || 0,
            kassaPercent: row?.reytingCallTwo?.kassaPercent || 0,
            okk: row?.reytingCallTwo?.okk || 0,
        }

    let kassaMonth = row?.reytingCallTwo?.kassaMonth || 0;

    return <>
        <hr className="my-2" />

        <div className="px-1">

            <div><strong>Рейтинг колл-центра</strong></div>

            {reytingCallOne}
            {reytingCallTwo}

            {statPerid ? <div>

                <div><code>За период</code></div>

                <div className="caller-reyting">

                    {kassaMonth > 0 ? <div className="d-flex justify-content-between px-1 more-info-hover">
                        <small>Премия от кассы руководителю</small>
                        <small>{kassaMonth}</small>
                    </div> : null}

                    <div className="d-flex justify-content-between px-1 more-info-hover">
                        <small>Касса кольщика</small>
                        <small>{statPerid.kassa || 0}</small>
                    </div>

                    <div className="d-flex justify-content-between px-1 more-info-hover">
                        <small>Бонус кассы</small>
                        <small>{statPerid.kassaPercent || 0}</small>
                    </div>

                    <div className="d-flex justify-content-between px-1 more-info-hover">
                        <small>Бонус ОКК</small>
                        <small>{statPerid.okk || 0}</small>
                    </div>

                </div>

            </div> : null}

            {reytingTreners}

        </div>
    </>

}

export default ReytingCallData;
function ReytingCallTrener(props) {

    const row = props.row;

    return <div>

        <div><code>Рейтинг тренера</code></div>

        <div className="caller-reyting">

            {row.zpPrihod > 0 ? <div className="d-flex justify-content-between px-1 more-info-hover">
                <small>Приходы</small>
                <small>{row.zpPrihod}</small>
            </div> : null}

            {row.zpColl > 0 ? <div className="d-flex justify-content-between px-1 more-info-hover">
                <small>Работа колла</small>
                <small>{row.zpColl}</small>
            </div> : null}

            {row.kassa ? <div className="d-flex justify-content-between px-1 more-info-hover">
                <small>Премия кассы</small>
                <small>{row.kassa}</small>
            </div> : null}

        </div>

    </div>

}

export default ReytingCallTrener;
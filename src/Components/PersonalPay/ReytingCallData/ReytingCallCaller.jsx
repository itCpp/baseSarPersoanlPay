function ReytingCallCaller(props) {

    const row = props.row;
    const title = props.week === 1
        ? "Первая неделя периода"
        : "Вторая неделя периода"

    return <div>

        <div><code>{title}</code></div>

        <div className="caller-reyting">

            {row.zpNach ? <div className="d-flex justify-content-between px-1 more-info-hover">
                <small>ЗП руководителю сектора</small>
                <small>{row.zpNach}</small>
            </div> : null}

            <div className="d-flex justify-content-between px-1 more-info-hover">
                <small>Приходы</small>
                <small>{row.zpZayavky || 0}</small>
            </div>

            {row.zpDogovory > 0 ? <div className="d-flex justify-content-between px-1 more-info-hover">
                <small>Договоры</small>
                <small>{row.zpDogovory}</small>
            </div> : null}

            {row.prihodBonus > 0 ? <div className="d-flex justify-content-between px-1 more-info-hover">
                <small>Бонус за приходы</small>
                <small className="bonus-summa">{row.prihodBonus}</small>
            </div> : null}
            
            {row.bonusReviews > 0 ? <div className="d-flex justify-content-between px-1 more-info-hover">
                <small>Бонус за отзывы</small>
                <small className="bonus-summa">{row.bonusReviews}</small>
            </div> : null}

        </div>

    </div>

}

export default ReytingCallCaller;
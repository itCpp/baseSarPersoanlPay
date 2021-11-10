import React from 'react'

import axios from './../../Utils/axios'
import echoerror from './../../Utils/echoerror'

import PersonalPayHeader from './PersonalPayHeader'
import PersonalPayRow from './PersonalPayRow'
import PersonalPayInfo from './PersonalPayInfo'

import { Spinner } from 'react-bootstrap'

import './../../css/personalPay.css'

class PersonalPay extends React.Component {

    /**
     * Объект данных
     * 
     * @var {object}
     */
    state = {

        period: "", // Выбранный период
        error: null, // Ошибка запроса
        globalError: null,
        search: null, // Поисковой запрос

        progcess: false,
        loading: true,
        loadingData: false,
        loadingSearch: false,

        rows: [], // Массив данных
        statistic: {}, // Общая статистика

        rowId: null,
        show: false,

    };

    componentDidMount = () => {

        this.getData();

    }

    /**
     * Получение данных для вывода
     */
    getData = async () => {

        // if (this.state.progcess)
        //     return false;

        await this.setState({
            progress: true,
            loadingData: !this.state.loadingSearch,
        });

        axios.post('personalPay/getSaratovData', {
            period: this.state.period,
            search: this.state.search
        }).then(({ data }) => {

            this.setState({
                error: null,
                rows: data.rows,
                statistic: data.statistic,
                period: data.period,
            });

        }).catch(error => {

            if (error?.response?.status === 401)
                this.setState({ globalError: echoerror(error) });
            else
                this.setState({ error: echoerror(error) });

        }).then(() => {

            this.setState({
                progcess: false,
                loading: false,
                loadingData: false,
                loadingSearch: false,
            });

        });

    }

    /**
     * Метод вывода даты в формте ГГГГ-ММ-ДД
     * 
     * @param {number|null} year Год или отметка времени
     * @param {number|null} month Месяц
     * @param {number|null} day Число
     */
    createDate = (year = null, month = null, day = null) => {

        let date;

        if (year && month !== null && day)
            date = new Date(year, month, day);
        else if (year)
            date = new Date(year);
        else
            date = new Date();

        let dd = Number(date.getDate()),
            mm = Number(date.getMonth()) + 1,
            yy = Number(date.getFullYear());

        dd = dd < 10 ? "0" + dd : dd;
        mm = mm < 10 ? "0" + mm : mm;

        return `${yy}-${mm}-${dd}`;

    }

    /**
     * Кнопка автоматического выбора периода
     * 
     * @param {object} el Кнопка шага в периоде
     */
    setDateStep = el => {

        let step = Number(el.currentTarget.dataset.step),
            date = new Date(this.state.period),
            yyyy = date.getFullYear(),
            mm = date.getMonth(),
            dd = date.getDate();

        if (step === 0)
            this.setState({ period: "" });
        else if (step < 0) {
            let period = this.createDate(yyyy, mm, dd - 10);
            this.setState({ period });
        }
        else if (step > 0) {
            let period = this.createDate(yyyy, mm, dd + 20);
            this.setState({ period });
        }

        setTimeout(el.currentTarget.blur(), 100);
        this.getData();

    }

    /**
     * Старт поиска по пину или ФИО
     * 
     * @param {string} search Поисковой запрос
     */
    startSearch = async search => {

        await this.setState({
            loadingSearch: true,
            search
        });

        this.getData();

    }

    /**
     * Смена даты периода
     * 
     * @param {object} el  
     */
    changePeriod = async el => {

        let period = el.target.value;
        await this.setState({ period });

    }

    /**
     * Обработка нажатий кнопки энтер
     * 
     * @param {object} el Поле ввода даты периода 
     */
    changePeriodKeyUp = el => {

        if (el.keyCode === 13) {
            setTimeout(el.target.blur(), 300);
            this.getData();
        }

    }

    /**
     * Открытие модального окна для подробной информации по выплатам
     * 
     * @param {object} e Кнопка нажатия по ФИО
     */
    showMoreInfo = e => this.setState({ rowId: e.currentTarget.dataset.id });

    retryLoadData = () => {

        this.setState({ loading: true });
        this.getData();

    }

    render() {

        if (this.state.loading)
            return <div className="mt-5 text-center">
                <Spinner animation="border" variant="primary" />
            </div>

        if (this.state.globalError)
            return <>
                <div className="alert alert-danger error-global shadow mx-auto">{this.state.error}</div>
                <div className="text-center mt-3">
                    <button className="btn btn-danger btn-sm" onClick={this.retryLoadData}>Повторить</button>
                </div>
            </>

        const error = this.state.error
            ? <div className="alert alert-danger error-global shadow mx-auto my-3">{this.state.error}</div>
            : null

        const rows = this.state.rows.length
            ? this.state.rows.map((row, k) => <PersonalPayRow key={k} row={row} id={k} showMoreInfo={this.showMoreInfo} />)
            : null

        const statistic = this.state.statistic;

        const loadingRows = this.state.loadingData || this.state.loadingSearch
            ? <div className="loading-block-personal"></div>
            : null

        return (

            <div id="personal-pay" className="mx-auto mb-3">

                <PersonalPayHeader
                    getData={this.getData}
                    startSearch={this.startSearch}
                    setDateStep={this.setDateStep}
                    changePeriod={this.changePeriod}
                    changePeriodKeyUp={this.changePeriodKeyUp}
                    loadingData={this.state.loadingData}
                    loadingSearch={this.state.loadingSearch}
                    period={this.state.period}
                />

                {!error ? <div className="table-content position-relative">

                    <div className="table-row font-weight-bold text-light table-row-header">
                        <div className="table-cell py-2 px-2 text-center bg-primary">ФИО</div>
                        <div className="table-cell py-2 px-2 text-center bg-primary">PIN</div>
                        <div className="table-cell py-2 px-2 text-center bg-primary">Оклад</div>
                        <div className="table-cell py-2 px-2 text-center bg-primary">К выдаче</div>
                        <div className="table-cell py-2 px-2 text-center bg-primary">Налог</div>
                        <div className="table-cell py-2 px-2 text-center bg-primary">Штраф</div>
                        <div className="table-cell py-2 px-2 text-center bg-primary">Кухня</div>
                        <div className="table-cell py-2 px-2 text-center bg-primary">Выдано</div>
                        <div className="table-cell py-2 px-2 text-center bg-primary">Остаток</div>
                    </div>

                    <div className="table-row table-row-statistic">
                        <div className="table-cell py-1 px-2 font-weight-bold">Всего</div>
                        <div className="table-cell py-1 px-2 text-center">{statistic.pins || 0}</div>
                        <div className="table-cell py-1 px-2 text-center">{statistic.oklad ? Number(statistic.oklad).toFixed(2) : 0}</div>
                        <div className="table-cell py-1 px-2 text-center">{statistic.salary ? Number(statistic.salary).toFixed(2) : 0}</div>
                        <div className="table-cell py-1 px-2 text-center">{statistic.tax ? Number(statistic.tax).toFixed(2) : 0}</div>
                        <div className="table-cell py-1 px-2 text-center">{statistic.fines ? Number(statistic.fines).toFixed(2) : 0}</div>
                        <div className="table-cell py-1 px-2 text-center">{statistic.kitchen ? Number(statistic.sakitchenlary).toFixed(2) : 0}</div>
                        <div className="table-cell py-1 px-2 text-center">{statistic.avans ? Number(statistic.avans).toFixed(2) : 0}</div>
                        <div className="table-cell py-1 px-2 text-center">{statistic.ostatok ? Number(statistic.ostatok).toFixed(2) : 0}</div>
                    </div>

                    {rows}
                    {loadingRows}

                    <PersonalPayInfo
                        rowId={this.state.rowId}
                        period={this.state.period}
                        closeMoreInfo={() => this.setState({ rowId: null })}
                    />

                </div> : null}

                {error}

            </div>
            
        )

    }

}

export default PersonalPay
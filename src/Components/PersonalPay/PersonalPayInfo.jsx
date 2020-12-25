import React from 'react';

import axios from './../../Utils/axios'
import echoerror from './../../Utils/echoerror'

import { Modal, Spinner } from 'react-bootstrap'

import ReytingCallData from './ReytingCallData/ReytingCallData'

class PersonalPayInfo extends React.Component {

    state = {
        row: null,
        rowId: null,
        show: false,
        loading: false,
        error: null,
    }

    componentDidUpdate = () => {

        if (this.state.rowId !== this.props.rowId)
            this.getData(this.props.rowId);

    }

    getData = id => {

        if (id === null)
            return false;

        this.setState({
            row: null,
            rowId: id,
            loading: true,
            show: true,
        });

        axios.post('personalPay/getSaratovData', {
            period: this.props.period,
            idOnly: id
        }).then(({ data }) => {

            data.rows.forEach(row => {
                if (Number(row.id) === Number(id))
                    this.setState({ row });
            });

        }).catch(error => {
            this.setState({ error: echoerror(error) });
        }).then(() => {
            this.setState({ loading: false });
        });

    }

    closeMoreInfo = () => {

        this.setState({ show: false, rowId: null });
        this.props.closeMoreInfo();

    }

    render() {

        const row = this.state.row;

        let fio = row?.fullName || "Неизвестно";
        fio = row?.fio || fio;

        let content = this.state.loading
            ? <div className="my-5 text-center"><Spinner animation="border" variant="primary" size="sm" /></div>
            : this.state.error
                ? <div className="text-center text-danger font-weight-bold my-5">{this.state.error}</div>
                : row === null
                    ? <div className="text-center my-5">Данные не найдены</div>
                    : <div className="more-info-pay">

                        <div><strong className="fio-name">{fio}</strong></div>
                        <div className="mb-2">{row.otdel}</div>

                        {row.workStart ? <div className="d-flex justify-content-between px-1 more-info-hover">
                            <span>Дата начала работы</span>
                            <span>{row.workStartRus}</span>
                        </div> : null}

                        {row.workStop ? <div className="d-flex justify-content-between px-1 more-info-hover">
                            <span>Дата окончания работы</span>
                            <span>{row.workStopRus}</span>
                        </div> : null}

                        {row.okladFull > 0 ? <div className="d-flex justify-content-between px-1 more-info-hover">
                            <span>Оклад</span>
                            <span>{row.okladFull}</span>
                        </div> : null}

                        {row.oklad ? <div className="d-flex justify-content-between px-1 more-info-hover">
                            <span>Оклад за период</span>
                            <span>{row.oklad}</span>
                        </div> : null}

                        {row.salary ? <div className="d-flex justify-content-between px-1 more-info-hover">
                            <span>Начислено ЗП</span>
                            <span className="font-weight-bold">{row.salary}</span>
                        </div> : null}

                        <ReytingCallData row={row} />
                        
                    </div>

        return (
            <>

                <Modal
                    show={this.state.show}
                    onHide={this.closeMoreInfo}
                    aria-labelledby="example-modal-sizes-title-lg"
                    animation={false}
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Информация</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="cursor-default">
                        {content}
                    </Modal.Body>

                </Modal>

            </>
        )

    }

}

export default PersonalPayInfo;
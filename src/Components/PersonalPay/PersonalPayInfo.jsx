import React from 'react';

import axios from './../../Utils/axios'
import echoerror from './../../Utils/echoerror'

import { Modal, Spinner } from 'react-bootstrap'

import ReytingCallData from './ReytingCallData/ReytingCallData'
import ReytingCallSalary from './ReytingCallData/ReytingCallSalary'
import PersonalPayInfoDayParts from './PersonalPayInfoDayParts'
import PersonalPayLegerys from './PersonalPayLegerys'

class PersonalPayInfo extends React.Component {

    state = {
        row: null,
        rowId: null,
        show: false,
        loading: false,
        error: null,
        kassa: 0,
        okladPart: 0,
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
                if (Number(row.id) === Number(id)) {

                    let okladPart = 0;

                    if (row.okladParts) {
                        if (typeof row.okladParts == "object") {
                            row.okladParts.forEach(part => {
                                okladPart += part.part;
                            });
                        }
                    }

                    okladPart = okladPart.toFixed(0);

                    this.setState({ row, kassa: data.kassa, okladPart });

                }
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

        let fio = row?.fullName || "????????????????????";
        fio = row?.fio || fio;

        let content = this.state.loading
            ? <div className="my-5 text-center"><Spinner animation="border" variant="primary" size="sm" /></div>
            : this.state.error
                ? <div className="text-center text-danger font-weight-bold my-5">{this.state.error}</div>
                : row === null
                    ? <div className="text-center my-5">???????????? ???? ??????????????</div>
                    : <div className="more-info-pay">

                        <div><strong className="fio-name">{fio}</strong></div>
                        <div className="px-1 mb-2">
                            <span>{row.otdel}</span>
                            <span className="text-muted ml-2">{row.doljnost}</span>
                        </div>

                        {row.workStart ? <div className="d-flex justify-content-between px-1 more-info-hover">
                            <span>???????? ???????????? ????????????</span>
                            <span>{row.workStartRus}</span>
                        </div> : null}

                        {row.workStop ? <div className="d-flex justify-content-between px-1 more-info-hover">
                            <span>???????? ?????????????????? ????????????</span>
                            <span>{row.workStopRus}</span>
                        </div> : null}

                        {row.oforml === 1
                            ? <div className="d-flex justify-content-between px-1 more-info-hover align-items-center">
                                <span>?????????? ??????????????</span>
                                <code>????.</code>
                            </div>
                            : null
                        }

                        {row.okladFull > 0 ? <div className="d-flex justify-content-between px-1 more-info-hover">
                            <span>??????????</span>
                            <span>{row.okladFull}</span>
                        </div> : null}

                        {row.noTax && row.noTax > 0 ? <div className="d-flex justify-content-between px-1 more-info-hover">
                            <span>???? ???????????????????? ??????????????</span>
                            <span>{row.noTax}</span>
                        </div> : null}

                        {row.oklad && row.oforml === 0 ? <div className="d-flex justify-content-between px-1 more-info-hover">
                            <span>?????????? ???? ????????????</span>
                            <span>{row.oklad}</span>
                        </div> : null}

                        <hr className="my-2" />

                        {this.state.okladPart > 0 ? <div className="d-flex justify-content-between px-1 more-info-hover">
                            <span>?????????????????? ???? ????????????</span>
                            <span>{this.state.okladPart}</span>
                        </div> : null}

                        <ReytingCallSalary row={row} />

                        {row.bonusKpd && row.bonusKpd > 0 ? <div className="d-flex justify-content-between px-1 more-info-hover" title="??????????, ?????????????????????? ???????????? ???????? ?????? ?????????????????????????? ??????">
                            <span>?????????? ???????????????????????????? ??????</span>
                            <span>{row.bonusKpd}</span>
                        </div> : null}

                        {row.salary && row.oforml === 0 ? <div className="d-flex justify-content-between px-1 more-info-hover">
                            <span>?????????????????? ????</span>
                            <span className="font-weight-bold">{row.salary}</span>
                        </div> : null}

                        {row.oforml === 1
                            ? <>
                                {row.taxPercent
                                    ? <>
                                        <div className="d-flex justify-content-between px-1 more-info-hover">
                                            <span>?????????????????? ???? <span className="badge badge-primary">{row.okladPercent}%</span></span>
                                            <span>{row.salary}</span>
                                        </div>
                                        <div className="d-flex justify-content-between px-1 more-info-hover">
                                            <span>?????????? <span className="badge badge-primary">{row.taxPercent}%</span></span>
                                            <span>-{row.tax}</span>
                                        </div>
                                        <div className="d-flex justify-content-between px-1 more-info-hover">
                                            <span>??????????</span>
                                            <span className="font-weight-bold">{row.salary - row.tax}</span>
                                        </div>
                                    </>
                                    : <div className="d-flex justify-content-between px-1 more-info-hover">
                                        <span>?????????? <span className="badge badge-primary">{row.okladPercent}%</span></span>
                                        <span className="font-weight-bold">{row.salary}</span>
                                    </div>
                                }
                            </>
                            : null
                        }

                        <ReytingCallData row={row} />

                        <PersonalPayLegerys row={row} />

                        <PersonalPayInfoDayParts row={row} />

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
                        <Modal.Title id="example-modal-sizes-title-lg">????????????????????</Modal.Title>
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
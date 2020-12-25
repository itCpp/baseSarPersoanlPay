import React from 'react';
import Icon from './../../Utils/FontAwesomeIcon'
import { Spinner } from 'react-bootstrap'

class PersonalPayHeader extends React.Component {

    startSearch = el => {

        let input = document.getElementById('search-word');
        this.props.startSearch(input.value);

    }

    changeInputSearchTimeout = null;

    changeInputSearch = el => {

        clearTimeout(this.changeInputSearchTimeout);
        let search = el.target.value;

        if (el.keyCode === 13) {
            this.props.startSearch(search);
            setTimeout(el.target.blur(), 300);
        }
        else {
            this.changeInputSearchTimeout = setTimeout(() => this.props.startSearch(search), 500);
        }

    }

    render() {

        const loading = this.props.loadingData
            ? <div className="loading-block-personal">
                <Spinner animation="border" variant="primary" />
            </div>
            : null

        return (
            <div id="filters" className="mt-5 mx-auto personal-pay-header position-relative">

                <div className="mx-auto text-center">
                    <h5>Фильтр данных</h5>
                </div>

                <div className="period d-flex align-items-center">

                    <div className="input-group mb-1">

                        <div className="input-group-prepend">
                            <span className="input-group-text font-weight-bold">Период</span>
                        </div>

                        <input type="date" id="period-start" className="form-control" value={this.props.period} onChange={this.props.changePeriod} onKeyUp={this.props.changePeriodKeyUp} />

                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button" id="button-start" onClick={this.props.getData} disabled={this.props.loadingData || this.props.loadingSearch}>Показать</button>
                        </div>

                    </div>

                </div>

                <div className="btn-group btn-group-sm w-100 mb-3" role="group">

                    <button type="button" className="btn btn-primary" data-step="-1" onClick={this.props.setDateStep}>
                        <Icon icon={['fas', 'chevron-left']} className="mr-2" />
                        <span>Предыдущий</span>
                    </button>

                    <button type="button" className="btn btn-primary" data-step="0" onClick={this.props.setDateStep}>Текущий</button>

                    <button type="button" className="btn btn-primary" data-step="1" onClick={this.props.setDateStep}>
                        <span>Следующий</span>
                        <Icon icon={['fas', 'chevron-right']} className="ml-2" />
                    </button>

                </div>

                <div className="mb-3 search-block">

                    <input type="search" id="search-word" placeholder="Укажите ФИО или PIN сотрудника" className="form-control search-input" onKeyUp={this.changeInputSearch} />

                    <Icon icon={['fas', 'search']} className="search-start" onClick={el => this.props.loadingData || this.props.loadingSearch ? false : this.startSearch(el)} />

                </div>

                {loading}

            </div>
        )

    }

}

export default PersonalPayHeader;
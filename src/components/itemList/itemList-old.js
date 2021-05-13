import React, {Component} from 'react';
import './itemList.scss';
import Spinner from '../spinner';
import ErrorMessage from "../errorMessage";

export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    };

    onError() {
        this.setState({
            error: true
        })
    }

    componentDidMount() {

        const {getData} = this.props;

        getData()
            .then((result) => {
                this.setState({
                    itemList: result
                })
            })
            .catch(() => this.onError())
    }

    renderLi(arr) {
        return arr.map((item, i) => {
            const label = this.props.renderItem(item);
            return (
                <li key={i}
                    onClick={() => this.props.onItemSelected(i)}
                    className="list-group-item">
                    {label}
                </li>
            )
        })
    }

    render() {
        const {itemList, error} = this.state;

        if (error) {
            return <ErrorMessage/>
        }

        if (!itemList) {
            return <Spinner/>
        }

        const items = this.renderLi(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}
import React, {Component} from 'react';
import './itemDetails.scss';
import Spinner from '../spinner';
import ErrorMessage from "../errorMessage";

const Field = ({item, field, label}) => {
    return(
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
};

export {Field};

export default class CharDetails extends Component {

    state = {
        item: null,
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updatedChar();
    }

    componentDidUpdate(prevProps) {
        if(this.props.itemId !== prevProps.itemId){
            this.updatedChar();
        }
    }
    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onCharDetailsLoaded = (item) => {
        console.log('item', item);
        this.setState({
            item: item,
            loading: false
        })
    };

    onError () {
        this.setState({
            error:true
        })
    };

    updatedChar(){
        const {itemId, getData} = this.props;
        if(!itemId){
            return;
        }

        this.setState({
            loading: true
        });

        getData(itemId)
            .then((item) => this.onCharDetailsLoaded(item))
            .catch(() => this.onError())
    }

    render() {

        const {item, loading, error} = this.state;

        if(!item){
            return 'Check on character';
        }

        if(error){
            return <ErrorMessage />
        }

        if (loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        const {name} = item;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item});
                        })
                    }
                </ul>
            </div>
        );
    }
};
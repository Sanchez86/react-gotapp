import React, {Component} from 'react';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import './randomChar.scss';
import PropTypes from 'prop-types';

export default class RandomChar extends Component {
    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    gotService = new GotService();

    state = {
        char: {},
        loading: true,
        error: false
    };

    onCharLoaded = (char) => {
        this.setState({
            char: char,
            loading: false
        });
    };

    onError = (err) => {
        this.setState({
            loading: false,
            error: true,
        })
    };

    updateChar = () => {
        //получаем рандомное целое число от 25 до 140
        const id = Math.floor(Math.random() * 140 + 25);
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    };

    render() {
        const {char, loading, error} = this.state;

        let content;
        if (error) {
            content = <ErrorMessage/>;
        } else {
            content = loading ? <Spinner/> : <View char={char}/>;
        }

        return (
            <div className="random-block rounded">
                {content}
            </div>
        );
    }
}

RandomChar.defaultProps = {
    interval: 3000
};
/*RandomChar.propTypes = {
    interval: (props, propName, componentName,) => {
        const value = props[propName];

        if(typeof value === 'number'){
            return null;
        }

        return new Error(`Component - ${componentName} : prop name - ${propName} must be a number`);
    }
};*/

RandomChar.propTypes = {
    interval: PropTypes.number
};

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h4>Random Character:</h4>
                <span> {name} </span>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
};
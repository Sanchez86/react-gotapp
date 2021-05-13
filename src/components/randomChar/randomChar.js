import React, {useState, useEffect} from 'react';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import './randomChar.scss';
import PropTypes from 'prop-types';

function RandomChar({interval}) {
    const [char, updateStateChar] = useState([]);
    const [loading, updateStateLoading] = useState(true);
    const [error, updateStateError] = useState(false);

    useEffect(() => {
        updateChar();

        let timerId = setInterval(updateChar, interval);

        return(
            clearInterval(timerId)
        )
    }, []);

    const gotService = new GotService();

    const onCharLoaded = (char) => {
        updateStateChar(char);
        updateStateLoading(false);
    };

    const onError = () => {
        updateStateLoading(false);
        updateStateError(true);
    };

    const updateChar = () => {
        console.log('Test');
        const id = Math.floor(Math.random() * 140 + 25);
        gotService.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    };

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

export default RandomChar;

RandomChar.defaultProps = {
    interval: 3000
};

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
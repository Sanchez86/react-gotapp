import React, {useState, useEffect} from 'react';
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

function CharDetails({itemId, getData, children}) {

    const [item, setItem] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        updatedChar();
    }, [itemId]);


    const onCharDetailsLoaded = (item) => {
        console.log('onCharDetailsLoaded');
        setItem(item);
        setLoading(false);
    };

    function updatedChar(){
        if(!itemId){
            return;
        }

        setLoading(true);

        getData(itemId)
            .then((item) => onCharDetailsLoaded(item))
            .catch(() => setError(true))
    }

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
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {item});
                    })
                }
            </ul>
        </div>
    );
};

export default CharDetails;
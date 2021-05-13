import React, {useState, useEffect} from 'react';
import './itemList.scss';
import Spinner from '../spinner';
import ErrorMessage from "../errorMessage";

function ItemList({getData, renderItem, onItemSelected}) {

    const [itemList, updateList] = useState([]);
    const [error, updateError] = useState(false);

    useEffect(() => {
        getData()
            .then((data) => {
                updateList(data)
            })
            .catch(() => updateError(true))
    }, []);

    function renderLi(arr) {
        return arr.map((item, i) => {
            const label = renderItem(item);
            return (
                <li key={i}
                    onClick={() => onItemSelected(i)}
                    className="list-group-item">
                    {label}
                </li>
            )
        })
    }

    if (error) {
        return <ErrorMessage/>
    }

    if (!itemList) {
        return <Spinner/>
    }

    const items = renderLi(itemList);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

export default ItemList;
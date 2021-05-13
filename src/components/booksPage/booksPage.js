import React, {Component} from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import {withRouter} from 'react-router-dom';

class BooksPage extends Component{
    gotService = new GotService();

    state = {
        error: false
    };

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    onItemSelected = (itemId) => {
        // history.push добавил в url переданный параметр
        return this.props.history.push(`${itemId}`)
    };

    render(){
        const {error} = this.state;

        if(error){
            return <ErrorMessage />
        }

        return(
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={(item)=> `${item.name}` }/>
        )
    }
}

export default withRouter (BooksPage);
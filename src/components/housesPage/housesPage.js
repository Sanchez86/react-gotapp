import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class HousesPage extends Component{

    gotService = new GotService();

    state = {
        charId: 130,
        error: false
    };

    onItemSelected = (id) => {
        this.setState({
            charId: id
        })
    };

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    render(){
        if(this.state.error){
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={(item)=> `${item.name} (${item.gender})`}/>
        );

        const itemDetails = (
            <ItemDetails
                itemId={this.state.charId}
                getData={this.gotService.getHouse}>
                <Field field="region" label="Region" />
                <Field field="words" label="Words" />
                <Field field="titles" label="Titles" />
            </ItemDetails>
        );

        return(
            <RowBlock left={itemList} right={itemDetails} />
        )
    }
}
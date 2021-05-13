import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component{

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
                getData={this.gotService.getAllCharacters}
                renderItem={(item)=> `${item.name} (${item.gender})`}/>
        );

        const itemDetails = (
            <ItemDetails
                itemId={this.state.charId} getData={this.gotService.getCharacter}>
                <Field field="gender" label="Gender" />
                <Field field="born" label="Born" />
            </ItemDetails>
        );

        return(
            <RowBlock left={itemList} right={itemDetails} />
        )
    }
}
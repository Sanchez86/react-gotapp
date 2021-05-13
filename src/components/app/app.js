import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage';
import BooksPage from '../booksPage';
import BooksItem from '../booksPage/booksItem';
import HousesPage from "../housesPage";
import './app.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {

    state = {
        charVisibility: true
    };

    onToggle = () => {
        this.setState((state) => {
            return {
                charVisibility: !state.charVisibility
            }
        })
    };


    render() {
        const {charVisibility} = this.state;
        const char = charVisibility ? <RandomChar interval={1500}/> : null;
        return (
            <Router>
            <div className="app">
                <Container>
                    <Header/>
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button onClick={this.onToggle}>Toggle block</button>
                        </Col>
                    </Row>
                    <Route path={'/characters'} component={CharacterPage} />
                    <Route path={'/houses'} component={HousesPage} />
                    <Route path={'/books'} exact component={BooksPage} />
                    <Route path={'/books/:id'} render ={
                        ({match}) => {
                            return <BooksItem bookId={match.params.id} />
                        }
                    }/>
                </Container>
            </div>
            </Router>
        );
    }
};
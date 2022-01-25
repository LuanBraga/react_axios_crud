import React, { Component } from "react";
import { Link } from "react-router-dom";
import tutorialDataService from '../services/tutorial.service';

export default class TutorialsList extends Component {
    constructor(props){
        super(props);

        this.state = {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: ''
        };
    }

    //Se precisar carregar data de um endpoint remoto, este é um bom lugar para instanciar sua requisição
    componentDidMount() {
        this.retrieveTutorials();
    }

    //Atualiza o state searchTitle pelo value do input correspondente
    onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;

        console.log(searchTitle);

        this.setState({
            searchTitle: searchTitle,
        });
    }

    //Recupera uma lista com todos os tutoriais
    retrieveTutorials = () => {
        tutorialDataService.getAll().then(response => {
            this.setState({
                tutorials: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    setActiveTutorial = (tutorial, index) => {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index
        });
    }

    refreshList() {
        this.retrieveTutorials();
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });
    }

    removeAllTutorials = () => {
        if (window.confirm('Are you sure ?')){
            tutorialDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
        }
        return;
    }

    //Recupera um tutorial pelo título
    searchTitle = () => {
        tutorialDataService.findByTitle(this.state.searchTitle)
        .then(response => {
            this.setState({
                tutorials: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
    
    render() {
        const {searchTitle, tutorials, currentTutorial, currentIndex} = this.state;

        return(
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <h4>Tutorials List</h4>

                    <ul className="list-group">
                        {tutorials && 
                            tutorials.map((tutorial, index) => (
                                <li
                                    className={`list-group-item ${(index === currentIndex ? 'active' : '')}`}
                                    onClick={() => this.setActiveTutorial(tutorial, index)}
                                    key={tutorial.id}
                                >
                                    {tutorial.title}
                                </li>
                            )
                        )}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllTutorials}
                    >
                        Remove All
                    </button>
                </div>

                <div className="col-md-6">
                    {currentTutorial ? (
                        <div>
                            <h4>Tutorial</h4>
                            <div>
                                <label>
                                    <strong>Title: </strong>
                                </label>
                                {' '}
                                {currentTutorial.title}
                            </div>

                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>
                                {' '}
                                {currentTutorial.description}
                            </div>

                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {' '}
                                {currentTutorial.published ? 'Published' : 'Pending'}
                            </div>

                            <Link
                                to={`/tutorials/${currentTutorial.id}`}
                                className="badge bg-warning text-dark"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br/>
                            <p>Please click on a tutorial...</p>
                        </div>
                    )}
                </div>

            </div>
        );
    }
}
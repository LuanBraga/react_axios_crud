import React, { Component } from 'react';
import { useParams } from 'react-router';

import TutorialDataService from '../services/tutorial.service';

//Gambiarra para conseguir acessar o useParams através de um Class Component
export function withRouter(Children) {
    return(props) => {
        const match = {params: useParams()};
        
        return <Children {...props} match={match} />
    }
}

//Retirei o export default da classe componente
class Tutorial extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTutorial: {
                id: null,
                title: '',
                description: '',
                published: false
            },
            message: ''
        };
    };

    componentDidMount() {
        this.getTutorial(this.props.match.params.id);
    }

    onChangeTitle = (e) => {
        const title = e.target.value;

        this.setState(function(prevState) {
            return {
                currentTutorial: {
                    ...prevState.currentTutorial,
                    title: title
                }
            };
        });
    }

    onChangeDescription = (e) => {
        const description = e.target.value;

        this.setState(function(prevState) {
            return {
                currentTutorial: {
                    ...prevState.currentTutorial,
                    description: description
                }
            };
        });
    }

    getTutorial(id) {
        TutorialDataService.get(id)
        .then(response => {
            this.setState({
                currentTutorial: response.data
            });
            console.log(response.data)
        })
        .catch(e => {
            console.log(e);
        });
    }

    updadePublished = (status) => {
        var data = {
            id: this.state.currentTutorial.id,
            title: this.state.currentTutorial.title,
            description: this.state.currentTutorial.description,
            published: status
        };

        TutorialDataService.update(this.state.currentTutorial.id, data)
        .then(response => {
            this.setState(prevState => ({
                currentTutorial: {
                    ...prevState.currentTutorial,
                    published:status
                }
            }));
            console.log(response.data)
        })
        .catch(e => {
            console.log(e);
        });
    }

    deleteTutorial = () => {
        TutorialDataService.delete(this.state.currentTutorial.id)
        .then(response => {
            console.log(response.data);
            this.setState({
                currentTutorial: {
                    id: null,
                    title: '',
                    description: '',
                    published: null
                },
                message: ''
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {
        const {currentTutorial} = this.state;

        return (
            <div className="edit-form">
                <h4>Tutorial</h4>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={currentTutorial.title}
                            onChange={this.onChangeTitle}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            value={currentTutorial.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="title">
                            <strong>Status:</strong>
                        </label>
                        {currentTutorial.published ? 'Published' : 'Pending'}
                    </div>
                </form>

                {currentTutorial.published ? (
                    <button
                        className="badge bg-primary mr-2"
                        onClick={() => this.updadePublished(false)}
                    >
                        UnPublish
                    </button>
                ) : (
                    <button
                        className="badge bg-primary  mr-2"
                        onClick={() => this.updadePublished(true)}
                    >
                        Publish
                    </button>
                )}

                <button
                    className="badge bg-success"
                    onClick={this.deleteTutorial}
                >
                    Delete
                </button>
            </div>
        );
    }
}

//Adicionei o export default na função componente withRouter recebendo a classe componente
export default withRouter(Tutorial);
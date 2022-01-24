import React, { Component } from 'react';
import TutorialDataService from '../services/tutorial.service';

export default class Tutorial extends Component {
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
            </div>
        );
    }
}
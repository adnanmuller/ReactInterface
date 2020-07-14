import React, { Component } from 'react';

import '../css/App.css';

import AddAppointments from './AddApointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';

import { without } from 'lodash';

class App extends Component {

    constructor() {
        super();
        this.state = {
            myAppointments: [],
            formDisplay:false,
            lastIndex:0
        }
        this.deleteAppointment = this.deleteAppointment.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        
    }

    deleteAppointment(e,apt) {
        e.preventDefault();
        console.log(e.type);
        let tempApts = this.state.myAppointments;
        tempApts = without(tempApts, apt);
        console.log(tempApts);

        this.setState({
            myAppointments: tempApts
        })
    };

    toggleForm() {
        this.setState({
            formDisplay: !this.state.formDisplay
        });
        console.log("toggleForm");
    };

    

    componentDidMount() {
        fetch('./data.json')
            .then(response => response.json())
            .then(result => {
                const apts = result.map(item => {
                    item.aptId = this.state.lastIndex;
                    this.setState({ lastIndex: this.state.lastIndex + 1})
                    return item
                });
                this.setState({
                    myAppointments: apts
                });
                console.log(apts)
            })
            

            

    }

    render() {
       
        return (
            <main className="page bg-white" id="petratings">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 bg-white">
                            <div className="container">
                                <AddAppointments formDisplay={this.state.formDisplay} toggleForm={this.toggleForm} />
                                <SearchAppointments />
                                <ListAppointments appointments={this.state.myAppointments}
                                    deleteAppointment={this.deleteAppointment} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

}

export default App;

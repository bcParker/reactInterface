import React, {Component} from 'react';
import '../css/App.css';

import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';

import {without} from 'lodash';

class App extends Component {

  constructor() {
    super(); //this method allows us to get information from parent component by using "this" keyword
    this.state = {
      myName: "Chase Parker",
      myAppointments: [],
      lastIndex: 0
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
  }

  deleteAppointment(apt) {
    let tempAppts = this.state.myAppointments;
    tempAppts = without(tempAppts, apt);
    
    this.setState({
      myAppointments: tempAppts
    });
  }

  componentDidMount() {
    fetch('./data.json')
    .then(response => response.json())
    .then(result => {
      const appts = result.map(item => {
        item.aptId = this.state.lastIndex;
        this.setState({lastIndex: this.state.lastIndex + 1})
        return item;
      })
      this.setState({
        myAppointments: appts
      });
    });

  }

  render() {

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments/>
                <SearchAppointments/>
                <ListAppointments appointments={this.state.myAppointments} deleteAppointment={this.deleteAppointment}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;

import React, { Component, Fragment } from 'react';
import Navbar from './components/Navbar';
import Detail from './components/Detail';
import Timeline from './components/Timeline';
import Logistics from './components/Logistics';

import axios from 'axios';
import _ from 'lodash';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: {},
      filteredTable: {},
      scan: [],
      activeFilter: 'DEL',
      rowActive: '',
      timelineActive: false,
    }
  }

  shipmentClick = (scans, awb) => {
    this.setState(prevState => Object.assign({}, prevState, {
      scan: scans,
      rowActive: awb,
      timelineActive: true
    }))
  }

  filterUpdate = (values) => {
    this.setState(prevState => Object.assign({}, prevState, {
      activeFilter: values,
      scan: [],
      rowActive: '',
      timelineActive: false
    }))
  }


  componentDidMount() {
    const token = 'tTU3gFVUdP';
    const url = 'https://93870v1pgk.execute-api.ap-south-1.amazonaws.com/latest/shipments/mayank';
    const config = {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    };

    const bodyParameters = {
      email: "mayankmittal@intugine.com"
    };

    axios.post(url,
      bodyParameters,
      config
    )
      .then(response => {
        const result = response.data.data;

        this.setState(prevState => {
          let statusMap = Object.assign({}, prevState.status);
          let rowMap = {};
          let activeFilter = 'DEL';
          for (let i = 0; i < result.length; i++) {
            rowMap[result[i].awbno] = result[i];

            if (!statusMap[result[i].current_status_code]) {
              statusMap[result[i].current_status_code] = 0;
            }
            statusMap[result[i].current_status_code] += 1;
            activeFilter = result[i].current_status_code;
          }
          let rowArrMap = _.values(rowMap);
          if (statusMap.DEL) {
            activeFilter = 'DEL';
          }



          return Object.assign({}, prevState, {
            status: statusMap,
            filteredTable: rowArrMap,
            activeFilter: activeFilter,

          })

        })
      })
      .catch((error) => console.log(error));
  }


  render() {
    return (
      <Fragment>
        <Navbar />
        <br />
        <Detail
          data={this.state.status}
          active={this.state.activeFilter}
          filterUpdate={this.filterUpdate}
        />
        <br />
        <br />
        <div className="row">
          <div className="col-sm-4">
            <Timeline
              data={this.state.scan}
              active={this.state.activeFilter}
              timelineActive={this.state.timelineActive}
            />
          </div>
          <div className="col-sm-8">
            <Logistics
              data={this.state.filteredTable}
              shipmentClick={this.shipmentClick}
              active={this.state.activeFilter}
              rowActive={this.state.rowActive}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;

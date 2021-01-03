import React, { Fragment } from 'react';
import _ from 'lodash';
import moment from 'moment';

const styles = ({
    up: {
        color: '#42DF2A'
    },
    down: {
        color: '#FDA1A1'
    },
});

const Logistics = ({ data, shipmentClick, active, rowActive }) => {
    return (
        <Fragment>
            <div className="container">
                <table className="table table-head" style={{ overflow: 'auto', width: "inherit", height: '60vh', display: 'block' }}>
                    <thead>
                        <tr>
                            <th scope="col">AWB NUMBER</th>
                            <th scope="col">TRANSPORTER</th>
                            <th scope="col">SOURCE</th>
                            <th scope="col">DESTINATION</th>
                            <th scope="col">START DATE</th>
                            <th scope="col">ETD</th>
                            <th scope="col">STATUS</th>

                        </tr>
                    </thead>
                    <tbody className="details">
                        {_.chain(data).filter(dataPoint => dataPoint.current_status_code === active).map((dataPoint, count) => (

                            <tr key={count} className={`filterRow ${dataPoint.awbno === rowActive ? 'selected' : ''}`} onClick={() => {
                                shipmentClick(dataPoint.scan, dataPoint.awbno)
                            }}>
                                <td>{'#' + dataPoint.awbno}</td>
                                <td>{dataPoint.carrier}</td>
                                <td>{dataPoint.from}</td>
                                <td>{dataPoint.to}</td>
                                <td>{moment(dataPoint.pickup_date).format("MM/DD/YYYY")}</td>
                                <td>{moment(_.get(dataPoint, ['extra_fields', 0, 'expected_delivery_date'])).format("MM/DD/YYYY")}</td>
                                <td style={
                                    dataPoint.current_status === 'Delivered' ||
                                        dataPoint.current_status === 'Out for Delivery' ||
                                        dataPoint.current_status === 'In Transit' ? styles.up : styles.down
                                }>
                                    {dataPoint.current_status}</td>
                            </tr>
                        )).value()
                        }
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default Logistics;
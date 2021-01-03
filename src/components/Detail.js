import React, { Fragment } from 'react';
import _ from 'lodash';

const Detail = ({ data, active, filterUpdate }) => {
    return (
        <Fragment>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    {_.map(data, (count, status) => (
                        <div className={`card m-4 ${status === active ? 'selected' : ''}`} onClick={() => {
                            filterUpdate(status)
                        }} key={status}>
                            <div className="card-body" style={{ width: '150px', cursor: 'pointer' }}>
                                <h5 className="card-title">{status}</h5>
                                <h1 style={{ textAlign: 'center' }}>{count}</h1>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </Fragment>
    )
};

export default Detail;
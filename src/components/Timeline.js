import React, { Fragment } from 'react';
import _ from 'lodash';
import moment from 'moment';

const styles = ({
    delivered: {
        color: '#42DF2A'
    }
})

const Timeline = ({ data, timelineActive }) => {
    return (
        <Fragment>
            <div className={`col ${timelineActive ? 'timeline-style' : ''}`}>
                <ul className={`${timelineActive ? 'timeline' : ''}`} style={{ overflow: 'auto', width: 'inherit', height: '50vh', display: 'block' }}>
                    {_.chain(data).map(timePoint => Object.assign({}, timePoint, { timeConverted: moment(timePoint.time) }))
                        .orderBy(timePoint => timePoint.timeConverted
                            .valueOf(), ['desc']).map((timePoint, count) => (
                                <li key={count}>
                                    <div className="distance" style={timePoint.status_detail === 'DELIVERED' ? styles.delivered : {}}>
                                        <span>{timePoint.status_detail}</span>
                                        <div>
                                            <span style={{ marginRight: '10px' }}>{moment(timePoint.time).format('DD-MM-YYYY')}</span>
                                            <span>{moment(timePoint.time).format('HH:MM')}</span>
                                        </div>
                                    </div>
                                </li>
                            )).value()}
                </ul>
            </div>
        </Fragment >
    )
}

export default Timeline;
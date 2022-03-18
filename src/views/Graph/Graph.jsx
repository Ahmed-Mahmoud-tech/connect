import React from 'react';

import wecan from  '../../assets/graph/wecan.png'
import background from '../../assets/graph/background.png'
import gsk from '../../assets/graph/gsk.png'
import './Graph.css'
import LiveScore from '../LiveScore/LiveScore';

const Graph = () => {
    return (<>
    <div className="container-fluid graph">
        <div className="row flex-grow-0">
            <div className="col-md-2">
                <img className='wecan-graph' src={wecan} alt="" />
            </div>
            <div className="col-md-8 position-relative d-flex justify-content-center">
                <img src={background} alt="" />
                <h2 className='title-graph'>
                    Patient
                    <br />
                    <b>Recruitment</b>
                </h2>
            </div>
            <div className="col-md-2 text-end">
                <img className='gsk-graph' src={gsk} alt="" />
            </div>
        </div>
        <div className="row flex-grow-1 position-relative">
            <div className="col-md-1 side d-flex justify-content-center align-items-end">
                <h2><b>GSK</b> 10,000</h2>
            </div>
            <div className="col-md-11">
                <LiveScore/>
                <div className='color-map p-2'>
                    <div className="color-row">
                        <div className="box b1"></div> GenMed Team
                    </div>
                    <div className="color-row">
                        <div className="box b2"></div> Vaccine Team
                    </div>
                    <div className="color-row">
                        <div className="box b3"></div> Speciality Team
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>);
}

export default Graph;
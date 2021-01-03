import React, { Component } from 'react';

import logo from '../../images/logo.svg';
import profile from '../../images/profile.svg';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: false
        }
    }

    toggleNav = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    render() {
        const show = (this.state.toggle) ? "show" : "";
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <img src={logo} style={{ width: '100px', height: '100px' }} alt="logo" />
                <button className="navbar-toggler" type="button" onClick={this.toggleNav}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={"collapse navbar-collapse " + show}>
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Brand</a>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" style={{ cursor: 'pointer' }} href="#">Transporters<img src={profile} alt="transporter" /></span>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    };
}
export default Navbar;
import React, { Component, Fragment } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';

class Welcome extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authWelcome = (
            <Fragment>
                <p>
                    <span className="mr-3 mb-3">
                        <strong>Welcome to MiseEnPlaceKitchen!</strong>
                        <br />
                        Please select an option below to continue.
                    </span>
                </p>
            </Fragment>
        );

        const guestWelcome = (
            <Fragment>
                <p>
                    <span className="mr-3 mb-3">
                        <strong>Please Register or Login Above to Continue</strong>
                    </span>
                </p>
            </Fragment>
        )

        return(
        <div>
                <Container>
                            { isAuthenticated ? authWelcome : guestWelcome }
                </Container>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(Welcome);
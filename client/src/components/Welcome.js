import React, { Component, Fragment } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import TabNavbar from './TabNavbar';

class Welcome extends Component {
	static propTypes = {
		auth: PropTypes.object.isRequired,
	};

	render() {
		const { isAuthenticated, user } = this.props.auth;

		const authWelcome = (
			<Fragment>
				<p>
					<span className='mr-3 mb-3'>
						<strong>Welcome to MiseEnPlaceKitchen!</strong>
						<br />
						Please select an option below to continue.
					</span>
				</p>
				<TabNavbar />
			</Fragment>
		);

		const guestWelcome = (
			<Fragment>
				<div>
					<Jumbotron fluid>
						<Container fluid>
							<h1 className='display-3'>Welcome!</h1>
							<p className='lead'>
								MiseEnPlaceKitchen is *the* web
								application to keep “everything in its
								place” so that you can know every aspect
								of your business with a tap of the
								screen. Designed by a developer with
								more than 25 years of experience,
								first-hand, in the kitchen, in the front
								of house, and in the office, with that
								unexpected, short-staffed rush in mind.
							</p>
							<hr className='my-2' />
							<p>
								<span className='mr-3 mb-3'>
									<Button
										outline
										color='info'
										style={{
											marginBottom: '2rem',
											marginLeft: '2rem',
										}}>
										<RegisterModal />
									</Button>
									<Button
										outline
										color='success'
										style={{
											marginBottom: '2rem',
											marginLeft: '2rem',
										}}>
										<LoginModal />
									</Button>
								</span>
							</p>
						</Container>
					</Jumbotron>
				</div>
			</Fragment>
		);

		return (
			<div>
				<Container>
					{isAuthenticated ? authWelcome : guestWelcome}
				</Container>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps, null)(Welcome);

import React, { useState } from 'react';
import {
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink,
	Card,
	Button,
	CardTitle,
	CardText,
	Row,
	Col,
} from 'reactstrap';
import classnames from 'classnames';
import ItemModal from './ItemModal';
import ItemsList from './ItemsList';

const TabNavbar = props => {
	const [activeTab, setActiveTab] = useState('1');

	const toggle = tab => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	return (
		<div>
			<Nav tabs>
				<NavItem>
					<NavLink
						className={classnames({
							active: activeTab === '1',
						})}
						onClick={() => {
							toggle('1');
						}}>
						Manage Orders
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className={classnames({
							active: activeTab === '2',
						})}
						onClick={() => {
							toggle('2');
						}}>
						Manage Users
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className={classnames({
							active: activeTab === '3',
						})}
						onClick={() => {
							toggle('3');
						}}>
						Manage Items
					</NavLink>
				</NavItem>
			</Nav>

			<TabContent activeTab={activeTab}>
				<TabPane tabId='1'>
					<Row>
						<Col sm='6'>
							<Card body>
								<CardTitle>Coming Soon!</CardTitle>
								<CardText>
									This is where a User will create,
									view, and edit orders.
								</CardText>
								<Button>Soon!</Button>
							</Card>
						</Col>
						{/* <Col sm='6'>
							<Card body>
								<CardTitle>
									Special Title Treatment
								</CardTitle>
								<CardText>
									With supporting text below as a
									natural lead-in to additional
									content.
								</CardText>
								<Button>Go somewhere</Button>
							</Card>
						</Col> */}
					</Row>
				</TabPane>
				<TabPane tabId='2'>
					<Row>
						<Col sm='6'>
							<Card body>
								<CardTitle>Coming Soon!</CardTitle>
								<CardText>
									This is where an Admin or
									Supervisory User will create, view,
									and edit Users.
								</CardText>
								<Button>View Users</Button>
							</Card>
						</Col>
						{/* <Col sm='6'>
							<Card body>
								<CardTitle>
									Special Title Treatment
								</CardTitle>
								<CardText>
									With supporting text below as a
									natural lead-in to additional
									content.
								</CardText>
								<Button>Go somewhere</Button>
							</Card>
						</Col> */}
					</Row>
				</TabPane>
				<TabPane tabId='3'>
					<Row>
						<Col sm='6'>
							<Card body>
								<CardTitle>Your Items</CardTitle>
								<CardText>
									This is where a User will create,
									view, and edit items.
								</CardText>
								<ItemModal />
								<ItemsList />
								{/* <Button>Go somewhere</Button> */}
							</Card>
						</Col>
						{/* <Col sm='6'>
							<Card body>
								<CardTitle>
									Special Title Treatment
								</CardTitle>
								<CardText>
									With supporting text below as a
									natural lead-in to additional
									content.
								</CardText>
								<Button>Go somewhere</Button>
							</Card>
						</Col> */}
					</Row>
				</TabPane>
			</TabContent>
		</div>
	);
};

export default TabNavbar;

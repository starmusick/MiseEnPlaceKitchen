import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import ItemEditModal from './ItemEditModal';

class ItemsList extends Component {
	componentDidMount() {
		this.props.getItems();
	}
	onDeleteClick = id => {
		this.props.deleteItem(id);
	};
	render() {
		const { items } = this.props.item;
		return (
			<Container>
				<ListGroup>
					{items.map(({ _id, item_name }) => (
						<ListGroupItem key={_id}>
							{item_name}
							<Button
								className='remove-btn'
								color='danger'
								size='sm'
								onClick={this.onDeleteClick.bind(
									this,
									_id
								)}>
								&times;
							</Button>
							<ItemEditModal
								itemName={item_name}
								id={_id}
							/>
						</ListGroupItem>
					))}
				</ListGroup>
			</Container>
		);
	}
}

ItemsList.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	item: state.item,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ItemsList);

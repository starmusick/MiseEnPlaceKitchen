import React, { Component } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	Form,
	FormGroup,
	Label,
	Input,
	ModalBody,
} from 'reactstrap';
import { connect } from 'react-redux';
import { editItem } from '../actions/itemActions';

class ItemEditModal extends Component {
	state = {
		modal: false,
		name: '',
		item_name: this.props.itemName || '',
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();

		const editedItem = {
			id: this.props.id,
			item_name: this.state.item_name,
		};

		// Add item via addItem action
		this.props.editItem(editedItem);

		// Close modal
		this.toggle();
	};

	render() {
		console.log('this.props ', this.props);
		return (
			<div>
				<Button
					color='warning'
					style={{ marginBottom: '2rem' }}
					onClick={this.toggle}>
					Edit
				</Button>

				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>
						Edit Item
					</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for='item_name'>
									Please make changes to the item
									below:
								</Label>
								<Input
									type='text'
									name='item_name'
									id='item'
									defaultValue={this.props.itemName}
									onChange={this.onChange}
								/>
								<Button
									color='dark'
									style={{ marginTop: '2rem' }}
									block>
									Save Changes
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	item: state.item,
});

export default connect(mapStateToProps, { editItem })(ItemEditModal);

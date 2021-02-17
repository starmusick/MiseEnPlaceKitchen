import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class RegisterModal extends Component {
  state = {
    modal: false,
    user_name: "",
    user_email: "",
    user_password: "",
    user_category: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    // If authenticated, close modal
    if(this.state.modal) {
        if(isAuthenticated) {
            this.toggle();
        }
    }
  }

  toggle = () => {
    //clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { user_name, user_email, user_password, user_category } = this.state;

    //create user object
    const newUser = {
      user_email: this.state.user_email,
      user_name: this.state.user_name,
      user_password: this.state.user_password,
      user_category: this.state.user_category,
    };

    // attempt to register
    this.props.register(newUser);

    // Close modal
    // this.toggle();
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="user_name">Name</Label>
                <Input
                  type="text"
                  name="user_name"
                  id="user_name"
                  placeholder="Your Name"
                  className="mb-3"
                  autoComplete="username"
                  onChange={this.onChange}
                />

                <Label for="user_email">Email</Label>
                <Input
                  type="email"
                  name="user_email"
                  id="user_email"
                  placeholder="Your Email"
                  className="mb-3"
                  autoComplete="email"
                  onChange={this.onChange}
                />

                <Label for="user_password">Password</Label>
                <Input
                  type="password"
                  name="user_password"
                  id="user_password"
                  placeholder="Password"
                  className="mb-3"
                  autoComplete="new-password"
                  onChange={this.onChange}
                />
                <Label for="user_category">User Category</Label>
                <Input
                  type="text"
                  name="user_category"
                  id="user_category"
                  placeholder="fill this with text"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);

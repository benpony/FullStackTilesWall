import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import { adminChanged } from "../../actions/adminActions";
import { renderTextField } from "../index";
import { useStyles } from "./LoginStyle";

const validate = values => {
	const errors = {};
	const requiredFields = [ "password" ];
	requiredFields.forEach( field => {
		if ( !values[field] ) {
			errors[field] = "Required";
		}
	} );
	return errors;
};

const LoginForm = ( props ) => {
	const classes = useStyles();
	const { pristine, reset, submitting, admin, dispatch, history } = props;
	const login = () => history.push( "/adminOrders" );

	return (
		<div className={classes.root}>
			<form
				noValidate
				className={classes.loginForm}>
				<div className={classes.fields}>
					<Field
						name="password"
						label="Enter Password"
						className={classes.field}
						component={renderTextField}
						onChange={passwordChanged}
					/>
				</div>
				<div className={classes.buttons}>
					<Button
						variant="contained"
						color="primary"
						onClick={login}
						disabled={pristine || submitting}>
						Login
					</Button>
				</div>
			</form>
		</div>
	);

	function passwordChanged( event, newValue ){
		admin.adminPassword = newValue;
		dispatch( adminChanged( { ...admin } ) );
	}
};

const mapStateToProps = function ( state ) {
	return {
		admin: state.admin
	};
};

export default reduxForm ( {
	form: "LoginForm",
	validate,
} )( connect( mapStateToProps )( LoginForm ) );

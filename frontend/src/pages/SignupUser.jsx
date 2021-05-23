import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Form, Formik, Field } from 'formik';
import { signupUser } from '../store/actions/user.action.js'
import { connect } from 'react-redux';



function _SignupUser({ signupUser, history }) {
    const initialValues = { fullname: '', email: '', password: '' }
    const validate = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = "Required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
        }
        if (values.password.length < 5) {
            errors.password = "too short pass";
        }
        return errors;
    };
    const onSubmit = async (values, { setSubmitting }) => {
        try {
            await signupUser(values)
            setSubmitting(false);
            history.push('/toy')
        } catch (err) {
            throw err
        }
    };

    const TextFieldOutlined = (props) => (
        <TextField
            {...props}
            variant="outlined"
            margin="normal"
            fullWidth

        />
    );

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Avatar style={{
                }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
            </Typography>
                <Formik
                    initialValues={initialValues}
                    validate={validate}
                    onSubmit={onSubmit}
                >
                    <Form style={{
                        width: '100%', // Fix IE 11 issue.
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    autoComplete="fullname"
                                    name="fullname"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="fullname"
                                    label="Full Name"
                                    autoFocus
                                    as={TextFieldOutlined}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    as={TextFieldOutlined}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    as={TextFieldOutlined}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{
                                marginTop: '10px'
                            }}
                        >
                            Sign Up
              </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/#/login" variant="body2">
                                    Already have an account? Sign in
                  </Link>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </div>
        </Container>
    );
}



const mapDispatchToProps = {
    signupUser
}

export const SignupUser = connect(null, mapDispatchToProps)(_SignupUser)




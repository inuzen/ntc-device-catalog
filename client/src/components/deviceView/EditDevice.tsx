import React from 'react';
import { TextInput } from '../input/TextInput';
import { Form, FormikProps, Formik } from 'formik';
import * as Yup from 'yup';

interface Values {
    firstName: string;
    lastName: string;
    email: string;
}
const SignupSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

const EditDevice = () => {
    return (
        <div>
            <h1>My Form</h1>
            <Formik
                initialValues={{
                    email: '',
                    firstName: 'red',
                    lastName: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {(props: FormikProps<Values>) => (
                    <Form>
                        <TextInput name="firstName" type="text" label="First Name" />
                        <TextInput name="lastName" type="text" label="Last Name" />
                        <TextInput name="email" type="email" label="Email" />
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditDevice;

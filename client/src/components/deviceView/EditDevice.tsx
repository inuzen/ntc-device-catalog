import React from 'react';
import { TextInput } from '../input/TextInput';
import { Form, FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { axiosAPI } from '../../api/api';
//styles
import './styles/editDevice.scss';
interface Values {
    firstName: string;
    lastName: string;
    email: string;
    deviceImage: any;
}
const SignupSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

const EditDevice = () => {
    const formik = useFormik<Values>({
        initialValues: {
            email: 'fd@ds.com',
            firstName: 'red',
            lastName: 'ds',
            deviceImage: null,
        },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            console.log(values);
            const formData = new FormData();
            for (const key in values) {
                if (Object.prototype.hasOwnProperty.call(values, key)) {
                    formData.append(key, values[key]);
                }
            }
            // alert(JSON.stringify(values, null, 2));
            axiosAPI.post('devices/imageTest', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
    });

    const onFileInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        formik.setFieldValue('deviceImage', event.currentTarget.files[0]);
    };
    return (
        <div className="edit-device-form-container">
            <form onSubmit={formik.handleSubmit} className="edit-form">
                <TextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                />
                <TextField
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                />
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <input
                    accept="image/*"
                    className="upload-input"
                    id="deviceImage"
                    type="file"
                    onChange={onFileInputChange}
                />
                <label htmlFor="deviceImage">
                    <Button variant="contained" color="primary" component="span">
                        Upload
                    </Button>
                </label>
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default EditDevice;

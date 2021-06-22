import React, { useState } from 'react';
import { TextInput } from '../input/TextInput';
import { Form, FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// api
import { axiosAPI } from '../../api/api';

// store
import { useAppDispatch } from '../../store/hooks';
import { addDevice } from '../../store/deviceSlice';

//styles
import './styles/editDevice.scss';

// types
import type { Device } from '../../store/deviceSlice';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

const EditDevice = () => {
    const dispatch = useAppDispatch();
    const [selectedImage, setSelectedImage] = useState(null);

    const formik = useFormik<Device>({
        initialValues: {
            name: 'Device',
            shortName: '',
            description: '',
            dimensions: '',
            weight: '',
            voltage: '',
            supply: '',
            additionalInfo: '',
            amountInSupply: 0,
            organization: 'ntc',
            comments: '',
            isModification: false,
        },
        // validationSchema: SignupSchema,
        onSubmit: (values) => {
            const formData = new FormData();

            formData.append('deviceImage', selectedImage);
            formData.append('deviceInfo', JSON.stringify(values));
            // for (const key in values) {
            //     if (Object.prototype.hasOwnProperty.call(values, key)) {
            //         formData.append(key, values[key]);
            //     }
            // }

            dispatch(addDevice(formData));

            // axiosAPI.post('devices/imageTest', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            // });
        },
    });

    const onFileInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSelectedImage(event.currentTarget.files[0]);
    };
    return (
        <div className="edit-device-form-container">
            <form onSubmit={formik.handleSubmit} className="edit-form">
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Название"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    fullWidth
                    id="shortName"
                    name="shortName"
                    label="Сокращение"
                    value={formik.values.shortName}
                    onChange={formik.handleChange}
                    error={formik.touched.shortName && Boolean(formik.errors.shortName)}
                    helperText={formik.touched.shortName && formik.errors.shortName}
                />
                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Описание"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
                <TextField
                    id="organization"
                    name="organization"
                    select
                    label="Организация"
                    value={formik.values.organization}
                    onChange={formik.handleChange}
                >
                    <MenuItem value="ntc">НТЦ</MenuItem>
                    <MenuItem value="st">СТ</MenuItem>
                </TextField>

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

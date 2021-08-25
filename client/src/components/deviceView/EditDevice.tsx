import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/Drawer';
import ExtraField from './ExtraField';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
// store
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addDevice, getCurrentDevice, updateDevice } from '../../store/deviceSlice';
import { getEditMode } from '../../store/layoutSlice';
//styles
import './styles/editDevice.scss';

// types
import type { Device } from '../../store/deviceSlice';
import type { ExtraFieldType } from './ExtraField';
import { Typography } from '@material-ui/core';

// TODO add actual schema
const DeviceValidationSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

const EditDevice = () => {
    const dispatch = useAppDispatch();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const openDrawerType = useAppSelector(getEditMode);
    const device = useAppSelector(getCurrentDevice);
    const initialExtraFields = device?.additionalInfo ? JSON.parse(device.additionalInfo) : [];
    const [extraFields, setExtraFields] = useState<ExtraFieldType[]>(initialExtraFields);

    const formik = useFormik<Device>({
        initialValues: {
            name: openDrawerType !== 'new' ? device?.name : '',
            shortName: openDrawerType === 'edit' ? device?.shortName : '',
            description: openDrawerType === 'edit' ? device?.description : '',
            organization: openDrawerType === 'edit' ? device?.organization : 'ntc',
            isModification: openDrawerType === 'mod' ? true : device?.isModification,
        },
        // validationSchema: DeviceValidationSchema,
        onSubmit: (values) => {
            const formData = new FormData();

            const getOriginalId = () => {
                if (openDrawerType === 'mod') {
                    return device.id;
                }
                if (openDrawerType === 'edit') {
                    return device.originalDeviceId;
                }
                return null;
            };

            formData.append('deviceImage', selectedImage);
            formData.append(
                'deviceInfo',
                JSON.stringify({
                    ...values,
                    additionalInfo: JSON.stringify(extraFields.filter((field) => field.name || field.value)),
                    originalDeviceId: getOriginalId(),
                    imagePath: openDrawerType === 'edit' ? device.imagePath : '',
                }),
            );

            if (openDrawerType === 'edit') {
                dispatch(
                    updateDevice({
                        device: formData,
                        id: device.id,
                    }),
                );
            } else {
                dispatch(addDevice(formData));
            }
        },
    });

    const onFileInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSelectedImage(event.currentTarget.files[0]);
    };

    const getButtonLabel = () => {
        switch (openDrawerType) {
            case 'new':
                return 'добавить устройство';
            case 'edit':
                return 'обновить устройство';
            case 'mod':
                return 'добавить модификацию';
            default:
                return '';
        }
    };

    const onAddExtraField = () => {
        setExtraFields((prevFields) => {
            return [...prevFields, { name: '', value: '' }];
        });
    };

    const onSaveField = (newField, index) => {
        setExtraFields(extraFields.map((field, i) => (index === i ? newField : field)));
    };

    const onRemoveField = (index) => {
        setExtraFields(extraFields.filter((_, i) => index !== i));
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
                    multiline
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
                <div className="extraFieldTitleWrapper">
                    <Typography>Дополнительные поля</Typography>
                    <IconButton aria-label="add-extra-field" onClick={onAddExtraField}>
                        <AddBoxIcon color="primary" />
                    </IconButton>
                </div>
                {extraFields.map((value, index) => (
                    <ExtraField
                        key={index}
                        index={index}
                        saveField={onSaveField}
                        initialValue={value}
                        removeField={onRemoveField}
                    />
                ))}
                <div>
                    <input
                        accept="image/*"
                        className="upload-input"
                        id="deviceImage"
                        type="file"
                        onChange={onFileInputChange}
                    />
                    <label htmlFor="deviceImage">
                        <Button variant="contained" color="primary" component="span">
                            Загрузить
                        </Button>
                    </label>
                    <span>{selectedImage?.name}</span>
                </div>
                <Button color="primary" variant="contained" fullWidth type="submit">
                    {getButtonLabel()}
                </Button>
            </form>
        </div>
    );
};

export default EditDevice;

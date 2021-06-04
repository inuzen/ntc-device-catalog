import React from 'react';
import ReactDOM from 'react-dom';
import { FieldHookConfig, useField } from 'formik';
import * as Yup from 'yup';

// type TextInputProps = {
//     label: string;
//     props: any;
// };

export const TextInput = ({ label, ...props }: any) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)

    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </>
    );
};

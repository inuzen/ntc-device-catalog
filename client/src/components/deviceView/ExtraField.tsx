import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

export type ExtraFieldType = {
    name: string;
    value: string;
    showcase?: boolean;
};
const ExtraField = ({ index, saveField }) => {
    const [field, setField] = useState<ExtraFieldType>({ name: '', value: '' });

    const onChange = (event) => {
        setField(() => {
            if (event.target.name.startsWith('extraFieldName')) {
                return {
                    ...field,
                    name: event.target.value,
                };
            } else {
                return {
                    ...field,
                    value: event.target.value,
                };
            }
        });
    };
    return (
        <div>
            <div className="extraFieldInputRow">
                <TextField
                    fullWidth
                    id={`extraFieldName-${index}`}
                    name="extraFieldName"
                    label="Название поля"
                    value={field.name}
                    onChange={onChange}
                />
                <TextField
                    fullWidth
                    id={`extraFieldValue-${index}`}
                    name="extraFieldValue"
                    label="Значение"
                    value={field.value}
                    onChange={onChange}
                />
            </div>
            <div>
                <button type="button" onClick={() => saveField(field, index)}>
                    save field
                </button>
            </div>
        </div>
    );
};

export default ExtraField;

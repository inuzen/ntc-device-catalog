import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

//styles
import './styles/extraField.scss';

export type ExtraFieldType = {
    name: string;
    value: string;
    showcase?: boolean;
};
const ExtraField = ({ index, saveField, initialValue, removeField }) => {
    const [field, setField] = useState<ExtraFieldType>(initialValue || { name: '', value: '' });
    const [disableSave, setDisableSave] = useState(true);
    const onChange = (event) => {
        setDisableSave(false);
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

    const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDisableSave(false);
        setField({ ...field, showcase: event.target.checked });
    };

    const onSaveHandler = () => {
        saveField(field, index);
        setDisableSave(true);
    };

    const onDeleteHandler = () => removeField(index);
    return (
        <div className="extraFieldContainer">
            <div className="extraFieldInputRow">
                <TextField
                    fullWidth
                    id={`extraFieldName-${index}`}
                    name="extraFieldName"
                    label="Название"
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
                <Checkbox
                    checked={!!field.showcase}
                    onChange={onCheckboxChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </div>
            <div className="extraFieldButtonRow">
                <Button size="small" color="primary" onClick={onSaveHandler} disabled={disableSave}>
                    Сохранить
                </Button>
                <Button size="small" color="primary" onClick={onDeleteHandler}>
                    Удалить
                </Button>
            </div>
        </div>
    );
};

export default ExtraField;

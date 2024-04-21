import { Form,Field, useField } from "formik";
import React from "react";
import { FormField, Label, Select } from "semantic-ui-react";


interface Props{
    placeholder: string;
    name: string;
    options: {text: string, value: string}[];

    label?: string;
}

export default function MyTextInput(props: Props) {
    
    const [field, meta, helpers] = useField(props.name);
    return(
        <FormField error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select 
                clearable
                options={props.options}
                value={field.value || null}
                onChange={(_, data) => helpers.setValue(data.value)}
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </FormField>
    )

}
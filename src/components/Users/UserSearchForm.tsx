import React from "react";
import { Field, Form, Formik } from "formik";
import { FilterType } from "../../redux/usersReducer";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

const userSearchFormValidate = (values: any) => {
        const errors = {};
        return errors;
};
type PropsType = {
        onFilterChanged: (filter: FilterType)=>void    
}
export const UserSearchForm: React.FC<PropsType> = React.memo((props) => {

        const submit = (values: FilterType, { setSubmitting }: { setSubmitting: any; }) => {
                props.onFilterChanged(values)
                setSubmitting(false)
        };
        return <div>
                <Formik
                        initialValues={{ term: '', friend: null }}
                        validate={userSearchFormValidate}
                        onSubmit={submit}
                >
                        {({ isSubmitting }) => (
                                <Form>
                                        <Field type="text" name="term" />
                                        <Field name="friend" as="select">
                                                <option value="null">All</option>
                                                <option value="true">Only followed</option>
                                                <option value="false">Only unfollowed</option>
                                        </Field>
                                        <button type="submit" disabled={isSubmitting}>
                                                Search
                                        </button>
                                </Form>
                        )}
                </Formik>
        </div>;
});

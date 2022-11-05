import React from "react";
import { Form, Formik } from "formik";

const userSearchFormValidate = (values: any) => {
        const errors = {};
        return errors;
};
type userSearchFormType = {
        term: string;
};
export const UserSearchForm = () => {

        const submit = (values: userSearchFormType,
                { setSubmitting }: { setSubmitting: any; }) => {
                setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                }, 400);
        };
        return <div>
                <Formik
                        initialValues={{ term: '' }}
                        validate={userSearchFormValidate}
                        onSubmit={submit}
                >
                        {({ isSubmitting }) => (
                                <Form>
                                        <input type="text" name="term" />
                                        <button type="submit" disabled={isSubmitting}>
                                                Search
                                        </button>
                                </Form>
                        )}
                </Formik>
        </div>;
};

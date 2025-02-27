import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';

const ContactsForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    phone: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Поле обов\'язкове')
      .min(3, 'Мінімум 3 символи')
      .max(20, 'Максимум 20 символів'),
    phone: Yup.string()
      .required('Поле обов\'язкове')
      .matches(/^\+?\d{9,15}$/, 'Невірний формат номера телефону'),
  });

  const handleSubmit = (values) => {
    dispatch(addContact(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label>
            Ім'я
            <Field type="text" name="name" placeholder="Введіть ім'я" />
            <ErrorMessage name="name" component="p" />
          </label>
          <label>
            Телефон
            <Field type="text" name="phone" placeholder="Введіть номер телефону" />
            <ErrorMessage name="phone" component="p" />
          </label>
          <button type="submit">Зберегти</button>
        </div>
      </Form>
    </Formik>
  );
};

export default ContactsForm;
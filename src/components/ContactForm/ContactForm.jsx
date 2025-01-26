import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactOps';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ContactForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, 'Must be in the format xxx-xx-xx')
    .required('Number is required'),
});

export default function ContactForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <label>
          Name
          <Field type="text" name="name" className={styles.input} />
          <ErrorMessage name="name" component="div" className={styles.error} />
        </label>
        <label>
          Number
          <Field type="text" name="number" className={styles.input} />
          <ErrorMessage name="number" component="div" className={styles.error} />
        </label>
        <button type="submit" className={styles.button}>
          Add Contact
        </button>
      </Form>
    </Formik>
  );
}



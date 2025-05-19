import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import styles from '../css/controlled.module.css'

function FormControlled () {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false
    },
    validationSchema: Yup.object({
      username: Yup.string().trim().required('Username is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords do not match')
        .required('Confirm password is required'),
      termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms')
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    }
  })

  return (
    <div className={styles.main}>
      <h1>Controlled App</h1>
      <form className={styles.controlled} onSubmit={formik.handleSubmit}>
        <label>Username*</label>
        <input
          className={`${styles.inp} ${
            formik.touched.username && formik.errors.username
              ? styles.inputError
              : ''
          }`}
          type='text'
          name='username'
          placeholder='Enter your username'
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username && (
          <p className={styles.error}>{formik.errors.username}</p>
        )}

        <label>Email*</label>
        <input
          className={`${styles.inp} ${
            formik.touched.email && formik.errors.email ? styles.inputError : ''
          }`}
          type='email'
          name='email'
          placeholder='Enter your email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <p className={styles.error}>{formik.errors.email}</p>
        )}

        <label>Password*</label>
        <div className={styles.passwordWrapper}>
          <input
            className={`${styles.inp} ${
              formik.touched.password && formik.errors.password
                ? styles.inputError
                : ''
            }`}
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Enter your password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            type='button'
            className={styles.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className={styles.error}>{formik.errors.password}</p>
        )}

        <label>Confirm password*</label>
        <div className={styles.passwordWrapper}>
          <input
            className={`${styles.inp} ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? styles.inputError
                : ''
            }`}
            type={showConfirmPassword ? 'text' : 'password'}
            name='confirmPassword'
            placeholder='Confirm your password'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            type='button'
            className={styles.eyeButton}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className={styles.error}>{formik.errors.confirmPassword}</p>
        )}

        <div className={styles.checkboxContainer}>
          <input
            type='checkbox'
            name='termsAccepted'
            checked={formik.values.termsAccepted}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label>I agree to the terms and conditions.</label>
        </div>
        {formik.touched.termsAccepted && formik.errors.termsAccepted && (
          <p className={styles.error}>{formik.errors.termsAccepted}</p>
        )}

        <button className={styles.btn} type='submit'>
          Register
        </button>
        <p className={styles.info}>*Required field</p>
      </form>
    </div>
  )
}

export default FormControlled

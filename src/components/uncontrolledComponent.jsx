import React, { useRef, useState } from 'react'
import * as Yup from 'yup'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import styles from '../css/uncontrolled.module.css'

function FormUncontrolled () {
  const formRef = useRef(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = async event => {
    event.preventDefault()
    const form = formRef.current

    const formData = {
      username: form.username.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
      termsAccepted: form.termsAccepted.checked
    }

    const schema = Yup.object({
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
    })

    try {
      await schema.validate(formData, { abortEarly: false })
      setErrors({})
      alert(JSON.stringify(formData, null, 2))
    } catch (err) {
      const newErrors = {}
      err.inner.forEach(error => {
        newErrors[error.path] = error.message
      })
      setErrors(newErrors)
    }
  }

  return (
    <div className={styles.main}>
      <h1>Uncontrolled App</h1>
      <form className={styles.controlled} ref={formRef} onSubmit={handleSubmit}>
        <label>Username*</label>
        <input
          className={styles.inp}
          type='text'
          name='username'
          placeholder='Enter your username'
        />
        {errors.username && <p className={styles.error}>{errors.username}</p>}

        <label>Email*</label>
        <input
          className={styles.inp}
          type='email'
          name='email'
          placeholder='Enter your email'
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        <label>Password*</label>
        <div className={styles.passwordWrapper}>
          <input
            className={styles.inp}
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Enter your password'
          />
          <button
            type='button'
            className={styles.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        <label>Confirm password*</label>
        <div className={styles.passwordWrapper}>
          <input
            className={styles.inp}
            type={showConfirmPassword ? 'text' : 'password'}
            name='confirmPassword'
            placeholder='Confirm your password'
          />
          <button
            type='button'
            className={styles.eyeButton}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword}</p>
        )}

        <div className={styles.checkboxContainer}>
          <input type='checkbox' name='termsAccepted' />
          <label>I agree to the terms and conditions.</label>
        </div>
        {errors.termsAccepted && (
          <p className={styles.error}>{errors.termsAccepted}</p>
        )}

        <button className={styles.btn} type='submit'>
          Register
        </button>
        <p className={styles.info}>*Required field</p>
      </form>
    </div>
  )
}

export default FormUncontrolled

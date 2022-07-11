import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';

function Register(props) {

  return (
    <section className='route-page'>
      <AuthForm
        isLoadingData={props.isLoadingData}
        onSubmit={props.onRegister}
        title="Регистрация"
        textButton="Зарегистрироваться"
        textLoading="Регистрация...">
        <Link className='route-form__link' to='/sign-in'>Уже зарегистрированы? Войти</Link>
      </AuthForm>
   </section>
  )
}

export default Register;
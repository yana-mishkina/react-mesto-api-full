import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Login(props) {

  return (
    <section className='route-page'>
      <AuthForm
        isLoadingData={props.isLoadingData}
        onSubmit={props.onLogin}
        title="Вход"
        textButton="Войти"
        textLoading="Вход..." />
   </section>
  )
}

export default Login;
import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import axios from 'axios'

function App() {

  const handleClickLogin = (values) => {
    console.log(values)
    axios.post('http://localhost:3001/login', { 
      emaill: values.email,
      passwordd: values.password,
    }).then((response) =>{
      alert(response.data.msg)
    })
  }
  const handleClickCadastro = (values) => {
    console.log(values)
    axios.post('http://localhost:3001/resgister', { 
      email: values.email,
      password: values.password,
    }).then((response) =>{
      alert(response.data.msg)
    })
    
  }

  const validationLogin =  yup.object().shape({
    email: yup
    .string()
    .email('nao e um email')
    .required('este campo e obrigatorio'),
    password: yup
    .string()
    .min(8, "a senha deve ter 8 caracteres")
    .required('este campo e obrigatorio'),
  })
  const validationCadastro =  yup.object().shape({
    email: yup
    .string()
    .email('nao e um email')
    .required('este campo e obrigatorio'),
    password: yup
    .string()
    .min(8, "a senha deve ter 8 caracteres")
    .required('este campo e obrigatorio'),
    ConfirmePassword: yup
    .string()
    .oneOf([yup
      .ref("password"), null], 'as senhas nao sao iguais' )
    .required('este campo e obrigatorio'),
  })
  return (
    <div className="contenier">
      <h1>Login</h1>
      <Formik 
      initialValues={{}}
      onSubmit={handleClickLogin}
      validationSchema={validationLogin}
      >
        <Form className='login-Form'>
          <div className='login-Form-group'>
            <Field name='email' className='Form-field' placeHolder='Email' />

            <ErrorMessage
              component='span'
              name='email'
              className='Form-error'
            />
          </div>
          <div className='login-Form-group'>
            <Field name='password' className='Form-field' placeHolder='senha' />

            <ErrorMessage
              component='span'
              name='password'
              className='Form-error'
            />
          </div>
          <button className='button' type='submit'>
            Login
          </button>
        </Form>
      </Formik>
      <h1>Cadastro</h1>
      <Formik 
      initialValues={{}}
      onSubmit={handleClickCadastro}
      validationSchema={validationCadastro}
      >
        <Form className='login-Form'>
          <div className='login-Form-group'>
            <Field name='email' className='Form-field' placeHolder='Email' />

            <ErrorMessage
              component='span'
              name='email'
              className='Form-error'
            />
          </div>
          <div className='login-Form-group'>
            <Field name='password' className='Form-field' placeHolder='senha' />

            <ErrorMessage
              component='span'
              name='password'
              className='Form-error'
            />
          </div>
          <div className='login-Form-group'>
            <Field name='ConfirmePassword' className='Form-field' placeHolder='confirme sua senha' />

            <ErrorMessage
              component='span'
              name='ConfirmePassword'
              className='Form-error'
            />
          </div>
          <button className='button' type='submit'>
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;

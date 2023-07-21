import { Form } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

// import classes from './ForgotPasswordForm.module.css';

function ForgotPasswordForm() {
  return (
    <Form
      method='post'
      className='flex flex-col max-w-[380px] p-4 my-20 mx-auto border border-solid border-lime-green-900 rounded-lg shadow-md'
    >
      <h5 className='mt-4 mx-0 mb-8 text-3xl text-center'>
        Reset your password
      </h5>
      <Input
        type='email'
        name='email'
        required={true}
        text='Type your email'
        color='Green'
      />
      <Button className='my-4' color='OrangeLite' variant='Capsule'>
        Send message
      </Button>
    </Form>
  );
}

export default ForgotPasswordForm;

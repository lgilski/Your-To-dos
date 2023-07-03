import { Form } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import classes from './ForgotPasswordForm.module.css';

function ForgotPasswordForm() {
  return (
    <Form method='post' className={classes.form}>
      <h5 className={classes.header}>Reset your password</h5>
      <Input
        type='email'
        name='email'
        required={true}
        text='Type your email'
        color='orange'
      />
      <Button color='orange' variant='capsule'>
        Send message
      </Button>
    </Form>
  );
}

export default ForgotPasswordForm;

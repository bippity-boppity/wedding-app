import './RSVPForm.scss';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const RSVPForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const toastifySuccess = () => {
    toast('RSVP sent', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,  
      draggable: false,
      className: 'submit-feedback success',
      toastId: 'notifyToast'
    });
  };

  const toastifyFail = () => {
    toast('Error, please try again', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,  
      draggable: false,
      className: 'submit-feedback danger',
      toastId: 'notifyToast'
    });
  };
  
  const onSubmit = async (data) => {
    const { name, email, subject, message } = data;
    try {
      const templateParams = {
        name,
        email,
        subject,
        message
      };

      await emailjs.send("service_yte69is","template_q0f3wgo", templateParams, 'nkAN8QdcnhmBEKRQZ');
      reset();
      toastifySuccess();
    } catch (e) {
      reset();
      toastifyFail();
    }
  };

  return (
    <form id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className='mb-3'>
        <input
          type='text'
          name='name'
          {...register('name', {
            required: { value: true, message: 'Please enter your name' },
            maxLength: {
              value: 30,
              message: 'Please use 30 characters or less'
            }
          })}
          className='form-control formInput'
          placeholder='Name'
        ></input>
        {errors.name && <span className='text-danger'>{errors.name.message}</span>}
      </div>
      <div className='mb-3'>
        <input
          type='email'
          name='email'
          {...register('email', {
            required: true,
            pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          })}
          className='form-control formInput'
          placeholder='Email address'
        ></input>
        {errors.email && (
          <span className='text-danger'>Please enter a valid email address</span>
        )}
      </div>
      <div className='mb-3'>
        <input
          type='text'
          name='subject'
          {...register('subject', {
            required: { value: true, message: 'Please enter a subject' },
            maxLength: {
              value: 75,
              message: 'Subject cannot exceed 75 characters'
            }
          })}
          className='form-control formInput'
          placeholder='Subject'
        ></input>
        {errors.subject && (
          <span className='text-danger'>{errors.subject.message}</span>
        )}
      </div>
      <div className='mb-3'>
        <textarea
          rows={3}
          name='message'
          {...register('message', {
            required: true
          })}
          className='form-control formInput'
          placeholder='Message'
        ></textarea>
        {errors.message && <span className='text-danger'>Please enter a message</span>}
      </div>
      <button className='btn btn-primary' type='submit'>Submit</button>
      <ToastContainer />
    </form>
  );
}

export default RSVPForm;
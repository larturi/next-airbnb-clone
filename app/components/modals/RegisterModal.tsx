'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import useLoginModal from '../../hooks/useLoginModal';
import useRegisterModal from '../../hooks/useRegisterModal';

const RegisterModal = () => {
   const registerModal = useRegisterModal();
   const loginModal = useLoginModal();

   const [isLoading, setIsLoading] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         name: '',
         email: '',
         password: '',
      },
   });

   const onSubmitHandler: SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);

      axios
         .post('/api/register', data)
         .then(() => {
            registerModal.onClose();
         })
         .catch((error) => {
            toast.error('Something went wrong');
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

   const bodyContent = (
      <div className='flex flex-col gap-4'>
         <Heading
            title='Welcome to Airbnb Clone'
            subtitle='Create an account!'
         />
         <Input
            id='name'
            label='Full Name'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
         />
         <Input
            id='email'
            label='Email'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
         />
         <Input
            id='password'
            label='Password'
            type='password'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
         />
      </div>
   );

   const footerContent = (
      <div className='flex flex-col gap-4 mt-3'>
         <hr />
         <Button
            outline
            label='Continue with Google'
            icon={FcGoogle}
            onClick={() => signIn('google')}
         />

         <Button
            outline
            label='Continue with GitHub'
            icon={AiFillGithub}
            onClick={() => signIn('github')}
         />

         <div
            className='
            text-neutral-500
            text-center
            mt-4
            font-light
          '
         >
            <div className='flex flex-row justify-center items-center gap-2'>
               <div>Already have an account?</div>
               <div
                  onClick={() => {
                     registerModal.onClose();
                     loginModal.onOpen();
                  }}
                  className='text-neutral-800 cursor-pointer hover:underline'
               >
                  Login
               </div>
            </div>
         </div>
      </div>
   );

   return (
      <Modal
         disabled={isLoading}
         isOpen={registerModal.isOpen}
         title='Register'
         actionLabel='Continue'
         onClose={registerModal.onClose}
         onSubmit={handleSubmit(onSubmitHandler)}
         body={bodyContent}
         footer={footerContent}
      />
   );
};

export default RegisterModal;

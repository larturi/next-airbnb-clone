'use client';

import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

interface TextAreaProps {
   id: string;
   label: string;
   disabled?: boolean;
   required?: boolean;
   register: UseFormRegister<FieldValues>;
   errors: FieldErrors;
}

const Textarea: React.FC<TextAreaProps> = ({
   id,
   label,
   disabled,
   required,
   register,
   errors,
}) => {
   return (
      <div className='w-full relative'>
         <label
            className={`
            text-md
            
            ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
         `}
         >
            {label}
         </label>
         <textarea
            id={id}
            disabled={disabled}
            {...register(id, { required })}
            className={`
                peer
                w-full
                p-4
                pt-6
                font-light
                bg-white
                border-2
                rounded-md
                outline-none
                transition
                disabled:opacity-70
                disabled:cursor-not-allowed
                ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
            `}
         />
      </div>
   );
};

export default Textarea;

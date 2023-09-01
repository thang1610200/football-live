'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import clsx from "clsx";

interface InputProps {
    id: string,
    label: string,
    required?: boolean,
    type: string,
    disabled?: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors 
}

const Input:React.FC<InputProps> = ({
    id,
    label,
    required,
    type,
    disabled,
    register,
    errors
}) => {
    return (
        <div className="relative">
        <input
          type={type}
          id={id}
          disabled={disabled}
          placeholder="" 
          {...register(id,{required})}
          className={clsx(`block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer invalid:border-b-1`,
                        errors[id] && 'focus:ring-rose-500')}

        />
        <label 
          htmlFor={id} 
          className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">{label}</label>
    </div>
    );
}

export default Input;
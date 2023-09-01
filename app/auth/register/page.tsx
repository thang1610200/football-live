'use client';

import Input from "@/components/ui/Input";
import {Button} from "@/components/ui/button";
import AuthSocialButton from "../components/AuthSocialButton";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Link from "next/link";
import AuthLayout from "../components/AuthLayout";

const AuthRegister = () => {
    const session = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(session.status === 'authenticated'){
            router.push("/");
        }
    },[session.status, router]);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const socialButton = (action: string) => {
        signIn(action,{callbackUrl: "/"});
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post("/api/register", data)
            .then(() => signIn('credentials', data))
            .catch(() => { toast.error("Something went wrong!") })
            .finally(() => setIsLoading(false));
    }

    return (
        <AuthLayout>
            <div className="flex justify-center">
                <div className="bg-black bg-opacity-70 px-16 py-8 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                    <h2 className="text-white text-4xl mb-8 font-semibold">
                        REGISTER
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4">
                            <Input type="name" id="name" label="Name" disabled={isLoading} required register={register} errors={errors} />
                            <Input type="email" id="email" label="Email" disabled={isLoading} required register={register} errors={errors} />
                            <Input type="password" id="password" label="Password" disabled={isLoading} required register={register} errors={errors} />
                        </div>
                            <Button type="submit" disabled={isLoading} variant='destructive' className="mt-10 w-full">
                                Register
                            </Button>
                    </form>
                    <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                        <AuthSocialButton onClick={() => socialButton("google")} icon={FcGoogle} />
                        <AuthSocialButton onClick={() => socialButton("github")} icon={FaGithub} />
                    </div>
                    <p className="text-neutral-500 mt-12">
                            Already have an account?
                        <Link href={'/auth/login'} className="text-white ml-1 hover:underline cursor-pointer">
                            Login
                        </Link>
                            .
                    </p>
                </div>
            </div> 
        </AuthLayout> 
    );
}

export default AuthRegister;
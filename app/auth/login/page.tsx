"use client";

import Input from "@/components/ui/Input";
import { useEffect, useState } from "react";
import AuthSocialButton from "../components/AuthSocialButton";
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import { signIn, useSession } from "next-auth/react";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import AuthLayout from "../components/AuthLayout";

const AuthLogin = () => {
    const session = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    //const searchParams = useSearchParams();
    //const callbackUrl = searchParams?.get('callbackUrl') ?? '/';

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
            email: '',
            password: ''
        }
    }) 

    const socialButton = (action: string) => {
        signIn(action,{callbackUrl: "/"});
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ... data,
            redirect: false
        })
            .then((callback) => {
                if(callback?.error){
                    toast.error('Invalid credentials');
                }
                else{
                    router.refresh();
                    router.push("/");
                    toast.success("Logged in!");
                }

                // if(!callback?.error && callback?.ok){
                //     toast.success("Logged in!");
                //     router.push(callbackUrl);
                // }
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <AuthLayout>
            <div className="flex justify-center">
                <div className="bg-black bg-opacity-70 px-16 py-8 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                    <h2 className="text-white text-4xl mb-8 font-semibold">
                        LOGIN
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4">
                            <Input type="email" id="email" label="Email" disabled={isLoading} required register={register} errors={errors} />
                            <Input type="password" id="password" label="Password" disabled={isLoading} required register={register} errors={errors} />
                        </div>
                            <Button type="submit" disabled={isLoading} variant="destructive" className="mt-10 w-full">
                                Login
                            </Button>
                    </form>
                    <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                        <AuthSocialButton onClick={() => socialButton("google")} icon={FcGoogle} />
                        <AuthSocialButton onClick={() => socialButton("github")} icon={FaGithub} />
                    </div>
                    <p className="text-neutral-500 mt-12">
                            First time using UTE-TV?
                        <Link href={'/auth/register'} className="text-white ml-1 hover:underline cursor-pointer">
                            Create an account
                        </Link>
                            .
                    </p>
                </div>
            </div>  
        </AuthLayout>
    );
}

export default AuthLogin;
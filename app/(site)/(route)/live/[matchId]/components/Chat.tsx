import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MessageInput from "./MessageInput";
import axios from "axios";
import useMatch from "@/app/hook/useMatch";
import Body from "./Body";
import useMessage from "@/app/hook/useMessage";
import LoadingModal from "@/components/ui/loadingmodal";

const Chat = () => {
    const { MatchId } = useMatch();
    const { data: message= [], isLoading } = useMessage(MatchId);

    const {register, handleSubmit, setValue, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true });
        axios.post('/api/messages',{
            ...data,
            MatchId
        })
    };

    return (
        <>
            { isLoading ? (<LoadingModal />) : (
            <div className="bg-gray-200 p-4 rounded-lg chat-container">
                <Body initMessage={message} />
                <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <MessageInput id="message" required register={register} errors={errors}  />
                        <Button type="submit"  className="bg-blue-500 text-white mt-2">Gửi</Button>
                    </form>
                </div>
            </div>
            )}
        </>
    );
}

export default Chat;
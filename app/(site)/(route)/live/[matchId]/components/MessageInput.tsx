import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";


interface MessageInputProps {
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
}


const MessageInput: React.FC<MessageInputProps> = ({
    id,
    type,
    required,
    register
}) => {
    return (
        <input 
            id={id}
            type={type} 
            {...register(id, { required })}
            placeholder="Nhập tin nhắn..." 
            className="w-full p-2 border rounded-lg" 
        />
    );
}

export default MessageInput;
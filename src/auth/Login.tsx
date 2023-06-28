import { formType } from "dto/form.dto";
import { Dispatch, SetStateAction } from "react";

type Props = {
    form: formType;
    setForm: Dispatch<SetStateAction<formType>>;
    handleSubmit: () => void;
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

const Login = ({ form, handleSubmit, onChange }: Props) => {

    return (
        <div className='w-full flex justify-center px-2'>
            <form className='relative h-screen mt-8 w-full max-w-xl flex flex-col gap-5'
                onSubmit={handleSubmit}>
                <label htmlFor='password' className='text-xs font-semibold'>PHONE NUMBER</label>
                <input
                    className='max-w-xl h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none'
                    type='email'
                    name='email'
                    placeholder='Enter Your Phone number'
                    required
                    value={form.email}
                    onChange={onChange}
                />
                <label htmlFor='password' className='text-xs font-semibold'>PASSWORD</label>
                <input
                    className='max-w-xl h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none'
                    type='password'
                    name='password'
                    placeholder='Enter Your Password'
                    required
                    value={form.password}
                    onChange={onChange}
                />

                <div className='flex absolute left-0 bottom-32 mt-8 max-w-xl w-full justify-center border-none'>
                    <input
                        className='cursor-pointer max-w-xl w-[70%] p-3 bg-black text-white border-none rounded-md '
                        type='submit'
                        value='Log in'
                    />

                </div>
            </form>

        </div>
    )
}

export default Login
import { formType } from "dto/form.dto";
import { Dispatch, SetStateAction } from "react";

type Props = {
    form: formType;
    setForm: Dispatch<SetStateAction<formType>>;
    handleSubmit: () => void;
    onChange: React.ChangeEventHandler<HTMLInputElement>
}
const SignUp = ({ form, handleSubmit, onChange }: Props) => {

    return (
        <div className='w-full flex justify-center px-2'>
            <form className='relative h-screen max-w-xl w-full mt-8 flex flex-col gap-5'
                onSubmit={handleSubmit}>
                <>
                    <label htmlFor='email' className='text-xs font-semibold'>FIRST NAME</label>
                    <input
                        className='max-w-xl h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none'
                        type='text'
                        name='firstName'
                        value={form.firstName}
                        placeholder='Enter Your email'
                        required
                        onChange={onChange}
                    />

                    <label htmlFor='password' className='text-xs font-semibold'>LAST NAME</label>
                    <input
                        className='max-w-xl h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none'
                        type='text'
                        name='lastName'
                        placeholder='Enter Your last name'
                        required
                        value={form.lastName}
                        onChange={onChange}
                    />
                    <label htmlFor='password' className='text-xs font-semibold'>PHONE NO</label>
                    <input
                        className='max-w-xl h-8 p-1 text-xs border-b border-b-black  placeholder:text-xs placeholder:ml-1 focus:outline-none'
                        type='text'
                        name='phoneNo'
                        placeholder='Enter Your phone number'
                        required
                        value={form.phoneNo}
                        onChange={onChange}
                    />
                    <label htmlFor='password' className='text-xs font-semibold'>EMAIL ADDRESS</label>
                    <input
                        className='max-w-xl h-8 p-1 text-xs border-b border-b-black  placeholder:text-xs placeholder:ml-1 focus:outline-none'
                        type='email'
                        name='email'
                        placeholder='Enter Your email address'
                        required
                        value={form.email}
                        onChange={onChange}
                    />
                    <label htmlFor='password' className='text-xs font-semibold' >PASSWORD</label>
                    <input
                        className='max-w-xl h-8 p-1 text-xs border-b border-b-black  placeholder:text-xs placeholder:ml-1 focus:outline-none '
                        type='password'
                        name='password'
                        placeholder='Enter Your password'
                        required
                        value={form.password}
                        onChange={onChange}
                    />
                </>
                <div className='flex absolute left-0 bottom-32 mt-8 max-w-xl w-full justify-center border-none'>
                    <input
                        className='cursor-pointer max-w-xl w-[70%] p-3 bg-black text-white border-none rounded-md '
                        type='submit'
                        value='Sign Up'
                    />

                </div>
            </form>
        </div>
    )
}

export default SignUp
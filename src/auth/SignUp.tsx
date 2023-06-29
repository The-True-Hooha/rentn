import { formType } from "dto/form.dto";
import { Dispatch, SetStateAction } from "react";

type Props = {
    form: formType;
    setForm: Dispatch<SetStateAction<formType>>;
    handleSubmit: () => void;
    onChange: React.ChangeEventHandler<HTMLInputElement>
}
const SignUp = ({ form, handleSubmit, onChange, setForm }: Props) => {

    return (
        <div className='relative w-full sm:flex sm:justify-center'>
            <form className='relative max-w-xl w-full h-[70vh] flex flex-col gap-2 px-2'
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
                <div className=' flex mt-8 max-w-xl w-full justify-center border-none sm:absolute sm:left-0 sm:bottom-10'>
                    <input
                        className='cursor-pointer max-w-xl w-[70%] p-3 bg-black text-white border-none rounded-md '
                        type='submit'
                        value='Sign Up'
                    />

                </div>
                <div className='sm:hidden w-full flex justify-center text-xs'>Already have an account ?
                    <span
                        className='ml-1 text-gray-700 underline cursor-pointer'
                        onClick={() =>
                            setForm((prev) => ({
                                ...prev,
                                isNewUser: false,
                            }))
                        }
                    >{!form.isNewUser ? 'Sign up' : 'Login'}</span></div>
            </form>
        </div>
    )
}

export default SignUp
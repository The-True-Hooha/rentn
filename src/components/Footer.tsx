import Image from "next/image"
const Footer = () => (
    <footer className='p-2 h-[200px] bg-[url(/footer-image.svg)] bg-transparent relative w-full bg-black text-white flex flex-col'>
        {/* <img className='absolute z-[-1] -top-10 left-0 w-full' src='/footer-image.svg' /> */}
        <div className='mt-11 w-full sm:flex sm:px-3 sm:justify-between lg:mt-16'>
            <div className='w-full sm:w-1/2 md:w-1/3 '>
                <h2 className='text-red-700 text-center sm:text-left'>About Us</h2>
                <p className='text-[0.65rem] text-center sm:text-left sm:text-[0.7rem]'>Simplifying house hunting in Nigeria, find your dream home with ease. Connnecting you with agents and landlords for a seamless rental experience.</p>
            </div>
            <div className='sm:w-1/3 sm:text-left'>
                <p className='text-xs text-center w-full sm:text-left sm:text-base'>Follow us</p>
                <div className='relative flex justify-center gap-2 sm:justify-start'>
                    <Image src='/chevron-right.svg' alt='social media icons' height={16} width={16} />
                    <Image src='/chevron-right.svg' alt='social media icons' height={16} width={16} />
                    <Image src='/chevron-right.svg' alt='social media icons' height={16} width={16} />
                </div>
            </div>
        </div>
        <div className='flex justify-center text-[0.65rem]'>@2023. All rights reserved</div>
    </footer>
)
export default Footer

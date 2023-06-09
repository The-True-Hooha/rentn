import Link from "next/link"
import { useState } from "react"

const Navbar = () => {
    const [select, setSelect] = useState('rent')
    return (
        <nav className='w-full p-2 px-10 h-auto flex justify-between items-center'>
            <Link
                href='/'
                className='font-bold text-xl'>rent'n</Link>
            <div className='flex justify-between gap-4 '>
                <Link
                    href=""
                    onClick={() => setSelect('rent')}
                    className={`text-sm  ${select === 'rent' ? 'underline font-semibold ' : ''}`}
                >Rent a house</Link>
                <Link
                    href=""
                    onClick={() => setSelect('agent')}
                    className={`text-sm ${select === 'agent' ? 'underline font-semibold' : ''}`}
                >Agent</Link>
            </div>
        </nav>
    )
}
export default Navbar
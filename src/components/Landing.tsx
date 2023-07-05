import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"


const Landing = () => {
    const [progress, setProgress] = useState(13)
    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <section className='py-6 px-5 flex justify-center items-center sm:justify-center flex-col gap-4 md:px-20'>

            {/* hero section */}
            <div className='hidden w-full md:flex justify-end '>
                <img src='Component 11.svg' className="w-10" />
            </div>
            <div className='text-black text-xl p-4 md:text-5xl m-2 font-extrabold text-center border h-30 md:p-10'>
                Find your ideal home for rent in a few clicks
            </div>

            {/* filter */}
            <div
                className="border border-black flex flex-col w-2/3 md:w-full md:flex-row rounded-lg ">
                <div className="p-[2px] w-full md:w-1/3 border border-b-black md:flex md:border  md:border-r-black md:border-b-0 md:flex-col">
                    <div className="m-2 flex gap-2">
                        <img className='w-3 ' src='/chevron-right.svg' />
                        <p className="text-xs text-gray-400">Search axis</p>
                    </div>
                    <div className="m-2 flex justify-center">
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Community" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Communities</SelectLabel>
                                    <SelectItem value="Iterigbi">Iterigbi</SelectItem>
                                    <SelectItem value="Ugbomro">Ugbomro</SelectItem>
                                    <SelectItem value="Ugolo">Ugolo</SelectItem>
                                    <SelectItem value="Okuokoko">Okuokoko</SelectItem>
                                    <SelectItem value="Agbarho">Agbarho</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="p-[2px] w-full md:w-1/3 border border-b-black md:flex md:border md:border-r-black md:border-b-0 md:flex-col">
                    <div className="m-2 flex gap-2">
                        <img className='w-3' src='/chevron-right.svg' />
                        <p className="text-xs text-gray-400">Type of house</p>
                    </div>
                    <div className="m-2 flex justify-center">
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select house type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>House</SelectLabel>
                                    <SelectItem value="Okuokoko">Bedsitter</SelectItem>
                                    <SelectItem value="Iterigbi">Self contain</SelectItem>
                                    <SelectItem value="Ugbomro">2 Bedroom</SelectItem>
                                    <SelectItem value="Ugolo">3 Bedroom</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="p-[2px] w-full md:w-1/3 md:flex  md:border">
                    <div className="m-2 flex gap-2">
                        <img className='w-3' src='/chevron-right.svg' />
                        <p className="text-xs text-gray-400">Search axis</p>
                    </div>
                    <div className="m-2 flex justify-center">
                        <Progress value={progress} className="w-full" />
                    </div>
                </div>
            </div>

        </section>
    )
}
export default Landing





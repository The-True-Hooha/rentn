import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"

type SliderProps = React.ComponentProps<typeof Slider>

const Landing = ({ className }: SliderProps) => {
    const [value, setValue] = useState(340)
    return (
        <section className='py-4 px-5 flex justify-center items-center sm:justify-center flex-col gap-2 md:px-20'>

            {/* hero section */}
            <div className='hidden w-full md:flex justify-end '>
                <img src='Component 11.svg' className="w-10" />
            </div>
            <div className='text-black text-xl p-4 sm:text-3xl md:text-5xl m-2 font-extrabold text-center border h-30 md:p-10'>
                Find your ideal home for rent in a few clicks
            </div>

            {/* filter */}
            <div
                className="border border-black w-4/5 md:flex md:w-full rounded-lg ">
                <div className=" w-full md:w-1/4 border border-b-black md:flex md:border  md:border-r-black md:border-b-0 md:flex-col">
                    <div className="m-1 flex gap-2">
                        <img className='w-3' src='/chevron-right.svg' />
                        <p className="text-xs text-gray-700">Search axis</p>
                    </div>
                    <div className="m-1 flex justify-center">
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
                <div className="w-full md:w-1/4 border border-b-black md:flex md:border md:border-r-black md:border-b-0 md:flex-col">
                    <div className="m-1 flex gap-2">
                        <img className='w-3' src='/chevron-right.svg' />
                        <p className="text-xs text-gray-700">Type of house</p>
                    </div>
                    <div className="m-1 flex justify-center">
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select house type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>House type</SelectLabel>
                                    <SelectItem value="Okuokoko">Bedsitter</SelectItem>
                                    <SelectItem value="Iterigbi">Self contain</SelectItem>
                                    <SelectItem value="Ugbomro">2 Bedroom</SelectItem>
                                    <SelectItem value="Ugolo">3 Bedroom</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='flex-1 lg:flex'>
                    <div className="p-2 lg:w-3/4 flex flex-col items-center justify-center border-b-black md:flex md:border-b-0 md:flex-col">
                        <div className="m-1 w-full">
                            <p className="text-xs text-gray-700">Annual rent: {value == 1000 ? '1m' : value + 'k'}</p>
                        </div>
                        <div className="m-1 text-[10px] flex justify-center gap-2 w-full">
                            <p>100k</p>
                            <Slider
                                value={[value]}
                                min={100}
                                max={1000}
                                step={1}
                                className={cn("w-full", className)}
                                onValueChange={(value) => setValue(value[0])}
                            />
                            <p>1m</p>
                        </div>
                    </div>
                    <div className='flex p-2 flex-1 justify-center items-center'>
                        <button className='h-full p-2 w-1/2 lg:w-full lg:p-0 bg-gray-500 rounded-lg text-sm text-gray-700'>Search</button>
                    </div>
                </div>
            </div>
            <p className='text-center text-xs'>Own a house for rent? <Link href='/Authentication' className='text-gray-700 underline cursor-pointer'>Sign up</Link></p>
        </section >
    )
}
export default Landing





import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Introduction = () => {
    return (
        <div className="flex flex-col  flex-grow mt-40 items-center  ">
            <h1 className="text-6xl text-brand-color font-bold">Image Bucket</h1>
            <h4 className="text-2xl mt-5 text-white font-semibold">A light weight application to store your images</h4>
            <div className="mt-5 w-full flex justify-center gap-5">
                <Link to='login'>
                    <Button className="bg-white hover:bg-brand-color text-black ">Sign In</Button>
                </Link>
                <Link to="register">
                    <Button className="hover:bg-brand-color hover:text-black">Sign Up</Button>
                </Link>

            </div>
        </div>
    )
}

export default Introduction
import React, { useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { imageServices } from "@/api/services/userAuth";
import AppLoader from "@/components/ui/AppLoader"

export interface FileInfo {
    file:File,
    title:string
}

const UploadImage = () => {
    const [images, setImages] = useState<string[]>([]);
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [loading,setLoading] = useState(false)

    const handleImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (files) {
            const newImages = Array.from(files).filter(file => validImageTypes.includes(file.type));
            const fileWithTitle = newImages.map(file=>({
                file,
                title:''
            }))
            setFiles(prevFiles => [...prevFiles,...fileWithTitle])
            const imageURL = newImages.map(file => URL.createObjectURL(file));
            setImages(prevImages => [...prevImages, ...imageURL])
        }
    }, [])

    const handleDeletion = (index: number) => {
        setImages(prevImages => prevImages.filter((_, ind) => index !== ind))
        setFiles(prevFiles=>prevFiles.filter((_,ind)=>index !== ind));
    }

    const handleDrop = (index: number) => {
        if (dragIndex === null) return
        setImages(prevImages => {
            const holdImages = [...prevImages] as string[];
            [holdImages[index], holdImages[dragIndex]] = [holdImages[dragIndex], holdImages[index]]
            return holdImages
        })
        setFiles(prevFiles => {
            const holdFiles = [...prevFiles];
            [holdFiles[index], holdFiles[dragIndex]] = [holdFiles[dragIndex], holdFiles[index]];
            return holdFiles;
        })
    }

    const handleTitleName = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setFiles(prevFiles => {
            const holdFiles = [...prevFiles];
            holdFiles[index].title = e.target.value
            return holdFiles;
        })
    }

    const handleUpload = async () => {
        if (!files) {
            toast.error("Please select atleast one file");
        }
        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('images', file.file);
            formData.append('title',file.title);
        })
        try {
            setLoading(true)
            await imageServices.uploadImages(formData);
            toast.success('Images uploaded successfully')
            setImages([])
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex-grow flex justify-center items-center'>
            <div className='w-full md:w-3/4 flex flex-col items-center'>
                <div className="space-y-4 p-3 w-full md:w-3/4 ">
                    <Label htmlFor="image-upload" className="block text-lg font-medium text-white">
                        Select Images
                    </Label>
                    <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        placeholder="Select files"
                        multiple
                        className="w-full h-14 px-3 py-2 bg-[#3a3a3a] border border-[#ffdf00] rounded-md    
                        file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#ffdf00] file:text-[#242424] hover:file:bg-[#ffd000]"
                    />
                </div>
                {images.length > 0 &&
                    <div className="flex flex-col justify-center items-center space-y-5">
                        <Button
                            onClick={handleUpload}
                            className="bg-white text-black hover:bg-brand-color">Upload</Button>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {images.map((image, index) => (
                                <div key={index}>
                                    <div
                                        onDragStart={() => setDragIndex(index)}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={() => handleDrop(index)}
                                        draggable
                                        className="w-72 relative border-4 border-blue-400 h-72 ">
                                        <Trash2
                                            onClick={() => handleDeletion(index)}
                                            className="absolute text-red-400 hover:text-red-700 right-1 top-2 cursor-pointer rounded-full" />
                                        <img className="h-full  w-full object-contain" src={image}></img>

                                    </div>
                                    <Input
                                        className="mt-3 text-white"
                                        type="text"
                                        placeholder="Title"
                                        value={files[index].title }
                                        onChange={(e) => handleTitleName(e, index)} />
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
            {loading && <AppLoader>Uploading</AppLoader>}
        </div>
    )
}

export default UploadImage
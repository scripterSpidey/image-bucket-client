import { imageServices } from '@/api/services/userAuth';
import { Input } from '@/components/ui/input';
import { Trash2, Copy, Pencil, Save } from 'lucide-react'
import { useEffect, useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import toast from 'react-hot-toast';




type ImageInfo = {
    _id: string,
    url: string,
    title: string
}

const Bucket = () => {

    const [images, setImages] = useState<ImageInfo[]>([]);
    const [alertDeletion, setAlertDeletion] = useState(false);
    const [imageId, setImageId] = useState('');
    const [editTitle, setEditTitle] = useState('')
    const [newTitle, setNewTitle] = useState('')

    useEffect(() => {
        const getImages = async () => {
            const data = await imageServices.fetchImages();
            setImages(data)
        }
        getImages();
    }, [])

    const handleAlert = (imageId: string) => {
        setAlertDeletion(true);
        setImageId(imageId)
    }

    const handleDeletion = async () => {
        if (!imageId) return;
        try {
            const data = await imageServices.deleteImage(imageId);
            setImages(data)
            toast.success("Image deleted successfully")
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async (imageId: string) => {
        try {
            if(!newTitle) return;
            const body = {
                imageTitle: newTitle
            }
            const data = await imageServices.editImage(imageId, body);
            setEditTitle('')
            setImages(data)
            toast.success('Image title has been changed')
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            {images.map((image, index) => (
                <div key={index}>
                    <div
                        draggable
                        className="w-72 relative border-4 border-blue-400 h-72 ">
                        <div className='absolute right-1 gap-2 rounded-md top-2 flex'>
                            <Trash2
                                onClick={() => handleAlert(image._id)}
                                className=" text-red-400 hover:text-red-700  cursor-pointer rounded-full" />
                            <Copy
                                onClick={() => {
                                    navigator.clipboard.writeText(image.url)
                                    toast.success('Image url copied')
                                }}
                                className='text-green-400 hover:text-green-700 cursor-pointer ' />
                        </div>
                        <img className="h-full  w-full object-contain" src={image.url}></img>
                    </div>
                    <div className='relative'>
                        <Input
                            disabled={!(editTitle === image._id)}
                            value={editTitle === image._id ? newTitle : image.title}
                            className="mt-3 text-white"
                            type="text"
                            placeholder="Title"
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                        {editTitle === image._id ?
                            <Save
                                onClick={()=>handleEdit(image._id)}
                                className="absolute right-3 cursor-pointer hover:text-green-600 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" /> :
                            <Pencil
                                onClick={() => {
                                    setEditTitle(image._id)
                                    setNewTitle(image.title)
                                }}
                                className="absolute right-3 cursor-pointer hover:text-white top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />}
                    </div>
                </div>
            ))}
            <AlertDialog open={alertDeletion} onOpenChange={() => setAlertDeletion(false)}>
                <AlertDialogContent className='bg-neutral-900'>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='text-white'>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className='text-red-400'>
                            This image will be permanently deleted.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel >Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeletion}>Yes</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default Bucket
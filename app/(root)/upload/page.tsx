'use client'
import FileInput from "@/components/FileInput"
import FormField from "@/components/FormField"
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants"
import { useFileInput } from "@/lib/hooks/useFileInput"
import { ChangeEvent, useState } from "react"

const Page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        visibility: 'public'
    });

    const video = useFileInput(MAX_VIDEO_SIZE)
    const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name , value } = e.target;

        setFormData((prevState) => (
            {
                ...prevState,
                [name]: value
            }
        ))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            if(!video.file || !thumbnail.file) {
                setError("Please upload a video and thumbnail");
                return;
            }

            if(!formData.title || !formData.description) {
                setError('Please fill in all fields');
                return;
            }


            // upload the video to Bunny
            // upload the thumbnail to DB
            // Attach thumbnail
            // create a new DB entry for the video details
        } catch (error) {
            console.error('Error submitting form', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="wrapper-md  upload-page">
            <h1>Upload a video</h1>
            { error && <div className="error-field">
                {error}
            </div> }
            <form       
                className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5"
            onSubmit={handleSubmit}>
                <FormField
                    id='title'
                    label='Title'
                    placeholder='Enter a clear and concise video title'
                    value={formData.title}
                    onChange={handleInputChange}
                    
                />

                <FormField
                    id='description'
                    label='Description'
                    placeholder='Enter a short description of the video'
                    as="textarea"
                    value={formData.description}
                    onChange={handleInputChange}
                    
                />
                <FileInput
                    id='video'
                    label='Video'
                    accept='video/*'
                    file={video.file}
                    previewUrl={video.previewUrl}
                    inputRef={video.inputRef}
                    onChange={video.handleFileChange}
                    onReset={video.resetFile}
                    type='video'
                />    
                <FileInput
                    id='thumbnail'
                    label='Thumbnail'
                    accept='image/*'
                    file={thumbnail.file}
                    previewUrl={thumbnail.previewUrl}
                    inputRef={thumbnail.inputRef}
                    onChange={thumbnail.handleFileChange}
                    onReset={thumbnail.resetFile}
                    type='image'
                /> 

                <FormField
                    id='visibility'
                    label='visibility'
                    as="select"
                    value={formData.visibility}
                    onChange={handleInputChange}
                    options={[
                        { label: 'Public', value: 'public' },
                        { label: 'Private', value: 'private'
                        }
                    ]}
                />

                <button type="submit" disabled={isSubmitting}
                className="submit-button">
                    {isSubmitting ? 'Uploading...' : 'Upload video'}
                </button>
            </form>
            
        </div>
    )
}

export default Page
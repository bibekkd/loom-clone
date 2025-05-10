import React from 'react'

const page = ({ params } : ParamsWithSearch) => {
    const { videoId } = params;
    
    return (
        <main className='wrapper page'>
            <div>VIDEO ID: { videoId } </div>
        </main>
    )
}

export default page
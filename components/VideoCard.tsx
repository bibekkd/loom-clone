'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const VideoCard = ({
    id,
    title,
    thumbnail,
    createdAt,
    userImg,
    username,
    views,
    visibility,
    duration
}: VideoCardProps) => {
    
    return (
        <Link href={`/video/${id}`}         className='video-card'>
            <Image 
                src={thumbnail}
                alt='Thumbnail'
                width={290}
                height={160}
                className='thumbnail'
            />
            <article>
                <div>
                    <figure>
                        <Image
                            src={userImg}
                            alt='User'
                            width={36}
                            height={36}
                            className='rounded-full aspect-square'
                        />
                        <figcaption>
                            <h3>{username}</h3>
                            <p>{visibility}</p>
                        </figcaption>
                    </figure>
                    <aside>
                        <Image
                            src={'/assets/icons/eye.svg'}
                            alt='Views'
                            width={16}
                            height={16}
                        />
                        <p>{views}</p>
                    </aside>
                </div>
                <h2>{title} - {" "} {createdAt.toLocaleDateString('en-US' ,{
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })}</h2>
            </article>
            <button onClick={() => {}} className='copy-btn'>
                <Image 
                    src={'/assets/icons/link.svg'}
                    alt='Copy'
                    width={16}
                    height={16}
                />
            </button>
            {duration && (
                <div className='duration'>
                    {Math.ceil(duration / 60)} min 
                </div>
            )}
        </Link>
    )
}

export default VideoCard
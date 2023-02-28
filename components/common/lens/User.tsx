import Image, { StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'
import { dUrl } from '../../../lib/helpers'
import LensImg from '../../../statics/img/lest-head.png'

export default function User(props) {
  const {user_name} = props



  return (
    <div className='shadow flex w-[fit-content] px-3 py-2 pr-10 rounded-[26px] cursor-pointer my-3'>
              <div className='h-[40px] w-[40px] rounded-[50%] mr-3'>
                <Image
                  src={props.imageURI ? dUrl(props.imageURI) : LensImg}
                  className='h-[40px] w-[40px] rounded-[50%]'
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
              <div>
                {/* <p className='text-[14px]'>name</p> */}
                <p className='text-[12px]'>@{user_name}</p>
                {/* <p className='text-[14px]'>KNN3 Network</p>
                <p className='text-[12px]'>@knn3_network</p> */}
              </div>
      </div>
  )
}
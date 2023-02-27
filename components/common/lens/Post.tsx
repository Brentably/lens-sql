import { useEffect, useState } from "react"
import Image from 'next/image'
import Commesdf from '../../../statics/img/card-comment.png'
import Mirror from '../../../statics/img/mirror.png'
import Like from '../../../statics/img/like.png'
import Collect from '../../../statics/img/collect.png'
import PostBg from '../../../statics/img/post-bg.png'
import User from './User'

const Post = (props:any) => {
  const {content_URI, user_name, mirror_count, comment_count, content} = props

  useEffect(() => {
    async function ue() {
      // HAS TO HANDLE `IPFS://aljksdfhadslkjhglsjgd` style URIs
      // const resp = await fetch(contentURI)
      // const data = await resp.json()
      // setContent(JSON.stringify(data))
    }
    ue()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
    <User {...props} />
    <div className='shadow p-5 rounded-[16px]'>
              <p>{content}</p>
              <Image
                src={PostBg}
                className='rounded-[16px] my-5'
                alt=""
              />
              <div className='flex items-center'>
                <Image
                  src={Commesdf}
                  className='h-[20px] w-[20px]'
                  alt=""
                />
                <span className='text-[#3C81F6] mr-5'>{comment_count}</span>
                <Image
                  src={Mirror}
                  className='h-[20px] w-[20px]'
                  alt=""
                />
                <span className='text-[#8B5DF6] mr-5'>{mirror_count}</span>
                <Image
                  src={Like}
                  className='h-[20px] w-[20px]'
                  alt=""
                />
                <span className='text-[#ED57A1] mr-5'>10</span>
                <Image
                  src={Collect}
                  className='h-[20px] w-[20px]'
                  alt=""
                />
                <span className='text-[#EF4444] mr-5'>10</span>
              </div>
      </div>
    </>
  )
}

export default Post
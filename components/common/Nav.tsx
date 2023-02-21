import { useEffect, useState } from 'react'
import Image from 'next/image'
import HeadIcon from './../../statics/img/header_icon.png'
import Btn from './Button'
import { useRouter } from "next/router";

export default function Nav() {

  const router = useRouter();

  useEffect(() => {
    console.log(router)
  }, []);

  return (
    <div className='w-full px-20 flex'>
      <div className="flex h-[140px] items-center">
        <Image
          className="mr-[40px]"
          src={HeadIcon}
          alt=""
        />
        {
          router.pathname === '/querySql' &&
          <>
            <button className="h-[46px] w-[120px] bg-[#000] hover:bg-[#181EFF] text-[#fff] flex justify-center items-center rounded-[10px] mr-[20px] cursor-pointer" onClick={() => router.push('/home')}>Home</button>
            <button className="h-[46px] w-[120px] bg-[#000] hover:bg-[#181EFF] text-[#fff] flex justify-center items-center rounded-[10px] cursor-pointer">Query</button>
          </>
        }
      </div>
      <div className="ml-[auto] flex h-[100px] items-center">
        <Btn text={'Connect Wallet'} />
      </div>
    </div>
  )
}

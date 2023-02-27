import { useEffect, useState } from 'react'
import Nav from '../components/common/Nav'
import Btn from '../components/common/Button'
import Link from 'next/link'
import Image from 'next/image'
import OpenImg from './../statics/img/opening.png'
import OpenImgGif from './../statics/img/opening_gif.gif'

export default function Home() {

  const [showGif, setShowGif] = useState<any>(false)

  return (
    <div className='w-full h-full bg-[#fff] font-[Arial]'>
      <Nav />
      <div className='w-full h-[calc(100vh-300px)] relative'>
        <div className='px-20 text-[60px] mt-[100px]'>
          <p>Unleash the</p>
          <p>Intuitive Power of </p>
          <p>Web3 Data Query with LLM</p>
          <p className='text-[26px]'>Powered by KNN3 and OpenAI</p>
          <div className='flex mt-10'>
            <div className='mr-[100px]'>
              <Link href='/querySql'><Btn text={'Try it now'} theme={'block'} /></Link>
            </div>
          </div>
        </div>
        <div className='absolute bottom-[-40px] right-[0px] w-[500px]'>
          {!showGif && (
            <Image
              src={OpenImg}
              alt=""
              onMouseEnter={() => setShowGif(true)}
            />
          )}
          {showGif && (
            <Image
              onMouseLeave={() => setShowGif(false)}
              src={OpenImgGif}
              alt=""
            />
          )}
        </div>
      </div>
      <div className='h-[60px] w-full bg-[#000]'></div>
    </div>
  )
}
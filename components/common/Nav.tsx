import { useEffect, useState } from 'react'
import Image from 'next/image'
import HeadIcon from './../../statics/img/header_icon.png'
import Btn from './Button'
import { useRouter } from "next/router";
import { useAppState, useConnectWallet } from '@web3-onboard/react'

export default function Nav() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const router = useRouter();

  useEffect(() => {
    console.log(router)
  }, [router]);

  return (
    <div className='w-full h-[140px] px-6 flex items-center'>
      <div className='h-[100px] w-full flex px-6 shadow rounded-[20px]'>
        <div className="flex items-center">
          <div className='flex items-center w-full'>
            <Image
              className="mr-[40px]"
              src={HeadIcon}
              alt=""
            />
            {
              router.pathname === '/querySql' &&
              <>
                <div className='mr-4'><Btn text={'Home'} theme={'block'} onClick={() => router.push('/home')} /></div>

                <Btn text={'Query'} />
              </>
            }
          </div>
        </div>
        <div className="ml-[auto] flex items-center">
          <Btn text={connecting ? 'Connecting' : wallet ? 'Disconnect' : 'Connect Wallet'} onClick={() => (wallet ? disconnect(wallet) : connect())} />
        </div>
      </div>
    </div>
  )
}

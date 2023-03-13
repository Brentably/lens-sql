import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { Popover } from 'antd';
import Image from 'next/image'
import userImg from '../statics/img/user.svg'
import { useAppState, useConnectWallet } from '@web3-onboard/react'
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

const PopContent = (addr:string) => {

    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

    return (
        <div>
            <div className="pt-4 px-3 border-b-[2px] border-solid border-[#D9D9D9]">
                <div className="font-[600]">Logged in as</div>
                <div className="font-[700]">@{addr.slice(0, 3)}...{addr.slice(-3)}</div>
            </div>

            <div className="py-2 px-3 flex items-center justify-center">
                <div className="button-logout-shadow w-[100px] px-2 py-1 font-[600] hover:bg-[#041946] hover:text-[#fff] cursor-pointer rounded-[4px]"  onClick={() => (wallet ? disconnect(wallet) : connect())}>{wallet ? 'Logout' : 'Connect'}</div>
            </div>
        </div>
    );
}

export default function UserInfo() {

    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  
    const [address, setAddress] = useState<string>('')

    useEffect(() => {
      setAddress(wallet?.accounts[0].address || "")
    }, [wallet])

    return (
        <>
            <Popover placement="topRight" content={PopContent(address)} trigger="click">
                <div className="h-[50px] w-[50px] bg-[#fff] answer-shadow p-1 rounded-[10px] cursor-pointer flex items-center justify-center hover:opacity-70">
                    {/* <Image alt="" src={userImg} className='' /> */}
                    <Jazzicon diameter={40} seed={jsNumberForAddress(address)} />
                </div>
            </Popover>
        </>
    );
}

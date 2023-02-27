import { useEffect, useState } from 'react'
import Image from 'next/image'
import Up from './../../statics/img/up.svg'
import Down from './../../statics/img/down.svg'
import SQL from './../../statics/img/SQL.svg'

export default function FileCard(props: any) {



    return (

    <div className={`flex items-center px-4 mt-4 py-4 text-[#fff] hover:bg-[#181EFF] rounded-[16px] cursor-pointer text-[16px]`}>
        <Image
            className="mr-[10px]"
            src={SQL}
            alt="" 
        />
        <span>{props.prompt}</span>
    </div>

    )
}
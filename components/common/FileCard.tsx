import { useEffect, useState } from 'react'
import Image from 'next/image'
import Up from './../../statics/img/up.svg'
import Down from './../../statics/img/down.svg'
import SQL from './../../statics/img/SQL.svg'

export default function FileCard(props: any) {
    const [{promptText, isSqlLoading, isResultLoading, results}, setState] = props.store
    const {file} = props

    let disable = false
    if(props.prompt == "connect wallet to see files") disable = true

    return (

    <div className={`flex items-center px-4 mt-4 py-4 text-[#797979]  bg-[#F4F4F4] shadow rounded-[16px] ${!disable && 'cursor-pointer hover:text-[#fff] hover:bg-[#181EFF]'} text-[16px]`}
    onClick={!disable ? () => setState(pS => ({...pS, SQL: file.sql, promptText: file.prompt })) : () => ""}>
        <Image
            className="mr-[10px]"
            src={SQL}
            alt="" 
        />
        <span>{props.prompt}</span>
    </div>

    )
}
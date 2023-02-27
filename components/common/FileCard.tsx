import { useEffect, useState } from 'react'
import Image from 'next/image'
import Up from './../../statics/img/up.svg'
import Down from './../../statics/img/down.svg'
import SQL from './../../statics/img/SQL.svg'

export default function FileCard(props: any) {
    const [{promptText, isSqlLoading, isResultLoading, results}, setState] = props.store
    const {file} = props

    return (

    <div className={`flex items-center px-4 mt-4 py-4 text-[#797979] hover:text-[#fff] hover:bg-[#181EFF] bg-[#F4F4F4] shadow rounded-[16px] cursor-pointer text-[16px]`}
    onClick={() => setState(pS => ({...pS, SQL: file.sql, promptText: file.prompt }))}>
        <Image
            className="mr-[10px]"
            src={SQL}
            alt="" 
        />
        <span>{props.prompt}</span>
    </div>

    )
}
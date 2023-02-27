import { useEffect, useState } from 'react'
import Image from 'next/image'
import Up from './../../statics/img/up.svg'
import Down from './../../statics/img/down.svg'
import Upwi from './../../statics/img/up-wi.svg'
import Downwi from './../../statics/img/down-wi.svg'
import SQL from './../../statics/img/SQL.svg'
import SQLwi from './../../statics/img/SQL-wi.png'

export default function TreeNode(props: any) {

    const [open, setOpen] = useState<any>(false)

    const levelClick = (items) => {
        setOpen(!open)
        if (items.level === 1) {
            props.onchange(items)
        }
    }

    return (
        <div>
            {
                props.data.level === 1 &&
                <div
                    className={`flex items-center px-4 mt-4 py-4 hover:bg-[#181EFF] hover:text-[#fff] shadow rounded-[16px] cursor-pointer text-[16px] ${props.defaultSelectId === props.data.id ? 'bg-[#181EFF] text-[#fff]' : 'bg-[#F4F4F4] text-[#797979]'}`}
                    onClick={() => levelClick(props.data)}
                >
                    {
                        props.defaultSelectId === props.data.id ? (
                            <Image
                                className="mr-[10px]"
                                src={SQLwi}
                                alt=""
                            />
                        ) : (
                            <Image
                                className="mr-[10px]"
                                src={SQL}
                                alt=""
                            />
                        )
                    }

                    <span>{props.data.title}</span>
                    {
                        props.data.children.length > 0 &&
                        <span className='ml-[auto]'>
                            {
                                open ? (
                                    props.defaultSelectId === props.data.id ? (
                                        <Image
                                            className="mr-[40px]"
                                            src={Upwi}
                                            alt=""
                                        />
                                    ) : (
                                        <Image
                                            className="mr-[40px]"
                                            src={Up}
                                            alt=""
                                        />
                                    )
                                ) : (
                                    props.defaultSelectId === props.data.id ? (
                                        <Image
                                            className="mr-[40px]"
                                            src={Downwi}
                                            alt=""
                                        />
                                    ) : (
                                        <Image
                                            className="mr-[40px]"
                                            src={Down}
                                            alt=""
                                        />
                                    )
                                )
                            }
                        </span>
                    }
                </div>
            }
            {
                props.data.level === 2 &&
                <div
                    className={`flex items-center px-4 mt-4 py-4 text-[#797979] hover:text-[#fff] hover:bg-[#181EFF] bg-[#F4F4F4] shadow rounded-[16px] cursor-pointer text-[14px]`}
                    onClick={() => levelClick(props.data)}
                >
                    <span>{props.data.title}</span>
                    <span className='ml-[auto]'>
                        {
                            open ? (
                                <Image
                                    className="mr-[40px]"
                                    src={Up}
                                    alt=""
                                />
                            ) : (
                                <Image
                                    className="mr-[40px]"
                                    src={Down}
                                    alt=""
                                />
                            )
                        }
                    </span>
                </div>
            }
            {
                props.data.level === 3 &&
                <div
                    className="flex items-center px-4 mt-4 py-2 text-[#9A9A9A] cursor-pointer text-[12px]"
                    onClick={() => setOpen(!open)}
                >
                    <span>{props.data.title}</span>
                </div>
            }
            {props.data.children && props.data.children.length > 0 && open && (
                <div className="ml-[20px]">
                    {props.data.children.map((item: any, i: number) => {
                        return <TreeNode data={item} key={i} />;
                    })}
                </div>
            )}
        </div>
    )
}
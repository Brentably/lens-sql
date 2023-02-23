import { MouseEventHandler } from "react";

export default function Btn(props:{text: string, theme?: string, onClick: MouseEventHandler<HTMLDivElement>}) {

  return (
    <div className={`relative h-[46px] w-[140px] border-[2px] ${props.theme && props.theme === 'block' ? 'border-[#000]' : 'border-[#181EFF]'} rounded-[10px]`} onClick={props.onClick}>
      <div className={`transBtn h-[46px] w-[160px] absolute left-[-12px] top-[-8px] ${props.theme && props.theme === 'block' ? 'bg-[#000]' : 'bg-[#181EFF]'} text-[14px] flex justify-center items-center rounded-[10px] text-[#fff] cursor-pointer`}>{props.text}</div>
    </div>
  )
}

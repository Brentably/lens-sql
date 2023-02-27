import { MouseEventHandler } from "react";

export default function Btn(props: { text: string, theme?: string, onClick?: MouseEventHandler<HTMLDivElement> }) {

  return (
    <>

      {
        props.theme === 'block' ?
          (
            <div className={`h-[46px] w-[160px] bg-[#F4F4F4] shadow hover:opacity-80 text-[14px] flex justify-center items-center rounded-[10px] text-[#000] cursor-pointer`} onClick={props.onClick}>
              {props.text}
            </div>
          ) : (
            <div className={`h-[46px] w-[160px] bg-[#181EFF] hover:opacity-90 text-[14px] flex justify-center items-center rounded-[10px] text-[#fff] cursor-pointer`} onClick={props.onClick}>
              {props.text}
            </div>
          )
      }
    </>
  )
}

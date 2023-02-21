import Image from 'next/image'
import Enter from './../../statics/img/Enter.svg'

const examples = ['Description 1', 'Description 1', 'Description 1', 'Description 1']

export default function DatabasePage1(props) {

  return (
    <div>
      <div className='h-[200px] border-[2px] border-[#000] rounded-[10px]'>
        <textarea className='w-full h-[120px] border-none rounded-[10px]' placeholder='Please describe the data you want'></textarea>
        <Image
          className="transDatabaseBtn ml-[auto] cursor-pointer mr-[20px]"
          src={Enter}
          alt=""
        />
      </div>
      <div className="my-5 text-[20px] font-[700]">Description examples</div>
      {
        examples.map((t: any, i: number) => (
          <div className="border-[2px] border-[#000] rounded-[10px] px-5 py-5 mb-5 cursor-pointer" onClick={() => props.onchange(t)}>{t}</div>
        ))
      }
    </div>
  )
}

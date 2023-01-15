// generate a react component
import type {state, store} from '../pages/index'

const QueryCard = (props:{text:string, store:store}) => { 
  const { text, store: [state, setState] } = props


  return (
    <div className="flex justify-center">
      <div className='bg-slate-300 cursor-pointer p-2 m-1 rounded-md w-96' onClick={() => setState(p => ({...p, prompt: text}))}>
        {text}
      </div>
    </div>
  )
}

export default QueryCard
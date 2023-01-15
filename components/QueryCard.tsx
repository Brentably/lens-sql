// generate a react component

const QueryCard = (props:{query:string}) => { 
  const { query } = props
  return (
    <div className="flex justify-center">
      <div className='bg-slate-300 cursor-pointer p-2 m-1 rounded-md w-96'>
        {query}
      </div>
    </div>
  )
}

export default QueryCard
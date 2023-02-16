
const Table = ({data}:{data: any[]}) => {
const keys = Object.keys(data[0])


  return (
    <div className="text-center">
      {/* {JSON.stringify(data)} */}
      <table className="mx-auto p-2 rounded-xl bg-white">
        <thead>
          <tr>
            {keys.map((key, i) => 
              <th key={i} className="border border-slate-400 p-3">{key}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => 
          <tr key={i}>
            {keys.map((key, i) => 
              <td key={i} className="border border-slate-400 p-3">{row[key]}</td>
            )}
          </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
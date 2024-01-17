export default function Dashboard(props){
    return (
      <div className="flex justify-evenly h-1/4 items-center w-screen mx-0 text-center text-[rgb(229,49,85)]">
        <button className="p-5 bg-linear-br from-[#fcfcfd] to-[#fffaec] border-[2px] border-[rgb(241,84,116)] rounded-xl font-bold" onClick={()=>props.setCategory("Teaching")}>Teaching</button>
        <button className="p-5 bg-linear-br from-[#fcfcfd] to-[#fffaec] border-[2px] border-[rgb(241,84,116)] rounded-xl font-bold" onClick={()=>props.setCategory("Industry")}>Industry</button>
        <button className="p-5 bg-linear-br from-[#fcfcfd] to-[#fffaec] border-[2px] border-[rgb(241,84,116)] rounded-xl font-bold" onClick={()=>props.setCategory("Research")}>Research</button>
      </div>
    )
  }
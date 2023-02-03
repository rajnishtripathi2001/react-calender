import React, { useState } from "react";
import moment from "moment";

export default function Calender() {
  const [selectedDate,setSelctedDate] = useState(moment())
  const [showYearInput,setShowYearInput] =useState(false)
  const daysInMonth=()=> selectedDate.daysInMonth();
  const seletedCurrentDate =()=> selectedDate.get("date")
  const gapsToBeLeft =()=>moment(selectedDate).startOf("month").format("d")
  let cellNumber =1;
  let totalCells = []
  let oneRow = []
  let completeTable = []

  //To Make gaps before the start date
  for(let index =0; index< gapsToBeLeft(); index++){
    const id ="cell"+cellNumber
    totalCells.push(<td className="table-cell-container">{}</td>)
    cellNumber++
  }
  

  for(let index = 1; index<=daysInMonth();index++){
    const id = "cell" + cellNumber
    totalCells.push(
    <td id={id} key={cellNumber} className={index===seletedCurrentDate()?"table-selected-cell-container":"table-cell-container"}>
      {index}
    </td>
    )
    cellNumber++
  }

  totalCells.forEach((cell,index)=>{
    if(index % 7 !==0){
      oneRow.push(cell)
    }
    else{
      let currRow=oneRow.slice()
      completeTable.push(<tr className="table-row-container">{currRow}</tr>)
      oneRow = []
      oneRow.push(cell)
    }
    //To add last row 
    if (index === totalCells.length - 1){
      let currRow = oneRow.slice()
      completeTable.push(<tr className="table-row-container">{currRow}</tr>)
    }
  })

  const setYear = year =>{
    let newYear = moment({}).set('year',year)
    setSelctedDate(newYear)
  }

  const setMonth = month =>{
    let newMonth = moment({}).set("month",month)
    setSelctedDate(newMonth)
  }

  const renderYear=()=>{
    if(showYearInput){
      return(
        <input 
        id="year-text-box" 
        onChange={(event)=>{
          setYear(event.target.value)
        }} 
        value={selectedDate.get("year")}
        className="year-input-box"
        ></input>
      )
    }
    return <span id="year" onClick={()=>{setShowYearInput(true)}} >{selectedDate.format("Y")}</span>
  }

  return (
      <div id="calender-container">
        <div className="calender-header-container">
          <h1 id="heading">Calender</h1>
        </div>
        <div className="calender-month-year-container">
          <select 
          id="month" 
          onChange={(event)=>{
            setMonth(moment.months().indexOf(event.target.value))
          }}
          value={selectedDate.format("MMMM")}
          >
            {moment.months().map((data) => (
              <option id={data} key={data}>
                {data}
              </option>
            ))}
          </select>
          {renderYear()}
        </div>
        
        <div>
          <table className="table-container">
            <thead >
              <th className="table-header-container">
                {
                  moment.weekdaysShort().map(day => {
                    cellNumber++
                    const id = "day-" + cellNumber
                    return (
                    <td id={id} key={cellNumber} className="table-cell-container">
                      {day}
                    </td>
                    )
                  })
                }
              </th>
            </thead>
            <tbody className="table-body-container">
                {completeTable}
            </tbody>
          </table>
          <div className="btns">
            <div className="btns-Shell">
                <button
                onClick={()=>{
                  setYear(Number(selectedDate.format("Y")) - 1)
                }}
                >{"<<"}</button>

                <button
                onClick={()=>{
                  setMonth(Number(selectedDate.format("M"))-2)
                }}
                >{"<"}</button>
            </div>
            <div className="btns-Shell">
              <button
              onClick={()=>{
                setMonth(Number(selectedDate.format("M")) )
              }}
              >{">"}</button>

              <button 
              onClick={()=>{
                setYear(Number(selectedDate.format("Y")) + 1)
              }}
              >{">>"}</button>
            </div>
          </div>
        </div>
      </div>
  );
}

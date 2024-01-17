import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './Table.css'
import { FaDownload } from "react-icons/fa";

const Table = (props) => {
  const data = props.data;
  console.log(data);

  return (
    <div>
      <table className="styled-table" id="table-to-xls" border={1}>
        <thead>
          <tr>
            <th>Name of Centre</th>
            <th>Topic/Area</th>
            <th>Month of Registration</th>
            <th>Service</th>
            <th>Name of guide</th>
            <th>Status of work</th>
          </tr>
        </thead>
        <tbody id="tb">
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Nameofresearch}</td>
              <td>{item.Topic}</td>
              <td>{item.date}</td>
              <td>{item.service}</td>
              <td>{item.Nameofguide}</td>
              <td>{item.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className='exceldiv'><ReactHTMLTableToExcel
                id="export-excel"
                className="button-71"
                table="table-to-xls"
                filename="table"
                sheet="tabledata"
                buttonText="Export to Excel"
                
            /><div className='Downloadicon'><FaDownload /></div></div>
    </div>
  );
}

export default Table;

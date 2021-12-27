import React,{useState} from 'react'
import axios from 'axios'

import jsPDF from 'jspdf';
import 'jspdf-autotable'


function App() {

  // data state
  const [data, setData]=useState([]);

  // click on fetch api button
  const fetchApi=()=>{
    axios.get('https://jsonplaceholder.typicode.com/todos').then((response)=>{
      const data = response.data;
      setData(data);
    })
  }

  // download data in pdf format
  const downloadData=()=>{

    const pdf = new jsPDF();
    pdf.autoTable({html:'#table'})
    pdf.save('Todos.pdf');

  }

  return (

    <div className='container'>

      <br></br>
      <h3>Simplest way to export HTML Table to PDF in React</h3>
      
      <button onClick={fetchApi} className='btn btn-success btn-md'>
        FETCH API
      </button>

      {data.length > 0&&(

        <div className='table-responsive' style={{marginTop:30+'px'}}>

           <div className='download-data-div'>
              <button className='btn btn-primary btn-md'
                      onClick={downloadData}>
                DOWNLOAD DATA
              </button>
           </div>

           <h3>TODO LIST</h3>
           
           <table className='table table-borderless' id='table'>

             <thead>
               <tr>
                 <th scope='col'>
                   ID
                 </th>
                 <th scope='col'>
                   TITLE
                 </th>
                 <th scope='col'>
                   STATUS
                 </th>
               </tr>
             </thead>

             {data.map((individualData)=>(
               <tbody key={individualData.id}>
                 <tr>
                   <td>{individualData.id}</td>
                   <td>{individualData.title}</td>
                   <td>{String(individualData.completed)}</td>
                 </tr>
               </tbody>
             ))}

           </table>

        </div>

      )}

    </div>

  );

}

export default App;

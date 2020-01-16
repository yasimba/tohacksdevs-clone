import React, { useEffect, useState } from 'react';
import '../styles/registration.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { CSVLink, CSVDownload } from "react-csv";
import Paper from '@material-ui/core/Paper';

const { Parser } = require('json2csv');
 

export default function AdminApplications() {
  const[applicants, setApplicants]=useState({})
  const[fetched,setFetched]=useState(false)
  const[filteredUsers,setFilteredUsers] = useState([])
  const[isFilter, setFilter] = useState(false)
  const[csv,setCSV] = useState('')
  const[divSelected, setDivSelected]=useState([])
  const[isCopied, setIsCopied]=useState(false)
  const[filterOption, setFilterOption] = useState('')  
  const[filterValue, setFilterValue]=useState('')
  const[isError, setError] = useState(false)
  const[csvFilter, setCSVFilter]=useState('')

  const fields = [ 'first_name','last_name', 
  'birth_date','email','phone_number','gender'
  ,'race','school','current_level','graduation_year',
  'major','shirt_size','first_hackathon',
  'coding_languages','skills','web_link','linkedin_link',
  'resume_url','hope_to_gain'
  ,'prev_proj','potential_proj',
  'questions','liked_fb_page'];

  useEffect(() => {
    getApplications();  
    generateCSV(applicants, csv)
  }, []);

  /**[START] FILTER FUNCTIONS */

  const filterValues= (filter) =>{     
    console.log(applicants)                             
    filter.split(" ").join('')   
    switch (filter) {
      case "first_name":              
        filterUsersByFirstName(filterOption)
        break;
    
      default:

        break;
    }
    
  }

  const filterUsersByFirstName = (f_name) => {       
    let toFilter = applicants     
    toFilter = toFilter.filter((applicant)=>{
      return applicant.first_name.includes(f_name)
    })
    console.log(toFilter)
    setFilteredUsers(toFilter)
    generateCSV(toFilter, csvFilter)
    setFilter(true)
  }

  const filterUsersByLastName = (l_name) => {       
    let toFilter = filteredUsers       
    toFilter = toFilter.filter((applicant)=>{
      return applicant.last_name.includes(l_name)
    })
    console.log(toFilter)
    setFilteredUsers(toFilter)
    setFilter(true)
  }

  const filterUsersById = (id) => {       
    let toFilter = applicants       
    toFilter = toFilter.filter((applicant)=>{
      return applicant.id != id
    })    
    setApplicants(toFilter)
    setFilteredUsers(toFilter)    
    setFilter(true)
  }


  const filterUsersByGender = (gender) => {       
    let toFilter = filteredUsers       
    toFilter = toFilter.filter((applicant)=>{
      return applicant.gender.includes(gender)
    })
    console.log(toFilter)
    setFilteredUsers(toFilter)
    setFilter(true)
  }



  const resetFilters = () => {
    setFilter(false)
    setFilteredUsers(applicants)
    setFilterOption('')
    setFilterValue('')
  }
  /**[END] FILTER FUNCTIONS */

  //https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  const generateAuthCode = () => {
    let length = 5;
    var result = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
  }



  const generateCSV = (data, csvOpt) => {
    const json2csvParser = new Parser({fields});
    const csv = json2csvParser.parse(data);
    console.log(csv);    
    switch (csvOpt) {
      case 'csv':
        setCSV(csv)
        break;
        case 'csvFilter':
            setCSVFilter(csv)
            break;
      default:
        setCSV(csv)
        break;
    }
  }

  const getApplications = async () => {
    await fetch
    (` ${process.env.REACT_APP_API_URL}/applicants`)
    .then(response => response.json())
    .then((data) => {   
      console.log(data)    
        if(data.status == 200){              
          setApplicants(data.payload)   
          setFilteredUsers(data.payload)              
          setFetched(true)    
        } 
        else{
          setError(true)    
        }
            
    }).catch(err => {
        console.log(err)
                         
    })  
  }

   
  const isSelected = (key) => {
    console.log(key)
    let toRender = applicants       
    toRender = toRender.filter((applicant)=>{
     // console.log(applicant)
      return applicant.id == key
    })
   // console.log(toRender)
    setDivSelected(toRender)
  }  

  const accept = async (id, email, reg_id) => {
    let authCode = generateAuthCode()
    await fetch
    (` ${process.env.REACT_APP_API_URL}/action`,{
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        hackathon_registration_id: reg_id,
        action: "accept",
        email: email,
        auth_code: authCode
    })
  }).then(response => response.json())
  .then(data => {
    if(data.status == 200){      
      filterUsersById(id)      
    }else{
      alert(data.payload)
    }
  }).catch(error => alert(error))
  }


  const reject = (id) => {
    let action = ""
    let hackathon_name = ""
    alert("Not implemented yet!")
  }
  
  const shortList = (id) => {
    alert("Not implemented yet!")
  }

  if(isError){
    console.log(isError)
    return(
      <h1>Error. Incident is being investigaed</h1>
    )
  }

  if(!fetched){    
    return(
      <h1>Loading</h1>
    )
  }
  
  
  return (
    <div>
        <div class="row">        
            <br/>
                <select
                className="input"
                value={filterValue}
                onChange={e => setFilterValue(e.target.value)}>
                  <option value="">Select Filter</option>
                  <option value="first_name">First Name</option>
                  <option value="School">School</option>        
                </select>                
                {
                  filterValue.length > 0 ?  
                  <div class="row">
                      <input type="text" onChange={e => setFilterOption(e.target.value)} value={filterOption}></input> 
                      <button className="btn" onClick={() => filterValues(filterValue)}>Filter</button>                          
                  <button className="btn" onClick={() => resetFilters()}>Clear Filters</button>                       
                  <CSVLink className="btn" data={csvFilter}>Download CSV</CSVLink>
                  </div>
                  : null
                }
            
      </div>          
    <div class="row"> 
      <div class="column-1">
        {
          console.log(applicants.length)
        }
      {
        !isFilter && applicants?        
        applicants.length > 0 ? 
        applicants.map((applicant, key)=>{      
          return(
            <div key = {key} onClick={()=>isSelected(applicant.id)} className ={divSelected.includes(applicant) ? "div-selected" : "clickable-div"}>
            <p>Name: {applicant.first_name} {applicant.last_name}</p>            
            <p>Email: {applicant.email}</p>    
            <hr/>        
            </div>
          )
        }) :
        <h1>No data</h1>
        :
        filteredUsers ?
        filteredUsers.length > 0 ? 
        filteredUsers.map((user, key)=> {
          //console.log(user)
          return (
            <div key = {key} onClick={()=>isSelected(user.id)} className ="clickable-div" className ={divSelected.includes(user) ? "div-selected" : "clickable-div"}>
            <p>Name: {user.first_name} {user.last_name}</p>            
            <p>Email: {user.email}</p>
            <div className = "row">            
            </div>                        
            <hr/>
            </div> 
          )
        })
         :
         <h1>No data</h1>
         :        
          <h1>No data available</h1>        

      }                   
      <p>{      
      csv.length > 0 ?    
      <div>         
       <CSVLink className="btn" data={csv}>Download CSV Report</CSVLink>;
       </div>          
       : null
       }
       {
         isCopied ? alert("CSV Copied!") : null
       }
       </p>       
      </div> 
      <hr style={{width: '1px',  display: 'inline-block'}}></hr>      
      <div class="column-2">
        
      {
        divSelected.length > 0 ? 
        divSelected.map((applicant, key)=>{          
          return(            
            <div key = {key}>              
            <p>Frist Name: {applicant.first_name}</p>                        
            <p>Last Name: {applicant.last_name}</p>                        
            <p>School: {applicant.school}</p>                        
            <p>LinkedIn: {applicant.linkedin_link}</p>                        
            <p>First Hackathon: {applicant.first_hackathon}</p>                        
            <p>Resume: {applicant.resume_url}</p>                        
            <p>Potential Project: {applicant.potential_proj}</p>                        
            <p>Major at school: {applicant.major}</p>                        
                            
            <div className = "row">
                <button className="btn" onClick={() => accept(applicant.id,applicant.email, applicant.reg_id)}>accept</button>
                <button className="btn" onClick={() => reject(applicant.id)}>Reject</button>
                <button className="btn" onClick={() => shortList(applicant.id)}>Shortlist</button>
            </div>                        
            </div>
          )
        })
        :
        null
      }      
      </div>             
    </div>
    </div>
  );
}
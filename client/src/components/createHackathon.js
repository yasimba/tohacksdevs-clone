import React, {useState} from 'react';
export default function CreateHackathon(){

    const[hackathon_name, setHackathonName]=useState('')
    const[hackathon_date, setHackathonDate]=useState('')
    const[hackathon_location, setHackathonLocation]=useState('')
    const[hackathon_desc, setHackathonDescription]=useState('')
    const[reg_id, setHackathonRegId]=useState('')

    const addHackathon = async () => {
        if(hackathon_date == "" | reg_id == "" | hackathon_name == "" | hackathon_location == "" | hackathon_desc == ""){
            alert("No field must be left empty!!")
            return 
        }
        await fetch
            (` ${process.env.REACT_APP_API_URL}/hackathon/create`,{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({                
                name: hackathon_name,
                descrption: hackathon_desc,
                location: hackathon_location,
                registration_id: reg_id,
                hackathon_date: hackathon_date
            })
        }).then(data => {
            if(data.status == 200){      
              alert("Success") 
              window.location.reload()
            }else{
              alert(data.payload)
              console.log(data.payload)
            }
          }).catch(err => {
            alert("Error occurred. Please try again later")
            console.log(err)
        })
    }

    return(
        <div> Create Hackathon(TODO)
                <input className = "input"
                placeholder='Name'
                type="text"
                value={hackathon_name}       
                onChange={e => setHackathonName(e.target.value)}        
                ></input>

                <input className = "input"
                placeholder='Location'
                type="text"
                value={hackathon_location}       
                onChange={e => setHackathonLocation(e.target.value)}        
                ></input>


                <input className = "input"
                placeholder='Descritpion'
                type="text"
                value={hackathon_desc}       
                onChange={e => setHackathonDescription(e.target.value)}        
                ></input>

                <input className = "input"
                placeholder='Registration Id'
                type="text"
                value={reg_id}       
                onChange={e => setHackathonRegId(e.target.value)}        
                ></input>

                Date: <input className = "input"
                placeholder='Date'
                type="date" 
                value={hackathon_date}       
                onChange={e => setHackathonDate(e.target.value)}        
                required
                ></input>

                <button onClick={()=>addHackathon()}>Create</button>
        </div>
    )
}


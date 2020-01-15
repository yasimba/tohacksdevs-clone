import React, {useState} from 'react';
import '../styles/registration.css';
import {  storageRef } from '../../firebaseConfig'

export default function Registration() {
  const[firstName, setFirstName]=useState('')      
  const[lastName, setLastName]=useState('')
  const[birthDate, setBirthDate]=useState('')
  const[email, setEmail]=useState('')
  const[phoneNumber, setPhoneNumber]=useState('')
  const[gender, setGender]=useState('')
  const[race, setRace]=useState('')
  const[school, setSchool]=useState('')
  const[currentLevel, setCurrentLevel]=useState('')
  const[graduationYear, setGraduationYear]=useState('')
  const[major, setMajor]=useState('')
  const[shirtSize, setShirtSize]=useState('')
  const[firstHackathon, setFirstHackathon]=useState('')
  const[codingLanguages, setCodingLanguages]=useState('')
  const[skills, setSkills]=useState('')
  const[webLink, setWebLink]=useState('')
  const[linkedInLink, setLinkedInLink]=useState('')
  const[resumeUrl, setResumeURL]=useState('')
  const[hopeToGain, setHopeToGain]=useState('')
  const[prevProj, setPrevProj]=useState('')
  const[potentialProj, setPotentialProj]=useState('')
  const[questions, setQuestions]=useState('')
  const[likedFbPage, setLikedFbPage]=useState('')
  const[file, setFile]=useState('')

  const register = async (
    firstName,lastName, birthDate,email,phoneNumber,gender
    ,race,school,currentLevel,graduationYear,major,shirtSize,firstHackathon,
    codingLanguages,skills,webLink,linkedInLink,resumeUrl,hopeToGain
    ,prevProj,potentialProj,questions,likedFbPage
  ) => {

if(
        firstName ==  "" |
        lastName ==  "" | 
        birthDate ==  "" |
        email ==  "" |
        phoneNumber ==  "" |
        gender ==  "" |
        race ==  "" |
        school ==  "" |
        currentLevel ==  "" |
        graduationYear ==  "" |
        major ==  "" |shirtSize ==  "" |
        firstHackathon ==  "" |
        codingLanguages ==  "" |skills ==  "" |
        webLink ==  "" |linkedInLink ==  "" |
        resumeUrl ==  "" |
        hopeToGain
         ==  "" |prevProj ==  "" |
         potentialProj ==  "" |questions ==  "" |
         likedFbPage == ""){
             alert("Cannot leave any fields empty")
             return
     }
    await fetch
    (`${process.env.REACT_APP_API_URL}/register`,{
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name  : firstName,
        last_name  : lastName,
        birth_date  : birthDate,
        email  : email,
        phone_number : phoneNumber,
        gender  : gender,
        race  : race,
        school : school,
        current_level  : currentLevel,
        graduation_year  : graduationYear,
        major  : major,
        shirt_size  : shirtSize,
        first_hackathon  : firstHackathon,
        coding_languages : codingLanguages,
        skills : skills,
        web_link  : webLink,
        linkedin_link  : linkedInLink,
        resume_url  : resumeUrl,
        hope_to_gain : hopeToGain,
        prev_proj : prevProj,
        potential_proj  : potentialProj,
        questions  : questions,
        liked_fb_page  : likedFbPage,      
    })
  })
    .then(response => response.json())
    .then((data) => {                        
        if(data.status == 200){
          console.log(data)
          alert("Applied successfully")   
          window.location.reload() 
        } else{
          console.log(data)
          alert("Error occurred when applying. Please try again later or contact us for more info")
        }            
    }).catch(err => {
        console.log(err)
        alert("Error occurred. Please try again later")
    })  
  }

  const onChangeHandler = e => {
    setFile(e.target.files[0])    
    
    //uploadResume()             
}


  const uploadResume = () => {
    const ref = storageRef.ref().child(`resumes/${file.name}`);    
      ref.put(file).then(function(snapshot) {
        snapshot.ref.getDownloadURL().then(function(downloadURL) {
          setResumeURL(downloadURL)
///          alert("Uploded successfully")
          console.log("File available at", downloadURL);                
      }).catch(error => {
        console.log(error);
      }) 
    }).catch(err=>{
      console.log(err)
      alert("Error occurred when uploading Resume. Please try again later!")
    });
  }

  
  return (
<div>
   <div className="column-1">
     <input className = "input"
         placeholder='First Name'
        type="text"
        value={firstName}       
        onChange={e => setFirstName(e.target.value)}        
        required
        ></input>

<input className = "input"
         placeholder='Last Name'
        type="text"
        value={lastName}       
        onChange={e => setLastName(e.target.value)}        
        required
        ></input>
        

       Select Date of Birth: <input className = "input"
         placeholder='Birth Date'
         type="date" 
        value={birthDate}       
        onChange={e => setBirthDate(e.target.value)}        
        required
        ></input>

<select className="input" value={firstHackathon} onChange={e => setFirstHackathon(e.target.value)}>
  <option value="">First hackathon?</option>
  <option value="Y">Y</option>
  <option value="N">N</option>   
</select>

<input className = "input"
         placeholder='Email'
        type="email"
        value={email}       
        onChange={e => setEmail(e.target.value)}        
        required
        ></input>

<input className = "input"
         placeholder='Phone Number'
        type="text"
        value={phoneNumber}       
        onChange={e => setPhoneNumber(e.target.value)}        
        required
        ></input>

 <select className="input" value={gender} onChange={e => setGender(e.target.value)}>
  <option value="">Select Gender</option>
  <option value="M">Male</option>
  <option value="F">Female</option>
</select>
  

<input className = "input"
         placeholder='Current Level'
        type="text"
        value={currentLevel}       
        onChange={e => setCurrentLevel(e.target.value)}        
        required
        ></input>

 <select onChange={e => setRace(e.target.value)} value={race} >  
<option value="">Select Race</option>
  <option value="Black">Black</option>
  <option value="White">White</option>
  <option value="Asian">Asian</option>  
</select>

<select onChange={e => setGraduationYear(e.target.value)} value={graduationYear} >  
<option value="">Graduation Year</option>
  <option value="2020">2020</option>
  <option value="2021">2021</option>
  <option value="2022">2022</option>
  <option value="2023">2023</option>
  <option value="2024">2024</option>
  <option value="2025">2025</option>
  <option value="2026">2026</option>
  <option value="2027">2027</option>
  <option value="2028">2028</option>
</select>


 <select value={school} onChange={e => setSchool(e.target.value)}>
 <option value="">Select school</option>
  <option value="York U">York U</option>
  <option value="UofT">UofT</option>  
</select>


<input className = "input"
         placeholder='Major'
        type="text"
        value={major}       
        onChange={e => setMajor(e.target.value)}     
        required   
        ></input>


<select value={shirtSize} onChange={e => setShirtSize(e.target.value)}>
  <option value="">Select shirt size</option>
  <option value="Small">Small</option>
  <option value="Medium">Medium</option>   
</select>



<input className = "input"
         placeholder='Coding Languages(Separate with ,)'
        type="text"
        value={codingLanguages}       
        onChange={e => setCodingLanguages(e.target.value)} 
        required       
        ></input>
</div>
<div className="column-2">
<input className = "input"
         placeholder='Skills'
        type="text"
        value={skills}       
        onChange={e => setSkills(e.target.value)}       
        required 
        ></input>

<input className = "input"
         placeholder='Web Link'
        type="text"
        value={webLink}       
        onChange={e => setWebLink(e.target.value)}      
        required  
        ></input>

<input className = "input"
         placeholder='LinkedIn URL'
        type="text"
        value={linkedInLink}       
        onChange={e => setLinkedInLink(e.target.value)} 
        required       
        ></input>

Upload Resume :
 <form method="post" action="#" id="#">                                                     
<div>                              
  <input type="file" className="form-control" multiple="" onChange={onChangeHandler}/>
</div>                          
</form>	
<button className="btn" variant="contained" component="span" onClick={uploadResume}>
  Upload
  </button>

<input className = "input"
         placeholder='Hope to gain'
        type="text"
        value={hopeToGain}       
        onChange={e => setHopeToGain(e.target.value)}        
        ></input>

<input className = "input"
         placeholder='Previous Projects'
        type="text"
        value={prevProj}       
        onChange={e => setPrevProj(e.target.value)}  
        required      
        ></input>

<input className = "input"
         placeholder='Potential Projects'
        type="text"
        value={potentialProj}       
        onChange={e => setPotentialProj(e.target.value)}      
        required  
        ></input>

<input className = "input"
         placeholder='Questions?'
        type="text"
        value={questions}       
        onChange={e => setQuestions(e.target.value)} 
        required       
        ></input>

<input className = "input"
         placeholder='Did you like our facebook?'
        type="text"
        value={likedFbPage}       
        onChange={e => setLikedFbPage(e.target.value)} 
        required       
        ></input>
<br/>

<button onClick={async ()=> await register(
     firstName,lastName, birthDate,email,phoneNumber,gender
    ,race,school,currentLevel,graduationYear,major,shirtSize,firstHackathon,
    codingLanguages,skills,webLink,linkedInLink,resumeUrl,hopeToGain
    ,prevProj,potentialProj,questions,likedFbPage
    )} className="btn">Apply</button>
   </div>
   {console.log(race)}
   </div>
  );
}
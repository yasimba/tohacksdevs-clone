const express = require('express')
const app = express()
const port = 3002
var bodyParser = require('body-parser')
var cors = require('cors');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 
  app.use(cors());

const Pool = require('pg').Pool
const pg = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


let data = {
    "payload": "",
    "status": 400        
}

/*
app.get('/stats/',(req, res) => {
    let stats = req.query.stats.split((","))
    stats.forEach(stat=>{
        console.log(stat)
    })    
    res.send("")
})
*/

app.get('/applicants', (req, res) => {   
    pg.query('select * from applicants a where a.id \
        not in (select h.applicant_id from hackathon h where\
        h.applicant_id = a.id);\
         ')
    .then((response)=> {
        data.status = 200
        data.payload = response.rows
        res.send(data)
    }).catch(error => {            
        data.payload = error
        res.send(data)
    });
})

app.get('/stats',(req, res)=>{
    let shirt_size = 'Small'
    pg.query('select count(*) from applicants a\
    a.shirt_size = $1\);\
    ',[shirt_size])
    .then((response)=> {
        data.status = 200
        data.payload = response.rows
        res.send(data)
    }).catch(error => {            
        data.payload = error
        res.send(data)
    });
})


app.post('/action', (req, res) => {   
    let action = req.body.action;
    let id = req.body.id;
    let hackathon_name = req.body.hackathon_name    
    let email = req.body.email
    let payload = {}
    
    switch (action) {       
        case "reject":
           pg.query('DELETE FROM applicants a \
             where a.id = $1',[id])
            .then((response)=> {
                data.status = 200
                data.payload = "success"
                //send email over here
                res.send(data)
            }).catch(error => {            
                data.payload = "Unable to delete applicant"
                res.send(data)
            }) 
            break;
            
            case "accept":
                pg.query('INSERT INTO hackathon \
                 (applicant_id, name) VALUES ($1,$2)',[id, hackathon_name])
                .then((response)=> {
                    const msg = {
                        to: email,
                        from: process.env.ADMIN_EMAIL,
                        subject: 'ToHacks',
                        text: `You have been successfully accepted into our hackathon`,                        
                        };
                        sgMail.send(msg);
                    data.status = 200
                    data.payload = "success"
                    res.send(data)
                }).catch(error => {            
                    data.payload = "Unable to accept applicant"
                    res.send(data)
                }) 
                break;


            case "shortlist":
                pg.query('INSERT INTO shortlist \
                 (applicant_id) VALUES $1',[id])
                .then((response)=> {
                    data.status = 200
                    data.payload = "success"
                    res.send(data)
                }).catch(error => {            
                    data.payload = "Unable to shortlist"
                    res.send(data)
                }) 
                break;    
        default:
            break;
    }
   
})



app.post('/register', (req, res) => {    
	let first_name   =   req.body.first_name   
	let last_name =  req.body.last_name 
	let birth_date = req.body.birth_date 
	let email = req.body.email 
	let phone_number = req.body.phone_number 
	let gender = req.body.gender 
	let race = req.body.race
	let school = req.body.school 
	let current_level = req.body.current_level
	let graduation_year = req.body.graduation_year
	let major = req.body.major
	let shirt_size = req.body.shirt_size
	let first_hackathon = req.body.first_hackathon
	let coding_languages =  req.body.coding_languages
	let skills = req.body.skills
	let web_link = req.body.web_link
	let linkedin_link = req.body.linkedin_link
	let resume_url = req.body.resume_url
	let hope_to_gain = req.body.hope_to_gain
	let prev_proj = req.body.prev_proj
	let potential_proj = req.body.potential_proj
	let questions = req.body.questions
    let liked_fb_page = req.body.liked_fb_page
        pg.query(
            'SELECT COUNT (*) FROM applicants a where a.email = $1'
            ,[email])
        .then((response)=>{
            let count = response.rows[0].count;
            if(count > 0){
                data.payload = "User already exists"
            }else{
                pg.query(
                    'INSERT INTO applicants(first_name,last_name,birth_date, email,phone_number,\
                        gender,race,school,current_level,graduation_year, major, shirt_size,\
                        first_hackathon, coding_languages,skills,web_link, linkedin_link, resume_url,\
                        hope_to_gain, prev_proj, potential_proj, questions, liked_fb_page\
                        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,\
                        $13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23\
                        )'
                    ,[first_name,last_name,birth_date, email,phone_number,
                        gender,race,school,current_level,graduation_year, major, shirt_size,
                        first_hackathon, coding_languages,skills,web_link, linkedin_link, resume_url,
                        hope_to_gain, prev_proj, potential_proj, questions, liked_fb_page
                    ])
                .then((response)=>{
                    data.payload = response.rows
                    data.status = 200                    
                    res.send(data)                 
                }).catch(error => {     
                    console.log(error)               
                    data.payload = error
                    res.send(data)
                })
            }
        }).catch(error => {
            data.payload = error
            res.send(error)
        }) 
    })      
       


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
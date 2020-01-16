CREATE TABLE IF NOT EXISTS applicants (
	id serial,
	first_name text NOT NULL,
	last_name text NOT NULL,
	birth_date date NOT NULL,
	email text NOT NULL,
	phone_number text NOT NULL,
	gender text NOT NULL,
	race text NOT NULL,
	school text NOT NULL,
	current_level text NOT NULL,
	graduation_year text NOT NULL,
	major text NOT NULL,
	shirt_size text NOT NULL,
	first_hackathon text NOT NULL,
	coding_languages text NOT NULL,
	skills text NOT NULL,
	web_link text NOT NULL,
	linkedin_link text NOT NULL,
	resume_url text NOT NULL,
	hope_to_gain text NOT NULL,
	prev_proj text NOT NULL,
	potential_proj text NOT NULL,
	questions text NOT NULL,
	liked_fb_page text NOT NULL,
	reg_id text NOT NULL,
	PRIMARY KEY( id )
);

CREATE TABLE IF NOT EXISTS hackathon (
    id serial,    
    name text NOT NULL,
	location text NOT NULL,
	description text NOT NULL,
	hackthon_date date NOT NULL ,
	registration_id text NOT NULL,
	PRIMARY KEY( id )
);

CREATE TABLE IF NOT EXISTS accepted (
    id serial,
    applicant_id integer REFERENCES applicants(id) NOT NULL,
	hackathon_registration_id text,
	auth_code text NOT NULL,
	PRIMARY KEY( id )
);


CREATE TABLE IF NOT EXISTS  shortlist (
    id serial,
    applicant_id integer REFERENCES applicants(id) NOT NULL,
	hackathon_registration_id text,
	PRIMARY KEY( id )   
);
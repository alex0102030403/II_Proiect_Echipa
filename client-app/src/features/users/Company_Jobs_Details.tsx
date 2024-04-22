import React, { useEffect, useState } from "react";
import { useStore } from "../../app/stores/store";
import { Job } from "../../app/models/job";
import { Button, Card, Header, List, Segment } from "semantic-ui-react";
import { User } from "../../app/models/user";
import agent from "../../app/api/agent";
import { set } from "mobx";

export default function Company_Jobs_Details() {
    
    const {userStore: {getUserDetails,userDetails}} = useStore();

    const{jobStore : {jobRegistry,getJobDetails}} = useStore();

    const [currentJob, setCurrentJob] = React.useState<Job | null>(null);

    
    const [applicant, setApplicant] = React.useState<User[]>([]);

    const pathname = window.location.pathname;

    const parts = pathname.split('/');

    const jobId = parts[parts.length - 2 ];

    const companyId = parts[parts.length - 3];

    useEffect(() =>{

        
        
        const fetchData = async () => {
            try{
                
                const job = await getJobDetails(jobId);
                //console.log(job);
                setCurrentJob(job);   

                const allUsers = job.applicants.map(async (applicante) => {
                    //console.log(applicante.appUserId);
                    const user = await getUserDetails(applicante.appUserId);
                    //console.log(user);
                    return user;
                    
                });

                const userData = await Promise.all(allUsers);
                if(userData){
                    setApplicant(userData);
                }
                
                
        }
        catch (error){
            console.log(error);
            
        }
        }

       
        fetchData();

        

    }, []);
    const [user,setUser] = React.useState<User>(
        {
            id: '',
            username: '',
            displayName: '',
            email: '',
            token: '',
            image: '',
            roles: []
        }
    );

    function handleHire(emailu: string){
        
        user.email = emailu;
        console.log(user)
        console.log("Hire button clicked");
        console.log(applicant);
        agent.Companys.addEmployee(companyId,user);    
    }
    
    return (
        <div>
            {currentJob && (
                <Segment>
                    <Header as="h2">{currentJob.title}</Header>
                    <p><strong>Category:</strong> {currentJob.category}</p>
                    <p><strong>Description:</strong> {currentJob.description}</p>
                    <p><strong>City:</strong> {currentJob.city}</p>

                    <Header as="h3">Applicants</Header>
                    <List divided relaxed>
                        {applicant.map(app => (
                            <Card key={app.id}>
                                <Card.Content>
                                    <Card.Header>{app.displayName}</Card.Header>
                                    <Card.Description>{app.email}</Card.Description>
                                    <Button onClick={()=>handleHire(app.email)} primary content="Hire" />
                                </Card.Content>
                            </Card>
                        ))}
                    </List>
                </Segment>
            )}
        </div>
    );

    }
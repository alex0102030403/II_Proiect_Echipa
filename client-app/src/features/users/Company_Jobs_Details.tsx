import React, { useEffect, useState } from "react";
import { useStore } from "../../app/stores/store";
import { Job } from "../../app/models/job";
import { Button, Card, Header, List, Segment } from "semantic-ui-react";
import { User } from "../../app/models/user";

export default function Company_Jobs_Details() {
    
    const {userStore: {getUserDetails,userDetails}} = useStore();

    const{jobStore : {jobRegistry,getJobDetails}} = useStore();

    const [currentJob, setCurrentJob] = React.useState<Job | null>(null);

    
    const [applicant, setApplicant] = React.useState<User[]>([]);

    const pathname = window.location.pathname;

    const parts = pathname.split('/');

    const jobId = parts[parts.length - 2 ];

    useEffect(() =>{

        
        
        const fetchData = async () => {
            try{
                
                const job = await getJobDetails(jobId);
                //console.log(job);
                setCurrentJob(job);   

                job.applicants.map(async (applicante) => {
                    //console.log(applicante.appUserId);
                    const user = await getUserDetails(applicante.appUserId);
                    console.log(user);
                    setApplicant([...applicant, user])
                });
                
        }
        catch (error){
            console.log(error);
            
        }
        }

       
        fetchData();

        console.log(applicant)

    }, [jobId]);
    
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
                        {applicant.map(applicant => (
                            <Card key={applicant.id}>
                                <Card.Content>
                                    <Card.Header>{applicant.displayName}</Card.Header>
                                    <Card.Description>{applicant.email}</Card.Description>
                                    <Button primary content="Hire" />
                                </Card.Content>
                            </Card>
                        ))}
                    </List>
                </Segment>
            )}
        </div>
    );

    }
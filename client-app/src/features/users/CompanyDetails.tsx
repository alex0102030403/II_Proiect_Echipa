import React, { useEffect } from 'react';
import UserStore from '../../app/stores/userStore';
import { Button, Card, Grid, Header } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { store, useStore } from '../../app/stores/store';
import { all } from 'axios';
import { User } from '../../app/models/user';
import { get, set } from 'mobx';
import { Company } from '../../app/models/company';
import { Job } from '../../app/models/job';
import { Link } from 'react-router-dom';




export default observer(function CompanyDetails() {

    const {userStore: {getUserDetails,userDetails}} = useStore();

    const {companyStore: {CompanyList}} = useStore();

    const {jobStore: {jobRegistry,getJobDetails}} = useStore();

    const [jobs, setJobs] = React.useState<Job[]>([]);

    const [company, setCompany] = React.useState<Company | null>(null);

    const [companyEmployees, setCompanyEmployees] = React.useState<User[]>([]);

    const [companyJobs, setCompanyJobs] = React.useState<Job[]>([]);

    const pathname = window.location.pathname;

    const parts = pathname.split('/');

    const companyId = parts[parts.length - 1];

    

    useEffect(() =>{

        const companys = CompanyList.find((company) => company.id === companyId);
        setCompany(companys);

        //console.log(company);
            
                const fetchData = async () => {
                    try{
                        
                        const userDataPromises = companys?.employees.map(async (user) => {
                            return await getUserDetails(user.appUserId);
                        });
                        const userData = await Promise.all(userDataPromises);
                        setCompanyEmployees(userData);
                        
                        const jobPromises = companys?.jobs.map(async (job) => {
                            console.log(job);
                            return await getJobDetails(job.companyId);
                        });
                        const jobss = await Promise.all(jobPromises);

                        setJobs(jobss);
                        
                        if(jobss != undefined){
                        jobss.forEach((job) => {
                            console.log(job);
                            
                        });
                        }
                        
                }
                catch (error){
                    console.log(error);
                }
            }

            fetchData();
            
    }, []);

    return (
        <Grid centered>
          <Grid.Row color='blue'>
            <Card>
              <Card.Content>
                <Card.Header>{company?.name}</Card.Header>
                <Card.Meta>{company?.description}</Card.Meta>
              </Card.Content>
              <Button content="Add Job" as={Link} to={`/company/${company?.id}/createJob`} />
            </Card>
          </Grid.Row>
    
          <Grid.Row columns={2}>
            <Grid.Column>
              <Grid.Row>
                <Header as='h1' content='Employees' />
                {companyEmployees.map(employee => (
                  <Card key={employee.id}>
                    <Card.Content>
                      <Card.Header>{employee.displayName}</Card.Header>
                      <Card.Meta>{employee.email}</Card.Meta>
                    </Card.Content>
                  </Card>
                ))}
              </Grid.Row>
            </Grid.Column>
    
            <Grid.Column>
              <Grid.Row>
                <Header as='h1' content='Jobs' />
                {jobs.map(job => (
                  <Card key={job.id}>
                    <Card.Content>
                      <Card.Header>{job.title}</Card.Header>
                      <Card.Meta>{job.category}</Card.Meta>
                      <Button content="See Details" as={Link} to={`${job.id}/details`}/>
                    </Card.Content>
                  </Card>
                ))}
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    
    
    // return (
    //     <Grid centered>
    //         <Grid.Row color='blue'>
    //             <Card>
    //                 <Card.Content>
    //                     <Card.Header>{company?.name}</Card.Header>
    //                     <Card.Meta>{company?.description}</Card.Meta>
                        
    //                 </Card.Content>
    //                 <Card.Content extra>
                        
    //                 </Card.Content>
    //             </Card>
               
    //         </Grid.Row>
    //         <Grid.Row width={8} color='yellow'  >
    //             <Header as='h1' content='Employees' />

    //             {companyEmployees.map((employee) => (
    //                 <Card key={employee.id}>
    //                     <Card.Content>
    //                         <Card.Header>{employee.displayName}</Card.Header>
    //                         <Card.Meta>{employee.email}</Card.Meta>
    //                     </Card.Content>
    //                 </Card>
    //             ))}
    //         </Grid.Row>
    //         <Grid.Row width={8} color='yellow'  >
    //             <Header as='h1' content='Jobs' />

    //             {jobs.map((job) => (
    //                 <Card key={Math.random() }>
    //                     <Card.Content>
    //                         <Card.Header>{job.company}</Card.Header>
    //                         <Card.Meta>{job.description}</Card.Meta>
    //                     </Card.Content>
    //                 </Card>
    //             ))}
    //         </Grid.Row>
    //     </Grid>
    // );

})



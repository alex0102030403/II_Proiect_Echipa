import React, { useEffect } from 'react';
import UserStore from '../../app/stores/userStore';

import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { all } from 'axios';
import UserDetails from './UserDetails';
import { User } from '../../app/models/user';
import { Button, Card, Grid, Header, Icon } from 'semantic-ui-react';
import agent from '../../app/api/agent';
import { Link, NavLink } from "react-router-dom";
import './Some.css';


export default observer(function Profile(){

    const {userStore: {user,logout,getUsers,allUsers,getUserDetails,userDetails}} = useStore();

    const {companyStore: {CompanyList}} = useStore();

    const [companyEmployees, setCompanyEmployees] = React.useState<User[] | null>(null);
    
    const userData = user;

    const [CompanyListOfCurrentUser, setCompanyListOfCurrentUser] = React.useState([] as any);
    

    useEffect(() => {
        console.log(userData);
        const Company = CompanyList.filter((company) => 
            company.employees.some((employee) => employee.appUserId === user?.id));
        setCompanyListOfCurrentUser(Company);
    }, []);

    const handleDeleteCompany = (id: string) => {
        agent.Companys.delete(id);
        window.location.reload();
    }


    
    return (
        <Grid centered>
            
            <div>
      <Card fluid >
        <Card.Content fluid>
          <Card.Header>User Data</Card.Header>
          <Grid>
            <Grid.Row columns={4}>
              <Grid.Column width={12}>
                <Card.Group>
                 
                    <Card key={userData?.id}>
                      <Card.Content>
                        <Card.Header>{userData?.displayName}</Card.Header>
                        <Card.Description>Email: {userData?.email}</Card.Description>
                      </Card.Content>
                    </Card>
                  
                </Card.Group>
              </Grid.Column>
              <Grid.Column className='to-move' width={2} verticalAlign="middle" textAlign="center">
                <Button primary icon labelPosition='left' as={Link} to={`createCompany`}>
                  <Icon name='plus' />
                  Create New Company
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    </div>
    
               
                <div>
      <Card.Group>
        {CompanyListOfCurrentUser.map(company => (
          <Card key={company.id}>
            <Card.Content>
              <Card.Header>{company.name}</Card.Header>
              <Card.Description>{company.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='blue' as={Link} to={`company/${company.id}`}>
                  See Details
                </Button>
                <Button basic color='red' onClick={() => handleDeleteCompany(company.id)}>
                  <Icon name='trash' />
                  Delete
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
            
        </Grid>
    );

})



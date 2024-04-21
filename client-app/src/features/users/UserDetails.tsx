import React, { useEffect } from 'react';
import UserStore from '../../app/stores/userStore';
import { Card, Grid, Header } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { store, useStore } from '../../app/stores/store';
import { all } from 'axios';
import { User } from '../../app/models/user';
import { get, set } from 'mobx';

interface Props {
    users : User[];
    
}


export default observer(function UserDetails({users}: Props) {

    const {userStore: {getUserDetails,userDetails}} = useStore();

    const {companyStore: {CompanyList}} = useStore();

    const [companyEmployees, setCompanyEmployees] = React.useState<User[]>([]);

    

    useEffect(() =>{
            
                const fetchData = async () => {
                    try{
                        
                        const userDataPromises = users.map(async (user) => {
                            return await getUserDetails(user.appUserId);
                        });
                        const userData = await Promise.all(userDataPromises);
                        setCompanyEmployees(userData);
                }
                catch (error){
                    console.log(error);
                }
            }

            fetchData();
            
    }, []);

    
    
    return (
        <Grid columns={1} centered>
            <Grid.Column>
                <Header content='Employees' />
            </Grid.Column>

           {companyEmployees.map((employee) => (
               <div key={employee.id}>
                    
                     <h3>{employee.displayName}</h3>
                     </div>
              ))}
        
        </Grid>
    );

})



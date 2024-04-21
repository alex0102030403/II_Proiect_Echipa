import { Fragment, useEffect, useState } from 'react'
import './styles.css';
import { Button, Container, Header, List } from 'semantic-ui-react';
import { Job } from '../models/job';
import NavBar from './NavBar';
import JobsDashboard from '../../features/jobs/dashboard/JobsDashboard';
import agent from '../api/agent';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../stores/store';
import { observe } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../home/HomePage';
import ModalContainer from '../common/modals/ModalContainer';

function App() {

  const location = useLocation();

  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  },[commonStore, userStore])

  if(!commonStore.appLoaded) return <LoadingComponents content='Loading app...' inverted={false}/>

  return (
    <>
    <ModalContainer />
    {location.pathname === '/' ? <HomePage /> : (
      <>
      <NavBar />
      
      <Container style={{ marginTop: '7em' }}>
        <Outlet />
      </Container>
      </>
    )
    }
      
      
    </>
  )
}

export default observer(App)

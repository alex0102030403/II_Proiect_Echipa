import React, { useEffect } from "react";
import { Grid, List } from "semantic-ui-react";
import JobsList from "./JobsList";
import JobsDetails from "../details/JobsDetails";
import JobForm from "../form/JobForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import JobsFilter from "./JobsFilter";


export default observer(function JobsDashboard() {

    const {jobStore} = useStore();
    const {loadJobs, jobRegistry} = jobStore;


    useEffect(() => {
       if(jobRegistry.size <= 1) loadJobs();
  
    }, [jobStore]);
  
  
    if (jobStore.loadingInitial) return <LoadingComponents inverted={false} content={'Loading Jobs...'} />

    return (
        <Grid>
            <Grid.Column width='10'>
                <JobsList />
            </Grid.Column>

            <Grid.Column width='6'>
                <JobsFilter />
            </Grid.Column>

            
            
        </Grid>
    )
})
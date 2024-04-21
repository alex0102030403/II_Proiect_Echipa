import React, { Fragment } from "react";
import { Button, Header, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import JobsListItem from "./JobsListItem";


export default observer(function JobsList() {

    const {jobStore} = useStore(); 
    const {groupedJobs} = jobStore;

    return (
        <>
        {groupedJobs.map(([group, jobs]) => (
            <Fragment key={group}>
                <Header sub color='teal'>
                    {group}
                </Header>
            
        

                {jobs.map(job => (
                    <JobsListItem key={job.id} job={job} />
                ))}

        </Fragment>
        ))}

        </>
    )
})
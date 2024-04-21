import React, { useEffect } from "react";
import {
    Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Grid,
  Icon,
  Image,
} from "semantic-ui-react";
import { Job } from "../../../app/models/job";
import { useStore } from "../../../app/stores/store";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import JobsDetailedHeader from "./JobsDetaledHeader";
import JobsDetailedInfo from "./JobsDetailedInfo";
import JobsDetailedChat from "./JobsDetailedChat";
import JobsDetailedSidebar from "./JobsDetailedSidebar";

export default observer(function JobsDetails() {

  const {jobStore} = useStore();
  const {selectedJob: jobs, loadJob, loadingInitial} = jobStore;
  const {id} = useParams();

  useEffect(() => {
    if (id) loadJob(id);
  }, [id, loadJob]);
  
  
  if (loadingInitial || !jobs) return <LoadingComponents inverted={false} content={""} />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <JobsDetailedHeader job={jobs} />
        <JobsDetailedInfo job={jobs}/>
        
      </Grid.Column>
     

    </Grid>
  );
}
)

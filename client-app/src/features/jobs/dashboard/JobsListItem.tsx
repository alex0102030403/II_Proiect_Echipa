import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Job } from "../../../app/models/job";

interface Props {
    job: Job;
}

export default function JobsListItem({job}: Props) {

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                    <Item.Image size='tiny' circular src='/logo2.jpg' />
                    <Item.Content>
                        <Item.Header as={Link} to={`/jobs/${job.id}`}>{job.title}</Item.Header>
                        <Item.Description>Added by {job.company}</Item.Description>
                    </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {job.date}
                    <Icon name='marker' /> {job.city}, {job.country}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{job.description}</span>
                <Button as={Link} to={`/jobs/${job.id}`} color='teal' floated='right' content='View' />
            </Segment>
        </Segment.Group>
    )
}
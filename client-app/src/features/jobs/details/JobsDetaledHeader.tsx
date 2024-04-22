import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Job} from "../../../app/models/job";
import { Link } from 'react-router-dom';
import agent from '../../../app/api/agent';

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

var id = "";



function handleApply(){
    console.log("Apply button clicked");
    console.log(id);
    agent.Jobs.apply(id);
}

interface Props {
    job: Job
}


export default observer (function ActivityDetailedHeader({job}: Props) {
    useEffect(() => {
        const path = window.location.pathname;
        const parts = path.split('/');
        id = parts[parts.length-1];
        
        console.log("heo");
    },[]);
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={"/faang.png"} fluid style={activityImageStyle}/>
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={job.title}
                                    style={{color: 'white'}}
                                />
                                <p>{job.date}</p>
                                <p>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal' onClick={handleApply}>Apply</Button>
                
            </Segment>
        </Segment.Group>
    )
})
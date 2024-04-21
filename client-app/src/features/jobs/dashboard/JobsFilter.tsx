import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";


export default function JobsFilter() {
    return (
        <>
        <Menu vertical size='large' style={{ width: '100%', marginTop: '50px' }}>
            <Header icon='filter' attached color='teal' content='Filters' />
            <Menu.Item content='All Jobs' />
            <Menu.Item content="I'm going" />
            <Menu.Item content="I'm hosting" />
        </Menu>
        <Header />
        <Calendar />
        </>
    )
}
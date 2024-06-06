import React from "react";
import { Button, Container, Dropdown, Menu,Image } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";



export default observer(function NavBar() {

    const {userStore: {user,logout}} = useStore();


    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                <img src="logo2.jpg" alt="logo" style={{ marginRight: "10px" }} />
                ProiectII
                </Menu.Item>
                <Menu.Item as={NavLink} to='/jobs' name="Jobs" />
                {/* <Menu.Item>
                    <Button as={NavLink} to='/createJob' positive content="Add Job" />
                </Menu.Item> */}
                <Menu.Item position='right'>
                    <Image src={'/icon.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={NavLink} to={`/profile/${user?.displayName}`} text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )


})
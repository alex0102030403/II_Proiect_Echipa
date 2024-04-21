import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Container, Header, Segment,Image, Button } from "semantic-ui-react";
import { useStore } from "../stores/store";
import LoginForm from "../../features/users/LoginForm";
import RegisterForm from "../../features/users/RegisterForm";


export default observer(function HomePage() {

    const {userStore} = useStore();
    const {modalStore} = useStore();

    return (
        
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    <Image src='/faang.png' style={{ marginBottom: 20 }} />
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                    <Header as='h2' inverted content='Welcome to ProiectII' />
                    <Button as={Link} to='/jobs' size='huge' inverted>
                        Go to Jobs!
                    </Button>
                    </>
                ) : (
                    <>
                    <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                        Login
                    </Button>
                    <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                    Register
                    </Button>
                    </>
                )}
                
            </Container>
        </Segment>

    )
})
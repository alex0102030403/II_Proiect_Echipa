import { get, makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore{
    user: User | null = null;
    allUsers: User[] = [];
    userDetails: User | null = null;

    constructor(){
        makeAutoObservable(this);
        this.getUsers();
    }

    get isLoggedIn(){
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try{
            
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            console.log(this.isLoggedIn);
            router.navigate('/jobs');
            store.modalStore.closeModal();

        } catch (error)
        {
            console.log(error);
            throw error;

        }
    }

    register = async (creds: UserFormValues) => {
        try{
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/jobs');
            store.modalStore.closeModal();
        } catch (error){
            console.log(error);
            throw error;
        }
    }

    logout = () => {
        console.log(this.isLoggedIn);
        store.commonStore.setToken(null);
        
        this.user = null;
        router.navigate('/');
        store.jobStore.jobRegistry.clear();
    }

    getUser = async () => {
        try{
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error){
            console.log(error);
        }
    }

    getUsers = async () => {
        try{
            const users = await agent.Users.list();
            runInAction(() => {
                this.allUsers = users;
            })
        } catch (error){
            console.log(error);
        }
    }

    getUserDetails = async (id: string): Promise<User> => {
        try{
            const user = await agent.Users.details(id);
            runInAction(() => {
                this.userDetails = user;
                
                
            })
            return user;
        } catch (error){
            console.log(error);
            throw error;
        }
    }

    
}
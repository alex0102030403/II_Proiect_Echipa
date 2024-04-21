import axios, { AxiosResponse } from "axios";
import { Job } from "../models/job";
import { User, UserFormValues } from "../models/user";
import type { Company } from "../models/company";
import CommonStore from "../stores/commonStore";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
try{
    await sleep(1000);
    return response;
} catch (error) {
    console.log(error);
    return await Promise.reject(error);
}
});



const responseBody = <T> (response: AxiosResponse<T>) => response.data;

//Instead of the Headers down below, we can use the following code to set the token in the headers
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt');
    if(token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const requests = {

    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body ,{headers: {"Authorization" : `Bearer ${localStorage.getItem("jwt")}`}}).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body , {headers: {"Authorization" : `Bearer ${localStorage.getItem("jwt")}`}}).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url , {headers: {"Authorization" : `Bearer ${localStorage.getItem("jwt")}`}}).then(responseBody)

}


const Jobs = {
    
    list: () => requests.get<Job[]>('/jobs'),
    details: (id: string) => requests.get<Job>(`/jobs/${id}`),
    create: (job: Job) => requests.post<void>('/jobs', job),
    update: (job: Job) => requests.put<void>(`/jobs/${job.id}`, job),
    delete: (id: string) => requests.del<void>(`/jobs/${id}`)

}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const Users = {
    list: () => requests.get<User[]>('/users'),
    details: (id: string) => requests.get<User>(`/users/${id}`)
}

const Companys = {
    list: () => requests.get<Company[]>('/company'),
    addEmployee: (id: string , user : User) => requests.post<void>(`/company/${id}/addEmployee`, user),
    removeEmployee: (id: string) => requests.del<void>(`/company/${id}/removeEmployee`),
    addJob: (id: string,job : Job) => requests.post<void>(`/company/${id}/addJob`, job),
    details: (id: string) => requests.get<Company>(`/company/${id}`),
    create: (company: Company) => requests.post<void>('/company', company),
    update: (company: Company) => requests.put<void>(`/company/${company.id}`, company),
    delete: (id: string) => requests.del<void>(`/company/${id}`)
}

const agent = {
    Jobs,
    Account,
    Users,
    Companys
}

export default agent;
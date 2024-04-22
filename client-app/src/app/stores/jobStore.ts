import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { Job } from "../models/job";
import { Company } from "../models/company";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';

export default class JobStore{
    jobRegistry = new Map<string, Job>();
    selectedJob: Job | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this);
    }

    get jobsByDate() {
        return Array.from(this.jobRegistry.values()).sort((a, b) => 
            Date.parse(a.date) - Date.parse(b.date));
    }

    get groupedJobs() {
        return Object.entries(
            this.jobsByDate.reduce((jobs, job) => {
                const date = job.date;
                jobs[date] = jobs[date] ? [...jobs[date], job] : [job];
                return jobs;
            }, {} as {[key: string]: Job[]})
        )
    }

    getJobDetails = async (id: string): Promise<Job> => {
        try{
            const job = await agent.Jobs.details(id);
            
            return job;
        } catch (error){
            console.log(error);
            throw error;
        }
    }

    loadJobs = async () => {
        this.loadingInitial = true;
        try{
            const jobs = await agent.Jobs.list();
            runInAction(() => {
            jobs.forEach(job => {
                this.setJob(job);
            })
            })
            this.setLoadingInitial(false);
        } catch (error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createJob = async (companyId: string,job: Job) => {
        this.loading = true;
        job.id = uuid();
        try{
            await agent.Companys.addJob(companyId,job);
            runInAction(() => {
                this.jobRegistry.set(job.id, job);
                this.selectedJob = job;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateJob = async (job: Job) => {
        this.loading = true;
        
        try{
            await agent.Jobs.update(job);
            runInAction(() => {
                this.jobRegistry.set(job.id, job);
                this.selectedJob = job;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteJob = async (id: string) => {
        this.loading = true;
        try{
            await agent.Jobs.delete(id);
            runInAction(() => {
                this.jobRegistry.delete(id);
                this.loading = false;
            })
        } catch (error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    getJob = (id: string) => {
        return this.jobRegistry.get(id);
    }

    loadJob = async (id: string) => {
        let job = this.getJob(id)
        if (job){
            this.selectedJob = job;
            return job;
        } else {
            this.loadingInitial = true;
            try{
                job = await agent.Jobs.details(id);
                this.setJob(job);
                this.setLoadingInitial(false);
                this.selectedJob = job;
                return job;

            } catch (error){
                console.log(error);
                runInAction(() => {
                    this.loadingInitial = false;
                })
            }
        }
    }

    private setJob = (job: Job) => {
        job.date = job.date.split('T')[0];
        this.jobRegistry.set(job.id, job);
    }


}
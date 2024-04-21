import { get, makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";
import { Company } from "../models/company";
import { v4 as uuid } from 'uuid';

export default class CompanyStore{

    CompanyList: Company[] = [];
    loadingInitial = false;
    selectedCompany: Company | undefined = undefined;
    loading = false;
    
    constructor(){
        makeAutoObservable(this);
        this.getCompanies();
        
        
    }

    createCompany = async (company: Company) => {
        this.loading = true;
        company.id = uuid();
        try{
            await agent.Companys.create(company);
            runInAction(() => {
                this.CompanyList.push(company);
                this.loading = false;
            })
        } catch (error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    getCompanies = async () => {
        try{
            const companies = await agent.Companys.list();
            runInAction(() => {
                this.CompanyList = companies;
            })
        } catch (error){
            console.log(error);
        }
    }

    setCompany = (company: Company) => {
        this.CompanyList.push(company);
    }

    getCompany = (id: string) => {
        return this.CompanyList.find(x => x.id === id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    

    loadCompany = async (id: string) => {
        let company = this.getCompany(id)
        if (company){
            this.selectedCompany = company;
            return company;
        } else {
            this.loadingInitial = true;
            try{
                company = await agent.Companys.details(id);
                this.setCompany(company);
                this.setLoadingInitial(false);
                this.selectedCompany = company;
                return company;

            } catch (error){
                console.log(error);
                runInAction(() => {
                    this.loadingInitial = false;
                })
            }
        }
    }

    
}
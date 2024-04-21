import { createContext, useContext } from "react";
import JobStore from "./jobStore"
import UserStore from "./userStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import CompanyStore from "./companyStore";

interface Store{
    commonStore: CommonStore;
    jobStore: JobStore;
    userStore: UserStore;
    modalStore: ModalStore;
    companyStore: CompanyStore;
}

export const store: Store = {
    jobStore: new JobStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    companyStore: new CompanyStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}
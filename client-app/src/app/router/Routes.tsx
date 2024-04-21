import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import JobsDashboard from "../../features/jobs/dashboard/JobsDashboard";
import JobForm from "../../features/jobs/form/JobForm";
import JobsDetails from "../../features/jobs/details/JobsDetails";
import LoginForm from "../../features/users/LoginForm";
import Profile from "../../features/users/Profile";
import CompanyDetails from "../../features/users/CompanyDetails";
import CompanyForm from "../../features/users/CompanyForm";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [     
            {
                path: "jobs",
                element: <JobsDashboard />
            },
            {
                path: "createJob",
                element: <JobForm key="create"/>
            },
            {
                path: "jobs/:id",
                element: <JobsDetails />
            },
            {
                path: "manage/:id",
                element: <JobForm key="manage"/>
            },
            {
                path: "login",
                element: <LoginForm />
            },
            {
                path: "profile/:username",
                element: <Profile />

            },
            {
                path: "profile/:username/company/:id",
                element: <CompanyDetails />
            },
            {
                path: "profile/:username/createCompany",
                element: <CompanyForm />
            }
        ]
    }
]

export const router = createBrowserRouter(routes);
import { observer } from "mobx-react-lite";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { useEffect, useState } from "react";
import { Company } from "../../app/models/company";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { Button, Header, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import MySelectInput from "../../app/common/form/MySelectInput";
import * as Yup from 'yup';
import { v4 as uuid } from "uuid";
import { categoryOptions } from "../../app/common/options/categoryOptions";

export default observer(function JobForm() {

    const {companyStore} = useStore();
    const {loadCompany,createCompany,loadingInitial,loading} = companyStore;

    const {id} = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState<Company>({
        id: '',
        name: '',
        description: '',
        category: '',
        city: '',
        country: '',
        image: '',
        employees: [],
        jobs: []
          
    });

    const validationSchema = Yup.object({
        name: Yup.string().required('The job title is required'),
        description: Yup.string().required('The job description is required'),
        category: Yup.string().required('The job category is required'),
        city: Yup.string().required('The job city is required'),
        country: Yup.string().required('The job country is required'),
        //image: Yup.string().required('The job company is required'),
    })

    

    useEffect(() => {
        if (id) loadCompany(id).then(job => setJob(job!))
    }, [id, loadCompany]);

    function handleFormSubmit(job: Company) {
        if(!job.id){
            job.id = uuid();
            createCompany(job).then(() => navigate(`/jobs`))
        }else{
            console.log(job+"Update not implemented yet");
        }
        
    }
    

    // function handleInputChange(event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     setJob({...job, [event.target.name]: event.target.value})
    // }


    if (loadingInitial) return <LoadingComponents content="Loading job..." inverted={false}/>;
    
    return (
        <Segment clearing>
            <Header content='Job Details' sub color='teal' />
        <Formik 
        validationSchema={validationSchema}
        enableReinitialize initialValues={job} onSubmit={values => handleFormSubmit(values)}>
        {({values:job , handleChange, handleSubmit, isValid, isSubmitting, dirty}) => (
            <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput name='name' placeholder='name' />
            <MyTextArea rows={3} placeholder='Description' name='description' />
            
            
            <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
            <MyTextInput placeholder='City' name='city' />
            <MyTextInput placeholder='Country' name='country' />
            <Button 
            disabled={isSubmitting || !dirty || !isValid}
            loading={loading} floated='right' positive type='submit' content='Submit'  />
            <Button as={Link} to='/jobs' floated='right' type='button' content='Cancel' />
            </Form>

        )}
        </Formik>
        
            
        </Segment>

    )
})


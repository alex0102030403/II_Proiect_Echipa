import { Button, Header, Label, Segment } from "semantic-ui-react";
import { Job } from "../../../app/models/job";
import { ChangeEvent, useEffect } from "react";
import React from "react";
import { useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { v4 as uuid } from "uuid";
import { Formik,Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";


export default observer(function JobForm() {

    const {jobStore} = useStore();
    const {selectedJob, createJob, updateJob, loading, loadJob, loadingInitial } = jobStore;

    const {id} = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState<Job>({
        id: '',
        title: '',
        description: '',
        date: '',
        category: '',
        city: '',
        country: '',
        company: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The job title is required'),
        description: Yup.string().required('The job description is required'),
        date: Yup.string().required('The job date is required').nullable(),
        category: Yup.string().required('The job category is required'),
        city: Yup.string().required('The job city is required'),
        country: Yup.string().required('The job country is required'),
        company: Yup.string().required('The job company is required'),
    })

    useEffect(() => {
        if (id) loadJob(id).then(job => setJob(job!))
    }, [id, loadJob]);

    function handleFormSubmit(job: Job) {
        if(!job.id){
            job.id = uuid();
            createJob(job).then(() => navigate(`/jobs/${job.id}`))
        }else{
            updateJob(job).then(() => navigate(`/jobs/${job.id}`))
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
            <MyTextInput name='title' placeholder='Title' />
            <MyTextArea rows={3} placeholder='Description' name='description' />
            
            <MyTextInput type="date" placeholder='Date' name='date' />
            <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
            <MyTextInput placeholder='Company' name='company' />
            <Header content='Location Details' sub color='teal' />
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


import { Message } from "semantic-ui-react";

interface Props{
    errors: any;
    
    
}

function printErrors(errors: any) {
    if(errors && Array.isArray(errors)) {
        errors.forEach((error: any) => {
            console.error(error);
        });
    }
}


export default function ValidationError({errors}: Props){
    return(
    {printErrors(errors: any);}
    )
}
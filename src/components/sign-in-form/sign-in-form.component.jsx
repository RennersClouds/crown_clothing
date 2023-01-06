
import { useState } from "react";
import { createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFields = {
   
    email: '',
    password:'',
    
}



const SignInForm = () =>{

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password, } = formFields;

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
        // console.log({user});
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
      };

    const handleSubmit = async (event) =>{
        event.preventDefault();

        try{

            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response)
          
            resetFormFields();

        } catch(error){
            if (error.code === 'auth/wrong-password'){
                alert('Wrong passwrod entered for this email')
            }else {
                alert('account does not exist')
            }
            console.log(error)
        }

    }
    
    const handleChange = (event) => {
        const {name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    }
    return (
        
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
    
            <form onSubmit={handleSubmit}>
           
            <FormInput label="Email" type="email" required onChange={handleChange} name="email"  value={email} />
    
            <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}  />
            <div className="buttons-container">
            
                <Button type="submit">Sign In</Button>
                <Button type="button" buttonType="google" onClick={logGoogleUser}>Google sign in</Button>
                
            </div>
            </form>
        </div>

    );
};

export default SignInForm
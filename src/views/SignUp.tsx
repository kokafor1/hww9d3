import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { CategoryType, UserFormType } from '../types';
import { useNavigate } from 'react-router-dom';
import { register } from '../lib/apiWrapper';


type SignUpProps = {
    flashMessage: (newMessage:string |undefined, newCategory:CategoryType|undefined) => void
}

export default function SignUp({flashMessage}: SignUpProps) {
    const navigate = useNavigate();
    const [userFormData, setUserFormData] = useState<UserFormType>(
        {
            email: "",
            first_name: "",
            last_name: "",
            password: "",
        }
    )

    const [seePassword, setSeePassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(userFormData);

        let response = await register(userFormData);
        if (response.error){
          flashMessage(response.error, 'danger');
        }else {
          let newUser = response.data!
          flashMessage(`Congrats ${newUser.first_name} ${newUser.last_name} has been created`, 'success')
          navigate('/');
        }
    }

    return (
        <>
            <h1 className="text-center">Sign Up Here</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label htmlFor='firstName'>First Name</Form.Label>
                        <Form.Control id='firstName' name='firstName' placeholder='Enter First Name' value={userFormData.first_name} onChange={handleInputChange}/>

                        <Form.Label htmlFor='lastName'>Last Name</Form.Label>
                        <Form.Control id='lastName' name='lastName' placeholder='Enter Last Name' value={userFormData.last_name} onChange={handleInputChange}/>

                        <Form.Label htmlFor='email'>Email</Form.Label>
                        <Form.Control id='email' name='email' type='email' placeholder='Enter Email' value={userFormData.email} onChange={handleInputChange}/>

                        <Form.Label htmlFor='password'>Password</Form.Label>
                        <InputGroup>
                            <Form.Control id='password' name='password' type={seePassword ? 'text' : 'password'} placeholder='Enter Password' value={userFormData.password} onChange={handleInputChange}/>
                            <InputGroup.Text onClick={() => setSeePassword(!seePassword)}><i className={seePassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></InputGroup.Text>
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Text onClick={() => setSeePassword(!seePassword)}><i className={seePassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></InputGroup.Text>
                        </InputGroup>

                        <Button type='submit' variant='outline-primary' className='w-100 mt-3' >Create New User</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
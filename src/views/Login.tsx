import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { LoginType, UserType } from '../types';
import { useNavigate } from 'react-router-dom';
import { logUserIn } from '../lib/apiWrapper';


type LoginProps = {
    setUser: (user: UserType) => void,
}

export default function Login({ setUser }: LoginProps) {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState<LoginType>(
        {
            email: '',
            password: '',
        }
    )

    const [seePassword, setSeePassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({...loginData, [e.target.name]: e.target.value })
    }

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let response = await logUserIn(loginData);
        if (response.error) {
            console.warn(response.error);
        } else {
            let newUser = response.data!;
            setUser(newUser);
            localStorage.setItem('token', newUser.token);
            localStorage.setItem('email', newUser.email);
            localStorage.setItem('first_name', newUser.first_name);
            localStorage.setItem('last_name', newUser.last_name);
            localStorage.setItem('user_id', newUser.user_id.toString());
            navigate('/');
        }
    };


    return (
        <>
            <h1 className="text-center">Log In Here</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleLoginSubmit}>
                        <Form.Label htmlFor='username'>Email</Form.Label>
                        <Form.Control id='email' name='email' placeholder='Enter Email' value={loginData.email} onChange={handleInputChange}/>

                        <Form.Label htmlFor='password'>Password</Form.Label>
                        <InputGroup>
                            <Form.Control id='password' name='password' type={seePassword ? 'text' : 'password'} placeholder='Enter Password' value={loginData.password} onChange={handleInputChange}/>
                            <InputGroup.Text onClick={() => setSeePassword(!seePassword)}><i className={seePassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></InputGroup.Text>
                        </InputGroup>

                        <Button type='submit' variant='outline-primary' className='w-100 mt-3'>Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
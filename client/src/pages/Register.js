import React from 'react'
import { useState, useEffect } from 'react'
import { Stack, HStack, VStack, FormControl, FormLabel, Input, Text, Button, ButtonGroup, FormErrorMessage, FormHelperText, } from '@chakra-ui/react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Register = () => {

    const [data, setData] = useState({
        name: '',
        password: '',
        email: '',
        role: 'User',
        status: 'Pending',
        createdAt: Date.now(),
    })


    const handleChange = e => {
        let newData = {...data}
        newData[e.target.id] = e.target.value;
        setData(newData)
        // console.log(newData);
    }

    const handleSubmit = e => {
        e.preventDefault();
        let error = document.getElementById('error');
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let cpassword = document.getElementById('cpassword').value;
        
        if(name == '' || email == '' || password == '' || cpassword == ''){
            error.style.display = 'block';
            error.innerHTML = 'All fields are required';
            return;

        }else if(password !== cpassword){
            error.style.display = 'block';
            error.innerHTML = 'Please make sure your passwords are same.'
            return;

        }else{
            error.style.display = 'none';

            axios({
                method: 'post',
                url: 'http://localhost:5000/register',
                data: data
            })
            .then( res => {
                console.log(res)
                if(res.status == 200 && res.statusText == 'OK'){
                    window.location.href = '/';
                }
            })
            .catch( err => {
                console.log(err);
            })
        }

    }

    

  return (
    <Wrapper>
        <RegisterWrapper onSubmit={(e) => handleSubmit(e)}>
            <Text fontSize='4xl' mb={4}>Register</Text>
            <FormLabel id='error'></FormLabel> 
            <FormControl mb='3'>
                <FormLabel>Display Name</FormLabel>
                <Input  type='text' name='name' id='name' placeholder='Your display name'  onChange={(e) => handleChange(e)} value={data.name} />
            </FormControl>
            <FormControl mb='3'>
                <FormLabel>Email</FormLabel>
                <Input  type='email' name='email' id='email' placeholder='Email' onChange={(e) => handleChange(e)} value={data.email}/>
            </FormControl>
            <FormControl mb='3'>
                <FormLabel>Password</FormLabel>
                <Input  type='password' name='password' id='password' placeholder='Password' onChange={(e) => handleChange(e)} value={data.password}/>
            </FormControl>
            <FormControl>
                <FormLabel>Password Confirm</FormLabel>
                <Input  type='password' name='cpassword' id='cpassword' placeholder='Confirm password'/>
            </FormControl>
            <VStack spacing={5} direction='row' align='center' justifyContent='center' mt={10}>
                    <Button colorScheme='teal' size='md' type='submit'>
                        Register
                    </Button>
                <FormLabel>
                    <span style={{marginRight: '10px'}}>Already Register?</span>
                    <Link to='/' >
                        Login
                    </Link>
                </FormLabel> 
            </VStack> 
        </RegisterWrapper>
    </Wrapper>
  )
}


const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 50rem;
    text-align: center;
`

const RegisterWrapper = styled.form`
    width: 85%;
    max-width: 350px;
    padding: 1.5rem;
    height: auto;
    max-height: 1000px;
    box-shadow: 1px 5px 10px rgba(0,0,0,0.3);

    #error{
        color: #fff;;
        text-align: left;
        height: auto;
        font-size: 15px;
        border-radius: 6px;
        line-height: 18px;
        background: #eb4d4b;
        padding: 0.5rem 1rem;
        display: none;
    }

`

export default Register
import React from 'react'
import { useState, useEffect } from 'react'
import { Stack, HStack, VStack, FormControl, FormLabel, Input, Text, Button, ButtonGroup, FormErrorMessage, FormHelperText, } from '@chakra-ui/react'
import styled from 'styled-components'
import {Link } from 'react-router-dom'
import axios from 'axios';

const Login = () => {

    // const [userId, setUserId] = useState();

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const handleChange = e => {
        let loginData = {...data};
        loginData[e.target.id] = e.target.value;
        setData(loginData)
        // console.log(loginData);
    }

    const handleSubmit = e => {
        e.preventDefault();

        let error = document.getElementById('error');
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        if(email == '' || password == ''){
            error.style.display = 'block';
            error.innerHTML = 'Please input email and password';
            return;

        }else{
            axios({
                method: 'post',
                url: 'http://localhost:5000/login',
                data: data
            })
            .then( res => {
                console.log(res);
                // setUserId(res.data.id);
                if(res.status == 200 && res.statusText == 'OK'){
                    window.location.href = `/profile/${res.data.id}`;
                }
            })
            .catch( err => {
                console.log(err);
    
                let res = err.response;
                let msg = res.data.message;
    
                error.style.display = 'block';
                error.innerHTML = msg
          
            })


            // axios({
            //     method: 'get',
            //     url: 'http://localhost:5000/login'
            // })
            // .then( res => {
            //     console.log(res)
            // }) 
            // .catch( err => {
            //     console.log(err);
            // })

        }
        
    }
   
  return (
    <Wrapper>
        <LoginWrapper onSubmit={(e) => handleSubmit(e)}>
            <Text fontSize='4xl' mb={2}>Login</Text>
            <FormLabel id='error'></FormLabel>
            <FormControl mb='3'>
                <FormLabel>Email</FormLabel>
                <Input type='email' name='email' id='email'  placeholder='Email' onChange={(e) => {handleChange(e)}} value={data.email}/>
            </FormControl>
            <FormControl mb='3'>
                <FormLabel>Password</FormLabel>
                <Input type='password' name='password' id='password' placeholder='Password' onChange={(e) => {handleChange(e)}} value={data.password}/>
            </FormControl>
            <VStack spacing={5} direction='row' align='center'>
                <Button colorScheme='teal' size='md' type='submit' mt='10'>
                    Login
                </Button>
                <FormLabel>
                    <span style={{marginRight: '10px'}}>No Account?</span>
                    <Link to='/register' >
                        Register
                    </Link>
                </FormLabel> 
            </VStack> 
        </LoginWrapper>
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

const LoginWrapper = styled.form`
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

export default Login
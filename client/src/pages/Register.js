import React from "react";
import { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  FormErrorMessage
} from "@chakra-ui/react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiEndpoint } from "../utils/constant";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [cpassword, setCpassword] = useState();
  const [errorMsg, setErrorMsg ] = useState(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password !== cpassword){
      setErrorMsg('Two password are not same.');
      return;
    }

    try{

      const res = await axios({
        method: "post",
        url: `${apiEndpoint}/register`,
        data: {
          name,
          password,
          email,
        },
      })

      if (res.status === 200 && res.statusText === "OK") {
        navigate('/')
      }

    } catch ( err) {
        console.log(err);
        let res = err.response;
        let msg = res.data.message;
        setErrorMsg(msg);
    }
    
  };

  return (
    <Wrapper>
      <RegisterWrapper onSubmit={(e) => handleSubmit(e)}>
        <Text fontSize="4xl" mb={4}>
          Register
        </Text>
        {/* <FormLabel id="error">{errorMsg}</FormLabel> */}
        <FormControl mb="3" isRequired >
          <FormLabel>Display Name</FormLabel>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Your display name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {/* <FormErrorMessage>{errorMsg}</FormErrorMessage> */}
        </FormControl>
        <FormControl mb="3" isRequired >
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {/* <FormErrorMessage>{errorMsg}</FormErrorMessage> */}
        </FormControl>
        <FormControl mb="3" isRequired >
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {/* <FormErrorMessage>{errorMsg}</FormErrorMessage> */}
        </FormControl>
        <FormControl isRequired isInvalid={errorMsg}>
          <FormLabel>Password Confirm</FormLabel>
          <Input
            type="password"
            name="cpassword"
            id="cpassword"
            placeholder="Confirm password"
            onChange={(e) => setCpassword(e.target.value)}
            value={cpassword}
          />
          <FormErrorMessage>{errorMsg}</FormErrorMessage>
        </FormControl>
        <VStack
          spacing={5}
          direction="row"
          align="center"
          justifyContent="center"
          mt={10}
        >
          <Button colorScheme="teal" size="md" type="submit">
            Register
          </Button>
          <FormLabel>
            <span style={{ marginRight: "10px" }}>Already Register?</span>
            <Link to="/">Login</Link>
          </FormLabel>
        </VStack>
      </RegisterWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 50rem;
  text-align: center;
`;

const RegisterWrapper = styled.form`
  width: 85%;
  max-width: 350px;
  padding: 1.5rem;
  height: auto;
  max-height: 1000px;
  box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.3);

  #error {
    color: #fff;
    text-align: left;
    height: auto;
    font-size: 15px;
    border-radius: 6px;
    line-height: 18px;
    background: #eb4d4b;
    padding: 0.5rem 1rem;
    display: none;
  }
`;

export default Register;

import React from "react";
import { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Wrapper } from "../components/Wrapper";
import { apiEndpoint } from "../utils/constant";

const Login = ({ onSuccess = () => undefined }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios({
        method: "post",
        url: `${apiEndpoint}/login`,
        data: {
          email,
          password,
        },
      });
      if (res.status === 200 && res.statusText === "OK") {
        onSuccess(res.data.data);
        navigate(`/profile/${res.data.id}`);
      }
    } catch (err) {
      console.log(err);

      let res = err.response;
      let msg = res.data.message;

      setErrorMsg(msg);
    }
  };

  return (
    <Wrapper>
      <LoginWrapper onSubmit={(e) => handleSubmit(e)}>
        <Text fontSize="4xl" mb={2}>
          Login
        </Text>
        <FormControl mb="3" isInvalid={errorMsg} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <FormErrorMessage>{errorMsg}</FormErrorMessage>
        </FormControl>
        <FormControl mb="3" isInvalid={errorMsg} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <FormErrorMessage>{errorMsg}</FormErrorMessage>
        </FormControl>
        <VStack spacing={5} direction="row" align="center">
          <Button colorScheme="teal" size="md" type="submit" mt="10">
            Login
          </Button>
          <FormLabel>
            <span style={{ marginRight: "10px" }}>No Account?</span>
            <Link to="/register">Register</Link>
          </FormLabel>
        </VStack>
      </LoginWrapper>
    </Wrapper>
  );
};

const LoginWrapper = styled.form`
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

export default Login;

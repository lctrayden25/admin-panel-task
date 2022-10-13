import React from "react";
import { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  Text,
  Container,
  Stack,
  VStack,
  HStack,
  Button,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Form,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../conponents/Navbar";
import "./Page.css";

const Edit = () => {
  const params = useParams();
  const user_id = params.id;

  // const [single, setSingle] = useState();

  let [edit, setEdit] = useState({
    name: "",
    email: "",
    role: "",
    id: user_id,
  });

  const handleChange = (e) => {
    let editData = { ...edit };
    console.log(edit);
    editData[e.target.id] = e.target.value;
    setEdit(editData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let error = document.getElementById("error");
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let role = document.getElementById("role").value;

    if (name == "" || email == "" || role == "") {
      error.style.display = "block";
      error.innerHTML = "All fields are required.";
      return;
    } else {
      edit.status = "Pending";
      axios({
        method: "POST",
        url: `http://localhost:3001/edit/${user_id}`,
        data: edit,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            window.location.href = `/detail/${user_id}`;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getUser = async () => {
    let api = await fetch("http://localhost:3001/admin");
    let data = await api.json();
    if (data && typeof data !== "undefined") {
      getUserData(data);
    }
  };

  const getUserData = (data) => {
    let userData = {};
    userData = data.find((user) => user_id == user._id);
    if (userData !== "undefined") {
      setEdit(userData);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (edit == undefined) {
    return null;
  }

  return (
    <HStack mt="10">
      <Container maxW="550px" className="ctn">
        <Grid templateColumns={"repeat(8, 1fr)"} gap={10}>
          <GridItem colSpan={3}>
            <Navbar name={edit.name} id={user_id} />
          </GridItem>
          <GridItem colSpan={5}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Container>
                <Flex>
                  <Text fontSize="2xl" mb={5} textAlign="center">
                    User Detail
                  </Text>
                  <Spacer />
                  {/* <Button>Edit</Button> */}
                </Flex>
                <FormLabel id="error" style={error}></FormLabel>
              </Container>
              <Container>
                <FormControl mb="4">
                  <FormLabel fontSize="xl">Display Name</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={edit.name}
                  />
                </FormControl>

                <FormControl mb="4">
                  <FormLabel fontSize="xl">Email</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={edit.email}
                  />
                  {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="xl">Role</FormLabel>
                  <Select
                    placeholder="Select option"
                    id="role"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={edit.role}
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </Select>
                </FormControl>

                <Container mt="10">
                  <Button colorScheme="teal" size="md" type="submit">
                    Update
                  </Button>
                  <Link to={`/detail/${user_id}`}>
                    <Button colorScheme="red" size="md" ml="4">
                      Cancel
                    </Button>
                  </Link>
                </Container>
              </Container>
            </form>
          </GridItem>
        </Grid>
      </Container>
    </HStack>
  );
};

const error = {
  color: "#fff",
  textAlign: "left",
  height: "auto",
  fontSize: "15px",
  borderRadius: "6px",
  lineHeight: "18px",
  background: "#eb4d4b",
  padding: "0.5rem 1rem",
  display: "none",
};

export default Edit;

import React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  Grid,
  GridItem,
  Text,
  Container,
  HStack,
  Button,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiEndpoint } from "../utils/constant";
import Navbar from "../components/Navbar";
import "./Page.css";

const Edit = () => {
  const params = useParams();
  let user_id = params.id;
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    id: user_id
  });
  const handleChange = (e) => {
    let userData = { ...user };
    userData[e.target.id] = e.target.value;
    setUser(userData);
  };

  const handleSubmit = async(e) => {
      e.preventDefault();
 
      try{
        const res = await axios({
          method: "POST",
          url: `${apiEndpoint}/edit/${user_id}`,
          data: user
        })
        if (res.status == 200) {
          navigate(`/detail/${user_id}`);
        }    
      }catch(err){
        console.log(err);
      }
  };

  const getUser = useCallback( async() => {
    let api = await fetch(`${apiEndpoint}/admin/${user_id}`);
    let data = await api.json();
    if(data){
        setUser(data)
    }
  }, [user_id])

  useEffect(() => {
    getUser();
  }, [getUser]);

  return user ? (
    <HStack mt="10">
      <Container maxW="550px" className="ctn">
        <Grid templateColumns={"repeat(8, 1fr)"} gap={10}>
          <GridItem colSpan={3}>
            <Navbar name={user.name} id={user_id} />
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
                {/* <FormLabel id="error" style={error}></FormLabel> */}
              </Container>
              <Container>
                <FormControl mb="4"  isRequired>
                  <FormLabel fontSize="xl">Display Name</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    onChange={(e) => handleChange(e)}
                    value={user.name}
                  />
                </FormControl>

                <FormControl mb="4" isRequired>
                  <FormLabel fontSize="xl">Email</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    onChange={(e) => handleChange(e)}
                    value={user.email}
                  />
                  {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize="xl">Role</FormLabel>
                  <Select
                    placeholder="Select option"
                    id="role"
                    onChange={(e) => handleChange(e)}
                    value={user.role}
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
  ) : null ;
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

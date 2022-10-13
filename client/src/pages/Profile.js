import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { Text, Container, HStack, Button, Box, Flex } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { FormControl, FormLabel } from "@chakra-ui/react";

import Navbar from "../conponents/Navbar";
import "./Page.css";

const Profile = () => {
  const [user, setUser] = useState();

  let params = useParams();
  let user_id = params.id;

  const getUser = useCallback(async () => {
    let api = await fetch("http://localhost:3001/admin/" + user_id);
    let data = await api.json();
    if (data) {
      setUser(data);
    }
  }, [user_id]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return user ? (
    <HStack mt="10">
      <Container maxW="550px" w="85%" className="ctn">
        <Flex gap={10} direction={["column", "row", "row", "row"]}>
          <Box>
            <Navbar name={user.name} id={user_id} />
          </Box>
          <Box>
            <Flex justifyContent="space-between" w="85%" m="auto">
              <Text fontSize="2xl" mb={5} textAlign="center">
                Profile
              </Text>
              <Link to={`/edit/${user_id}`}>
                <Button colorScheme="blue" variant="outline" ml="2" size="sm">
                  Edit
                </Button>
              </Link>
            </Flex>
            <Container>
              <FormControl mb="10">
                <FormLabel fontSize="xl">Display Name</FormLabel>
                <Text>{user.name}</Text>
              </FormControl>

              <FormControl mb="10">
                <FormLabel fontSize="xl">Email</FormLabel>
                <Text>{user.email}</Text>
              </FormControl>
              <Link to="/">
                <Button colorScheme="teal" size="md">
                  Logout
                </Button>
              </Link>
            </Container>
          </Box>
        </Flex>
      </Container>
    </HStack>
  ) : null;
};

export default Profile;

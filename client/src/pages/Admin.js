import React, { useCallback, useMemo } from "react";
import { useState, useEffect } from "react";
import { Text, Container, HStack, Button, Flex, Box } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { apiEndpoint } from "../utils/constant";

import Navbar from "../conponents/Navbar";
import "./Page.css";

const UserStatusStyle = {
  Pending: {
    colorScheme: "blue",
    variant: "ghost",
  },
  Approve: {
    colorScheme: "green",
  },
  Reject: {
    colorScheme: "red",
    variant: "outline",
  },
};

const UserStatusButton = (props) => {
  const { user, index } = props;

  const { _id, name, email, status, role } = user;

  // status = "Pending" | "Approve" | "Reject"
  const buttonStyle = UserStatusStyle[status];

  return (
    <Tr key={_id}>
      <Td>{index}</Td>
      <Td>{name}</Td>
      <Td>{email}</Td>
      <Td>
        <Button {...buttonStyle}>{status}</Button>
      </Td>
      <Td>
        <Link to={`/detail/${_id}`}>
          <Text as="b">{role}</Text>
        </Link>
      </Td>
    </Tr>
  );
};

const Admin = () => {
  const [users, setUsers] = useState([]);

  const params = useParams();
  const user_id = params.id;

  const getUser = useCallback(async () => {
    try {
      const { data: user } = await axios({
        method: "GET",
        url: `${apiEndpoint}/admin`,
      });
      setUsers(user);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <HStack mt="10" mb="10">
      <Container maxW="1000px" w="85%" className="ctn">
        <Flex
          gap="20"
          direction={["column", "column", "column", "row", "row"]}
          justifyContent={"center"}
        >
          <Box>
            <Navbar name="Rayden" id={user_id} />
          </Box>
          <Box>
            <Text fontSize="2xl" mb={10} textAlign="center">
              Admin Panel
            </Text>
            <TableContainer>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>Index</Th>
                    <Th>Display Name</Th>
                    <Th>Email</Th>
                    <Th>Status</Th>
                    <Th>Role</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.length > 0 ? (
                    users.map((user, i) => (
                      <UserStatusButton user={user} index={i} key={user._id} />
                    ))
                  ) : (
                    <Tr>
                      <Td textAlign="center" colSpan={99}>
                        Empty!
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      </Container>
    </HStack>
  );
};

export default Admin;

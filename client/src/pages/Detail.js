import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Text,
  Container,
  HStack,
  Button,
  Flex,
  Spacer,
  Box,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiEndpoint } from "../utils/constant";
import Navbar from "../components/Navbar";
import "./Page.css";

const Detail = () => {
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();
  const {
    isOpen: isOpenReject,
    onOpen: onOpenReject,
    onClose: onCloseReject,
  } = useDisclosure();

  const [user, setUser] = useState();
  const params = useParams();
  let user_id = params.id;
  const navigate = useNavigate();

  const handleApproveSubmit = async(e) => {
      e.preventDefault();
      try{
          let res = await axios({
            method: "post",
            url: `http://localhost:3001/status/${user_id}`,
            data: {
              status: "Approve",
              id: user_id,
            }
          })
          if (res.status == 200) {
            navigate(`/admin/${user_id}`);
          }

      }catch(err){
          console.log(err)
      }
  };

  const handleRejectSubmit = async (e) => {
    e.preventDefault();
    try{
        let res = await axios({
          method: "post",
          url: `http://localhost:3001/status/${user_id}`,
          data: {
            status: "Reject",
            id: user_id,
          }
        })
        if (res.status == 200) {
          navigate(`/admin/${user_id}`);
        }
    }catch(err){
        console.log(err)
    }
  };

  const getUser = useCallback( async () => {
    let api = await fetch(`${apiEndpoint}/admin/${user_id}`);
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
      <Container maxW="550px" className="ctn w">
        <Flex gap={10} direction={["column", "column", "row", "row", "row"]}>
          <Box colSpan={3}>
            <Navbar name={user.name} id={user_id} />
          </Box>
          <Box colSpan={5}>
            <Container>
              <Flex justifyContent="space-between">
                <Text fontSize="xl" mb={8} textAlign="center">
                  User Detail
                </Text>
                <Spacer />
                <div style={{ marginLeft: "20px" }}>
                  <Link to={`/admin/${user_id}`}>
                    <Button colorScheme="blue" size="sm">
                      Back
                    </Button>
                  </Link>
                  {/* <Link to={`/edit/${user_id}`}>
                            <Button colorScheme='blue' variant='outline' ml='2' size='sm'>Edit</Button>
                          </Link> */}
                </div>
              </Flex>
            </Container>
            <Container>
              <FormControl mb="10">
                <FormLabel fontSize="xl">Display Name</FormLabel>
                <Text>{user.name}</Text>
              </FormControl>

              <FormControl mb="10">
                <FormLabel fontSize="xl">Email</FormLabel>
                <Text>{user.email}</Text>
              </FormControl>

              <Container>
                <Button onClick={onOpenConfirm} colorScheme="teal" size="md">
                  Approve
                </Button>
                <Modal isOpen={isOpenConfirm} onClose={onCloseConfirm}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Confirmation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Are you sure to approve this user ?</ModalBody>

                    <ModalFooter>
                      <form onSubmit={(e) => handleApproveSubmit(e)}>
                        <Button
                          colorScheme="blue"
                          type="submit"
                          id="approve"
                          value="approve"
                        >
                          Yes
                        </Button>
                        <Input type="hidden" value="approve" />
                      </form>
                      <Button variant="outline" ml={3} onClick={onCloseConfirm}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Button
                  onClick={onOpenReject}
                  colorScheme="red"
                  size="md"
                  ml="4"
                >
                  Reject
                </Button>
                <Modal isOpen={isOpenReject} onClose={onCloseReject}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Confirmation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Are you sure to reject this user ?</ModalBody>

                    <ModalFooter>
                      <form onSubmit={(e) => handleRejectSubmit(e)}>
                        <Button colorScheme="blue" type="submit" id="reject">
                          Yes
                        </Button>
                        <Input type="hidden" value="Reject" />
                      </form>
                      <Button variant="outline" ml={3} onClick={onCloseReject}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Container>
            </Container>
          </Box>
        </Flex>
      </Container>
    </HStack>
  ) : null;
};

export default Detail;

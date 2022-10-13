import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Grid,
  GridItem,
  Text,
  Container,
  VStack,
  HStack,
  Button,
  Flex,
  Spacer,
  Box,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
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
  Hide,
  Show,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../conponents/Navbar";
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

  let [single, setSingle] = useState();
  // let [status, setStatus] = useState();
  let params = useParams();
  let user_id = params.id;

  // const getUser = () => {
  //   axios({
  //       method: 'GET',
  //       url: 'http://localhost:3001/admin/',
  //   })
  //   .then( res => {
  //       let all_user = res.data;
  //       // single = all_user.filter( user => user._id !== user_id);
  //       // console.log(single);
  //       if(Array.isArray(all_user)){
  //         all_user.filter( user => {
  //           if(user._id == user_id){
  //             single = user;
  //           }
  //         })
  //       }else{
  //         return null;
  //       }
  //       setSingleUser(singleUser);
  //   })
  //   .catch( err => {
  //       console.log(err);
  //   })

  //   console.log(singleUser)

  // }

  const handleApproveSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:3001/status/${user_id}`,
      data: {
        status: "Approve",
        id: user_id,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          window.location.href = `/admin/${user_id}`;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRejectSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:3001/status/${user_id}`,
      data: {
        status: "Reject",
        id: user_id,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          window.location.href = `/admin/${user_id}`;
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
      setSingle(userData);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (single == undefined) {
    return null;
  }

  return (
    <HStack mt="10">
      <Container maxW="550px" className="ctn w">
        <Flex gap={10} direction={["column", "column", "row", "row", "row"]}>
          <Box colSpan={3}>
            <Navbar name={single.name} id={user_id} />
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
                <Text>{single.name}</Text>
              </FormControl>

              <FormControl mb="10">
                <FormLabel fontSize="xl">Email</FormLabel>
                <Text>{single.email}</Text>
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
  );
};

export default Detail;

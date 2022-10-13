import React from 'react'
import { useState, useEffect } from 'react'
import { Grid, GridItem, Text, Container, VStack, HStack, FormLabel, Button, Flex, Box } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react'
import { Link, NavLink, useParams } from 'react-router-dom'
import axios from 'axios';

import Navbar from '../conponents/Navbar';
import './Page.css'


const Admin = () => {

    const [users, setUsers] = useState('');

    let params = useParams();
    let user_id = params.id;

    const getUser = () => {
        axios({
            method: 'GET',
            url: 'http://localhost:5000/admin',
        })
        .then( res => {
            let user = res.data;
            setUsers(user)
        })
        .catch( err => {
            console.log(err);
        })
    }

    useEffect( () => {
        getUser();
    }, [])

  return (
    <HStack mt='10' mb='10'>
        <Container maxW='1000px' w='85%' className="ctn">
            <Flex gap='20' direction={['column', 'column', 'column', 'row', 'row']} justifyContent={'center'}>
                <Box >
                    <Navbar name='Rayden' id={user_id}/>
                </Box>
                <Box>
                    <Text fontSize='2xl' mb={10} textAlign='center'>Admin Panel</Text>
                    <TableContainer>
                        <Table variant='striped'>
                            <Thead>
                                <Tr>
                                    <Th>Display Name</Th>
                                    <Th>Email</Th>
                                    <Th>Status</Th>
                                    <Th>Role</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {Array.isArray(users) ?
                                    users.map( user => {
                                        if(user.status == 'Approve'){
                                            return  <Tr key={user._id}>
                                                <Td>{user.name}</Td>
                                                <Td>{user.email}</Td>
                                                <Td><Button colorScheme='green' variant='solid'>{user.status}</Button></Td>
                                                <Td><Link to={`/detail/${user._id}`}><Text as='b'>{user.role}</Text></Link></Td>
                                            </Tr>
                                        }else if(user.status == 'Reject'){
                                            return  <Tr key={user._id}>
                                                <Td>{user.name}</Td>
                                                <Td>{user.email}</Td>
                                                <Td><Button colorScheme='red' variant='solid'>{user.status}</Button></Td>
                                                <Td><Link to={`/detail/${user._id}`}><Text as='b'>{user.role}</Text></Link></Td>
                                            </Tr>
                                        }else{
                                            return  <Tr key={user._id}>
                                                <Td>{user.name}</Td>
                                                <Td>{user.email}</Td>
                                                <Td><Button colorScheme='blue' variant='solid'>{user.status}</Button></Td>
                                                <Td><Link to={`/detail/${user._id}`}><Text as='b'>User</Text></Link></Td>
                                            </Tr>
                                        }
                                       
                                    }) : null
                                }
                            </Tbody>          
                        </Table>
                    </TableContainer>
                </Box>
            </Flex>
        </Container>
    </HStack>
  )
}



export default Admin
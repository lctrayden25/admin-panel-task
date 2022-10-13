import React from 'react'
import { useState, useEffect } from 'react'
import { Grid, GridItem, Text, Container, VStack, HStack, Button, Box, Flex } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input
  } from '@chakra-ui/react'

import Navbar from '../conponents/Navbar';
import './Page.css'

const Profile = () => {

    // const [userId, setUserId] = useState();
    const [single, setSingle] = useState();

    let params = useParams();
    let user_id = params.id;

    const getUser = async() => {
        let api = await fetch('http://localhost:5000/admin');
        let data = await api.json();
        if(data && typeof(data) !== 'undefined'){ 
            getUserData(data);
        }
      }
      
      const getUserData = data => {
        let userData = {};
        userData = data.find(user => user_id == user._id);
        if(userData !== 'undefined'){
            setSingle(userData);
        }
    }

    useEffect( () => {
        getUser()
    }, []);

    if(single == undefined){
        return null;
    }

  return (
    <HStack mt='10'>
        <Container maxW='550px' w='85%' className='ctn'>
            <Flex gap={10} direction={['column','row', 'row', 'row']}>
                <Box>
                    <Navbar name={single.name} id={user_id}/>
                </Box>
                <Box>
                    <Flex justifyContent='space-between' w='85%' m='auto'>
                    <Text fontSize='2xl' mb={5} textAlign='center'>Profile</Text>
                    <Link to={`/edit/${user_id}`}>
                        <Button colorScheme='blue' variant='outline' ml='2' size='sm'>Edit</Button>
                    </Link>
                    </Flex>
                    <Container>
                        <FormControl mb='10'>
                          <FormLabel fontSize='xl'>Display Name</FormLabel>
                          <Text>{single.name}</Text>
                        </FormControl>

                        <FormControl mb='10'>
                          <FormLabel fontSize='xl'>Email</FormLabel>
                          <Text>{single.email}</Text>
                        </FormControl>
                        <Link to='/'>
                            <Button colorScheme='teal' size='md'>Logout</Button>
                        </Link>
                    </Container>
                </Box>
            </Flex>
        </Container>
    </HStack>
  )
}

export default Profile
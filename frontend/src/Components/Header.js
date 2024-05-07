import React from 'react'
import { Box, Flex, HStack, Image, Spacer, Button } from '@chakra-ui/react'
import logo from './images/Logo.png'
import '../App.css'
import { useNavigate } from 'react-router-dom';


function Header() {
  const nav_css = {
    fontFamily: "Cambria",
    fontWeight:'550',
    color: "rgb(51, 51, 51)",
    fontSize: "18px",
  };
  const navigate = useNavigate();

  return (
    <>
      <Flex px={4} py={2}>
        <Box display='flex' w='100%' p={2} borderRadius='8px' backgroundColor='#E7F5FA' border='2px solid #004aad'>
        <Box w='15%' minW='50px'>
          <Image w='100%' src={logo}/>
        </Box><Spacer/>

        <Box display='flex'>
          <HStack spacing={16} justifyContent='right' mr={10} w='100%' minW='100px'>
            <Box style={nav_css} className='navhover'>SOCIAL INSIGHT</Box>
            <Box style={nav_css} className='navhover'>FEATURES</Box>
            <Button colorScheme='teal' variant='outline' size='md' onClick={(e) => navigate('/login')}>Login</Button>
            <Button colorScheme='teal' variant='outline' size='md' onClick={(e) => navigate('/register')}>Register</Button>
          </HStack>
        </Box>
        </Box>

      </Flex>
    </>
  );
}

export default Header

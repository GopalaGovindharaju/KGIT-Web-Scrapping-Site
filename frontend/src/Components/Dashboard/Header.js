import React from 'react';
import { Box, Flex, HStack, Image, Spacer } from '@chakra-ui/react';
import logo from '../images/Logo.png';

function Header() {
  const nav_css = {
    fontFamily: "Cambria",
    fontWeight:'550',
    color: "rgb(51, 51, 51)",
    fontSize: "18px",
  };

  return (
    <>
      <Flex px={4} py={2}>
        <Box display='flex' w='100%' p={2} borderRadius='8px' backgroundColor=' #8BC6EC' backgroundImage='linear-gradient(135deg, #8BC6EC 0%, #96b3e0 100%)'>
          <Box w='15%' minW='50px'>
            <Image w='100%' src={logo}/>
          </Box>
          <Spacer/>
          <Box display='flex'>
            <HStack spacing={16} justifyContent='right' mr={10} w='100%' minW='100px'>
                <Box style={nav_css} className='navhover'>HOME</Box>
                <Box style={nav_css} className='navhover'>PARAMETERS</Box>
            </HStack>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default Header;
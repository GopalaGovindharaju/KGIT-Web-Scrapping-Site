import React, { useState } from 'react'
import { Box, Flex, Button, Input, Text, Image, InputGroup, InputLeftElement, InputRightElement} from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Signup from '../Signup.png'
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";

function Login() {
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const onSuccess = async (res) => {
    console.log('success:', jwtDecode(res.credential));
    var detail = jwtDecode(res.credential)
    const data = {
      username: detail.name,
      email: detail.email
    }
    console.log(data);
    axios.post('http://127.0.0.1:8000/api/google/', data)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
    
  }

  const onFailure = (err) => {
    console.log('failed:', err);
  };


  const text_css = {
    fontFamily:'var(--chakra-fonts-body)',
    fontWeight:'550',
    color: "rgb(51, 51, 51)",
    fontSize: "18px",
  };

  const handleEmailChange = (e) => {
    setNewUserEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      email: newUserEmail,
      password: newPassword
    }
    axios.post('http://127.0.0.1:8000/api/login/', data)
    .then((response) => {
      console.log(response.data)
      if (!response.data){
        alert("User Can't Found");
      }
      else{
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.log(error.response.data)
    })
  }
 
  return (
    <>
      <Flex flexDirection='row' justifyContent="center">
        <Box
          w='65%'
          p='2%'
        ><Image src={Signup} w='100%'/> </Box>
        <Box
          w="50%"
          m="5%"
          h="calc(100vh - 20vh)"
          boxShadow="1px 1px 2px 2px #004aad"
          borderRadius="8px"
          p="2%"
        >
          <Text fontFamily='sans-serif' fontWeight='600' textAlign='center' fontSize='30px'>
            LOGIN
          </Text>
          <Box>
            <form onSubmit={handleLogin}>
            <FormControl isRequired mb="30px">
              <FormLabel>EMAIL ID</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <FontAwesomeIcon icon={faEnvelope} color='gray.300' />
                </InputLeftElement>
                <Input type='email' placeholder='Email' value={newUserEmail} onChange={handleEmailChange} />
              </InputGroup>
            </FormControl>
            <FormControl isRequired mb="30px">
              <FormLabel>PASSWORD</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <FontAwesomeIcon icon={faLock} color='gray.300' />
                </InputLeftElement>
                <Input  type={show ? 'text' : 'password'}placeholder='Enter password' value={newPassword} onChange={handlePasswordChange} />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-evenly"
              mt="15px"
            >
              <Button
              backgroundColor="#004aad"
              color='white'
              size="sm"
              type="submit"
              mt="15px"
              mb='20px'
              w='100px'
            >
              LOGIN
            </Button>
            
              <Box mb="25px" mt='20px' className='navhover'>
                Forgot Password <FontAwesomeIcon icon={faArrowRight} />
              </Box>
            </Box>

            <Text style={text_css} textAlign='center'>OR</Text>
            <Text style={text_css} textAlign='center'>LOGIN IN WITH</Text>

            <Box
              mt='3%'
              display='flex'
              justifyContent='center'
              gap={8} 
              mb='2%'
            >
              <GoogleLogin
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            
        />
              {/*<Tooltip label='Google' placement='bottom-start'>
                <FontAwesomeIcon icon={faGoogle} size='2x'onClick={() => login()}/>
              </Tooltip>
              <Tooltip label='LinkedIn' placement='bottom-start'>
                <FontAwesomeIcon icon={faLinkedin} size='2x'/>
  </Tooltip>*/}
            </Box>
            
            <hr></hr>

            <Text mt='2%' textAlign='center' style={text_css}>
                Don't have an account? <Link to="/register" className='navhover'>Register <FontAwesomeIcon icon={faArrowRight} /> </Link>
            </Text>
            </form>  
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default Login

import React, { useState } from 'react';
import axios from 'axios';
import { Box, Flex, Button, Input, Text, Image, InputGroup, InputLeftElement, InputRightElement, FormControl, FormLabel, Tooltip } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBuilding, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import Signup from '../Signup.png';

function Register() {
  const [show, setShow] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newCompanyName, setNewCompanyName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newConfirmPassword, setNewConfirmPassword] = useState('')

  const text_css = {
    fontFamily:'var(--chakra-fonts-body)',
    fontWeight:'550',
    color: "rgb(51, 51, 51)",
    fontSize: "18px",
  };

  const handleClick = () => setShow(!show);

  const handleEmailChange = (e) => {
    setNewUserEmail(e.target.value);
  }

  const handleCompanyNameChange = (e) => {
    setNewCompanyName(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  }

  const handleComfirmPasswordChange = (e) => {
    setNewConfirmPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === newConfirmPassword){
      const data = {
        email: newUserEmail,
        companyname: newCompanyName,
        password: newPassword,
        confirmpassword: newConfirmPassword,
      }

      axios.post('http://127.0.0.1:8000/api/signup/', data)
      .then((response) => {
        console.log("SignUped!")
        console.log(response)
        if (!response.data){
          alert("User Can't Found or not Registered");
        } else{
          console.log(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
    else{
      alert("Password Mismatch!")
    }
  };

  return (
    <>
      <Flex justifyContent="center">
        <Box w='65%' p='2%'><Image src={Signup} w='100%' /></Box>
        <Box w="50%" m="5%" h="calc(100vh - 20vh)" boxShadow="1px 1px 2px 2px #004aad" borderRadius="8px" pl="2%" pr='2%' pt='10px'>
          <Text fontFamily='sans-serif' fontWeight='600' textAlign='center' fontSize='20px'>SIGNUP</Text>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired mb="10px">
              <FormLabel fontSize='13px'>EMAIL ID</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <FontAwesomeIcon icon={faEnvelope} color='gray.300' />
                </InputLeftElement>
                <Input type='email' name='email' placeholder='Email' value={newUserEmail} onChange={handleEmailChange} />
              </InputGroup>
            </FormControl>
            <FormControl isRequired mb="10px">
              <FormLabel fontSize='13px'>COMPANY NAME</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <FontAwesomeIcon icon={faBuilding} color='gray.300' />
                </InputLeftElement>
                <Input type='text' name='companyName' placeholder='Company Name' value={newCompanyName} onChange={handleCompanyNameChange} />
              </InputGroup>
            </FormControl>
            <FormControl isRequired mb="10px">
              <FormLabel fontSize='13px'>PASSWORD</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <FontAwesomeIcon icon={faLock} color='gray.300' />
                </InputLeftElement>
                <Input type={show ? 'text' : 'password'} name='password' placeholder='Enter password' value={newPassword} onChange={handlePasswordChange} />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>{show ? 'Hide' : 'Show'}</Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired mb="10px">
              <FormLabel fontSize='13px'>CONFIRM PASSWORD</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <FontAwesomeIcon icon={faLock} color='gray.300' />
                </InputLeftElement>
                <Input type={show ? 'text' : 'password'} name='confirmPassword' placeholder='Re-Enter password' value={newConfirmPassword} onChange={handleComfirmPasswordChange} />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>{show ? 'Hide' : 'Show'}</Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button backgroundColor='#004aad' color='white' size="sm" type="submit" ml="41%" mt="5px" mb='10px'>SUBMIT</Button>
          </form>
          <hr></hr>

          <Text textAlign='center' style={text_css}>Continue SignUp with</Text>
          <Box
              mt='10px'
              display='flex'
              justifyContent='center'
              gap={8} 
              mb='5px'
            >
              <Tooltip label='Google' placement='bottom-start'>
                <FontAwesomeIcon icon={faGoogle} size='2x'/>
              </Tooltip>
              <Tooltip label='LinkedIn' placement='bottom-start'>
                <FontAwesomeIcon icon={faLinkedin} size='2x'/>
              </Tooltip>
            </Box>
          <hr></hr>
          <Text textAlign='center' style={text_css}>Already Have an account? <Link to='/login' className='navhover'>Login <FontAwesomeIcon icon={faArrowRight} /></Link></Text>
        </Box>
      </Flex>
    </>
  );
}

export default Register;

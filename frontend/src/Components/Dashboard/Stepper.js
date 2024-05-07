import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Button, FormLabel, Input, FormControl, Text, VStack, HStack, CircularProgress, CircularProgressLabel, SkeletonText, Spinner } from '@chakra-ui/react'; // Import ChakraProvider, Box, and Button
import { Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, StepTitle, StepDescription, StepSeparator } from '@chakra-ui/react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { CheckCircleIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion';
import { useUser } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const homeContent = {
  fontFamily:'Cambria',
  fontSize:'45px',
  fontWeight:'1000',
}

const AnimatedCheckCircleIcon = motion(CheckCircleIcon);

const AnimatedCheckCircle = () => {
  // Define the animation properties
  const iconAnimation = {
      initial: { scale: 0, opacity: 0 },
      animate: {
          scale: [1, 1.2, 1],
          opacity: [1, 0.8, 1, 0.8, 1],
          transition: { duration: 0.8, times: [0, 0.2, 0.4, 0.6, 1] },
      },
  };

  // Render the animated icon
  return (
      <Box>
          <AnimatedCheckCircleIcon
              w={12}
              h={12}
              color="blue.500"
              initial={iconAnimation.initial}
              animate={iconAnimation.animate}
          />
      </Box>
  );
};




const text_css = {
  fontFamily:'var(--chakra-fonts-body)',
  fontWeight:'550',
  color: "rgb(51, 51, 51)",
  fontSize: "20px",
};

function Stepperui() {

  const [companyName, setCompanyName] = useState('');
  const [linkedInProgress, setLinkedInProgress] = useState(false);
  const [googleMapProgress, setGoogleMapProgress] = useState(false);
  const [ambitionBoxProgress, setAmbitionBoxProgress] = useState(false);
  const [glassDoorProgress, setGlassDoorProgress] = useState(false);

  const userString = sessionStorage.getItem('user');
  const user = JSON.parse(userString);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user.email);
    if(!user.email){
      navigate('/')
    }
  },[])
  
  

  const handleCompanyName = (e) => {
    setCompanyName(e.target.value)
  }

  async function getCurrentDateTime() {
    // Create a new Date object to get the current date and time
    const now = new Date();

    // Define options for formatting the date and time
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    // Format the date and time using toLocaleString with specified options
    const formattedDateTime = now.toLocaleString('en-GB', options);

    // Return the formatted date and time
    return formattedDateTime;
}

  const steps = [
    { title: 'First', description: 'Stock Info' },
    { title: 'Second', description: 'Processing Progress' },
    { title: 'Third', description: 'Analysis/Visualization' },
  ];

  // State to track active step
  const [activeStep, setActiveStep] = useState(0);

  // Function to handle moving to the next step
  const handleNextStep = () => {
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleExecution = async () => {
    setGoogleMapProgress(false);
    setAmbitionBoxProgress(false);
    const data = {
      "companyName": companyName,
      "email": user.email,
      "date_time": await getCurrentDateTime(),
    }
    axios.post('http://localhost:3001/google/excel/', data)
    .then((response) => {
      console.log(response.data)
      setGoogleMapProgress(true);
    })
    .catch((error) => {
      console.log(error);
    })
    axios.post('http://localhost:3001/ambition/excel/', data)
    .then((response) => {
      console.log(response.data)
      setAmbitionBoxProgress(true);
    })
    .catch((error) => {
      console.log(error);
    })
    setActiveStep(prevStep => prevStep + 1);
  };
  

  // Function to handle moving to the previous step
  const handlePrevStep = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="left">
        <Box
          w="20%"
          ml="1.3%"
          p="1%"
          backgroundImage="radial-gradient( circle 935px at 3.1% 5.8%, rgba(150, 179, 224,1) 0%,   rgba(198, 231, 2471)   100.2% )"
          borderRadius="8px"
        >
          <ChakraProvider>
            {" "}
            {/* Wrap your components with ChakraProvider */}
            <Box maxWidth="400px" margin="auto">
              {" "}
              {/* Wrap your Stepper inside a Box for styling */}
              <Stepper
                index={activeStep}
                orientation="vertical"
                height="490px"
                gap="0"
              >
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <Box flexShrink="0">
                      <StepTitle fontSize="20px">{step.title}</StepTitle>
                      <StepDescription style={text_css}>
                        {step.description}
                      </StepDescription>
                    </Box>

                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
            </Box>
          </ChakraProvider>
        </Box>

        <Box w="80%">
          {/* Render different components based on the active step */}
          {activeStep === 0 && <Box w='70%' ml='1%' p='4%' borderRadius='8px' border='2px solid #004aad' h='calc(100vh - 18vh)' display='flex' flexDirection='column'>
                                    <Text style={homeContent} textAlign='center' color='#004aad'>Stock Info</Text>
                                    <FormControl  mt='6%' display='flex' flexDirection='row' isRequired>
                                      <FormLabel style={text_css} w='30%' ml='3%'>Stock to Analyse</FormLabel>
                                      <Input w='60%' placeholder='Company name / BSE Scrip code' onChange={handleCompanyName} value={companyName} type='text'/>
                                    </FormControl>
                                    <FormControl mt='6%' display='flex' flexDirection='row' isRequired>
                                      <FormLabel style={text_css} w='30%' ml='3%'>From Date</FormLabel>
                                      <Input w='60%' placeholder='dd-mm-yyyy' type='date'/>
                                    </FormControl>
                                    <FormControl mt='6%' display='flex' flexDirection='row' isRequired>
                                      <FormLabel style={text_css} w='30%' ml='3%'>To Date</FormLabel>
                                      <Input w='60%' placeholder='dd-mm-yyyy' type='date'/>
                                    </FormControl>
                                  </Box>}
          {activeStep === 1 && <Box w='70%' ml='1%' p='4%' borderRadius='8px' border='2px solid #004aad' h='calc(100vh - 18vh)' display='flex' flexDirection='column'>
    <Text style={homeContent} textAlign='center' color='#004aad'>Processing Progress</Text>
    <Box display='flex' flexDirection='row' w='100%' h='500px'>
    <Box boxShadow='1px 1px 8px #004aad' borderRadius='8px' w='40%'mr='20%' mt='5%' h='80px' display='flex' justifyContent='center'>
      <HStack>
        <Text style={text_css}>LinkedIn</Text>
        {linkedInProgress ? <AnimatedCheckCircle/> : <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>}
      </HStack>
    </Box>
    <Box boxShadow='1px 1px 8px #004aad' borderRadius='8px' w='40%' h='80px' mt='5%' display='flex' justifyContent='center'>
      <HStack>
        <Text style={text_css}>AmbitionBox</Text>
        {ambitionBoxProgress ? <AnimatedCheckCircle/> : <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>}
      </HStack>
    </Box>
    </Box>
    <Box display='flex' flexDirection='row' w='100%' h='500px'>
    <Box boxShadow='1px 1px 8px #004aad' borderRadius='8px' w='40%' mt='-10px' mr='20%' h='80px' display='flex' justifyContent='center'>
      <HStack>
        <Text style={text_css}>Google Maps</Text>
        {googleMapProgress ? <AnimatedCheckCircle/>: <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>}
      </HStack>
    </Box>
    <Box boxShadow='1px 1px 8px #004aad' borderRadius='8px' w='40%' mt='-10px' h='80px' display='flex' justifyContent='center'>
      <HStack>
        <Text style={text_css}>Glassdoor</Text>
        {glassDoorProgress ? <AnimatedCheckCircle/> : <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>}
      </HStack>
    </Box>
    </Box>
    
  </Box>}
          {activeStep === 2 &&   <Box w='70%' ml='1%' p='4%' borderRadius='8px' border='2px solid #004aad' h='calc(100vh - 18vh)' display='flex' flexDirection='column'>
    <Text style={homeContent} textAlign='center' color='#004aad'>Analysis</Text>
    <Box border='2px solid #004aad' w='100%' h='60%' borderRadius='8px' display='flex' justifyContent='center'>
    <SkeletonText mt='4' w='100%' noOfLines={1} skeletonHeight='220px' />
    </Box>
  </Box>}

          {/* Buttons to navigate between steps */}
          <Box position="fixed" top={510} left={600}>
            {activeStep > 0 && (
              <Button
                backgroundColor="#004aad"
                color="white"
                onClick={handlePrevStep}
                mr={4}
              >
                Previous
              </Button>
            )}
            {activeStep < steps.length - 1 && (
              <Button
                backgroundColor="#004aad"
                color="white"
                onClick={handleNextStep}
                mr={4}
              >
                Next
              </Button>
            )}
            {activeStep === 0 && (
              <Button
              backgroundColor="#004aad"
              color="white"
              onClick={handleExecution}
              
            >
              Submit
            </Button>
            )}
          </Box>
        </Box>

        <Box
          w="20%"
          borderRadius="8px"
          ml="-283px"
          overflowY='auto'
          h='calc(100vh - 18vh)x'
          backgroundImage="radial-gradient( circle 935px at 3.1% 5.8%, rgba(150, 179, 224,1) 0%,   rgba(198, 231, 2471)   100.2% )"
        >
          <Text style={text_css} textAlign="center" mt='4%'>
            ACTIVITY
          </Text>
          <VStack justifyContent="space-evenly" gap={8}>
            <Box
              backgroundColor="white"
              w="80%"
              h="100px"
              borderRadius="8px"
              p='2%'
              mt='10%'
            >
              <HStack justify={'space-evenly'}>
                <FontAwesomeIcon icon={faUser}/>
                <Text>Chitra</Text>
                <Text>12/04/24</Text>
              </HStack>
              <hr></hr>
              <HStack>
                <Text mt='2%' textAlign='center'>Company Name - Quess</Text>
              </HStack>
              <Button ml='35%' mt='5%' w='30%' h='30%' backgroundColor='#004aad' color='white'>View</Button>
            </Box>
            <Box
              backgroundColor="white"
              w="80%"
              h="100px"
              borderRadius="8px"
              p='2%'
            >
              <HStack justify={'space-evenly'}>
                <FontAwesomeIcon icon={faUser}/>
                <Text>Gopala</Text>
                <Text>10/04/24</Text>
              </HStack>
              <hr></hr>
              <HStack>
                <Text mt='2%'textAlign='center'>Company Name - Zoho</Text>
              </HStack>
              <Button ml='35%' mt='5%' w='30%' h='30%' backgroundColor='#004aad' color='white'>View</Button>
            </Box>
            <Box
              backgroundColor="white"
              w="80%"
              h="100px"
              borderRadius="8px"
              p='2%'
            >
              <HStack justify={'space-evenly'}>
                <FontAwesomeIcon icon={faUser}/>
                <Text>Chitra</Text>
                <Text>08/04/24</Text>
              </HStack>
              <hr></hr>
              <HStack>
                <Text mt='2%' textAlign='center' >Company Name - Zoho</Text>
              </HStack>
              <Button ml='35%' mt='5%' w='30%' h='30%' backgroundColor='#004aad' color='white'>View</Button>
            </Box>
            <Box
              backgroundColor="white"
              w="80%"
              h="100px"
              borderRadius="8px"
              p='2%'
            >
              <HStack justify={'space-evenly'}>
                <FontAwesomeIcon icon={faUser}/>
                <Text>Chitra</Text>
                <Text>08/04/24</Text>
              </HStack>
              <hr></hr>
              <HStack>
                <Text mt='2%' textAlign='center' >Company Name - Zoho</Text>
              </HStack>
              <Button ml='35%' mt='5%' w='30%' h='30%' backgroundColor='#004aad' color='white'>View</Button>
            </Box>
          </VStack>
        </Box>
      </Box>
    </>
  );
}

export default Stepperui;
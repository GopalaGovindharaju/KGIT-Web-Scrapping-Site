import React from 'react'
import Header from '../Header'
import { Box, VStack, Text, Image} from '@chakra-ui/react'
import body from '../images/home-body.png'

function Home() {
  const homeContent = {
    fontFamily:'Cambria',
    fontSize:'45px',
    fontWeight:'1000',
  }
  return (
    <>
      <VStack>
        <Box w='100%'><Header /></Box>
        <Box display='flex' flexDirection='row'>
          <Box w='50%' mt={0} pt={0}><Text style={homeContent} color='#004aad' ml='8%' textAlign='left'>Discover and Leverage your Employees' Social Influence on your Stock Price </Text><br/>
            <Text w='85%' ml='8%' textAlign='left' fontSize='20px'>Our Quantum Machine Learning and AI-powered Analytics platform offers insights into how employees' social media activities influence market perceptions for traders and publicly traded companies.</Text>
          </Box>
          <Box w='60%'><Image src={body}></Image></Box>
        </Box>
        <Box
        mt='5%'
        w='90%'
        border='2px solid #004aad'
        display='flex' flexDirection='row' borderRadius='8px' backgroundColor='#E7F5FA'>
          <Box w='50%' mt={0} pt={0}>
          <Text style={homeContent} color='#004aad' ml='8%' textAlign='left'>Social Insight</Text><br/>
          <Text w='85%' ml='8%' textAlign='left' fontSize='20px'>Explore the public social media interactions of your team and leadership to uncover valuable insights into market trends. Our approach focuses on positive engagement and the strategic use of public data for growth and innovation.</Text>
          </Box>
        </Box>
      </VStack>
    </>
  );
}

export default Home

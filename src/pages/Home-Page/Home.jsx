import { Container, Stack, Flex, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HomePageImage, PlayIcon } from '../../assests';
  
const Home = () => {
    return(
    <Container maxW={'7xl'} maxH={'auto'} backgroundColor={'#e5e5f7'} opacity={'0.8'} backgroundImage={'radial-gradient(#444cf7 0.5px, transparent 0.5px), radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px)'} backgroundSize={'20px 20px'} backgroundPosition={'0 0,10px 10px'}>
		<Stack paddingTop={'3'} width={'fit-content'} paddingLeft={'90%'} >
            <Button as={Link} to={'login'} variant={'outline'} colorScheme={'primary.400'} bg={'whiteAlpha.600'} color={'primary.400'} size={'md'} fontWeight={'normal'} fontSize={'xl'} _hover={{ bg: 'primary.400',color:'whiteAlpha.900'}}>
				Login
			</Button>
		</Stack>
    	<Stack align={'center'} spacing={{ base: 8, md: 10 }} py={{ base: 20, md: 14 }} px={{ base: 2, md: 6 }} direction={{ base: 'column', md: 'row' }}>
      		<Stack flex={1} spacing={{ base: 5, md: 10 }} paddingLeft={{ base: 1, lg: 8}}>
				<Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', lg: '7xl' }}>
				<Text as={'span'} position={'relative'} _after={{content: "''",width: 'full',height: '28%',position: 'absolute',bottom: 3,left: 0,bg: 'red.400',zIndex: -1}}>
					Unlock your potential
				</Text>
				<br />
				<Text as={'span'} color={'primary.400'}>
					use everywhere!
				</Text>
				</Heading>
				<Text color={'gray.800'} fontSize={'xl'} fontWeight={'medium'} fontFamily={'cursive'}>
				Life is habit. Or rather life is a succession of habits. 
				</Text>
				<Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'column', sm: 'row' }}>
					<Button as={Link} to={'login'} rounded={'xl'} size={'lg'} fontWeight={'normal'} px={6} colorScheme={'red'} bg={'red.400'} _hover={{ bg: 'red.500' }}>
						Join Now!
					</Button>
					<Button rounded={'full'} size={'lg'} fontWeight={'normal'} px={6} leftIcon={<PlayIcon h={4} w={4} color={'gray.400'}/>}>
						How It Works
					</Button>
				</Stack>
      		</Stack>
			<Flex flex={'1'} justify={'center'} align={'center'} position={'relative'} w={'full'}>
				<HomePageImage alt={'Hero Image'} align={'center'} w={'80%'} h={'100%'} />
			</Flex>
    	</Stack>
  	</Container>);
}

export default Home;
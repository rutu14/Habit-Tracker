import { Box, Button, Container, Divider, FormControl, FormLabel, Heading, HStack, Input, Stack, Text, useToast} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { signupUser, userSelector } from "../../redux/auth";
import { emailRegex, passwordRegex } from "../../utils";

const Register = () => {
    const toast = useToast();
	const dispatch = useDispatch();
    const navigate = useNavigate();

	const [ signupInputs, setSignupInputs ] = useState({firstname: "" ,lastname: "",email:"",password:""})
  	const { isFetching, isSuccess, isError, errorMessage } = useSelector( userSelector );

    const onSubmit = () => {
        if( signupInputs.firstname === "" || signupInputs.lastname === "" || signupInputs.email === "" || signupInputs.password === "" ){
            toast({
                title: 'Please fill empty the input values',
                status: 'warning',
                variant:'left-accent',
                isClosable: true,
            });
        }else if( !signupInputs.email.match(emailRegex)){
            toast({
                title: 'Please provide a valid email',
                status: 'warning',
                variant:'left-accent',
                isClosable: true,
            });
        }else if( !signupInputs.password.match(passwordRegex)){
            toast({
                title: 'Password Requirements: at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, Can contain special characters',
                status: 'warning',
                variant:'left-accent',
                isClosable: true,
            });
        }else{
			dispatch(signupUser(signupInputs));
        }
	}
    const handleChange = e => {
        const { name, value } = e.target;
        setSignupInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        if (isError) {
            toast({
                title: errorMessage,
                status: 'error',
                variant:'left-accent',
                isClosable: true,
            })
        }
        if (isSuccess) {
            setTimeout(() => {navigate('/dashboard')}, 0);
        }
    }, [isError, isSuccess]);

    return (
	<Box backgroundColor={'#e5e5f7'} opacity={'0.8'} backgroundImage={'radial-gradient(#444cf7 0.5px, transparent 0.5px), radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px)'} backgroundSize={'20px 20px'} backgroundPosition={ '0 0,10px 10px' }>
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} fontFamily={'lato'}>
		<Stack spacing="8">
		<Stack spacing="6">
			<Stack spacing={{ base: '2', md: '3' }} textAlign="center">
				<Heading fontSize={{ base: 'xl', md: '3xl' }} fontFamily={'lato'}>
					Sign Up
				</Heading>
			</Stack>
		</Stack>
		<Box py={{ base: '0', sm: '8' }} px={{ base: '6', sm: '10' }} bg={'whiteAlpha.800'} boxShadow={{ base: 'none', sm: 'md' }} borderRadius={{ base: 'none', sm: 'xl' }}>
			<Stack spacing="6">
				<Stack spacing="5">
                <HStack>
                    <FormControl isRequired>
						<FormLabel htmlFor="firstname">First Name</FormLabel>
						<Input id="firstname" type="text" value={signupInputs.firstname} name='firstname' onChange={handleChange}/>
					</FormControl>
                    <FormControl isRequired>
						<FormLabel htmlFor="lastname">Last Name</FormLabel>
						<Input id="lastname" type="text" value={signupInputs.lastname} name='lastname' onChange={handleChange}/>
					</FormControl>
                </HStack>
					<FormControl isRequired>
						<FormLabel htmlFor="email">Email</FormLabel>
						<Input id="email" type="email" value={signupInputs.email} name='email' onChange={handleChange}/>
					</FormControl>
					<FormControl isRequired>
						<FormLabel htmlFor="password">Password</FormLabel>
						<Input id="password" type="password" value={signupInputs.password} name='password' onChange={handleChange}/>
					</FormControl>
				</Stack>
				<Stack spacing="6">
					<Button variant={"solid"} color={'whiteAlpha.900'} bg={'primary.400'} fontWeight={'normal'} fontSize={'xl'} _hover={{ bg: 'primary.300',color:'whiteAlpha.900'}} onClick={onSubmit} disabled={isFetching}>
						Sign up
					</Button>
					<Divider borderBottomWidth={2} borderBottomColor={'purple.300'} />
					<HStack spacing="1" justify="center">
						<Text color="muted">Already have an account?</Text>
						<Button as={Link} to={'/login'}  variant="link" colorScheme="purple">Login</Button>
					</HStack>
				</Stack>
			</Stack>
		</Box>
		</Stack>
	</Container>
	</Box>
    )
}

export default Register
import { Box, Button, extendTheme } from "@chakra-ui/react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import { Archive, Dashboard, EditHabit, Home, Journal, Label, Login, Register } from "./pages";
import { userSelector } from "./redux/auth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";

export const theme = extendTheme({
    colors: {
      primary: {
        200:'#CDC9FF',
        300:'#8682FF',
        400:'#6C63FF'
      },
    },
})

const PrivateRoute = () => {
    const { user } = useSelector( userSelector );
    const tokenPresent = user ? true : false;

    const PageLayout = () => {
        return(
            <Box maxW={'full'} minH={'100vh'} py={{ base: '12', md: '7' }} px={{ base: '0', sm: '8' }} fontFamily={'lato'} backgroundColor={'#e5e5f7'} opacity={'0.8'} backgroundImage={'radial-gradient(#444cf7 0.5px, transparent 0.5px), radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px)'} backgroundSize={'20px 20px'} backgroundPosition={ '0 0,10px 10px' } zIndex={'-1'}>
                <Navbar/>
                <Outlet/>
            </Box>); 
    }

    return tokenPresent 
            ?  <PageLayout/>
            :   <Navigate to="/login" />;
}

const AuthLayout = () => {
    return (
    <>
    <Button as={Link} to={'/'}  fontWeight={'normal'} fontFamily={'cursive'} color={'primary.400'} position={'absolute'} ml={3} mt={3} fontSize={'xl'} zIndex={2} p={'2px 9px'} borderRadius={'11%'} _hover={{bg:'linear-gradient(299deg, rgba(229,229,247,1) 0%, rgba(136,130,240,1) 100%)', color:'gray.900', transition:'background 1s ease-in-out' }}>
    Home 
    </Button>
    <Outlet/>
    </>
    );
}

function App () {
    return (
        <Routes>
            <Route index element={<Home/>}/>
            <Route element={<AuthLayout/>}>
                <Route path='login' element={<Login/>}/>
                <Route path='signup' element={<Register/>}/>
            </Route>
            <Route element={<PrivateRoute/>}>
			    <Route path='dashboard' element={<Dashboard/>}/>
                <Route path='journal' element={<Journal/>}/>
                <Route path='edit' element={<EditHabit/>}/>
                <Route path='label' element={<Label/>}/>
                <Route path='archive' element={<Archive/>}/>
            </Route>
        </Routes>
      );
    }
    
export default App;

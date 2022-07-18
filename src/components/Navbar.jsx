import { Avatar, Box, Center, Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Tooltip } from "@chakra-ui/react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logOut } from "../redux/auth";
import { ArchiveIcon, HabitIcon, HomeIcon, TagIcon } from "../assests";
import { Link } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOutOption = () => {
        dispatch(logOut());
        navigate("/");
    }

    return(
        <Center>
        <Box className="naav" alignItems={'center'} borderColor={'blackAlpha.900'} padding={'10px 22px'} display={'inline-flex'} borderRadius={'xl'}> 

            <Flex minW={'30%'} height={'36px'} justifyContent={'space-evenly'}>
            <Tooltip label='Home' fontSize='sm'>
                <Link to={'dashboard'}>
                    <IconButton fontSize={'4xl'} variant={'link'} colorScheme={'purple'} icon={<HomeIcon/>}></IconButton>
                </Link>
            </Tooltip>
            <Tooltip label='Label' fontSize='sm'>
                <Link to={'label'}>
                    <IconButton fontSize={'4xl'} variant={'link'} colorScheme={'purple'} icon={<TagIcon/>}></IconButton>
                </Link>    
            </Tooltip>
            <Tooltip label='Habits' fontSize='sm'>
                <Link to={'journal'}>
                    <IconButton fontSize={'4xl'} variant={'link'} colorScheme={'purple'} icon={<HabitIcon/>}></IconButton>
                </Link>    
            </Tooltip>
            <Tooltip label='Archive' fontSize='sm'>
                <Link to={'archive'}>
                    <IconButton fontSize={'4xl'} variant={'link'} colorScheme={'purple'} icon={<ArchiveIcon/>}></IconButton>
                </Link>    
            </Tooltip>
            </Flex>
            <Heading minW={'60%'} textAlign={'center'} fontFamily={'monospace'} fontSize={'2xl'}>Hola Rutuja</Heading>
                <Menu>
                    <MenuButton marginLeft={'auto'} >
                    <Avatar colorScheme={'purple'} name='X L' />
                    </MenuButton>
                    <MenuList>
                        <MenuItem fontSize={'md'} onClick={logOutOption}>Log Out</MenuItem>
                    </MenuList>
                    </Menu>

            </Box>
            </Center>
    );
}

export default Navbar;
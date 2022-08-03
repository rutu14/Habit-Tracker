import {Avatar, Box, Center, Flex, Heading, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { logOut } from "../redux";
import { ArchiveIcon, HabitIcon, HomeIcon, TagIcon } from "../assests";
import { greetingWord } from "../utils";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [greet, setGreet] = useState();  
    const avatarName = localStorage.getItem('avatarName');
    const userName = localStorage.getItem('userName');

    useEffect(()=>{
       setGreet(greetingWord);
    },[])

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
            <Tooltip label='Journal' fontSize='sm'>
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
            <Heading minW={'60%'} textAlign={'center'} fontFamily={'monospace'} fontSize={'2xl'} fontWeight={'normal'}>{greet} {userName}</Heading>
                <Menu>
                    <MenuButton marginLeft={'auto'} >
                    <Avatar colorScheme={'purple'} name={avatarName} />
                    </MenuButton>
                    <MenuList>
                        <Link to={'dashboard'}><MenuItem fontSize={'md'}>Dashboard</MenuItem></Link>
                        <Link to={'label'}><MenuItem fontSize={'md'}>Labels</MenuItem></Link>
                        <Link to={'journal'}><MenuItem fontSize={'md'}>Journal</MenuItem></Link>
                        <Link to={'archive'}><MenuItem fontSize={'md'}>Archives</MenuItem></Link>
                        <MenuDivider/>
                        <MenuItem fontSize={'md'} onClick={logOutOption}>Log Out</MenuItem>
                    </MenuList>
                    </Menu>

            </Box>
            </Center>
    );
}

export default Navbar;
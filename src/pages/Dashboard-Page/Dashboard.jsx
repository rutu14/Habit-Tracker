import { Badge, Box, Center, Flex, Heading, IconButton, Spinner, Text, useDisclosure, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton } from "@chakra-ui/react"
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllHabits, habitSelector } from "../../redux/habits";
import { AddIcon, PinIcon } from "../../assests";
import AddHabit from "../../components/AddHabit";
import { getLabels, labelSelector } from "../../redux/label";

 
const Dashboard = () => {
    const [pinnedHabit, setPinnedHabit] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllHabits());
        dispatch(getLabels());
    },[]);

    const { habits, isFetching } = useSelector( habitSelector );
    const { labels, isLabelFetching } = useSelector( labelSelector );

    useEffect(() => {
        if( habits.length > 3) {
            setPinnedHabit(habits.slice(0, 4))
        }else{
            setPinnedHabit(habits);
        }
    },[habits]);
    
    const displayLabel = (labelName) => {
        const colorIndex = labels.findIndex( label => labelName === label.labelName );
        if( colorIndex !== -1 ){
            if( labels[colorIndex].color === 'default') return 'purple';
            return labels[colorIndex].color;
        }
    }

    return(
      <Box minH={'calc(100vh - 124px)'}>
        { isFetching && <Center><Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='purple.500' size='xl'/></Center>}
        {
            habits.length === 0 ? 
            <Box bg={'#bbb1af'} margin={'4'} marginTop={'10'} borderRadius={'md'} minH={'64'} boxShadow={'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px'}>
                <IconButton onClick={onOpen} marginLeft={'95%'} marginTop={'2%'} fontSize={'4xl'} variant={'link'} color={'#80220d'} icon={<AddIcon/>}></IconButton> 
                <Center><Heading color={'#320604'}>
                    Add new habits????
                </Heading></Center>
            </Box> 
            : 
            <Box bg={'#bbb1af'} margin={'4'} marginTop={'10'} borderRadius={'md'} minH={'64'} boxShadow={'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px'}>
                <Heading fontFamily={'monospace'} color={'red.800'} position={'absolute'} marginLeft={'35%'} marginTop={'1%'}>Habit Board</Heading>
                <IconButton onClick={onOpen} marginLeft={'95%'} marginTop={'2%'} fontSize={'4xl'} variant={'link'} color={'#80220d'} icon={<AddIcon/>}></IconButton>
                <Flex justifyContent={'center'}>
                {habits && pinnedHabit.map( habit => {
                    const start = new Date( habit.startDate).toLocaleDateString('en-GB');
                    const end = new Date( habit.endDate).toLocaleDateString('en-GB');
                    return(
                        <Box w={'60'} h={'48'} p={'10px 15px'} m={'4'} key={habit._id} backgroundColor={habit.color !== 'default' ?`${habit.color}.100`:'purple.100'} borderRadius={'md'}>
                            <PinIcon position={'absolute'} width={'36px'} height={'36px'} transform={'rotate(-45deg) translate(1px, -14px) rotateZ(10deg)'} color={'facebook.700'}></PinIcon>
                            <Heading fontFamily={'monospace'} fontSize={'xl'} color={'green.600'} textAlign={'center'} overflowY={'clip'} minH={'50px'} maxH={'50px'}>{habit.title}</Heading>
                            <Flex justifyContent={'center'}><Text color={'purple.700'}  fontSize={'xl'}>{start} - {end}</Text></Flex>
                            <Text marginTop={'1'} color={'pink.800'} fontSize={'lg'}>Reminder: {habit.reminder ? habit.reminder : "None Setup???"} </Text>
                            <Text marginTop={'1'} color={'pink.800'} fontSize={'lg'}>Goal: {habit.goal ? habit.goal : "None Setup???"} </Text>
                            {habit.label ? 
                            <Popover>
                                <PopoverTrigger>                                    
                                    <Flex justifyContent={'flex-start'} overflowX={'clip'}>
                                        {habit.label.map((label) => <Badge variant='subtle' borderRadius={'3'} marginTop={'5px'} marginRight={'5px'} colorScheme={displayLabel(label)}>{label}</Badge>)}
                                    </Flex> 
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverHeader>Labels Present</PopoverHeader>
                                        <PopoverBody>{habit.label.map((label) => <Badge variant='subtle' borderRadius={'3'} marginTop={'5px'} marginRight={'5px'} colorScheme={displayLabel(label)}>{label}</Badge>)}</PopoverBody>
                                    </PopoverContent>
                                    </Popover>
                             : ''}
                        </Box>
                    )
                })}
                </Flex> 
            </Box>
        }
        <AddHabit isOpen={isOpen} onClose={onClose}/>
        </Box>
    )
}

export default Dashboard;
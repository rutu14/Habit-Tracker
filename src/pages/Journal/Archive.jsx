import { Badge, Box, Button, Center, CircularProgress, Flex, Heading, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text, Tooltip, useDisclosure, useToast} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getArchive, habitSelector, restoreArchive, labelSelector  } from "../../redux";
import { ArchiveActionIcon, DeleteActionIcon, PinIcon } from "../../assests";
import { AlertDialogBox } from "../../components";

const Archive = () => {
    const toast = useToast();
    const [actions, setActions] = useState(false);
    const dispatch = useDispatch(); 
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        dispatch(getArchive());
    },[]);

    const { archives,isGetArchiveFetching } = useSelector(habitSelector);
    const { labels } = useSelector( labelSelector );

    const displayActions = () => setActions(!actions);
    const restoreArchivedHabit = (habitId) => dispatch(restoreArchive({habitId,toast}));
    const deleteArchivedHabit = () => onOpen(); 

    const displayLabel = (labelName) => {
        const colorIndex = labels.findIndex( label => labelName === label.labelName );
        if( colorIndex !== -1 ){
            if( labels[colorIndex].color === 'default') return 'purple';
            return labels[colorIndex].color;
        }
    }
    
    return(
        <Box minH={'calc(100vh - 124px)'}>
        { isGetArchiveFetching ? 
        <Center minH={'inherit'}>
            <Flex padding={'5'} borderRadius={'xl'} bg={'rgba(63, 57, 57, 0.2)'} backdropFilter={'blur(2px)'} boxShadow={'0 4px 30px rgba(0, 0, 0, 0.1)'} >
                <CircularProgress isIndeterminate color='primary.300' thickness={'10px'} size={'90px'} />
            </Flex>
        </Center>
        :
              archives.length === 0 ? 
              <Box bg={'#bbb1af'} margin={'4'} marginTop={'10'} borderRadius={'md'} minH={'64'} boxShadow={'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px'}>
                  <Center><Heading mt={'20'} color={'#320604'}>
                      Move your Habits to Archive 🗃
                  </Heading></Center>
              </Box> 
              : 
              <>
              <Box bg={'#bbb1af'} margin={'4'} marginTop={'10'} borderRadius={'md'} minH={'64'} boxShadow={'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px'}>
                <Flex width={'full'} height={'14'}>
                <Button pos={'absolute'} left={'6%'} marginTop={'1%'} color={'#ffffff'} bg={'red.800'} _hover={{bg:'red.600'}} onClick={displayActions}>{ !actions ? 'Show Actions' : 'Close Actions' }</Button>
                  <Heading fontFamily={'monospace'} color={'red.800'} position={'absolute'} marginLeft={'35%'} marginTop={'1%'}>Archives</Heading>
                  </Flex>
                  <Flex wrap={'wrap'} justifyContent={'center'}>
                  {archives && archives.map( habit => {
                      const start = new Date( habit.startDate).toLocaleDateString('en-GB');
                      const end = new Date( habit.endDate).toLocaleDateString('en-GB');
                      return(<>
                          <Box w={'60'} h={'48'} p={'10px 15px'} m={'4'} key={habit._id} backgroundColor={habit.color !== 'default' ?`${habit.color}.100`:'purple.100'} borderRadius={'md'}>
                              {actions ? <Box bg={'#ffffffa6'} h={'inherit'} w={'inherit'} pos={'absolute'} zIndex={'4'} borderRadius={'inherit'} transform={'translate(-14px, -11px)'}>
                              <Flex bg={'gray.700'} pos={'absolute'} transform={'translate(68px, 68px)'} borderRadius={'5px'} padding={'4px'}>
                                <Tooltip label='Delete Archive' fontSize='xs'>
                                  <IconButton padding={'6px'} onClick={()=>deleteArchivedHabit()} fontSize={'4xl'} variant={'link'} color={'red.600'} icon={<DeleteActionIcon/>}></IconButton>
                                </Tooltip>
                                <Tooltip label='Restore Archive' fontSize='xs'>
                                  <IconButton padding={'6px'} onClick={()=>restoreArchivedHabit(habit._id)} fontSize={'4xl'} variant={'link'} color={'red.600'} icon={<ArchiveActionIcon/>}></IconButton>
                                </Tooltip>
                              </Flex> </Box> : ''}
                              <PinIcon position={'absolute'} width={'36px'} height={'36px'} transform={'rotate(-45deg) translate(1px, -14px) rotateZ(10deg)'} color={'facebook.700'}></PinIcon>
                              <Heading fontFamily={'monospace'} fontSize={'xl'} color={'green.600'} textAlign={'center'} overflowY={'clip'} minH={'50px'} maxH={'50px'}>{habit.title}</Heading>
                              <Flex justifyContent={'center'}><Text color={'purple.700'}  fontSize={'xl'}>{start} - {end}</Text></Flex>
                              <Text marginTop={'1'} color={'pink.800'} fontSize={'lg'}>Reminder: {habit.reminder ? habit.reminder : "None Setup⏰"} </Text>
                              <Text marginTop={'1'} color={'pink.800'} fontSize={'lg'}>Goal: {habit.goal ? habit.goal : "None Setup⏰"} </Text>
                              {habit.label ? 
                                  <Popover>
                                  <PopoverTrigger>                                    
                                      <Flex justifyContent={'flex-start'} overflowX={'clip'}>
                                          {habit.label.map((label) => <Badge key={label} variant='subtle' borderRadius={'3'} marginTop={'5px'} marginRight={'5px'} colorScheme={displayLabel(label)}>{label}</Badge>)}
                                      </Flex> 
                                      </PopoverTrigger>
                                      <PopoverContent>
                                          <PopoverArrow />
                                          <PopoverCloseButton />
                                          <PopoverHeader>Labels Present</PopoverHeader>
                                          <PopoverBody>{habit.label.map((label) => <Badge key={label} variant='subtle' borderRadius={'3'} marginTop={'5px'} marginRight={'5px'} colorScheme={displayLabel(label)}>{label}</Badge>)}</PopoverBody>
                                      </PopoverContent>
                                      </Popover>
                              : ''}
                          </Box>
                          <AlertDialogBox isOpen={isOpen} onClose={onClose} type={'archive'}  deleteId={habit._id}/>
                      </>)
                  })}
                  </Flex> 
              </Box>
              </>
        }
        </Box>
      )
}

export default Archive;
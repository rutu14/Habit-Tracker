import { Badge, Box, Button, Center, Checkbox, CheckboxGroup, CircularProgress, Flex, Heading, IconButton, useDisclosure, useToast} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteActionIcon } from "../../assests";
import { AddLabel } from "../../components";
import { deleteaLabel, getLabels, labelSelector } from "../../redux";

const Label = () => {
    const toast = useToast();
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ deleteOption,setDeletOption ] = useState(false);
    const [ toBeDeleted, setToBeDeleted ] = useState();
    const { labels, isLabelFetching } = useSelector( labelSelector );

    useEffect(() => {dispatch(getLabels(toast));},[]);

    const displayDeleteAction = () => setDeletOption(!deleteOption);
    const handleChangeCheckbox = e => setToBeDeleted(e);

    const onDelete = () => {
        if(toBeDeleted.length === 0){
            toast({
                title: "Select a label",
                status: 'warning',
                variant:'left-accent',
                isClosable: true,
            })
        }else{
            toBeDeleted.map( id => dispatch(deleteaLabel({labelId:id,toast})));
            displayDeleteAction();
        }
    }


    return(
        <Box minH={'calc(100vh - 124px)'}>
        { isLabelFetching ? 
            <Center minH={'inherit'}>
                <Flex padding={'5'} borderRadius={'xl'} bg={'rgba(63, 57, 57, 0.2)'} backdropFilter={'blur(2px)'} boxShadow={'0 4px 30px rgba(0, 0, 0, 0.1)'} >
                    <CircularProgress isIndeterminate color='primary.300' thickness={'10px'} size={'90px'} />
                </Flex>
            </Center>
        :(
            <Flex minH={'70vh'} direction={'column'} alignItems={'center'} py={'10'} px={'20'}>
            <Button w={'40'} fontSize={'lg'} color={'#ffffff'} bg={'red.800'} _hover={{bg:'red.600'}} onClick={onOpen}>Create a Label</Button>
                { labels.length === 0 ?
                <Box marginTop={'5'}>
                <Heading color={'#320604'}>Add Labels!</Heading> 
                </Box>
                :
                <Box bg={'#abb4bf'} boxShadow={'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px'} minH={'64'} minW={'full'} marginTop={'5'} py={'3'} px={'16'} borderRadius={'2xl'}>
                    <Flex alignItems={'center'} justifyContent={'center'} >
                    <Heading marginLeft={'auto'} textAlign={'center'} fontFamily={'monospace'} color={'gray.800'}>Labels</Heading> 
                    <IconButton marginLeft={'auto'} padding={'6px'} onClick={displayDeleteAction} fontSize={'3xl'} variant={'link'} color={'red.600'} icon={<DeleteActionIcon/>}></IconButton>
                    </Flex>
                    
                    <Flex wrap={'wrap'} alignItems={'center'} justifyContent={'center'} >
                        {deleteOption ?
                            (<CheckboxGroup onChange={handleChangeCheckbox} colorScheme={'purple'} >
                                    {labels && labels.map((labelDetail) => {
                                        return(<Flex key={labelDetail._id} >
                                            <Checkbox value={labelDetail._id} borderColor={'gray.600'}></Checkbox>
                                            <Badge m={'4'} ml={'1.5'} borderRadius={'md'} fontSize={'xl'} colorScheme={labelDetail.color !== 'default' ? labelDetail.color:'purple'}>{labelDetail.labelName}</Badge>
                                            </Flex>)
                                    })}
                                </CheckboxGroup>)                        
                        :   (<>
                                {labels && labels.map((labelDetail) => {
                                    return(
                                        <Badge key={labelDetail._id} m={'4'} borderRadius={'md'} fontSize={'xl'} colorScheme={labelDetail.color !== 'default' ? labelDetail.color:'purple'}>{labelDetail.labelName}</Badge>
                                    )
                                })}
                            </>)
                            
                        }
                    </Flex>
                    {deleteOption ?
                    <Flex w={'full'} h={'fit-content'} justifyContent={'center'} alignItems={'center'}>
                        <Button marginTop={'5'} fontSize={'2xl'} color={'red.600'} onClick={onDelete}>Delete</Button>
                    </Flex>
                : ''}
            </Box>
            }
            <AddLabel isOpen={isOpen} onClose={onClose}/>
            </Flex>
        )
        }
        </Box>
    )
}

export default Label;
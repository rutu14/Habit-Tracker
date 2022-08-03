import { Box, Button, Checkbox, CheckboxGroup, Flex, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createaHabit, habitSelector, getLabels, labelSelector } from "../redux";
import { capitializeString, colorOption, dateisToday, goalOption, reminderOption } from "../utils";

const AddHabit = ({isOpen,onClose}) => {
    const toast = useToast();
    const dispatch = useDispatch();

    const initialState = {title:"",startDate:"", endDate:"",goal:"",reminder:"",color:"default",status:"active",label:[]}
    const [ habitInputs, setHabitInputs ] = useState(initialState);

    const { isCreateFetching } = useSelector( habitSelector );
    const { labels, isLabelFetching } = useSelector( labelSelector );

    useEffect(() => {
        dispatch(getLabels(toast));
    },[]);
    
    const onSubmit = () => {
        let today = new Date(Date.now());        
        let startDate = dateisToday(habitInputs.startDate,'start');
        let endDate = dateisToday(habitInputs.endDate,'end');
		if( habitInputs.title === "" ){
            toast({
                title: "Provide a title",
                status: 'warning',
                variant:'left-accent',
                isClosable: true,
            })
        }else if( habitInputs.startDate === "" ){
            toast({
                title: "Provide a start date for this habit",
                status: 'warning',
                variant:'left-accent',
                isClosable: true,
            })
        }else if( habitInputs.endDate === "" ){
            toast({
                title: "Provide a end date for this habit",
                status: 'warning',
                variant:'left-accent',
                isClosable: true,
            })
        }else if( startDate.getTime() < today.getTime()){
            toast({
                title: "Starting date can't be in the Past!",
                status: 'warning',
                variant:'left-accent',
                isClosable: true,
            })
        }else if( endDate.getTime() < today.getTime() ){
            toast({
                title: "End date can't be in the Past!",
                status: 'warning',
                variant:'left-accent',
                isClosable: true,
            })
        }else if( endDate.getTime() < startDate.getTime() ){
            toast({
                title: "End date can't be before Start Date!",
                status: 'warning',
                variant:'left-accent',
                isClosable: true,
            })
        }else{
            const createParameter = {habit: habitInputs, toast};
			dispatch(createaHabit(createParameter));
            setHabitInputs(initialState);
            onClose();
        }
	}
    const handleChange = e => {
		const { name, value } = e.target;
		setHabitInputs(prevState => ({
			...prevState,
			[name]: value
		}));
	};

    const handleChangeCheckbox = e => {
        setHabitInputs(prevState => ({
			...prevState,
			'label': e
		}));
    };

    return(
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay py={'5'}  />
        <ModalContent maxW={'2xl'} bg={'#cdcaf6'}>
          <ModalHeader fontWeight={'normal'} fontSize={'2xl'} color={'purple.800'} textAlign={'center'}>Create a Habit 🎯</ModalHeader>
          <ModalCloseButton />
          <ModalBody px={'12'} pb={4}>
          <Stack spacing="8">
          <Stack spacing="5">
					<FormControl isRequired>
						<FormLabel fontWeight={'normal'} fontSize={'lg'} htmlFor="title">Title</FormLabel>
						<Input value={habitInputs.title} onChange={handleChange} name='title' borderColor={'blackAlpha.600'} bg={'blackAlpha.50'} _focus={{bg:'#e6e9f4db'}} id="title" type="text" />
					</FormControl>
                    <HStack>
                        <FormControl isRequired>
                            <FormLabel fontWeight={'normal'} htmlFor="start-date">Start Date</FormLabel>
                            <Input value={habitInputs.startDate} onChange={handleChange} name='startDate'  borderColor={'blackAlpha.600'} bg={'blackAlpha.50'} _focus={{bg:'#e6e9f4db'}} id="start-date" type="date" />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel fontWeight={'normal'} htmlFor="end-date">End Date</FormLabel>
                            <Input value={habitInputs.endDate} onChange={handleChange} name='endDate'  borderColor={'blackAlpha.600'} bg={'blackAlpha.50'} _focus={{bg:'#e6e9f4db'}} id="end-date" type="date" />
                        </FormControl>
                    </HStack>
                    <HStack>
                        <Select value={habitInputs.goal} onChange={handleChange} name='goal' borderColor={'blackAlpha.600'} bg={'blackAlpha.50'} _focus={{bg:'#e6e9f4db'}}  variant='outline' placeholder='Select a Goal'>
                        {goalOption.map((goal) => {
                                return(<option key={goal} value={goal}>{goal}</option>);
                            })}
                        </Select>
                        <Select value={habitInputs.reminder} onChange={handleChange} name='reminder'  borderColor={'blackAlpha.600'} bg={'blackAlpha.50'} _focus={{bg:'#e6e9f4db'}} variant='outline' placeholder='Select a Reminder'>
                        {reminderOption.map((reminder) => {
                                return(<option key={reminder} value={reminder}>{reminder}</option>);
                            })}
                        </Select>
                        <Select value={habitInputs.color} onChange={handleChange} name='color' borderColor={'blackAlpha.600'} bg={habitInputs.color !== 'default' ?`${habitInputs.color}.100`:'blackAlpha.50'} _focus={{bg:'#e6e9f4db'}} variant='outline' placeholder='Select a Color'>
                            {colorOption.map((color) => {
                                return(<option key={color} value={color}>{capitializeString(color)}</option>);
                            })}
                        </Select>
                    </HStack>                    
                    <Box border={'1px solid'} borderColor={'blackAlpha.500'} borderRadius={'lg'}>                  
                    <FormLabel fontWeight={'normal'}  bg={'#cdcaf6'} transform={'translate(10px,-15px)'} p={'0 7px'} pos={'absolute'} fontSize={'lg'} htmlFor={'checkboxes'}>Labels</FormLabel>
                    <CheckboxGroup onChange={handleChangeCheckbox} name='label' id={'checkboxes'}colorScheme='purple'>
                        <Stack p={'4'} maxW={'95%'} wrap={'wrap'} justify={labels.length < 5 ? 'start': 'space-evenly'} direction={['column', 'row']}>
                            { isLabelFetching && <Flex w={'100%'} justifyContent={'center'} py={'3'}>
                                <Box className={"dot-typing"}></Box>
                            </Flex>}
                            {labels && labels.map((labelNumber) => {
                                return(<Checkbox key={labelNumber._id} borderColor={'blackAlpha.600'} value={labelNumber.labelName}>{labelNumber.labelName}</Checkbox>);
                            })}
                            {labels && labels.length === 0 && <Flex w={'100%'} justifyContent={'center'} py={'3'}>
                              <Text fontSize={'lg'}>Add Labels</Text>  
                            </Flex>}
                        </Stack>
                    </CheckboxGroup>
                </Box>
				</Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
          <Button colorScheme='red' mr={3} onClick={onClose}>Cancel</Button>
            <Button disabled={isCreateFetching} colorScheme='purple' onClick={onSubmit} >
              Create
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

export default AddHabit;
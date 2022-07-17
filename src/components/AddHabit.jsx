import { Box, Button, Center, Checkbox, CheckboxGroup, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createaHabit, habitSelector } from "../redux/habits";
import { getLabels, labelSelector } from "../redux/label";
import { capitializeString, colorOption, goalOption, reminderOption } from "../utils";

const AddHabit = ({isOpen,onClose}) => {
    const toast = useToast();
    const dispatch = useDispatch();

    const initialState = {title:"",startDate:"", endDate:"",goal:"",reminder:"",color:"default",status:"active",label:[]}
    const [ habitInputs, setHabitInputs ] = useState(initialState);

    const { isCreateFetching } = useSelector( habitSelector );
    const { labels, isLabelFetching } = useSelector( labelSelector );

    useEffect(() => {
        dispatch(getLabels());
    },[]);
    
    const onSubmit = () => {
        let today = new Date(Date.now());
        let startDate = new Date(habitInputs.startDate);
        let endDate = new Date(habitInputs.endDate);
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
        <ModalContent maxW={'2xl'} bg={'#e5e5f7'}>
          <ModalHeader fontSize={'2xl'} color={'red.300'} textAlign={'center'}>Add your Habit</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <Stack spacing="8">
          <Stack spacing="5">
					<FormControl isRequired>
						<FormLabel htmlFor="title">Title</FormLabel>
						<Input value={habitInputs.title} onChange={handleChange} name='title' borderColor={'blackAlpha.600'} bg={'whiteAlpha.300'} id="title" type="text" />
					</FormControl>
                    <HStack>
                        <FormControl isRequired>
                            <FormLabel htmlFor="start-date">Start Date</FormLabel>
                            <Input value={habitInputs.startDate} onChange={handleChange} name='startDate'  borderColor={'blackAlpha.600'}  bg={'whiteAlpha.300'} id="start-date" type="date" />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="end-date">End Date</FormLabel>
                            <Input value={habitInputs.endDate} onChange={handleChange} name='endDate'  borderColor={'blackAlpha.600'}  bg={'whiteAlpha.300'} id="end-date" type="date" />
                        </FormControl>
                    </HStack>
                    <HStack>
                        <Select value={habitInputs.goal} onChange={handleChange} name='goal' borderColor={'blackAlpha.600'}  bg={'whiteAlpha.300'}  variant='outline' placeholder='Select a Goal'>
                        {goalOption.map((goal) => {
                                return(<option key={goal} value={goal}>{goal}</option>);
                            })}
                        </Select>
                        <Select value={habitInputs.reminder} onChange={handleChange} name='reminder'  borderColor={'blackAlpha.600'}  bg={'whiteAlpha.300'}  variant='outline' placeholder='Select a Reminder'>
                        {reminderOption.map((reminder) => {
                                return(<option key={reminder} value={reminder}>{reminder}</option>);
                            })}
                        </Select>
                        <Select value={habitInputs.color} onChange={handleChange} name='color' borderColor={'blackAlpha.600'} bg={habitInputs.color !== 'default' ?`${habitInputs.color}.100`:'whiteAlpha.300'} variant='outline' placeholder='Select a Color'>
                            {colorOption.map((color) => {
                                return(<option key={color} value={color}>{capitializeString(color)}</option>);
                            })}
                        </Select>
                    </HStack>                    
                    <FormLabel htmlFor={'checkboxes'}>Label</FormLabel>
                    <CheckboxGroup onChange={handleChangeCheckbox} name='label' id={'checkboxes'}colorScheme='purple'>
                        <Stack wrap={'wrap'} className={'addHabitCheckbox'} spacing={[1, 5]} direction={['column', 'row']}>
                            { isLabelFetching && <Center className={"dot-typing"}></Center>}
                            {labels && labels.map((labelNumber) => {
                                return(<Checkbox key={labelNumber._id} borderColor={'blackAlpha.600'} value={labelNumber.labelName}>{labelNumber.labelName}</Checkbox>);
                            })}
                            {labels && labels.length == 0 && <Box>Add Labels</Box>}
                        </Stack>
                    </CheckboxGroup>
				</Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
          <Button mr={3} onClick={onClose}>Cancel</Button>
            <Button disabled={isCreateFetching} colorScheme='purple' onClick={onSubmit} >
              Add
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

export default AddHabit;
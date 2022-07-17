import { Box, Button, Center, Checkbox, CheckboxGroup, FormControl, FormLabel, HStack, Input, Select, Stack,  useToast } from "@chakra-ui/react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { editaHabit, habitSelector } from "../../redux/habits";
import { capitializeString, colorOption, goalOption, labels, reminderOption, statusOption } from "../../utils";

const EditHabit = () => {
    const location = useLocation();
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const habitDetail = location.state.habit;
    const { isEditFetching } = useSelector( habitSelector );

    const initialState = {title:habitDetail.title, startDate:habitDetail.startDate, endDate:habitDetail.endDate, goal:habitDetail.goal, reminder:habitDetail.reminder, color:habitDetail.color, status:habitDetail.status ,label:habitDetail.label }
    const [ habitInputs, setHabitInputs ] = useState(initialState); 
    const navigateToJournal = () => navigate('/journal');

    const onSubmit = (e) => {
        e.preventDefault();
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
        }else{
            const editParameter = { habitid:habitDetail._id, habit:habitInputs, toast };
			dispatch(editaHabit(editParameter));
            navigateToJournal();            
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
        <Box spacing="8" bg={'#e5e5f7'} py={'14'} px={'20'}>
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
                    <FormControl>
                        <FormLabel htmlFor="status">Status</FormLabel>
                        <Select value={habitInputs.status} onChange={handleChange} id='status' name='status' borderColor={'blackAlpha.600'} bg={'whiteAlpha.300'} variant='outline'>
                            {statusOption.map((status) => {
                                return(<option key={status} value={status}>{capitializeString(status)}</option>);
                            })}
                        </Select>
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
                    <CheckboxGroup onChange={handleChangeCheckbox} defaultValue={habitInputs.label} name='label' id={'checkboxes'} colorScheme='purple'>
                        <Stack className={'addHabitCheckbox'} spacing={[1, 5]} direction={['column', 'row']}>
                        {labels.map((labelNumber) => {
                                return(<Checkbox key={labelNumber} borderColor={'blackAlpha.600'} value={labelNumber}>{labelNumber}</Checkbox>);
                            })}
                        </Stack>
                    </CheckboxGroup>
                    <Center>
                        <HStack>
                            <Button mr={3} onClick={navigateToJournal}>Cancel</Button>
                            <Button colorScheme='purple' onClick={onSubmit}>Save</Button>
                        </HStack>
                    </Center>
				</Stack>
            </Box>
    )
}

export default EditHabit;
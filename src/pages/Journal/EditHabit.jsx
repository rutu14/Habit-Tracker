import { Box, Button, Center, Checkbox, CheckboxGroup, Flex, FormControl, FormLabel, HStack, Input, Select, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { editaHabit, habitSelector, labelSelector } from "../../redux";
import { capitializeString, colorOption, config, goalOption, reminderOption, statusOption } from "../../utils";

const EditHabit = () => {
    const location = useLocation();
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const habitId = location.state.habitId;
    const initialState = {title:"",startDate:"", endDate:"",goal:"",reminder:"",color:"default",status:"active",label:[]}
    const [ habitInputs, setHabitInputs ] = useState(initialState); 

    useEffect(()=>{
        async function getOneHabit() {
            try {
                const { data } = await axios.get( `/api/habits/${habitId}`, config);
                const habitDetail = data.habit;
                setHabitInputs({title:habitDetail.title, startDate:habitDetail.startDate, endDate:habitDetail.endDate, goal:habitDetail.goal, reminder:habitDetail.reminder, color:habitDetail.color, status:habitDetail.status ,label:habitDetail.label })
            } catch (e) {
                return e.response.data.errors[0];
            }
        }
        getOneHabit();
    },[])
    
    const { isEditFetching } = useSelector( habitSelector );    
    const { labels, isLabelFetching } = useSelector( labelSelector );
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
            const editParameter = { habitid:habitId, habit:habitInputs, toast };
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

    if(!habitInputs.title){
        return(
            <Center><Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='purple.500' size='xl'/></Center>
        )
    }

    return(
        <Box spacing="8" bg={'#cdcaf6'} borderRadius={'3xl'} mt={'14'} mx={'20'} py={'8'} px={'10'}>
            <Stack spacing="5">
			    <FormControl isRequired>
					<FormLabel fontSize={'lg'} htmlFor="title">Title</FormLabel>
					<Input value={habitInputs.title} onChange={handleChange} name='title' borderColor={'blackAlpha.600'} bg={'blackAlpha.50'} _focus={{bg:'#e6e9f4db'}} id="title" type="text" />
				</FormControl>
                <HStack>
                    <FormControl isRequired>
                        <FormLabel fontSize={'lg'} htmlFor="start-date">Start Date</FormLabel>
                        <Input value={habitInputs.startDate} onChange={handleChange} name='startDate'  borderColor={'blackAlpha.600'}  bg={'blackAlpha.50'} _focus={{bg:'#e6e9f4db'}} id="start-date" type="date" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel fontSize={'lg'} htmlFor="end-date">End Date</FormLabel>
                        <Input value={habitInputs.endDate} onChange={handleChange} name='endDate'  borderColor={'blackAlpha.600'}  bg={'blackAlpha.50'} _focus={{bg:'#e6e9f4db'}} id="end-date" type="date" />
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize={'lg'} htmlFor="status">Status</FormLabel>
                        <Select value={habitInputs.status} onChange={handleChange} id='status' name='status' borderColor={'blackAlpha.600'} bg={'blackAlpha.50'} _focus={{bg:'#e6e9f4db'}} variant='outline'>
                            {statusOption.map((status) => {
                                return(<option key={status} value={status}>{capitializeString(status)}</option>);
                            })}
                        </Select>
                        </FormControl>
                </HStack>
                <HStack>
                    <Select value={habitInputs.goal} onChange={handleChange} name='goal' borderColor={'blackAlpha.600'}  bg={'blackAlpha.50'} _focus={{bg:'#e6e9f4db'}}  variant='outline' placeholder='Select a Goal'>
                        {goalOption.map((goal) => {
                                return(<option key={goal} value={goal}>{goal}</option>);
                            })}
                    </Select>
                    <Select value={habitInputs.reminder} onChange={handleChange} name='reminder'  borderColor={'blackAlpha.600'}  bg={'blackAlpha.50'} _focus={{bg:'#e6e9f4db'}}  variant='outline' placeholder='Select a Reminder'>
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
                    <FormLabel bg={'#cdcaf6'} transform={'translate(10px,-15px)'} p={'0 7px'} pos={'absolute'} fontSize={'lg'} htmlFor={'checkboxes'}>Labels</FormLabel>
                    <CheckboxGroup onChange={handleChangeCheckbox} defaultValue={habitInputs.label} name='label' id={'checkboxes'} colorScheme='purple'>
                        <Stack p={'4'} maxW={'95%'} wrap={'wrap'} justify={labels.length < 5 ? 'start':'space-evenly'} direction={['column', 'row']}>
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
                    <Center>
                        <HStack>
                            <Button colorScheme='red' mr={3} fontWeight={'normal'} fontSize={'xl'} onClick={navigateToJournal}>Cancel</Button>
                            <Button colorScheme='purple' fontWeight={'normal'} fontSize={'xl'} disabled={isEditFetching} onClick={onSubmit}>Save</Button>
                        </HStack>
                    </Center>
				</Stack>
            </Box>
    )
}

export default EditHabit;
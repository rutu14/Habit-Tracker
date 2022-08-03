import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, useToast} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createaLabel } from "../redux";
import { capitializeString, colorOption } from "../utils";

const AddLabel = ({isOpen,onClose}) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const initialState = {labelName:'', color:'default'};
    const [ labelInputs, setLabelInputs ] = useState(initialState);

    const onSubmit = () => {
		if( labelInputs.labelName === "" ){
            toast({
                title: "Provide a title",
                status: 'warning',
                variant:'left-accent',
                isClosable: true,
            });
        }else{
            const createParameter = {label:labelInputs,toast};
			dispatch(createaLabel(createParameter));
            setLabelInputs(initialState);
            onClose();
        }
	};
    const handleChange = e => {
		const { name, value } = e.target;
		setLabelInputs(prevState => ({
			...prevState,
			[name]: name === 'labelName' ? value.trim() : value 
		}));
	};

    return(
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay py={'5'}  />
        <ModalContent maxW={'2xl'} bg={'#cdcaf6'}>
          <ModalHeader fontSize={'2xl'} color={'purple.800'} textAlign={'center'}>Add Label</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <Stack spacing="8">
          <Stack spacing="5">
					<FormControl isRequired>
						<FormLabel htmlFor="title">Title</FormLabel>
						<Input value={labelInputs.labelName} onChange={handleChange} name='labelName' borderColor={'blackAlpha.600'} bg={'blackAlpha.50'} _focus={{bg:'#e6e9f4db'}} id="title" type="text" />
					</FormControl>
                    <Select value={labelInputs.color} onChange={handleChange} name='color' borderColor={'blackAlpha.600'} bg={labelInputs.color !== 'default' ?`${labelInputs.color}.100`:'blackAlpha.50'} _focus={{bg:'#e6e9f4db'}}variant='outline' placeholder='Select a Color'>
                            {colorOption.map((color) => {
                                return(<option key={color} value={color}>{capitializeString(color)}</option>);
                            })}
                        </Select>
				</Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
          <Button mr={3} onClick={onClose}>Cancel</Button>
            <Button colorScheme='purple' onClick={onSubmit} >
              Add
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

export default AddLabel;
import React, {useState} from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
  } from 'reactstrap';

  import { useDispatch } from 'react-redux'
  import { addItem } from '../features/items/itemsSlice'

  export default function ItemModal(){
      
    
    // logical for modal
    let [isOpen, setIsOpen] = useState(false)
    

    const toggleModal = ()=>{
        setIsOpen(isOpen = !isOpen)
    }
    //control input
    const [inputName, setInputName] = useState('')

// submit and send to redux store
    const dispatch = useDispatch()
    const onSubmit = (event)=>{
       event.preventDefault()
       dispatch(addItem({name: inputName}))
        toggleModal()
        setInputName('')
       
    }


    return(
          <>
            <Button 
                style={{marginBottom: "2rem"}} 
                color="dark" 
                onClick={toggleModal}>Add Item</Button>

                <Modal isOpen={isOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Add to Shopping List</ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input type="text" name="inputName" placeholder="Add something to shopping list" onChange={(event)=> setInputName(event.target.value)} value={inputName}> </Input>
                        
                        <Button className="mt-2" type="submit"> Submit </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>


                </Modal>
          </>
      )
  }
import React, {useState} from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
  } from 'reactstrap';

  import { useDispatch, useSelector } from 'react-redux'
  import { addItem, asyncActions } from '../features/items/itemsSlice'
 

  export default function ItemModal(){
    const {token, isAuthenticated} = useSelector(state => state.auth)
    const {error, status} = useSelector(state => state.items) 
    
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
       dispatch(asyncActions.addItemThunk({name: inputName, token}))
        toggleModal()
        setInputName('')
       
    }


    return(
          <>
            <Button 
                style={{marginBottom: "2rem"}} 
                color="dark" 
                onClick={toggleModal}
                disabled={isAuthenticated ? false : true }
                >Add Item</Button>

                <Modal isOpen={isOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Add to Shopping List</ModalHeader>
                <ModalBody>
                { error  ? <Alert color='danger'>
                    {error ? status : null}
                  </Alert> : null}
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
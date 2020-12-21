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
    NavLink,
    Alert
  } from 'reactstrap';

  import { useDispatch, useSelector } from 'react-redux'
  import { asyncAuthActions, clearAuth } from '../features/items/authSlice'

  export default function LogoutModal(){
      //auth state
      
    
    // logical for modal
    let [isOpen, setIsOpen] = useState(false)
    

    const toggleModal = ()=>{
        setIsOpen(isOpen = !isOpen)
    }
 

// submit and send to redux store & DB 
    const dispatch = useDispatch() 
    
 // logout and close modal
 
 const logoutClose = ()=>{
     dispatch(clearAuth())
     toggleModal()
 }
    

    return(
          <>
            <NavLink 
                href="#"
                onClick={toggleModal}>Logout</NavLink>
                
                <Modal isOpen={isOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Logout</ModalHeader>
                <ModalBody>
                    <h4>Do you want to logout?</h4>
                    <Button onClick={logoutClose}>Yes</Button>
                    <Button className="ml-2" onClick={toggleModal}>Cancel</Button>
                </ModalBody>


                </Modal>
          </>
      )
  }

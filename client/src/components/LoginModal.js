import React, {useEffect, useState} from 'react'
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
  import { asyncAuthActions, clearError } from '../features/items/authSlice'
  

  export default function LoginModal(){
      //auth state
      const {isAuthenticated } = useSelector(state => state.auth)
      const {error} = useSelector(state => state.auth)
    
    // logical for modal
    let [isOpen, setIsOpen] = useState(false)
    

    const toggleModal = ()=>{
        dispatch(clearError())
        setEmail('')
        setPassword('')
        setIsOpen(isOpen = !isOpen)
    }
    //control input

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

// submit and send to redux store & DB 
    const dispatch = useDispatch()
    const onSubmit = async (event)=> {
        
        event.preventDefault()
        dispatch(asyncAuthActions.loginUserThunk({email, password}))
       
       }

    useEffect(()=> {
        if(isOpen){
            if(isAuthenticated){
                toggleModal()
                
            }
        }
    }, [isAuthenticated])
    

    return(
          <>
            <NavLink 
                href="#"
                onClick={toggleModal}>Login</NavLink>
                
                <Modal isOpen={isOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Login</ModalHeader>
                <ModalBody>
                { error  ? <Alert color='danger'>
                    {error ? error.msg : null}
                  </Alert> : null}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            
                            <Label for="email">Email</Label>
                            <Input className="mb-2" type="text" name="name" placeholder="Enter Email" onChange={(event)=> setEmail(event.target.value)} value={email}> </Input>
                            <Label for="password">Password</Label>
                            <Input className="mb-2"  type="text" name="password" placeholder="Enter Password" onChange={(event)=> setPassword(event.target.value)} value={password}> </Input>
                        <Button className="mt-2" type="submit"> Submit </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>


                </Modal>
          </>
      )
  }
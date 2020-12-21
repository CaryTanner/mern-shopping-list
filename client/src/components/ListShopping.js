import React, {useEffect} from 'react'
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import { useDispatch, useSelector } from 'react-redux'

import { deleteItem, asyncActions } from '../features/items/itemsSlice'
import ItemModal from './ItemModal'
import {asyncAuthActions} from '../features/items/authSlice'


const ListShopping = ( ) => {
    const dispatch = useDispatch()
    const {items} = useSelector(state => state.items)
    const {token, user} = useSelector(state => state.auth)
    const deleteToken = localStorage.getItem('token')

useEffect(()=>{
    dispatch(asyncActions.getAllItems())
    dispatch(asyncAuthActions.loadUserThunk(token))
}, [dispatch])

const handleDelete = (itemId) => {
    dispatch(asyncActions.deleteItemThunk({id: itemId, token: deleteToken}))
    
}

    return (
        
        <>
        
            <Container>
                
                <ItemModal />
                
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items && items.map(({_id, name}) => {
                            return <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem >
                                   
                                    <Button 
                                    className="remove-btn mr-3" 
                                    color="danger" 
                                    size="sm"
                                    onClick={()=> {handleDelete({_id})}}
                                    >&times;</Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        })}
                    </TransitionGroup>
                </ListGroup>
            </Container>
            </>

    )
}


// TO DO: learn to to do prop typing!

// ListShopping.propTypes = {
// addItem: PropTypes.func.isRequired,
// items: PropTypes.object.isRequired

// }


export default ListShopping 
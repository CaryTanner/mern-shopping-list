import React, {useState} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap'

export default function NavbarApp(){
const [isOpen, setIsOpen] = useState(false)

const toggleOpen = () => {
    setIsOpen(isOpen => !isOpen)
} 

    return(
        <>
        <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
            <NavbarBrand href="/">Shopping List</NavbarBrand>
            <NavbarToggler  onClick={toggleOpen}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink href="https://github.com/carytanner">GitHub</NavLink>
            </NavItem>
            </Nav>
            </Collapse>
        </Container>
        </Navbar>
        </>
    )
}
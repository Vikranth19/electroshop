import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <Container>
            <Row>
                <Col className="text-center py-3">
                    Copyright &copy; electroshop
                </Col>
            </Row>
            <Row>
                <Col className="text-center py-3">
                    made with <i className="fas fa-heart"></i> by{' '}
                    <a href="https://github.com/Vikranth19">Vikranth</a>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer

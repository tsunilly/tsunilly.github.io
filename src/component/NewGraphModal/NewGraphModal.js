import React, {useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button, Modal, Row, Col, 
} from 'react-bootstrap';

import './NewGraphModal.css';

// class NewGraphModal extends React.Component {
//   static propTypes = {
//   }
  
  // render() {

NewGraphModal.propTypes = {
  handleNew: PropTypes.func
};

function NewGraphModal({handleNew, ...props}){
  const [showModal, setShowModal] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    setShowTemplates(false);
    setShowModal(true);
  }

  const handleShowTemplates = () => setShowTemplates(true);
  const handleHideTemplates = () => setShowTemplates(false);

  
  
  function ModalBody(){
    if (showTemplates === false) {
      return (
        <>
          <h5 className="text-center">Would you like to create...</h5>
          <Row className="text-center mt-3">
            <Col>
              <Button className="p-3" block>Blank Graph</Button>
            </Col>
            <Col>
              <Button className="p-3" block onClick={handleShowTemplates}>From a Template</Button>
            </Col>
          </Row>
          {/* <div className="d-flex justify-content-around p-2">
            <div className="btn btn-outline-primary btn-block" style={selBoxStyle}>Blank Graph</div>
            <div className="btn btn-outline-primary btn-block" style={selBoxStyle} onClick={handleShowTemplates}>From a Template</div>
          </div> */}
        </>
      );
    } else {
      return (
        <>
          <h5 className="text-center">Please select from the available templates below:</h5>
          {/* <Row className="text-center mt-3">
            <Col width="300px" className="border p-3"> Henlo FlexBoi</Col>
          </Row> */}
          <div className="d-flex justify-content-around">
            <div className="p-2 border selBox">
              <img />
              <h6 className="mt-2">Label</h6>
            </div>
            {/* <div className="p-2 bg-primary" style={selBoxStyle}>hi</div>
            <div className="p-2 bg-primary" style={selBoxStyle}>hi</div> */}
          </div>
        </>
      );
    }
  }

  return (
    <>
      <Button variant="outline-primary" block onClick={handleShowModal}>
        New Graph
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} {...props} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>New Graph</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <ModalBody></ModalBody>
        </Modal.Body>
        <Modal.Footer>
          {showTemplates === true &&
            <Button variant="secondary" onClick={handleHideTemplates}>
              Go Back
            </Button>
          }
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NewGraphModal;
import React from 'react';
import PropTypes from 'prop-types';

import {
  Row, Col, Form, Button
} from 'react-bootstrap';

import RoutingType from './RoutingType/RoutingType';
import QosType from './QosType/QosType';

class OptionBar extends React.Component {
  static propTypes = {
    selectedElement: PropTypes.object,
    cySelectedElement: PropTypes.object,
    handleChange: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
  }

  render() {
    let option;
    if (this.props.selectedElement && this.props.cySelectedElement && this.props.cySelectedElement.length > 0) {
      const cyCurrNode = this.props.cySelectedElement[0];
      const cyCurrData = cyCurrNode.data();
      const cyCurrId = cyCurrNode.id();

      const connections = this.props.cySelectedElement[0].connectedEdges().map((edge) => {
        let connectedNode;
        if (edge.data()['source'] === cyCurrId) {
          connectedNode = edge.target();
        } else {
          connectedNode = edge.source();
        }

        let connectedData = cyCurrData['connections'].find(c => c['target'] === connectedNode.id());

        return <React.Fragment key={connectedNode.id()}>
          {/* <h6 className="text-left mb-0 mt-2">{connectedNode.data()['label']}</h6> */}
          <b>{connectedNode.data('label')}</b>
          {/* We can make this dynamic based on the keys later */}
          <Form.Group as={Row}>
            <Form.Label column sm={3}>
              IP
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" placeholder="IP" name="ip"
              value={connectedData['ip'] ? connectedData['ip'] : ''}
              onChange={this.props.handleChange} data-conntarget={connectedNode.id()}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={3}>
              Interface
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" placeholder="interface" name="interface"
              value={connectedData['interface'] ? connectedData['interface'] : ''}
              onChange={this.props.handleChange} data-conntarget={connectedNode.id()}
              />
            </Col>
          </Form.Group>
        </React.Fragment>
      });

      let typeSpecificOptions;
      if (cyCurrData['type'] === 'router') {
        typeSpecificOptions =  (
          <React.Fragment>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Router ID
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" placeholder="Router ID" name="rtrId"
                  value={this.props.selectedElement.rtrId ? this.props.selectedElement.rtrId : ''}
                  onChange={this.props.handleChange}
                />
              </Col>
            </Form.Group>
          </React.Fragment>
        );
      } else if (cyCurrData['type'] === 'cLAN') {
        typeSpecificOptions = '';
      } else if (cyCurrData['type'] === 'vhid') {
        typeSpecificOptions = (
          <React.Fragment>
            <RoutingType data={this.props.selectedElement} handleChange={this.props.handleChange} />
            <QosType data={this.props.selectedElement} handleChange={this.props.handleChange} />
          </React.Fragment>
        );
      } else {
        typeSpecificOptions = (
          <React.Fragment>
           <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" placeholder="Device Name" name="name"
                  value={this.props.selectedElement.name ? this.props.selectedElement.name : ''}
                  onChange={this.props.handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Type
              </Form.Label>
              <Col sm={9}>
                <Form.Control as="select" name="type"
                  value={this.props.selectedElement.type ? this.props.selectedElement.type  : ''}
                  onChange={this.props.handleChange}
                >
                  <option value="">-</option>
                  <option value="router">Router</option>
                  <option value="nerd">NERD</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </React.Fragment>
        )
      }

      option = (
        <React.Fragment>
          <h2>{cyCurrData['label']} Selected</h2>
          <Form>
            { typeSpecificOptions }            
            <h4 className="text-left">Connections:</h4>
            { connections }
            <Form.Group as={Row}>
              <Col sm={{ offset: 2 }}>
                <Button onClick={this.props.handleSave}>Save Changes</Button>
              </Col>
            </Form.Group>
          </Form>
        </React.Fragment>
      );
    } else {
      option = 'Select a device to configure.';
    }

    return (
      <React.Fragment>
        <h6 className="text-center">Option Bar</h6>
        <hr />
        { option }
      </React.Fragment>
    )
  }
}

export default OptionBar;
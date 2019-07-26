import React from 'react'
import PropTypes from 'prop-types';

import {
  Container, Row, Col, Form
} from 'react-bootstrap';

class QosType extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func.isRequired,
  }

  render () {
    let qosType = this.props.data['qosType'];
    return (
      <React.Fragment>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            QoS Type
          </Form.Label>
          <Col sm={9}>
            <Form.Control as="select" 
              name="qosType"
              value={qosType ? qosType : ''}
              onChange={this.props.handleChange}
            >
              <option value="">-</option>
              <option value="egress">Egress Total Bandwidth</option>
              <option value="type6">Type 6 (Queue's)</option>
              <option value="type4">Type 4 (Queue's)</option>
              <option value="type0">Type 0</option>
            </Form.Control>
          </Col>
        </Form.Group>

        {qosType && <React.Fragment>
          <Container className="border-left">
            {qosType === 'type6' && <React.Fragment>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Control
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" placeholder="Control" name="control"
                    value={this.props.data.control ? this.props.data.control : ''}
                    onChange={this.props.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Voice
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" placeholder="Voice" name="voice"
                    value={this.props.data.voice ? this.props.data.voice : ''}
                    onChange={this.props.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Video
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" placeholder="Video" name="video"
                    value={this.props.data.video ? this.props.data.video : ''}
                    onChange={this.props.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Premium A
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" placeholder="Premium A" name="premiumA"
                    value={this.props.data.premiumA ? this.props.data.premiumA : ''}
                    onChange={this.props.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Premium B
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" placeholder="Premium B" name="premiumB"
                    value={this.props.data.premiumB ? this.props.data.premiumB : ''}
                    onChange={this.props.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Premium C
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" placeholder="Premium C" name="premiumC"
                    value={this.props.data.premiumC ? this.props.data.premiumC : ''}
                    onChange={this.props.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Default
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" placeholder="Default" name="default"
                    value={this.props.data.default ? this.props.data.default : ''}
                    onChange={this.props.handleChange}
                  />
                </Col>
              </Form.Group>

            </React.Fragment>}
            {qosType === 'type4' && <React.Fragment>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Control
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" placeholder="Control" name="control"
                    value={this.props.data.control ? this.props.data.control : ''}
                    onChange={this.props.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Voice
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" placeholder="Voice" name="voice"
                    value={this.props.data.voice ? this.props.data.voice : ''}
                    onChange={this.props.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Premium 1
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" placeholder="Premium 1" name="premium1"
                    value={this.props.data.premium1 ? this.props.data.premium1 : ''}
                    onChange={this.props.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Premium 2
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" placeholder="Premium 2" name="premium2"
                    value={this.props.data.premium2 ? this.props.data.premium2 : ''}
                    onChange={this.props.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Standard
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" placeholder="Standard" name="standard"
                    value={this.props.data.standard ? this.props.data.standard : ''}
                    onChange={this.props.handleChange}
                  />
                </Col>
              </Form.Group>
            </React.Fragment>}

          </Container>
        </React.Fragment>}
      </React.Fragment>
    );
  }
}

export default QosType;
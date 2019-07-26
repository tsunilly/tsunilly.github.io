import React from 'react'
import PropTypes from 'prop-types';

import {
  Container, Row, Col, Form
} from 'react-bootstrap';

class RoutingType extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func.isRequired,
  }

  render () {
    let routingType = this.props.data['routingType'];
    return (
      <React.Fragment>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Routing Type
          </Form.Label>
          <Col sm={9}>
            <Form.Control as="select" 
              name="routingType"
              value={routingType ? routingType : ''}
              onChange={this.props.handleChange}
            >
              <option value="">-</option>
              <option value="bgp">BGP</option>
              <option value="static">Static</option>
            </Form.Control>
          </Col>
        </Form.Group>
        {routingType && <React.Fragment>
          <Container className="border-left">
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                CE WAN IP Address
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" placeholder="CE WAN IP Address" name="ceWanIP"
                  value={this.props.data.ceWanIP ? this.props.data.ceWanIP : ''}
                  onChange={this.props.handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                PE WAN IP Address
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" placeholder="PE WAN IP Address" name="peWanIP"
                  value={this.props.data.peWanIP ? this.props.data.peWanIP : ''}
                  onChange={this.props.handleChange}
                />
              </Col>
            </Form.Group>

            {routingType === 'bgp' && <React.Fragment>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Peer As Number
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="number" placeholder="Peer As Number" name="peerAsNumber"
                    value={this.props.data.peerAsNumber ? this.props.data.peerAsNumber : ''}
                    onChange={this.props.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  BGP Holdtime
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="number" placeholder="BGP Holdtime" name="bgpHoldtime"
                    value={this.props.data.bgpHoldtime ? this.props.data.bgpHoldtime : ''}
                    onChange={this.props.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Max Prefix
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="number" placeholder="Max Prefix" name="maxPrefix"
                    value={this.props.data.maxPrefix ? this.props.data.maxPrefix : ''}
                    onChange={this.props.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  As Override
                </Form.Label>
                <Col sm={9}>
                  <Form.Check placeholder="As Override" name="asOverride"
                    value={this.props.data.asOverride ? this.props.data.asOverride : false}
                    onChange={this.props.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  MD5 Password
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" placeholder="MD5 Password" name="md5Password"
                    value={this.props.data.md5Password ? this.props.data.md5Password : ''}
                    onChange={this.props.handleChange}
                  />
                </Col>
              </Form.Group>

            </React.Fragment>}
            {routingType === 'static' && <React.Fragment>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Customer Subnets
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" placeholder="Customer Subnets" name="customerSubnets"
                    value={this.props.data.customerSubnets ? this.props.data.customerSubnets : ''}
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

export default RoutingType;
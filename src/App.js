import React, { Component } from 'react';

// 3rd party libs
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Internal imports
import ToolBar from './component/ToolBar/ToolBar';
import CyGraph from './component/CyGraph/CyGraph';
import OptionBar from './component/OptionBar/OptionBar';

import Drawing4 from './component/CyGraph/templates/Drawing4.json'

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.cy = null;
    this.bAddLink = false;
    this.bAddLinkNode1 = null;
    this.bAddLinkNode2 = null;
    this.currentNotifTimeout = null;
    console.log(Drawing4, this.loadJsonToCy(Drawing4))
    this.state = {
      cyElements: this.loadJsonToCy(Drawing4),
      // [
      //   { data: { id: 'one', label: 'Node 1', type: ''}, position: { x: 100, y: 100 } },
      //   { data: { id: 'two', label: 'Node 2', type: ''}, position: { x: 200, y: 100 } },
      //   { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2'} }
      // ],
      selectedElement: null, // data copy
      cySelectedElement: null, // should be a cy object, read-only since this is immutable directly from cy
      notif: null,
    }


    // for forms - to refactor! https://reactjs.org/docs/forms.html
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleOptionSave = this.handleOptionSave.bind(this);
  }

  loadJsonToCy(json) {
    let nodes = [];
    let edges = [];
    const addEdge = (node1, node2) => {
      let existingIndex = edges.findIndex(e => {
        return (e['data']['source'] === node1 && e['data']['target'] === node2)
          || (e['data']['source'] === node2 && e['data']['target'] === node1);
      })

      if (existingIndex === -1) {
        edges.push({
          'group': 'edges',
          'data': {
            'source': node1,
            'target': node2
          }
        })
      }
    }

    nodes = json.map(entry => {
      entry['data']['connections'].forEach(connection => {
        addEdge(entry['id'], connection['target']);
      })

      return {
        group: 'nodes',
        data: {
          id: entry['id'],
          ...entry['data']
        },
        ...entry["cydata"]
      }
    })

    return [...nodes, ...edges];
  }

  mapCyLabels() {
    // add dynamic labels to our cyData
    this.cy.nodes().forEach(node => {
      this.cyUpdateNodeLabel(node);
    });

    this.cy.edges().forEach(edge => {
      this.cyUpdateEdgeLabel(edge);
    })
  }

  cyUpdateNodeAndConnectedEdgesLabel(node) {
    this.cyUpdateNodeLabel(node);
    node.connectedEdges().forEach(e => this.cyUpdateEdgeLabel(e));
  }

  cyUpdateNodeLabel(node) {
    if(node.data('name') !== undefined) {
      node.data('label', node.data('name'))
    } else if (node.data('type') === 'cLAN') {
      node.data('label', 'Customer LAN');
    } else if (node.data('type') === 'router') {
      node.data('label', `RTR-${node.data('rtrId')}`);
    } else if (node.data('type') === 'vhid') {
      node.data('label', `${node.data('vhid')}`);
    } 
  }

  cyUpdateEdgeLabel(edge) {
    const sourceId = edge.source().id();
    const sourceData = edge.source().data();
    const targetId = edge.target().id();
    const targetData = edge.target().data();
    
    const sourceDataFind = sourceData['connections'].find(c => c['target'] === targetId);
    if (sourceDataFind !== undefined) {
      edge.data('source_label', `${sourceDataFind['ip']}\n${sourceDataFind['interface']}`);
    }
    
    const targetDataFind = targetData['connections'].find(c => c['target'] === sourceId);
    if (targetDataFind !== undefined) {
      edge.data('target_label', `${targetDataFind['ip']}\n${targetDataFind['interface']}`);
    }
  }

  assignCyEdgeLabels(cyEdge) {
    if (cyEdge.data()['type'] === 'vcid') {

    } else if (cyEdge.data()['type'] === '') {
      
    }
  }

  handleOptionChange(event) { 
    console.log(event.target, event.target.value, event.target.name, event.target.dataset.conntarget);
    const selectedElement = Object.assign({}, this.state.selectedElement);
    const conntarget = event.target.dataset.conntarget;
    console.log(conntarget, conntarget === undefined)
    if (conntarget === undefined) {
      console.log(selectedElement)
      if (event.target.type === 'checkbox') {
        selectedElement[event.target.name] = event.target.checked;
      } else {
        selectedElement[event.target.name] = event.target.value;
      }
    } else {
      // conntarget is a target id under connections key
      const conn =  selectedElement.connections.find(e => e.target === conntarget);
      conn[event.target.name] = event.target.value;
    }
    this.setState({selectedElement})
  }

  handleOptionSave(event) {
    // https://github.com/plotly/react-cytoscapejs/issues/7
    // // Modify our state var
    // let el = this.state.cyElements.find(el => el.data.id === this.state.selectedElement.id);  
    let el = this.state.selectedElement;

    // Directly modify cy as modified data is not triggered by setState
    console.log(this.cy.nodes(`#${el.id}`), el);
    let cyNode = this.cy.nodes(`#${el.id}`);
    cyNode.data(el);

    // Update labels
    this.cyUpdateNodeAndConnectedEdgesLabel(cyNode);
    this.newNotif('Changes saved!');
  }

  handleCy = cy => {
    console.log('handleCy tirggered');
    // Only initialize once. setState will try to re-init
    if (!this.cy) {
      console.log('init cy', cy);
      // this.setState({cy})
      this.cy = cy;
      
      // Initialize events
      // graph events
      cy.on('ready', () => {
        console.log('cy - ready triggered')
        cy.fit(':visible', 75);
        cy.nodes()[1].select().trigger('tap');
        this.mapCyLabels();
      });

      // user input
      cy.on('tap', event => {
        let el = event.target;
        
        if (el.isNode && el.isNode()) {
          // this.setState({selectedElement: el.data()}); // this will allow direct saving!
          // this.setState({selectedElement: Object.assign({}, el.data())});
          this.setState({
            selectedElement: Object.assign({}, el.data()),
            cySelectedElement: el, // el is a direct object from cy anyway. handle as read only
          });
          if (this.bAddLink) {
            if (this.bAddLinkNode1 == null) {
              this.bAddLinkNode1 = el.id();
              el.addClass('selected');
            } else if (this.bAddLinkNode2 == null) {
              if (this.bAddLinkNode1 === el.id()) { // deselect first node
                el.removeClass('selected');
              } else {
                this.bAddLinkNode2 = el.id();
                // el.addClass('selected');

                cy.add({
                  group: 'edges',
                  data: {
                    source: this.bAddLinkNode1,
                    target: this.bAddLinkNode2
                  }
                });
                cy.nodes(`#${this.bAddLinkNode1}`).removeClass('selected');
                this.bAddLink = null;
                this.bAddLinkNode1 = null;
                this.bAddLinkNode2 = null;
                this.newNotif('Successfully added a new link!');
              }
            }
          }
        } else {
          this.setState({
            selectedElement: null,
            cySelectedElement: null,
          });
        }
      });

      cy.on('add', 'node', event => {
        console.log('hello new node lol', event.target);
        const node = event.target;
        node.select();
        node.trigger('tap');
        // cy.center(node);
        cy.animate({
          center: node,
          duration: 500
        })
      })

      cy.ready(); // manually trigger ready as it doesn't seem to be triggered?
    }
  }

  newNotif(notif, duration=5000) {
    if (this.currentNotifTimeout) {
      clearTimeout(this.currentNotifTimeout);
    }

    this.setState({notif});
    if (duration > 0) {
      this.currentNotifTimeout = setTimeout(function(){
        this.setState({notif: null});
        this.currentNotifTimeout = null;
      }.bind(this), duration)
    }
  }

  addNode = (type=null) => {
    const cyElements = this.state.cyElements
    let newId;
    let newLabel;
    let newType;

    if (type === 'router') {
      newType = 'Router';
      newId = (this.cy.nodes('node[type="Router"]').length + 1).toString();
      newLabel = "Router " + newId;
    } else if (type === 'nerd') {
      newType = 'NERD';
      newId = (this.cy.nodes('node[type="NERD"]').length + 1).toString();
      newLabel = "NERD " + newId;
    } else {
      newType = "";
      newId = (this.cy.nodes('node[type=""]').length + 1).toString();
      newLabel = "Node " + newId;
    }
    const newNode = {data: {id: newId, label: newLabel, type: newType}};

    // console.log(newLabel, newId);
    console.log(cyElements);

    cyElements.push(newNode);
    // cyElements.push({data: {
    //   source: 'one',
    //   target: newId,
    // }});

    this.cy.nodes(':selected').deselect();
    this.setState({
      cyElements
    })

    this.newNotif('New node added!');
    // this.cy.nodes(`#${newId}`).select();
    this.setState({selectedElement: newNode});
  }

  handleAddNode = () => {
    this.addNode();
  }

  handleAddLink = () => {
    this.newNotif('Click on two nodes to link together', 0);
    this.bAddLink = true;
  }

  handleAddRouter = () => {
    this.addNode('router')
  }

  handleAddNerd = () => {
    this.addNode('nerd')
  }

  handleExportJson = () => {
    const data = JSON.stringify(this.cy.elements().jsons());
    const element = document.createElement('a');
    const file = new Blob([data], {type: 'text/plain'})
    element.href = URL.createObjectURL(file);
    element.download = 'json.txt';
    document.body.appendChild(element);
    element.click();
    element.remove();
  }

  render() {
    return (
      <div className="App">
        <Container className="h-100" fluid="true">
          <Row className="h-100">
            <Col sm={2} id="toolbar">
              <ToolBar 
                handleAddNode={this.handleAddNode}
                handleAddLink={this.handleAddLink}
                handleAddNerd={this.handleAddNerd}
                handleAddRouter={this.handleAddRouter}
                handleExportJson={this.handleExportJson}
              />
            </Col>

            <Col sm={7}>
              <div id="floating-notif" className={this.state.notif ? 'fadeIn' : 'fadeOut'}>
                {this.state.notif}
              </div>
              <CyGraph 
                cyElements={this.state.cyElements}
                handleCy={this.handleCy}
              />
            </Col>

            <Col sm={3} id="optionbar">
              <OptionBar 
                selectedElement={this.state.selectedElement}
                cySelectedElement={this.state.cySelectedElement}
                handleChange={this.handleOptionChange}
                handleSave={this.handleOptionSave}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;

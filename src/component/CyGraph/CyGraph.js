import React from 'react';
import PropTypes from 'prop-types';

import CytoscapeComponent from 'react-cytoscapejs';

class CyGraph extends React.Component {
  static propTypes = {
    cyElements: PropTypes.array,
    handleCy: PropTypes.func.isRequired,
  }
  
  render() {
    const layout = { name: 'preset'};
    const stylesheet = [{
        selector: 'node[label]',
        style: {
          label: 'data(label)',
          'text-wrap': 'wrap'
        }
      }, {
        selector: 'node.selected',
        style: {
          'border-color': 'red',
          'border-width': '3px',

        }
      }, {
        selector: 'node[type="vhid"]',
        style: {
          shape: 'rectangle'
        }
      }, {
        selector: 'node[type="router"]',
        style: {
          shape: 'ellipse',
          // label: 'data(rtrId)'
        }
      }, {
        selector: 'node[type="cLAN"]',
        style: {
          shape: 'round-rectangle',
          width: '175px',
          padding: '5px',
          'text-halign': 'center',
          'text-valign': 'center',
          // 'background-color': 'blue',
          'background-fill': 'linear-gradient',
          'background-gradient-stop-colors': 'cyan white cyan',
          'border-width': '1px'
        }
      }, {
        selector: 'edge[label]',
        style: {
          label: 'data(label)',
          'text-wrap': 'wrap'
        },
      }, {
        selector: 'edge[source_label]',
        style: {
          'source-label': 'data(source_label)',
          'source-text-offset': '50px',
          'text-wrap': 'wrap'
        }
      }, {
        selector: 'edge[target_label]',
        style: {
          'target-label': 'data(target_label)',
          'target-text-offset': '50px',
          'text-wrap': 'wrap'
        }
      }
      
    ];

    return (
      <CytoscapeComponent 
        elements={[...this.props.cyElements]} 
        id="cygraph" cy={this.props.handleCy}
        stylesheet={stylesheet}
        layout={layout}
      />
    )
  }
}

export default CyGraph;
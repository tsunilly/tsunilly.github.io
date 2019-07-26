import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

import NewGraphModal from '../NewGraphModal/NewGraphModal'

class ToolBar extends React.Component {
  static propTypes = {
    handleAddNode: PropTypes.func.isRequired,
    handleAddLink: PropTypes.func.isRequired,
    handleAddNerd: PropTypes.func.isRequired,
    handleAddRouter: PropTypes.func.isRequired,
    handleExportJson: PropTypes.func.isRequired
  }
  
  render() {
    // let help = {help: 'you'};
    return (
      <React.Fragment>
        {/* <div {...help}>{help.help}</div> */}
        <h5 className="text-center">CIF Prototype</h5>
        <hr />
        <div className="flex-column">
          <NewGraphModal></NewGraphModal>
          <hr className="w-25" />
          <Button variant="outline-primary" block onClick={this.props.handleAddNode}>Add a Node</Button>
          <Button variant="outline-primary" block onClick={this.props.handleAddLink}>Add a Link</Button>
          <hr className="w-25" />
          <Button variant="outline-primary" block onClick={this.props.handleAddRouter}>Router</Button>
          <Button variant="outline-primary" block onClick={this.props.handleAddNerd}>CPE</Button>
          <hr className="w-100" />
          <Button variant="outline-primary" block onClick={this.props.handleExportJson}>Export JSON Data</Button>
        </div>
      </React.Fragment>
    )
  }
}

export default ToolBar;
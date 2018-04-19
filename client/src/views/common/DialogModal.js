import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class DialogModal extends React.Component {
  state = {
    open: this.props.open,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
    if (this.props.submit) this.props.submit();
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label={this.props.submitLabel ? this.props.submitLabel : "Submit"}
        primary={true}
        // disabled={true}
        onClick={this.handleClose}
      />,
    ];

    if (this.props.button)

    return (
      <div>
        {/* <RaisedButton label="Modal Dialog" onClick={this.handleOpen} /> */}
        <div onClick={this.handleOpen}>{this.props.button}</div>
        <Dialog
          title={this.props.title}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          {this.props.children}
        </Dialog>
      </div>
    );
  }
}

export { DialogModal };

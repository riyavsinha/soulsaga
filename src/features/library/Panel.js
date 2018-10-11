import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

export default class Panel extends Component {
  static propTypes = {

  };

  render() {
    return (
      <ExpansionPanel className="library-panel" >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
                variant="title"
                className="library-panel__title">
              {this.props.title}
            </Typography>
            <Typography variant="subheading">
              {this.props.settingText}
            </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="library-panel__details">
          {this.props.children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

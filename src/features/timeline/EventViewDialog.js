import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { CATEGORY_ICON_MAP } from './eventiconmaps';
import { bindActionCreators } from 'redux';
import { buildDateString } from './util';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class EventViewDialog extends Component {
  static propTypes = {

  };

  handleClose = () => {
    this.props.actions.setViewingEvent(null);
  }

  handleEdit = () => {
    this.props.actions.setEditingEvent(this.props.timeline.viewingEvent);
    this.handleClose();
    this.props.actions.toggleAddEventForm(true);
  }

  handleDelete = () => {
    let e = this.props.timeline.viewingEvent;
    this.handleClose();
    this.props.actions.setDeletingEvent(e);
  }

  renderTags = () => {
    let e = this.props.timeline.viewingEvent;
    if (e && e.tg.length) {
      return (
        <DialogContent>
          {e.tg.map(t =>
            <Chip
              label={t}
              className="timeline-timeline-event__tag"
              key={e.id+t+"ViewChip"} />)}
        </DialogContent>
      )
    }
  }

  renderImg = () => {
    let e = this.props.timeline.viewingEvent;
    if (e) {
      if (e.i) {
        return (
          <img src={e.i} alt="event" className="timeiline-view-event-dialog__img" />
        )
      } else {
        return (
          <img src={this.dataUrl} alt="noevent" className="timeiline-view-event-dialog__width-placeholder" />
        )
      }
    }
  }

  renderDesc = () => {
    let e = this.props.timeline.viewingEvent;
    if (e && e.de) {
      let condClass = e.i ? "timeline-view-event-dialog__desc" : "";
      return (
        <DialogContent className={condClass}>
          <DialogContentText>
            {e.de}
          </DialogContentText>
        </DialogContent>
      )
    }
  }


  render() {
    let e = this.props.timeline.viewingEvent;
    return (
      <Dialog
          open={e !== null}
          onClose={this.handleClose}>
        <div>
          <div className="timeline-view-event-dialog__header-container">
            <div>
              <Avatar className="timeline-view-event-dialog__avatar">
                {e ? (e.c === "Other" ?
                  this.props.common.user.displayName.slice(0, 1).toUpperCase() :
                  CATEGORY_ICON_MAP[e.c]) : ""}
              </Avatar>
            </div>
            <div className="timeline-view-event-dialog__date">
              <Typography variant="headline"> 
                {e ? e.t : ""}
              </Typography>
              <Typography variant="subheading"> 
                {e ? buildDateString(e.d, e.m, e.y) : ""}
              </Typography>
            </div>
          </div>
        </div>
        {this.renderTags()}
        {this.renderImg()}
        {this.renderDesc()}
        <DialogActions>
          <Button onClick={this.handleEdit} color="primary">
            Edit
          </Button>
          <Button onClick={this.handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  dataUrl = `data:image/png;base64,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
  9Z/lnHzdNbbp7LvXc9eYJzW3no85fvBB24VxLYMvpi34XT1zyuXT8stfl+iseV+pa3VuP/e7++7E2
  j7a6q55XG9q92xs7xnac6gzoPHst5NqF65HXr9yIudFxM+nmra5JXd23uLee3869/epO8Z3Bu/PuE
  e6V3de4X/HA4EHVP2z+Udvt0X3yYcjD1kcJj+4+5jx+8UTy5HPPoqe0pxXPjJ9VP3d5fqI3rLf9j4
  l/9LwoeDHYV/qn5p+bX1q/PPoX66/W/tT+nlfiV0Ovl73Re7PnrdvbpoG4gQfv8t4Nvi/7oPdh70e
  vjy2fUj49G5z2mfR5wxebL41fo77eG8obGipgi9nyowAGG5qVBcDrPQDQ0uDZoR0Aipri7iUXRHFf
  lCPwn7DifiYXDwD2sABImgdANDyjbIXNAmIq7GVH70QWQF1dR5pSJFmuLopYVHiDIXwYGnpjCACpE
  YAv4qGhwS1DQ192QbK3AThTqLjzyYQIz/fbZfdJ0NqlAX6UfwJwY2wqDmIHYQAAAAlwSFlzAAAWJQ
  AAFiUBSVIk8AAAAZxpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0
  iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1s
  bnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgI
  CAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaH
  R0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnN
  pb24+MTIwMDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVu
  c2lvbj4yPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgI
  DwvcmRmOlJERj4KPC94OnhtcG1ldGE+ClNmwnsAAAAcaURPVAAAAAIAAAAAAAAAAQAAACgAAAABAA
  AAAQAAAGNCC3FHAAAAL0lEQVRoBezQMQEAAAgDINc/tBpjB0Qg+wYDBgwYMGDAgAEDBgwYMGDAgAE
  DpQMHAAD//4ghxycAAAAtSURBVO3QMQEAAAgDINc/tBpjB0Qg+wYDBgwYMGDAgAEDBgwYMGDAgAED
  pQMHge0H+x3cR9EAAAAASUVORK5CYII=`

}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    timeline: state.timeline,
    common: state.common,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventViewDialog);
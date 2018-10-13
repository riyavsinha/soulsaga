import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import DatePicker from './DatePicker';
import Button from '@material-ui/core/Button';
import CategorySelect from './CategorySelect';
import CloseIcon from '@material-ui/icons/Close';
import Cropper from 'react-cropper';
import Dialog from '@material-ui/core/Dialog';
import EventProto from '../../proto/EventProto.js'
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import TagInput from './TagInput';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UploadButton from 'features/library/UploadButton';
import { 
  dataOperationSnackbarFailed,
  dataOperationSnackbarSucceeded } from 'features/common/redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import 'cropperjs/dist/cropper.css';
const _ = require('lodash');

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export class AddEventForm extends Component {
  static propTypes = {
    timeline: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  initState = {
    eventCategory: "Other",
    eventTitle: "",
    eventDesc: "",
    eventTags: [],
    eventMonth: "",
    eventDay: "",
    eventYear: "",
    eventImg: "",
    eventId: "",
    hasTitle: false,
    validDate: false,
    snackbarOpen: false,
  };

  state = {...this.initState, eventTags: [...this.initState.eventTags]};

  /** DIALOG VISIBILITY EVENTS */

  handleClickOpen = () => {
    this.props.actions.toggleAddEventForm(true);
  };

  refreshFields = () => {
    if (this.props.timeline.editingEvent != null) {
      const e = this.props.timeline.editingEvent;
      this.setState({
        eventCategory: e.c,
        eventTitle: e.t,
        eventDesc: e.de,
        eventTags: e.tg,
        eventMonth: e.m,
        eventDay: e.d,
        eventYear: e.y,
        eventImg: e.i,
        eventId: e.id,
        hasTitle: true,
        validDate: true,
      })
    }
  }

  handleClose = () => {
    this.setState({...this.initState, eventTags: [...this.initState.eventTags]});
    this.props.actions.toggleAddEventForm(false);
    this.props.actions.setEditingEvent(/* null */);
  };

  /** FORM MODIFICATION EVENTS */

  handleEventCategoryChange = e => {
    this.setState({eventCategory: e.target.value});
  }

  handleEventTitleChange = e => {
    this.setState({eventTitle: e.target.value, hasTitle: e.target.value !== ""});
  }

  handleEventDateChange = (m, d, y, valid) => {
    this.setState({
      eventMonth: m,
      eventDay: d,
      eventYear: y,
      validDate: valid,
    });
  }

  handleEventDescChange = e => {
    this.setState({eventDesc: e.target.value});
  }

  handleEventTagChange = tags => {
    this.setState({ eventTags: tags });
  }

  handleEventImgChange = e => {
    const reader = new FileReader();
    reader.addEventListener('load', () => this.setState({eventImg: reader.result}), false);
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    } else {
      this.setState({eventImg: ""});
    }
  }

  handleEventImgClear = () => this.setState({eventImg: ""})

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({snackbarOpen: false});
  }

  submitEvent = () => {
    if (!this.state.hasTitle || !this.state.validDate) {
      this.setState({snackbarOpen: true});
    } else {
      // Delete editingEvent if exists
      if (this.props.timeline.editingEvent != null) {
        this.props.actions.deleteEvent(
          this.props.timeline.editingEvent.id,
          this.props.timeline.editingEvent.ref,
          this.props.timeline.editingEvent.hi);
      }
      // (Re)add current event
      this.props.actions.addEvent(this.buildEventProto())
        .then(() => this.props.actions.dataOperationSnackbarSucceeded())
        .catch(() => this.props.actions.dataOperationSnackbarFailed());
      this.handleClose();
    }
  }

  /**
   * Build event proto from form info.
   * Reuses ID of editingEvent if exists.
   */
  buildEventProto = () => {
    const img = this.refs.cropper &&
        this.refs.cropper.getCroppedCanvas() !== null
      ? this.refs.cropper.getCroppedCanvas().toDataURL()
      : "";
    const id = this.props.timeline.editingEvent == null
      ? Date.now()
      : this.props.timeline.editingEvent.id;

    const e = new EventProto();
    e.c = this.state.eventCategory;
    e.t = this.state.eventTitle;
    e.de = this.state.eventDesc;
    e.tg = this.state.eventTags;
    e.y = this.state.eventYear.replace(/^[0]+/g,"");
    e.m = this.state.eventMonth;
    e.d = this.state.eventDay.replace(/^[0]+/g,"");
    e.i = img;
    e.hi = !!img;
    e.id = id;
    e.ms = this.buildDateTime(e.d, e.m, e.y);
    return e
  }

  buildDateTime = (d, m, y) => {
    const MONTHS = { 
      "January" : 1, "February" : 2, "March" : 3, "April" : 4, "May" : 5,
      "June" : 6, "July" : 7, "August" : 8, "September" : 9, "October" : 10,
      "November" : 11, "December" : 12
    }
    var date = new Date();
    if (d === "" && m === "") {
      date.setFullYear(parseInt(y, 10));
      date.setMonth(0);
      date.setDate(1);
      date.setHours(0);
      date.setMinutes(0);
    } else if (d === "") {
      date.setFullYear(parseInt(y, 10));
      date.setMonth(MONTHS[m]-1)
      date.setDate(1);
      date.setHours(1);
      date.setMinutes(0);
    } else {
      date.setFullYear(parseInt(y, 10));
      date.setMonth(MONTHS[m]-1);
      date.setDate(parseInt(d, 10));
      date.setHours(1);
      date.setMinutes(1);
    }
    return date.getTime();
  }

  renderCropper = () => {
    if (this.state.eventImg) {
      return (
        [
          <IconButton
              color="inherit"
              onClick={this.handleEventImgClear}
              aria-label="Close"
              key="closeImgButton">
            <CloseIcon />
          </IconButton>,
          <Cropper
              ref="cropper"
              src={this.state.eventImg}
              style={{width: 640, height: 360}}
              aspectRatio={16 / 9}
              autoCropArea={1}
              guides={true}
              dragMode="move"
              key="imgCropper"/>
        ]
      );
    }
  }

  render() {
    const titleError = this.state.eventTitle === "";
    return (
      <div>
        {/** Floating '+' action button */}
        <Button
            variant="fab"
            color="primary"
            className="timeline-add-event-fab"
            onClick={this.handleClickOpen}>
          <AddIcon />
        </Button>

        {/** Fullscreen add event dialog */}
        <Dialog
          fullScreen
          open={this.props.timeline.isAddEventFormOpen}
          onEnter={this.refreshFields}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          aria-labelledby="form-dialog-title"
        >
          <AppBar className="timeline-add-event-dialog__app-bar">
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className="timeline-add-event-dialog__app-bar-text">
                Add Event
              </Typography>
              <Button color="inherit" onClick={this.submitEvent}>
                Save
              </Button>
            </Toolbar>
          </AppBar>
          
          <form className="timeline-add-event-form__container">

            {/** Event Category Select */}
            <CategorySelect
                category={this.state.eventCategory}
                onChange={this.handleEventCategoryChange} />

            {/** Event Title */}
            <TextField
              required
              autoFocus
              id="eventTitle"
              label="Title"
              margin="normal"
              fullWidth
              onChange={this.handleEventTitleChange}
              value={this.state.eventTitle}
              error={titleError}
              helperText={titleError ? "This field is required" : ""}
            />

            {/** Date Picker */}
            <DatePicker
              day={this.state.eventDay}
              month={this.state.eventMonth}
              year={this.state.eventYear}
              onChange={this.handleEventDateChange} />

            {/** Event Description */}
            <TextField
              id="eventDesc"
              label="Description"
              multiline={true}
              margin="normal"
              className="timeline-add-event-desc"
              fullWidth
              onChange={this.handleEventDescChange}
              value={this.state.eventDesc}
              helperText="As long or short as you want!"
            />

            <TagInput 
                eventTags={this.state.eventTags}
                availableTags={_.difference(this.props.timeline.availableTags, this.state.eventTags)}
                onChange={this.handleEventTagChange} />

            {/** Image uploading and cropping */}
            <FormControl className="timeline-add-event-file-select">
              <UploadButton onChange={this.handleEventImgChange} variant="outlined">
                Select an Image
              </UploadButton>
              <FormHelperText>
                (Optional) Upload an image to remember the event
              </FormHelperText>
            </FormControl>
            {this.renderCropper()}

          </form>

          {/** Error toast */}
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.snackbarOpen}
            autoHideDuration={2000}
            onClose={this.handleSnackbarClose}
            message={<span id="message-id">Please fill in the required fields</span>}
          />

        </Dialog>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    timeline: state.timeline,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, dataOperationSnackbarFailed, dataOperationSnackbarSucceeded }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEventForm);

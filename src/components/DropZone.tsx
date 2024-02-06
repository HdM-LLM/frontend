import * as React from 'react';
import TextField from '@mui/material/TextField';

/**
 * Defines the props expected by the DropZone component.
 */
interface DropZoneProps {
  setFile: (file: File) => void;
}

/**
 * Defines the state type for the DropZone component.
 */
interface DropZoneState {
  filename: string;
}

/**
 * React component to create a drop zone for file uploads.
 * Handles drag and drop events to provide a user-friendly interface for file uploads.
 */
export class DropZone extends React.Component<DropZoneProps, DropZoneState> {
  constructor(props: DropZoneProps) {
    super(props);
    this.state = { filename: '' };
  }

  /**
   * Handles the drag over event to ensure the drop operation is allowed.
   * @param e - The event object.
   */
  dragOver = (e: any) => {
    let event = e as Event;
    event.stopPropagation();
    event.preventDefault();
  };

  /**
   * Handles the drag enter event, ensuring the component visually responds to a drag action entering the drop zone.
   * @param e - The event object.
   */
  dragEnter = (e: any) => {
    let event = e as Event;
    event.stopPropagation();
    event.preventDefault();
  };

  /**
   * Handles dropping of the file onto the drop zone. Extracts the file from the event,
   * updates the component state, and invokes the parent component's setFile method.
   * @param e - The event object containing the dropped file.
   */
  fileDrop = (e: any) => {
    let event = e as Event;
    event.stopPropagation();
    event.preventDefault();
    this.props.setFile(e.dataTransfer.files[0]);
    this.setState({ filename: e.dataTransfer.files[0].name });
  };

  render() {
    return (
      <div onDragEnter={this.dragEnter} onDragOver={this.dragOver} onDrop={this.fileDrop}>
        <TextField
          disabled
          id="cover_letter-input"
          size="medium"
          sx={{ width: '300px', marginRight: 2 }}
          label="Drop File here"
          value={this.state.filename === '' ? 'Drop File here' : this.state.filename}
        />
        <input
          type="file"
          accept="application/pdf"
          hidden
          onChange={(e: any) => {
            this.props.setFile(e.dataTransfer.files[0]);
          }}
        />
      </div>
    );
  }
}

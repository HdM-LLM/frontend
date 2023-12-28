import * as React from 'react';
import TextField from '@mui/material/TextField';

interface DropZoneProps {
  setFile: (file: File) => void;
}

interface DropZoneState {
  filename: string;
}

export class DropZone extends React.Component<DropZoneProps, DropZoneState> {
  constructor(props: DropZoneProps) {
    super(props);
    this.state = { filename: '' };
  }

  dragOver = (e: any) => {
    let event = e as Event;
    event.stopPropagation();
    event.preventDefault();
  };

  dragEnter = (e: any) => {
    let event = e as Event;
    event.stopPropagation();
    event.preventDefault();
  };

  fileDrop = (e: any) => {
    let event = e as Event;
    event.stopPropagation();
    event.preventDefault();
    this.props.setFile(e.dataTransfer.files[0]);
    this.setState({ filename: e.dataTransfer.files[0].name });
    console.log(this.state.filename);
  };

  render() {
    return (
      <div onDragEnter={this.dragEnter} onDragOver={this.dragOver} onDrop={this.fileDrop}>
        <TextField
          disabled
          id="cover_letter-input"
          label="CV"
          size="medium"
          sx={{ width: '300px', marginRight: 2 }}
          defaultValue="Drop File here"
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

import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import React, { useState } from 'react';

interface ErrorProps {
  errorCode: number;
  errorMessage: string;
}

export default function ErrorDialog(props: ErrorProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <Box>
      <Dialog open={openDialog} PaperProps={{ style: { maxHeight: '40vh' } }} fullWidth>
        <DialogTitle>Error {props.errorCode}</DialogTitle>
        <DialogContent
          style={{
            position: 'relative',
            padding: '20px',
            maxHeight: '30vh',
            overflowY: 'auto',
          }}
        >
          <Typography>{props.errorMessage}</Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

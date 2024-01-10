import { Button } from '@material-ui/core'
import { styled } from '@mui/material/styles';
import { CloudUpload } from '@material-ui/icons'
import React from 'react'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})
const Folders = () => {
  return (
    <div className='folders'>
      <Button component="label" variant="contained" startIcon={<CloudUpload />} className='buttonForUploadFiles'>
        Upload photos
        <VisuallyHiddenInput type="file" />
      </Button>
    </div>
  )
}

export default Folders


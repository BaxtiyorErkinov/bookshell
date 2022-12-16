import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { requests } from '../../api/requests';

interface IProps {
  isOpen: boolean;
  setIsOpen: any;
}

const CreateBookModal: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [params, setParams] = React.useState({
    isbn: '',
  });

  const handlePostBook = async () => {
    try {
      if (params.isbn.length >= 10) {
        await requests.createBook(params);
        setParams({ isbn: '' });
        setIsOpen({
          edit: false,
          create: false,
          delete: false,
        });
      }
    } catch {
      throw new Error('erorr in create book');
    }
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() =>
          setIsOpen({
            edit: false,
            create: false,
            delete: false,
          })
        }>
        <DialogTitle>Create</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the correctly International
            Standard Book Number.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="isbn"
            label="International Standard Book Number"
            type="isbn"
            fullWidth
            variant="standard"
            value={params.isbn}
            onChange={(e) =>
              setParams((prev) => ({
                ...prev,
                isbn: e.target.value,
              }))
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => handlePostBook()}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateBookModal;

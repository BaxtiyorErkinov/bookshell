import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { IBook } from '../../models/IBook';
import CustomeSelect from '../Select';
import { requests } from '../../api/requests';

interface IProps {
  data: IBook;
  status: number;
  activeActions: {
    edit: boolean | null;
    create: boolean | null;
    delete: boolean | null;
  };
  deleteFn: any;
}

const BookItem = ({
  data,
  status,
  activeActions,
  deleteFn,
}: IProps) => {
  const {
    author,
    cover,
    isbn,
    published,
    title,
    id,
    pages,
  } = data;
  const [bookStatus, setBookStatus] = React.useState(
    status.toString(),
  );

  const handleChangeStatus = async () => {
    try {
      await requests.changeBookStatus(id, {
        book: {
          author,
          isbn,
          title,
          published,
          pages,
        },
        status: Number(bookStatus),
      });
    } catch {
      throw new Error('error in change status of book');
    }
  };

  React.useEffect(() => {
    if (Number(bookStatus) !== status) {
      handleChangeStatus();
    }
  }, [bookStatus]);

  return (
    <Grid item>
      <CardActionArea component="a" href="#">
        {activeActions.delete ? (
          <IconButton
            aria-label="delete"
            className="create-btn"
            onClick={() => deleteFn(id)}>
            <DeleteIcon />
          </IconButton>
        ) : null}

        <Card
          sx={{
            display: 'flex',
            position: 'relative',
          }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography
              component="h6"
              variant="h5"
              sx={{ fontSize: '20px' }}>
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary">
              {author}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {published}
            </Typography>
            <CustomeSelect
              value={bookStatus}
              setValue={setBookStatus}
            />
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              width: 160,
              height: 230,
              display: { xs: 'none', sm: 'block' },
            }}
            image={
              cover?.length > 0
                ? cover
                : 'https://source.unsplash.com/random'
            }
            alt="img"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default BookItem;

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { IBook } from '../../models/IBook';
import { requests } from '../../api/requests';
import { useDispatch } from 'react-redux';
import { setAppModal } from '../../store/reducers/app/actions';
import { setBook } from '../../store/reducers/Book/action-creators';
import { useSelector } from 'react-redux';

import './book.css';

interface IProps {
  data: IBook;
}

const BookItemSecond = ({ data }: IProps) => {
  const { author, cover, isbn, published, title, id } = data;
  const dispatch = useDispatch();
  const { books } = useSelector(({ bookReducer }) => bookReducer);

  const handleAddBook = async () => {
    try {
      const bookExist = books.findIndex((el: IBook) => el.isbn === isbn);
      console.log(bookExist);
      if (bookExist === -1) {
        await requests.createBook({ isbn });
        const res = await requests.getAllBooks();
        dispatch(setBook(res?.data?.data));
        dispatch(
          setAppModal({
            type: 'success',
            msg: 'SUCCESSFULLY ADDED TO YOUR SHELF',
            is_open: true,
          }),
        );
      } else {
      }
    } catch (err) {
      dispatch(
        setAppModal({
          type: 'error',
          msg: err.response.data.message,
          is_open: true,
        }),
      );
    }
  };
  return (
    <Grid item>
      <CardActionArea component="a" href="#">
        <Card
          sx={{
            display: 'flex',
            position: 'relative',
          }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h6" variant="h5" sx={{ fontSize: '20px' }}>
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {author}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {published}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              ISBN: {isbn}
            </Typography>
            <Button variant="contained" onClick={() => handleAddBook()}>
              ADD TO MYSHELF
            </Button>
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              width: 160,
              height: 230,
              display: { xs: 'block', sm: 'block' },
            }}
            image={
              cover?.length > 0 ? cover : 'https://source.unsplash.com/random'
            }
            alt="qw"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default BookItemSecond;

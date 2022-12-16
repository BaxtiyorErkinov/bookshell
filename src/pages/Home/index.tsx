import { Button, CircularProgress, Grid, IconButton } from '@mui/material';
import React, { FC } from 'react';
import { requests } from '../../api/requests';
import BookItem from '../../components/BookItem';
import SubHeader from '../../components/Subheader';
import { md5Generator } from '../../utils/md5Generator';
import './home.css';

import AddIcon from '@mui/icons-material/Add';
import CreateBookModal from '../../components/CreateBookModal';
import { AllBooks, IBook } from '../../models/IBook';

import { useTypedSelector } from '../../utils/hooks/useTypedSelector';
import {
  setLoading,
  setError,
  setBook,
} from '../../store/reducers/Book/action-creators';
import { useDispatch } from 'react-redux';
import BackdropLoading from '../../components/Backdrop';
import ActionBtn from '../../components/ActionBtn';
import BookItemSecond from '../../components/BookItemSecond';
import { AllRoutes } from '../../router';
import { useNavigate } from 'react-router-dom';

const Home: FC = () => {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const { loading, error, books, searchedBooks } = useTypedSelector(
    (state) => state.bookReducer,
  );
  const [bookActions, setBookActions] = React.useState({
    edit: null,
    create: false,
    delete: null,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllBooks = async () => {
    try {
      const res = await requests.getAllBooks();
      if (res.data.data) {
        dispatch(setBook(res.data.data));
      } else {
        dispatch(setBook([]));
      }
    } catch {
      throw new Error('error in fetch books');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await requests.deleteBook(id);
      getAllBooks();
    } catch {
      throw new Error('error in delete book');
    }
  };
  const isAuth = localStorage.getItem('auth');

  React.useEffect(() => {
    if (!isAuth) {
      navigate(AllRoutes.LOGIN);
    } else {
      if (bookActions.create === false || bookActions.edit === false) {
        getAllBooks();
      }
    }
  }, [bookActions]);

  return (
    <div className="home">
      <SubHeader title="ALL BOOKS" />
      <ActionBtn setActive={setBookActions} />
      <CreateBookModal isOpen={bookActions.create} setIsOpen={setBookActions} />
      <div className="books__list">
        {loading ? (
          <div className="loader">
            <CircularProgress size={70} />
          </div>
        ) : null}
        {searchedBooks.length ? (
          <div className="title">
            <h1>Search Results</h1>
          </div>
        ) : null}
        <Grid container minWidth="100%" spacing={3}>
          {searchedBooks.length
            ? searchedBooks.map((el: any, i: number) => (
                <Grid item lg={4} md={4} sm={6} xs={12} key={i}>
                  <BookItemSecond data={el} />
                </Grid>
              ))
            : null}
        </Grid>
      </div>
      <div className="books__list">
        {books.length ? (
          <div className="title">
            <h1>My Books</h1>
          </div>
        ) : null}
        <Grid container minWidth="100%" spacing={3}>
          {books.length ? (
            books.map((el: any, i: number) => (
              <Grid item lg={4} md={4} sm={6} xs={12} key={i}>
                <BookItem
                  data={el.book}
                  status={el.status}
                  activeActions={bookActions}
                  deleteFn={handleDelete}
                />
              </Grid>
            ))
          ) : (
            <h1 className="notfound">Books not found</h1>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Home;

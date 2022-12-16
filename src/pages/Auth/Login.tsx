import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { requests } from '../../api/requests';
import { useDispatch } from 'react-redux';
import {
  setError,
  setLoading,
  setUser,
} from '../../store/reducers/auth/action-creators';
import { useTypedSelector } from '../../utils/hooks/useTypedSelector';
import { IUser } from '../../models/IUser';
import Validator from '../../utils/Validation';
import { setAppModal } from '../../store/reducers/app/actions';
import { Link } from 'react-router-dom';

interface IAuthInitial {
  key: string;
  secret: string;
}

const theme = createTheme();

const validator = new Validator({
  key: {
    type: 'string',
    maxLength: 60,
    minLength: 5,
  },
  secret: {
    type: 'string',
    maxLength: 60,
    minLength: 5,
  },
});

const initialState: IAuthInitial = {
  key: '',
  secret: '',
};
const Login: React.FC = () => {
  const [authState, setAuthState] = React.useState<IAuthInitial>(initialState);
  const [validations, setValidations] =
    React.useState<IAuthInitial>(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useTypedSelector((state) => state.authReducer);
  const [valid, errors] = validator.checkAgainstSchema(authState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (valid) {
      try {
        dispatch(setLoading(true));
        const res = await requests.getMySelf(authState);
        dispatch(setUser(res.data.data as IUser));
        localStorage.setItem('auth', 'true');
        localStorage.setItem('userInfo', JSON.stringify(res.data.data));
        navigate('/');
        dispatch(
          setAppModal({
            is_open: true,
            msg: 'WELOME',
            type: 'success',
          }),
        );
      } catch {
        dispatch(setError('Please fill in the fields correctly'));
        dispatch(
          setAppModal({
            is_open: true,
            msg: 'INVALID USER SECRET OR KEY!',
            type: 'error',
          }),
        );
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    const [, error] = validator.check(field, value);
    console.log(error);

    setValidations((state) => ({ ...state, [field]: error }));

    setAuthState((prev: IAuthInitial) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="Key"
                label="Key"
                type="key"
                id="key"
                value={authState.key}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange('key', e.target.value)
                }
                error={!!validations.key}
                helperText={validations.key}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="secret"
                label="secret"
                type="secret"
                id="secret"
                value={authState.secret}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange('secret', e.target.value)
                }
                error={!!validations.secret}
                helperText={validations.secret}
              />

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={isLoading}
                disabled={!valid}
                sx={{ mt: 3, mb: 2 }}>
                Sign In
              </LoadingButton>
            </Box>
            <Link style={{ zIndex: 10000 }} to="/signup">
              registration
            </Link>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Login;

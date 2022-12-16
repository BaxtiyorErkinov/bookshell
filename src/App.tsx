import React from 'react';
import AppRouter from './components/AppRouter';
import { useTypedSelector } from './utils/hooks/useTypedSelector';

function App() {
  const data = useTypedSelector(
    (state) => state.authReducer,
  );
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;

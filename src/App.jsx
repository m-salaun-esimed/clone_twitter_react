import { Fragment } from 'react'
import './App.css'
import AuthGuard from './shared/guards/AuthGuard';

function App() {

  return (
    <Fragment>
      <h1></h1>
    </Fragment>
  );
}

export default AuthGuard(App);

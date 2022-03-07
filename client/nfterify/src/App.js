import CreateItem from './components/CreateItem';
import './App.css';
import Content from './components/Content';
import UserContent from './components/userComponets/UserContent';
import MintItem from './components/userComponets/MintItem';
import ItemDetail from './components/ItemDetail';
import ListItems from './components/ListItems';
import AdminHome from './Pages/AdminHome';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <NavBar />

      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/">
          <Login />
        </Route>

        <PrivateRoute exact path="/ListItems">
          <ListItems />
        </PrivateRoute>

        <PrivateRoute exact path="/createItem">
          <CreateItem />
        </PrivateRoute>

        <PrivateRoute exact path="/dashboard">
          <Content />
        </PrivateRoute>

        <PrivateRoute exact path="/item/:itemId">
          <ItemDetail />
        </PrivateRoute>

        <PrivateRoute exact path="/user">
          <UserContent />
        </PrivateRoute>
        <PrivateRoute exact path="/mint">
          <MintItem />
        </PrivateRoute>

        {/* Can also use a named `children` prop */}
        {/*<Route path="/users/:id" children={<User />} />*/}
      </Switch>
    </>
  );
}

export default App;

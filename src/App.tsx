import "./App.css";
import AddUser from "./components/Form/AddUser";
import Users from "./components/Users/Users";

function App() {
  return (
    <div className="App">
      <Users />
      <AddUser />
    </div>
  );
}

export default App;

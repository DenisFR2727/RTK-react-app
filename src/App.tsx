import "./App.css";
import AddUser from "./components/Form/AddUser";
import DeleteUserModal from "./components/Users/DeleteUserModal";
import Users from "./components/Users/Users";
import { useAppSelector } from "./redux/hooks";

function App() {
  const isShowDeleteModal = useAppSelector(
    (state) => state.user.isShowDeleteModal
  );
  return (
    <div className="App">
      <Users />
      <AddUser />
      {isShowDeleteModal && <DeleteUserModal />}
    </div>
  );
}

export default App;

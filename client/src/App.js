import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";

import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./store/UserStore";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(undefined);

  return (
    <div className="App">
      <ChakraProvider>
        <UserProvider value={{ user, setUser }}>
          <Router>
            <Routes>
              {/* Public */}
              <Route
                index
                path="/"
                element={<Login onSuccess={(user) => setUser(user)} />}
              />
              <Route path="/register" element={<Register />} />
              {/* Member */}
              <Route path="/admin/:id" element={<Admin />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </Router>
        </UserProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;

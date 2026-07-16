import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './RootLayout';
import Messages from './pages/Messages';
import DailyFolders from './pages/DailyFolders.jsx';
import Home from './pages/Home';
import Quota from "./pages/Quota";
import Upsert from "./pages/Upsert.jsx";
import Privacy from "./pages/Privacy";
import Loading from './pages/Loading.jsx';
import NoMatch from "./pages/NoMatch.jsx";
import Success from "./pages/Success.jsx";

import { UserProvider, useUser } from './context/UserContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
function App() {
  const { userLoading } = useUser();
  const router = createBrowserRouter([
    {
      path: "/",
      element: userLoading ? <Loading /> : <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "messages", element: <Messages /> },
        { path: "messages/create", element: <Upsert myTableId={"6695461400342d012490"} />},
        { path: "messages/edit/:id", element: <Upsert myTableId={"6695461400342d012490"} />},
        { path: "dailyfolders", element: <DailyFolders /> },
        { path: "dailyfolders/create", element: <Upsert myTableId={"68b28927000dbf87a0aa"} /> },
        { path: "dailyfolders/edit/:id", element: <Upsert myTableId={"68b28927000dbf87a0aa"} /> },
        { path: "privacy", element: <Privacy/>},
        { path: "success", element: <Success />},
        { path: "*", element: <NoMatch />},
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
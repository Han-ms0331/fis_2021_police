import React, { useState } from "react";
import Login from "./login/login.js";
import Home from "./CenterManagement/Home.js";
import CenterManage from "./CenterManagement/CenterManage.js";
import Schedule from "./ScheduleManager/ScheduleManager";
import Navigation from "./Navigation";
import Logout from "./login/Logout";
import Statistic from "./Statistic/Statistic.js";
import AgentManagement from "./AgentManagement/AgentManagement";
import ReadingSche from "./ReadingSche/ReadingSche.js";
import Maillist from "./mailpage/maillist.js";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [isLogined, setIsLogined] = useState(false);
  const [UID, setUID] = useState("");
  const [currentPage, setCurrentPage] = useState("");

  const loginState = (condition) => {
    setIsLogined(condition);
  };

  return (
    <BrowserRouter>
      {isLogined ? (
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      ) : null}

      <Route
        path="/"
        render={() => (
          <Login
            userName={userName}
            setUserName={setUserName}
            passWord={passWord}
            setPassWord={setPassWord}
            isLogined={isLogined}
            setIsLogined={setIsLogined}
            UID={UID}
            setUID={setUID}
            loginState={loginState}
          />
        )}
        exact
      />
      <Route
        path="/home"
        render={() => (
          <Home isLogined={isLogined} setIsLogined={setIsLogined} />
        )}
      />
      <Route
        path="/schedule"
        render={() => (
          <Schedule isLogined={isLogined} setIsLogined={setIsLogined} />
        )}
      />
      <Route
        path="/center_manage"
        render={() => (
          <CenterManage isLogined={isLogined} setIsLogined={setIsLogined} />
        )}
      />
      <Route
        path="/readingschedule"
        render={() => (
          <ReadingSche isLogined={isLogined} setIsLogined={setIsLogined} />
        )}
      />
      <Route
        path="/statistic"
        render={() => (
          <Statistic isLogined={isLogined} setIsLogined={setIsLogined} />
        )}
      />
      <Route
        path="/agentemanagement"
        render={() => (
          <AgentManagement isLogined={isLogined} setIsLogined={setIsLogined} />
        )}
      />
      <Route
        path="/readingmail"
        render={() => (
          <Maillist isLogined={isLogined} setIsLogined={setIsLogined} />
        )}
      />
      <Route
        path="/logout"
        render={() => (
          <Logout isLogined={isLogined} setIsLogined={setIsLogined} />
        )}
      />
    </BrowserRouter>
  );
}

export default App;

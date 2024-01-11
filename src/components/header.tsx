import React from "react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "zmp-ui";

import { getConfig } from "./config-provider";

const AppHeader = () => {
  const location = useLocation();

  const title = useMemo(() => {
    return getTitle(location.pathname);
  }, [location.pathname]);

  return (
    IsHideHeader(location.pathname) && (
      <Header
        className="sticky top-0 dark"
        title={title}
        style={{
          backgroundColor: getConfig((c) => c.colors.primary),
          color: getConfig((c) => c.app.textColor),
        }}
        showBackIcon={IsShowBackIcon(location.pathname)}
      />
    )
  );
};

export default AppHeader;

function getTitle(path: string) {
  if (path === "/dashboard") {
    return "Dashboard";
  }
  if (path === "/budget") {
    return "Budget";
  }
  if (path === "/add-expense") {
    return "Add expense";
  }
  if (path === "/dashboard") {
    return "Dashboard";
  }
  if (path === "/profile") {
    return "Profile";
  }
  return getConfig((c) => c.app.title);
}

function IsHideHeader(path: string) {
  const listNotAllowPaths: string[] = ["/", "/reels", "/order-details"];
  if (path == "/") {
    return false;
  }
  if (listNotAllowPaths.some((_path) => path.includes(_path) && _path != "/")) {
    return false;
  }
  return true;
}
function IsShowBackIcon(path: string) {
  const listNotAllowPaths: string[] = [
    "/dashboard",
    "/budget",
    "/add-expense",
    "/profile",
  ];

  if (listNotAllowPaths.includes(path)) {
    return false;
  }
  return true;
}

import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import {
  App,
  ZMPRouter,
  AnimationRoutes,
  SnackbarProvider,
  Spinner,
} from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "../pages";
import Header from "./header";
import { ConfigProvider, getConfig } from "./config-provider";
import { hexToRgb } from "../utils";
import NavigationBar from "./navigation-bar";
import Profile from "../pages/profile/profile";
import EditProfile from "../pages/edit-profile/edit-profile";
import AddExpense from "../pages/add-expense/add-expense";
import { message } from "antd";
import Budget from "../pages/budget/budget";
import Dashboard from "../pages/dashboard/dashboard";

const MyApp = () => {
  message.config({
    top: 50,
  });
  return (
    <RecoilRoot>
      <ConfigProvider
        cssVariables={{
          "--zmp-primary-color": getConfig((c) => c.template.primaryColor),
          "--zmp-primary-color-rgb": hexToRgb(
            getConfig((c) => c.template.primaryColor)
          ),
        }}
      >
        <App>
          <SnackbarProvider>
            <ZMPRouter>
              <Header />
              <AnimationRoutes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/add-expense" element={<AddExpense />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </AnimationRoutes>
              <NavigationBar />
            </ZMPRouter>
          </SnackbarProvider>
        </App>
      </ConfigProvider>
    </RecoilRoot>
  );
};
export default MyApp;

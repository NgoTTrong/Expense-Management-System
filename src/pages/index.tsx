import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Page } from "zmp-ui";
import onBoard from "../static/images/onboard.png";
import ZaloService from "../services/zalo-service";
import useUser from "../stores/user-store";
import UserService from "../services/user-service";
const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, setUser } = useUser();
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const userInfo = await ZaloService.getUser();
      if (userInfo) {
        const _user = await UserService.login(
          userInfo?.id,
          userInfo?.name,
          userInfo?.avatar
        );
        if (_user) {
          setUser(_user);
          navigate("/dashboard");
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Page className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#1CA380] to-white">
      <h1 className="font-bold text-left w-full text-xl text-white">
        Expense Management
      </h1>
      <div className="flex-1 flex flex-col gap-8 justify-center items-center w-full">
        <img src={onBoard} alt="" className="h-[50%]" />
        <Button
          className="w-full rounded-lg "
          onClick={handleLogin}
          loading={isLoading}
        >
          Đăng nhập bằng Zalo
        </Button>
      </div>
    </Page>
  );
};

export default HomePage;

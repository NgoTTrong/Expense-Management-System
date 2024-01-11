import React, { useEffect, useState } from "react";
import {
  Button,
  Page,
  Picker,
  useNavigate,
  Text,
  DatePicker,
  Input,
} from "zmp-ui";
import AvatarSection from "../../components/profile/avatar-section";
import { message } from "../../utils/notification";
import useUser from "../../stores/user-store";
import { InputText } from "../../components/input/InputText";
import UserService from "../../services/user-service";
import IUser from "../../interfaces/user-interface";

const EditProfile = () => {
  const navigate = useNavigate();
  const [fileImage, setFileImage] = useState<string>();
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState<{
    name?: string;
    phone?: string;
    avatar?: string;
  }>({});

  const handleUpdateInfo = async () => {
    try {
      setIsLoading(true);
      setUser({
        ...user,
        name: form?.name ?? user?.name ?? "",
        phone: form?.phone ?? user?.phone ?? "",
        avatar: fileImage ?? user?.avatar ?? "",
      } as IUser);
      await UserService.update(user?.id, form?.name, form?.phone);
    } catch (error) {
    } finally {
      setIsLoading(false);
      navigate("/profile", { replace: true });
    }
  };
  return (
    <Page className="flex flex-col w-full gap-4 p-4 bg-white">
      <AvatarSection
        name={user?.name}
        avatar={user?.avatar}
        setAvatarFile={setFileImage}
        role={"Member"}
        mode="ChangeAvatar"
      />
      <section className="flex flex-col gap-2">
        <h1 className="text-base my-0 font-medium">Thông tin cơ bản</h1>
        <div className="flex flex-col gap-4">
          <InputText
            title={"Họ và tên"}
            placeholder={"Nguyễn Thị B"}
            defaultValue={user?.name}
            value={form?.name}
            onChange={(event) => {
              setForm(
                (state) =>
                  ({
                    ...state,
                    name: event?.target?.value ?? "",
                  } as any)
              );
            }}
            required
          />

          <InputText
            title={"Số điện thoại"}
            placeholder={"0123579115"}
            required
            inputMode="numeric"
            className="flex-[1]"
            value={form?.phone}
            onChange={(event) => {
              setForm(
                (state) =>
                  ({
                    ...state,
                    phone: event?.target?.value,
                  } as any)
              );
            }}
          ></InputText>
        </div>

        <Button
          loading={isLoading}
          onClick={handleUpdateInfo}
          className="text-base font-medium text-white rounded-lg !bg-primary"
        >
          Lưu
        </Button>
      </section>
    </Page>
  );
};

export default EditProfile;

import React, { useState } from "react";
import { Page } from "zmp-ui";
import AvatarSection from "../../components/profile/avatar-section";
import InfoSection from "../../components/profile/info-section";
import useUser from "../../stores/user-store";
const Profile = () => {
  const { user } = useUser();
  return (
    <Page className="flex flex-col gap-4 p-4">
      <AvatarSection
        avatar={user?.avatar}
        name={user?.name}
        role={"Members"}
        mode="Edit"
      />

      <InfoSection
        title={"Thông tin cá nhân"}
        info={[
          {
            key: "Ngày tháng năm sinh",
            value: "-",
          },
          {
            key: "Số điện thoại",
            value: user?.phone ?? "-",
          },
        ]}
      />
    </Page>
  );
};

export default Profile;

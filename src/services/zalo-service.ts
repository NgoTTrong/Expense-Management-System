import { openChat } from "zmp-sdk/apis";
import api from "zmp-sdk";
import { message } from "../utils/notification";
export default class ZaloService {
  static openChatScreen = async (zaloId: string) => {
    try {
      if (zaloId) {
        await openChat({
          type: "user",
          id: zaloId,
        });
      }
    } catch (error) {
      message("Fail when try to chat with customer");
      console.log(error);
    }
  };
  static clickWebView = (id: string) => {
    api.openWebview({
      url: `https://rd.zapps.vn/detail/1783272961339323129?id=${id}&pageId=1783272961339323129`,
      success: () => {},
      fail: (error) => {},
    });
  };

  static getUser = async () => {
    await api.login({});
    const { userInfo } = await api.getUserInfo({});
    console.log(userInfo);
    return userInfo;
  };
}

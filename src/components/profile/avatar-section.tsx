import React, { Dispatch, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  avatar?: string;
  name?: string;
  role?: string;
  mode?: "Edit" | "ChangeAvatar";
  setAvatarFile?: Dispatch<string>;
};
const AvatarSection = ({
  avatar,
  name,
  role,
  mode = "Edit",
  setAvatarFile,
}: Props) => {
  const navigation = useNavigate();
  const [imageUrl, setImageUrl] = useState<string | undefined>(avatar);
  const thumbRef = useRef<HTMLInputElement>(null);
  return (
    <section className="w-full flex flex-col justify-center items-center gap-[1rem]">
      <div className="relative">
        <img
          src={imageUrl}
          alt="avatar"
          className="w-[100px] h-[100px] object-cover rounded-full"
          onClick={() => {
            if (mode == "ChangeAvatar" && thumbRef) {
              thumbRef.current?.click();
            }
          }}
        />

        <div className="p-[0.5rem] rounded-full border border-solid border-[#B9BDC1] absolute bg-white bottom-[-0.5rem] right-[-0.5rem]">
          {mode == "Edit" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              onClick={() => navigation("/edit-profile")}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.529 2.07504C11.7323 1.8718 12.0618 1.8718 12.265 2.07503L12.8834 2.69347C13.0867 2.89669 13.0867 3.22618 12.8835 3.42941L11.8971 4.41579L10.5427 3.0614L11.529 2.07504ZM9.47535 2.7147C9.47754 2.71243 9.47975 2.71017 9.482 2.70793L10.8219 1.36794C11.4157 0.774172 12.3783 0.77416 12.9721 1.36792L13.5906 1.98636C14.1843 2.58011 14.1843 3.54275 13.5906 4.1365L12.2574 5.46976C12.2552 5.47203 12.253 5.47429 12.2507 5.47652L6.20191 11.5254C5.955 11.7723 5.65399 11.9583 5.32273 12.0687L2.62224 12.9689C2.44257 13.0288 2.24449 12.982 2.11057 12.8481C1.97666 12.7142 1.92989 12.5161 1.98978 12.3364L2.88994 9.63593C3.00036 9.30467 3.18639 9.00366 3.43331 8.75674L9.47535 2.7147ZM9.83562 3.76864L4.14041 9.46385C4.00328 9.60099 3.89995 9.76817 3.83862 9.95216L3.25469 11.704L5.0065 11.12C5.19049 11.0587 5.35767 10.9554 5.49481 10.8182L11.19 5.12304L9.83562 3.76864ZM2.02679 14.9999C2.02679 14.7238 2.25065 14.4999 2.52679 14.4999L13.4565 14.4999C13.7326 14.4999 13.9565 14.7238 13.9565 14.9999C13.9565 15.2761 13.7326 15.4999 13.4565 15.4999L2.52679 15.4999C2.25065 15.4999 2.02679 15.2761 2.02679 14.9999Z"
                fill="#36383A"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="13"
              viewBox="0 0 14 13"
              fill="none"
              onClick={() => {
                if (thumbRef) {
                  thumbRef?.current?.click();
                  console.log("Click");
                }
              }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.1001 2.10005C8.9001 1.50005 8.8001 1.30005 8.2001 1.30005V1.20005H5.7001C5.2001 1.20005 5.1001 1.40005 4.9001 1.90005C4.88373 1.93279 4.86668 1.96821 4.84864 2.00572C4.64629 2.42633 4.31824 3.10823 3.4001 3.20005H2.7001C2.1001 3.20005 1.6001 3.50005 1.6001 4.00005V10.8C1.6001 11.2 2.1001 11.6 2.7001 11.6H11.1001C11.7001 11.6 12.2001 11.3 12.2001 10.8V4.00005C12.2001 3.60005 11.7001 3.20005 11.1001 3.20005H10.4001C9.64313 3.20005 9.33382 2.57333 9.1333 2.16704C9.1219 2.14395 9.11086 2.12156 9.1001 2.10005ZM5.7001 0.300049H8.2001C9.52408 0.300049 9.87691 1.17409 10.1045 1.73788C10.2035 1.98317 10.2788 2.16973 10.4001 2.20005H11.1001C12.3001 2.20005 13.2001 3.00005 13.2001 4.00005V10.7C13.2001 11.7 12.3001 12.5 11.1001 12.5H2.7001C1.5001 12.5 0.600098 11.7 0.600098 10.7V3.90005C0.600098 2.90005 1.5001 2.10005 2.7001 2.10005H3.4001C3.71492 2.10005 3.84391 1.82129 4.00036 1.48317C4.24147 0.9621 4.5478 0.300049 5.7001 0.300049ZM8.60019 7.10005C8.60019 6.10005 7.80019 5.40005 6.9002 5.40005C6.0002 5.40005 5.2002 6.10005 5.2002 7.10005C5.2002 8.10005 6.0002 8.80005 6.9002 8.80005C7.9002 8.80005 8.60019 8.10005 8.60019 7.10005ZM4.2002 7.10005C4.2002 5.60005 5.4002 4.40005 6.9002 4.40005C8.4002 4.40005 9.60019 5.60005 9.60019 7.10005C9.60019 8.60005 8.4002 9.80005 6.9002 9.80005C5.4002 9.80005 4.2002 8.60005 4.2002 7.10005Z"
                fill="#36383A"
              />
            </svg>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-[4px]">
        <h1 className="text-base font-[600] text-center">{name}</h1>
        <p className="text-sm text-center">{role}</p>
      </div>
      <input
        type="file"
        ref={thumbRef}
        multiple
        accept="image/*"
        onChange={(event) => {
          if (event.target.files) {
            if (event.target.files) {
              const file = event.target.files[0];

              const imageUrl = URL.createObjectURL(file);
              setImageUrl(imageUrl);
              if (setAvatarFile) {
                setAvatarFile(imageUrl);
              }
            }
          }
          return [];
        }}
        id="live-thumbnail"
        placeholder="Đặt tên cho live"
        className="hidden p-[12px] rounded-lg text-[1rem] border-solid border border-[#B9BDC1] outline-none focus:outline-none"
      />
    </section>
  );
};

export default AvatarSection;

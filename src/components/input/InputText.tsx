import React, { FC, ReactNode } from "react";
import Box, { BoxProps } from "zmp-ui/box";
import { Input, Text } from "zmp-ui";
import { InputProps } from "zmp-ui/input";

export const InputText: FC<
  {
    title: string;
    children?: ReactNode;
    placeholder: string;
    required?: boolean;
    type?: "text" | "number" | "password";
    notShow?: boolean;
  } & InputProps
> = ({
  children,
  title,
  placeholder,
  required = false,
  type = "text",
  notShow,
  ...props
}) => (
  <Box className="">
    <Box className="flex w-fit gap-1">
      <Text className="text-sm font-medium">{title}</Text>
      {required ? (
        <Box className="text-[red] text-xs">*</Box>
      ) : (
        <Text className="text-xs text-[#8F9499]"></Text>
      )}
    </Box>
    {children || (
      <Input
        placeholder={placeholder}
        required={required}
        type={type}
        {...props}
      />
    )}
  </Box>
);

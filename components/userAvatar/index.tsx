import React from "react";
import { Avatar, AvatarProps } from "react-native-ui-lib";

import { COLORS } from "@/configs/colors";

interface Props extends Omit<AvatarProps, "backgroundColor"> {}

const UserAvatar = (props: Props) => {
  return <Avatar {...props} animate backgroundColor={COLORS.blue2} />;
};

export default UserAvatar;

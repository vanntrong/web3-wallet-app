import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Avatar, Text, TouchableOpacity, View } from "react-native-ui-lib";

import { useAuthStore } from "@/stores/globalStore";
import { getAvatarLabel } from "@/utils/converter";

const Profile = React.forwardRef<RNTouchableOpacity, TouchableOpacityProps>(
  (props, ref) => {
    const { user } = useAuthStore();
    return (
      <TouchableOpacity ref={ref} {...props}>
        <View style={styles.profile}>
          <Avatar
            source={{
              uri: user?.avatar,
            }}
            label={getAvatarLabel(user?.name)}
            size={60}
          />
          <View style={styles.profileBody}>
            <Text style={styles.profileName}>{user?.name}</Text>
            {user?.email && (
              <Text style={styles.profileHandle}>{user?.email}</Text>
            )}
          </View>
          <Feather color="#bcbcbc" name="chevron-right" size={22} />
        </View>
      </TouchableOpacity>
    );
  }
);

export default Profile;

const styles = StyleSheet.create({
  /** Profile */
  profile: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileBody: {
    marginRight: "auto",
    marginLeft: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#292929",
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "400",
    color: "#858585",
  },
});

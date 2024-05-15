import { Link } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Switch, SwitchProps } from "react-native-ui-lib";

import Profile from "../components/profile";
import Row from "../components/row";

import Button from "@/components/button";
import { COLORS } from "@/configs/colors";

const CustomSwitch = ({ value, onValueChange }: SwitchProps) => {
  return (
    <Switch
      onValueChange={onValueChange}
      value={value}
      style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
      onColor={COLORS.gray24}
    />
  );
};

export default function SettingsScreen() {
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.appBackground }}>
      <View style={styles.container}>
        {/* <Header /> */}

        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.section, { paddingTop: 4 }]}>
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.sectionBody}>
              <Link href="/settings/profile" asChild>
                <Profile />
              </Link>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.sectionBody}>
              <Link href="/settings/privacy-and-security" asChild>
                <Row label="Privacy & Security" />
              </Link>
              <Link href="/settings/transactions" asChild>
                <Row label="Transactions" />
              </Link>
              {/* Email Notifications switch */}
              <Row
                label="Email Notifications"
                value={
                  <CustomSwitch
                    value={form.emailNotifications}
                    onValueChange={(emailNotifications) =>
                      setForm({ ...form, emailNotifications })
                    }
                  />
                }
              />
              {/* Push Notifications switch */}
              <Row
                label="Push Notifications"
                value={
                  <CustomSwitch
                    value={form.pushNotifications}
                    onValueChange={(pushNotifications) =>
                      setForm({ ...form, pushNotifications })
                    }
                  />
                }
                isLastRow
              />
            </View>
          </View>

          {/* Resources section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resources</Text>
            <View style={styles.sectionBody}>
              {/* Rows for various resources */}
              <Row label="Contact Us" onPress={() => {}} />
              <Row label="Report Bug" onPress={() => {}} />
              <Row label="Rate in App Store" onPress={() => {}} />
              <Row label="Terms and Privacy" onPress={() => {}} isLastRow />
            </View>
          </View>

          {/* Logout section */}
          <View style={styles.section}>
            <Button
              onPress={() => {}}
              style={styles.sectionBody}
              textStyle={styles.rowLabelLogout}
            >
              Log Out
            </Button>
          </View>

          {/* Footer */}
          <Text style={styles.contentFooter}>App Version 2.24 #50491</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },

  /** Content */
  content: {
    paddingHorizontal: 16,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    color: "#a69f9f",
  },
  /** Section */
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: "500",
    color: "#a69f9f",
    textTransform: "uppercase",
  },
  sectionBody: {
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 1,
  },

  /** Row */
  row: {
    height: 44,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#f0f0f0",
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: "#000",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ababab",
    marginRight: 4,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabelLogout: {
    width: "100%",
    textAlign: "center",
    fontWeight: "600",
    color: "#dc2626",
  },
});

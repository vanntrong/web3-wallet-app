import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";

import Button from "@/components/button";
import { COLORS } from "@/configs/colors";

const FloatingAddButtonLink = () => {
  return (
    <Link href="/add-token/" asChild>
      <Button
        style={{
          flex: 1,
          position: "absolute",
          bottom: 20,
          alignSelf: "center",
          width: "38%",
          maxWidth: 300,
        }}
        startIcon={<AntDesign name="plus" size={24} color={COLORS.primary5} />}
      >
        Add Token
      </Button>
    </Link>
  );
};

export default FloatingAddButtonLink;

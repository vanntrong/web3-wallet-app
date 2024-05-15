import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useCallback, useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native-ui-lib";

import Network from "./network";

import BottomSheetModal from "@/components/bottomSheetModal";
import { COLORS } from "@/configs/colors";
import { TNetwork } from "@/modules/network/types";
import { useNetworkStore } from "@/stores/globalStore";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  onSwitchNetwork?: (networkId: string) => void;
}

const NetworkSelectorBottomSheet = (props: Props) => {
  const { onSwitchNetwork } = props;
  const { networks, currentNetwork, setCurrentNetwork } = useNetworkStore();

  const snapPoints = useMemo(() => ["60%", "60%"], []);

  const handleChange = useCallback(
    (index: number) => {
      if (index === -1 && props.isOpen) {
        props.onClose?.();
      }
    },
    [props]
  );

  const handlePress = (network: TNetwork) => {
    props.onClose?.();
    const timer = setTimeout(() => {
      setCurrentNetwork(network);
      onSwitchNetwork?.(network.id);
      clearTimeout(timer);
    }, 250);
  };

  const testNetworks = useMemo(() => {
    return networks.filter((network) => network.isTestNet);
  }, [networks]);

  const mainNetworks = useMemo(() => {
    return networks.filter((network) => !network.isTestNet);
  }, [networks]);

  return (
    <BottomSheetModal
      {...props}
      enablePanDownToClose={false}
      enableOverDrag={false}
      snapPoints={snapPoints}
      onChange={handleChange}
      ViewComponent={BottomSheetScrollView}
      handleStyle={{ display: "none" }}
      animationConfigs={{
        duration: 150,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.mainnetHeading}>Networks</Text>
        <View style={styles.networkList}>
          {mainNetworks.map((network) => (
            <TouchableOpacity
              key={network.id}
              onPress={() => handlePress(network)}
            >
              <Network
                network={network}
                isSelected={currentNetwork?.id === network.id}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.testnetHeading}>Test Networks</Text>
        <View style={styles.networkList}>
          {testNetworks.map((network) => (
            <TouchableOpacity
              key={network.id}
              onPress={() => handlePress(network)}
            >
              <Network
                network={network}
                isSelected={currentNetwork?.id === network.id}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default NetworkSelectorBottomSheet;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  mainnetHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.gray24,
  },
  networkList: {
    marginTop: 16,
    gap: 12,
  },
  testnetHeading: {
    fontSize: 16,
    color: COLORS.gray24,
    marginTop: 24,
  },
});

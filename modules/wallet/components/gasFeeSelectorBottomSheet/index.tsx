import React, { useCallback, useMemo, useState } from "react";
import { View } from "react-native-ui-lib";

import AdvanceGasSelector from "./advanceSelector";
import BasicGasSelector from "./basicSelector";

import BottomSheetModal from "@/components/bottomSheetModal";
import Tabs from "@/components/tabs";
import { COLORS } from "@/configs/colors";
import { TSuggestedGasFees, TSuggestedGasType } from "@/modules/gas/types";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  data?: TSuggestedGasFees | null;
  setSuggestedGas: React.Dispatch<
    React.SetStateAction<{
      maxPriorityFeePerGas: string | null;
      baseFee: string | null;
    }>
  >;
}

const GasFeeSelectorBottomSheet = (props: Props) => {
  const { data, setSuggestedGas, onClose } = props;
  const snapPoints = useMemo(() => ["60%", "60%"], []);
  const [selectedKey, setSelectedKey] = useState<TSuggestedGasType>("medium");

  const handleChange = useCallback(
    (index: number) => {
      if (index === -1) {
        props.onClose?.();
      }
    },
    [props]
  );

  const handleItemClick = useCallback(
    (key: TSuggestedGasType) => {
      setSelectedKey(key);
      if (data) {
        const value = data[key];
        setSuggestedGas({
          baseFee: data.estimatedBaseFee,
          maxPriorityFeePerGas: value.suggestedMaxPriorityFeePerGas,
        });
      }

      onClose?.();
    },
    [data, onClose, setSuggestedGas]
  );

  const handleAdvanceSet = useCallback(
    (data: { maxPriorityFeePerGas: string | null; baseFee: string | null }) => {
      setSuggestedGas(data);
      onClose?.();
    },
    [onClose, setSuggestedGas]
  );

  return (
    <BottomSheetModal
      {...props}
      enableOverDrag={false}
      snapPoints={snapPoints}
      onChange={handleChange}
      animationConfigs={{
        duration: 150,
      }}
      handleStyle={{ backgroundColor: COLORS.appBackground }}
      viewStyle={{ backgroundColor: COLORS.appBackground }}
    >
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 32,
          height: "100%",
        }}
      >
        <Tabs
          items={[
            {
              label: "Basic",
              component: (
                <BasicGasSelector
                  data={data}
                  selectedKey={selectedKey}
                  onItemClick={handleItemClick}
                />
              ),
            },
            {
              label: "Advance",
              component: (
                <AdvanceGasSelector
                  defaultValue={{
                    baseFee: data?.estimatedBaseFee,
                    maxPriorityFeePerGas:
                      data?.[selectedKey]?.suggestedMaxPriorityFeePerGas,
                  }}
                  setSuggestedGas={handleAdvanceSet}
                />
              ),
            },
          ]}
        />
      </View>
    </BottomSheetModal>
  );
};

export default GasFeeSelectorBottomSheet;

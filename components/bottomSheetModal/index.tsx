import {
  BottomSheetBackdrop,
  BottomSheetModalProps,
  BottomSheetScrollView,
  BottomSheetView,
  BottomSheetModal as GBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { useEffect, useRef } from "react";
import { StyleProp, ViewStyle } from "react-native";

interface Props extends BottomSheetModalProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  viewStyle?: StyleProp<ViewStyle>;
  ViewComponent?: typeof BottomSheetView | typeof BottomSheetScrollView;
}

const BottomSheetModal = ({
  children,
  isOpen,
  onClose,
  viewStyle,
  ViewComponent = BottomSheetView,
  ...props
}: Props) => {
  const bottomSheetRef = useRef<GBottomSheetModal>(null);

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [isOpen]);

  return (
    <GBottomSheetModal
      {...props}
      handleStyle={[
        { borderTopLeftRadius: 16, borderTopRightRadius: 16 },
        props.handleStyle,
      ]}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} opacity={0.6} />
      )}
      ref={bottomSheetRef}
    >
      <ViewComponent style={viewStyle}>{children}</ViewComponent>
    </GBottomSheetModal>
  );
};

export default BottomSheetModal;

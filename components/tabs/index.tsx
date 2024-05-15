import useMergeRefs from "@kunukn/use-merge-refs";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import {
  TabController,
  TabControllerItemProps,
  View,
} from "react-native-ui-lib";

import TabBar from "./TabBar";

interface Props {
  items: (TabControllerItemProps & { component: React.ReactNode })[];
  activeIndex?: number;
}

export interface TabControllerRef {
  setTab: (index: number) => void;
}

const Tabs = React.forwardRef<any, Props>(({ items }, ref) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const tabControllerRef = useRef<TabControllerRef>(null);

  const handleChangeTab = (index: number) => {
    tabControllerRef.current?.setTab(index);
  };

  useImperativeHandle(ref, () => ({
    setTab: handleChangeTab,
  }));

  return (
    <TabController
      ref={tabControllerRef}
      items={items}
      onChangeIndex={setActiveIndex}
      useSafeArea
    >
      <TabBar
        items={items}
        activeIndex={activeIndex}
        onChangeIndex={handleChangeTab}
      />

      <View style={{ marginTop: 16, flex: 1 }}>
        {items.map(({ component, ...other }, index) => (
          <TabController.TabPage key={index} index={index} {...other}>
            {component}
          </TabController.TabPage>
        ))}
      </View>
    </TabController>
  );
});

export default Tabs;

import { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet } from "react-native";

import { AppButton, AppCard } from "@/components/common";

type Props = {
  data: string[];
  selected: string;
  onChange: (value: string) => void;
  slideUpOnMount?: boolean;
};

export default function HorizontalSelector({
  data,
  selected,
  onChange,
  slideUpOnMount,
}: Props) {
  const translate = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (slideUpOnMount) {
      Animated.parallel([
        Animated.timing(translate, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      opacity.setValue(1);
      translate.setValue(0);
    }
  }, [slideUpOnMount, translate, opacity]);

  return (
    <Animated.View style={{ transform: [{ translateY: translate }], opacity }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {data.map((item) => (
          <AppCard key={item} style={styles.item}>
            <AppButton
              title={item}
              onPress={() => onChange(item)}
              style={
                item === selected ? styles.activeButton : styles.inactiveButton
              }
              textStyle={
                item === selected ? styles.activeText : styles.inactiveText
              }
            />
          </AppCard>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 6,
  },

  item: {
    minWidth: 72,
    paddingHorizontal: 4,
  },
  activeButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  inactiveButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    opacity: 0.85,
  },
  activeText: {
    fontSize: 13,
  },
  inactiveText: {
    fontSize: 13,
  },
});

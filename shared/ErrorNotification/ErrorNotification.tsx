import { ErrorNotificationProps } from "@/shared/ErrorNotification/ErrorNotification.props";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, Animated } from "react-native";
import { Colors } from "@/shared/tokens";

const ErrorNotification = ({ error, setError }: ErrorNotificationProps) => {
  const [isShown, setIsShown] = useState<boolean>(false);

  const animatedValue = new Animated.Value(-100);

  const onEnter = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (!error) return;

    setIsShown(true);
    const timerId = setTimeout(() => {
      setIsShown(false);
      setError("");
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [error]);

  if (!isShown) {
    return <></>;
  }

  return (
    <Animated.View
      style={{ ...styles.wrapper, transform: [{ translateY: animatedValue }] }}
      onLayout={onEnter}
    >
      <Text style={styles.text}>{error}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: Colors.red,
    padding: 15,
    width: Dimensions.get("window").width,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    textAlign: "center",
  },
});

export default ErrorNotification;

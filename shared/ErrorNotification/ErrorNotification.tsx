import { ErrorNotificationProps } from "@/shared/ErrorNotification/ErrorNotification.props";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, Dimensions, Animated } from "react-native";
import { Colors } from "@/shared/tokens";

const ErrorNotification = ({ error, setError }: ErrorNotificationProps) => {
  const [isShown, setIsShown] = useState(false);

  const translateY = useRef(new Animated.Value(-200)).current;

  const showNotification = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideNotification = () => {
    Animated.timing(translateY, {
      toValue: -200,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsShown(false);
    });
  };

  useEffect(() => {
    if (!error) return;

    setIsShown(true);
    showNotification();

    const timerId = setTimeout(() => {
      hideNotification();
    }, 3000);

    return () => clearTimeout(timerId);
  }, [error]);

  if (!isShown) return null;

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          transform: [{ translateY }],
        },
      ]}
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
    zIndex: 1000,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    textAlign: "center",
  },
});

export default ErrorNotification;

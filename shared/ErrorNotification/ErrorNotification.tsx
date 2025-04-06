import {ErrorNotificationProps} from "@/shared/ErrorNotification/ErrorNotification.props";
import {useEffect, useState} from "react";
import {StyleSheet, View, Text, Dimensions} from "react-native";
import {Colors} from "@/shared/tokens";

const ErrorNotification = ({error, setError}: ErrorNotificationProps) => {
    const [isShown, setIsShown] = useState<boolean>(false);

    useEffect(() => {
        if (!error) return

        setIsShown(true);
        const timerId = setTimeout(() => {
            setIsShown(false);
            setError('')
        }, 3000)

        return () => {
            clearTimeout(timerId);
        }
    }, [error])

    if (!isShown) {
        return <></>;
    }

    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>
                {error}
            </Text>
        </View>
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
        textAlign: "center"
    },
})

export default ErrorNotification;
import {Pressable, StyleSheet, TextInput, TextInputProps, View} from "react-native";
import {Colors, Radius} from "@/shared/tokens";
import {useState} from "react";
import EyeOpenIcon from "@/assets/icons/eye-open";
import EyeClosedIcon from "@/assets/icons/eye-close";

const Input = ({isPassword, ...props}: TextInputProps & { isPassword?: boolean }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const changeVisiblePassword = () => {
        setIsPasswordVisible((state) => !state)
    }

    return (
        <View style={styles.inputBlock}>
            <TextInput {...props} style={styles.input} placeholderTextColor={Colors.gray}
                       secureTextEntry={isPassword && !isPasswordVisible}/>
            {isPassword && <Pressable style={styles.eyeIcon} onPress={changeVisiblePassword}>
                {isPasswordVisible ? <EyeOpenIcon/> : <EyeClosedIcon/>}
            </Pressable>}
        </View>
    );
};

const styles = StyleSheet.create({
    inputBlock: {
        position: "relative"
    },
    input: {
        height: 58,
        paddingHorizontal: 24,
        borderRadius: Radius.r10,
        fontSize: 16,
        backgroundColor: Colors.violetDark,
        color: Colors.white,
    },
    eyeIcon: {
        position: "absolute",
        right: 16,
        top: 20
    }
})

export default Input;
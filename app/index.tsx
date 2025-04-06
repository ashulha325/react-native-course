import { StyleSheet, Text, View, Image } from "react-native";
import Input from "@/shared/Input/Input";
import { Colors, Gaps } from "@/shared/tokens";
import Button from "@/shared/Button/Button";
import { useState } from "react";
import ErrorNotification from "@/shared/ErrorNotification/ErrorNotification";

export default function Page() {
  const [error, setError] = useState<string | undefined>("");

  const handleAlert = () => {
    setError("Помилка");
    setTimeout(()=>{
      setError("");
    },3000)
  };
  return (
    <View style={styles.container}>
      <ErrorNotification error={error} setError={setError} />
      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.png")}
          resizeMode={"contain"}
        />
        <View style={styles.form}>
          <Input placeholder={"Email"} />
          <Input placeholder={"Пароль"} isPassword={true} />
          <Button text={"Войти"} onPress={handleAlert} />
        </View>
        <Text>Востановить пароль</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 55,
    backgroundColor: Colors.black,
  },
  content: {
    gap: Gaps.g50,
    alignItems: "center",
  },
  form: {
    alignSelf: "stretch",
    gap: Gaps.g16,
  },
  input: {},
  logo: {
    width: 220,
  },
});

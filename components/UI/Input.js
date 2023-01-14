import { TextInput, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/Styles";

function Input({ label, textInputConfig, textConfig, containerStyle }) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.text} {...textConfig}>
        {label}
      </Text>
      <TextInput style={styles.inputBox} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    borderColor: GlobalStyles.colors.accent,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 22,
    fontFamily: "primary",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: "bold",
    fontSize: 18,
  },
  container: {
    paddingVertical: 10,
  },
});

export default Input;

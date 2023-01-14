import { Pressable, Text } from "react-native";
import { GlobalStyles } from "../../constants/Styles";

function Button({ style, label, textStyle, onPress, icon }) {
  return (
    <Pressable
      style={({ pressed }) => [
        pressed ? { opacity: 0.5 } : {},
        {
          marginTop: 10,
          borderWidth: 2,
          borderRadius: 5,
          width: 172,
          height: 45,
          justifyContent: "center",
          alignItems: "center",
          borderColor: GlobalStyles.colors.accent,
        },
        style,
      ]}
      onPress={onPress}
    >
      {label ? (
        <Text
          style={[
            {
              fontSize: 20,
              fontFamily: "bold",
            },
            { ...textStyle },
          ]}
        >
          {label}
        </Text>
      ) : (
        icon
      )}
    </Pressable>
  );
}

export default Button;

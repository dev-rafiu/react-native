import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

export type TItem = {
  id: number;
  icon: any;
  text: string;
};

function OnboardingItem({ item }: { item: TItem }) {
  const { icon, text } = item;

  return (
    <LinearGradient
      colors={["#1253AA", "#082D52", "#05243E"]}
      style={styles.parentView}
    >
      <View style={styles.container}>
        <Image source={icon} style={styles.image} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </LinearGradient>
  );
}

export default OnboardingItem;

const styles = StyleSheet.create({
  parentView: {
    width: screenWidth,
    height: screenHeight,
    padding: 20,
  },

  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
    gap: 20,
  },

  image: {
    width: 300,
    height: 300,
    marginHorizontal: "auto",
    objectFit: "contain",
  },

  text: {
    fontSize: 18,
    color: "#fff",
    maxWidth: 240,
    fontFamily: "Poppins-Regular",
    lineHeight: 23,
    textAlign: "center",
    fontWeight: "800",
  },
});

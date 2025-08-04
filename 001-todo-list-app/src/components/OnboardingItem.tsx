import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

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
    flex: 1,
    padding: 20,
    height: screenHeight,
    width: screenWidth,
  },

  container: {
    alignItems: "center",
    marginTop: 100,
    height: 400,
    justifyContent: "space-between",
  },

  image: {
    width: 230,
    height: 300,
    marginHorizontal: "auto",
    objectFit: "contain",
  },

  text: {
    fontSize: 18,
    color: "#fff",
    maxWidth: 255,
    fontFamily: "Poppins-Regular",
    lineHeight: 23,
    textAlign: "center",
    fontWeight: "800",
  },
});

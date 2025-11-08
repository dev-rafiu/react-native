import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, View } from "react-native";

function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["#1253AA", "#082D52", "#05243E"]}
      className="flex-1 p-5"
    >
      <View className="py-5 w-[60%] flex-row items-center justify-between">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default ProfileScreen;

import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Typography } from "@/src/constants/Typography";
import { useSimulateAuth } from "@/src/hooks/useAuth";

function SignupScreen() {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const simulateAuthMutation = useSimulateAuth();

  const handleSignUp = () => {
    if (
      formState.fullName === "" ||
      formState.email === "" ||
      formState.password === ""
    ) {
      Alert.alert("Please fill in all fields");
      return;
    }

    simulateAuthMutation.mutate();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = (key: string, value: string) => {
    setFormState({ ...formState, [key]: value });
  };

  return (
    <LinearGradient
      colors={["#1253AA", "#082D52", "#05243E"]}
      style={styles.container}
    >
      {/* header */}
      <View style={styles.header}>
        <AntDesign
          name="checkcircle"
          size={60}
          color={"#fff"}
          style={styles.icon}
        />
        <Text style={styles.title}>
          Welcome to <Text style={styles.logo}>DO IT</Text>
        </Text>
        <Text style={styles.subtitle}>create an account and Join us now!</Text>
      </View>

      {/* form  fields */}
      <View style={styles.form}>
        {/* full name */}
        <View style={styles.formItem}>
          <Text style={styles.formTitle}>Full Name</Text>

          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Enter your full name"
            placeholderTextColor="gray"
            value={formState.fullName}
            onChangeText={(text) => handleInputChange("fullName", text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* email */}
        <View style={styles.formItem}>
          <Text style={styles.formTitle}>Email</Text>

          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Enter your email"
            placeholderTextColor="gray"
            value={formState.email}
            onChangeText={(text) => handleInputChange("email", text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* password */}
        <View style={styles.formItem}>
          <Text style={styles.formTitle}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              secureTextEntry={!isPasswordVisible}
              placeholder="Enter your password"
              placeholderTextColor="gray"
              value={formState.password}
              onChangeText={(text) => handleInputChange("password", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Pressable
              onPress={togglePasswordVisibility}
              style={styles.togglePasswordVisibility}
            >
              <AntDesign
                name={isPasswordVisible ? "eyeo" : "eye"}
                size={30}
                color="#0EA5E9"
              />
            </Pressable>
          </View>
        </View>
      </View>

      {/* sign up button */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>
            {simulateAuthMutation.isPending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              "Sign up"
            )}
          </Text>
        </Pressable>
      </View>

      {/* footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Link href="/auth/login" style={styles.linkText}>
            Sign in
          </Link>
        </Text>
      </View>
    </LinearGradient>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  icon: {
    alignSelf: "center",
    marginBottom: 30,
  },

  title: {
    ...Typography.h3,
    color: "#fff",
    letterSpacing: 2,
    marginBottom: 5,
  },

  subtitle: {
    ...Typography.bodyMedium,
    color: "#fff",
  },

  logo: {
    ...Typography.h1,
    color: "#fff",
  },

  form: {
    width: "100%",
    marginVertical: 20,
    paddingHorizontal: 20,
    gap: 15,
  },

  formItem: {
    gap: 5,
  },

  formTitle: {
    ...Typography.bodyMedium,
    color: "#fff",
  },

  formSubtitle: {
    ...Typography.bodyMedium,
    color: "#fff",
  },

  inputContainer: {
    position: "relative",
  },

  togglePasswordVisibility: {
    position: "absolute",
    right: 10,
    top: Platform.OS === "ios" ? 14 : 10,
  },

  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 8,
    fontSize: 26,
    ...Typography.bodyMedium,
    letterSpacing: 1,
    color: "#000",
  },

  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },

  footer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  footerText: {
    ...Typography.bodyMedium,
    color: "#fff",
    textAlign: "center",
  },

  linkText: {
    ...Typography.bodyMedium,
    color: "#63D9F3",
  },

  button: {
    backgroundColor: "#0EA5E9",
    color: "#fff",
    height: 50,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
  },

  buttonText: {
    ...Typography.bodyMedium,
    color: "#fff",
  },

  forgotPassword: {
    ...Typography.bodyMedium,
    color: "#fff",
    textAlign: "right",
  },
});

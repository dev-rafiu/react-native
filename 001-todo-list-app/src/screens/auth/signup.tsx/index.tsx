import { Typography } from "@/src/constants/Typography";
// import { useSimulateAuth } from "@/src/hooks/useAuth";
import { useLogin } from "@/src/hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { Logo } from "@/src/components/Logo";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { z } from "zod";

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full Name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Invalid email",
  }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormSchema = z.infer<typeof formSchema>;

function SignupScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // const simulateAuthMutation = useSimulateAuth();
  const signUpMutation = useLogin();

  const { control, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormSchema) => {
    if (data.fullName === "" || data.email === "" || data.password === "") {
      Alert.alert("Please fill in all fields");
      return;
    }

    signUpMutation.mutate(undefined, {
      onSuccess: () => {
        router.replace("/(tabs)");
      },
    });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <LinearGradient
      colors={["#1253AA", "#082D52", "#05243E"]}
      style={styles.container}
    >
      {/* header */}
      <View style={styles.header}>
        <AntDesign
          name="check-circle"
          size={60}
          color={"#fff"}
          style={styles.icon}
        />
        <Text style={styles.title}>
          Welcome to <Logo />
        </Text>
        <Text style={styles.subtitle}>create an account and join us now!</Text>
      </View>

      {/* form  fields */}
      <View style={styles.form}>
        {/* full name */}
        <View style={styles.formItem}>
          <Text style={styles.formTitle}>Full Name</Text>
          <Controller
            control={control}
            name="fullName"
            render={({ field }) => (
              <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder="Enter your full name"
                placeholderTextColor="gray"
                value={field.value}
                onChangeText={field.onChange}
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />
        </View>

        {/* email */}
        <View style={styles.formItem}>
          <Text style={styles.formTitle}>Email</Text>

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="Enter your email"
                placeholderTextColor="gray"
                value={field.value}
                onChangeText={field.onChange}
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />
        </View>

        {/* password */}
        <View style={styles.formItem}>
          <Text style={styles.formTitle}>Password</Text>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextInput
                  style={styles.input}
                  secureTextEntry={!isPasswordVisible}
                  placeholder="Enter your password"
                  placeholderTextColor="gray"
                  value={field.value}
                  onChangeText={field.onChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />

            <Pressable
              onPress={togglePasswordVisibility}
              style={styles.togglePasswordVisibility}
            >
              <AntDesign
                name={isPasswordVisible ? "eye-invisible" : "eye"}
                size={30}
                color="#0EA5E9"
              />
            </Pressable>
          </View>
        </View>
      </View>

      {/* sign up button */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>
            {signUpMutation.isPending ? (
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
    paddingTop: 80,
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

import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
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

import { Typography } from "@/src/constants/Typography";
import { setLoggedIn, useLogin } from "@/src/hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { useState } from "react";

import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Invalid email",
  }),
  password: z.string().min(4, "Password must be at least 8 characters"),
});
type FormSchema = z.infer<typeof formSchema>;

function LoginScreen() {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "rafiu@gmail.com",
      password: "0000",
    },
  });
  const onSubmit = (data: FormSchema) => {
    if (data.email === "" || data.password === "") {
      Alert.alert("Please fill in all fields");
      return;
    }

    loginMutation.mutate(undefined, {
      onSuccess: async () => {
        await setLoggedIn();
        queryClient.invalidateQueries({ queryKey: ["auth"] });
        router.replace("/(tabs)");
      },
    });
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const loginMutation = useLogin();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <LinearGradient
      colors={["#1253AA", "#082D52", "#05243E"]}
      style={styles.container}
    >
      {/* header */}
      <View>
        <AntDesign
          name="checkcircle"
          size={60}
          color={"#fff"}
          style={styles.icon}
        />

        <Text style={styles.title}>
          Welcome back to <Text style={styles.logo}>DO IT</Text>
        </Text>

        <Text style={styles.subtitle}>Have an other productive day !</Text>
      </View>

      {/* form  fields */}
      <View style={styles.form}>
        {/* email */}
        <View style={styles.formItem}>
          <Text style={styles.formTitle}>Email</Text>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                style={styles.input}
                keyboardType="email-address"
                placeholder="Enter your email"
                placeholderTextColor="gray"
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
              rules={{
                required: true,
              }}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  secureTextEntry={!isPasswordVisible}
                  placeholder="Enter your password"
                  placeholderTextColor="gray"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />

            <Pressable
              style={styles.togglePasswordVisibility}
              onPress={togglePasswordVisibility}
            >
              <AntDesign
                name={isPasswordVisible ? "eyeo" : "eye"}
                size={30}
                color="#0EA5E9"
              />
            </Pressable>
          </View>
        </View>

        {/* forgot password */}
        <Link href="/auth/forgot-password" style={styles.forgotPassword}>
          Forgot Password?
        </Link>
      </View>

      {/* sign in button */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>
            {loginMutation.isPending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              "Sign in"
            )}
          </Text>
        </Pressable>
      </View>

      {/* footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup">
            <Text style={styles.linkText}>Sign up</Text>
          </Link>
        </Text>
      </View>
    </LinearGradient>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0EA5E9",
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
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

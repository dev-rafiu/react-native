import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ThemedText from "./ThemedText";
import {
  Typography,
  FontFamily,
  createTextStyle,
} from "@/src/constants/Typography";

export default function TypographyExample() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <ThemedText variant="h1" style={styles.sectionTitle}>
          Typography System
        </ThemedText>

        <ThemedText variant="bodyMedium" style={styles.description}>
          This demonstrates all available typography styles using Poppins font
          family.
        </ThemedText>
      </View>

      {/* Headings */}
      <View style={styles.section}>
        <ThemedText variant="h2" style={styles.sectionTitle}>
          Headings
        </ThemedText>

        <ThemedText variant="h1">Heading 1 - Bold 32px</ThemedText>
        <ThemedText variant="h2">Heading 2 - Bold 28px</ThemedText>
        <ThemedText variant="h3">Heading 3 - SemiBold 24px</ThemedText>
        <ThemedText variant="h4">Heading 4 - SemiBold 20px</ThemedText>
        <ThemedText variant="h5">Heading 5 - Medium 18px</ThemedText>
        <ThemedText variant="h6">Heading 6 - Medium 16px</ThemedText>
      </View>

      {/* Body Text */}
      <View style={styles.section}>
        <ThemedText variant="h3" style={styles.sectionTitle}>
          Body Text
        </ThemedText>

        <ThemedText variant="bodyLarge">
          Body Large - Regular 18px. This is perfect for longer paragraphs and
          main content.
        </ThemedText>

        <ThemedText variant="bodyMedium">
          Body Medium - Regular 16px. This is the standard body text size for
          most content.
        </ThemedText>

        <ThemedText variant="bodySmall">
          Body Small - Regular 14px. Use this for secondary information and
          captions.
        </ThemedText>

        <ThemedText variant="bodyXSmall">
          Body XSmall - Regular 12px. Perfect for fine print and metadata.
        </ThemedText>
      </View>

      {/* Labels */}
      <View style={styles.section}>
        <ThemedText variant="h3" style={styles.sectionTitle}>
          Labels
        </ThemedText>

        <ThemedText variant="labelLarge">Label Large - Medium 16px</ThemedText>
        <ThemedText variant="labelMedium">
          Label Medium - Medium 14px
        </ThemedText>
        <ThemedText variant="labelSmall">Label Small - Medium 12px</ThemedText>
      </View>

      {/* Buttons */}
      <View style={styles.section}>
        <ThemedText variant="h3" style={styles.sectionTitle}>
          Buttons
        </ThemedText>

        <ThemedText variant="buttonLarge">
          Button Large - SemiBold 16px
        </ThemedText>
        <ThemedText variant="buttonMedium">
          Button Medium - SemiBold 14px
        </ThemedText>
        <ThemedText variant="buttonSmall">
          Button Small - SemiBold 12px
        </ThemedText>
      </View>

      {/* Font Weights */}
      <View style={styles.section}>
        <ThemedText variant="h3" style={styles.sectionTitle}>
          Font Weights
        </ThemedText>

        <ThemedText variant="bodyMedium" weight="thin">
          Thin Weight
        </ThemedText>
        <ThemedText variant="bodyMedium" weight="extraLight">
          Extra Light Weight
        </ThemedText>
        <ThemedText variant="bodyMedium" weight="light">
          Light Weight
        </ThemedText>
        <ThemedText variant="bodyMedium" weight="regular">
          Regular Weight
        </ThemedText>
        <ThemedText variant="bodyMedium" weight="medium">
          Medium Weight
        </ThemedText>
        <ThemedText variant="bodyMedium" weight="semiBold">
          Semi Bold Weight
        </ThemedText>
        <ThemedText variant="bodyMedium" weight="bold">
          Bold Weight
        </ThemedText>
        <ThemedText variant="bodyMedium" weight="extraBold">
          Extra Bold Weight
        </ThemedText>
        <ThemedText variant="bodyMedium" weight="black">
          Black Weight
        </ThemedText>
      </View>

      {/* Special Styles */}
      <View style={styles.section}>
        <ThemedText variant="h3" style={styles.sectionTitle}>
          Special Styles
        </ThemedText>

        <ThemedText variant="caption">
          Caption - Regular 12px with letter spacing
        </ThemedText>
        <ThemedText variant="overline">
          Overline - Medium 10px uppercase
        </ThemedText>
      </View>

      {/* Custom Styles */}
      <View style={styles.section}>
        <ThemedText variant="h3" style={styles.sectionTitle}>
          Custom Styles
        </ThemedText>

        <ThemedText style={createTextStyle("bold", 22, 28, 0.5)}>
          Custom Bold 22px with custom line height and letter spacing
        </ThemedText>

        <ThemedText style={createTextStyle("medium", 15)}>
          Custom Medium 15px with default line height
        </ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  section: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    marginBottom: 15,
    color: "#333",
  },
  description: {
    color: "#666",
    marginBottom: 10,
  },
});








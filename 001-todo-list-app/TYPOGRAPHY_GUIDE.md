# Typography Guide

This project uses **Poppins** as the primary font family, which is an excellent choice for mobile applications due to its readability and modern design.

## Font Setup

The project includes all Poppins font weights:

- Thin (100)
- Extra Light (200)
- Light (300)
- Regular (400)
- Medium (500)
- Semi Bold (600)
- Bold (700)
- Extra Bold (800)
- Black (900)

## How to Use

### 1. Using Predefined Typography Styles

Import the typography constants:

```typescript
import { Typography } from "@/src/constants/Typography";
```

Use in StyleSheet:

```typescript
const styles = StyleSheet.create({
  title: {
    ...Typography.h1,
    color: "#333",
  },
  body: {
    ...Typography.bodyMedium,
    color: "#666",
  },
});
```

### 2. Using ThemedText Component

Import the component:

```typescript
import ThemedText from "@/src/components/ThemedText";
```

Use with predefined variants:

```typescript
<ThemedText variant="h1">Main Heading</ThemedText>
<ThemedText variant="bodyMedium">Body text content</ThemedText>
<ThemedText variant="buttonLarge">Button Text</ThemedText>
```

Override font weight:

```typescript
<ThemedText variant="bodyMedium" weight="bold">
  Bold body text
</ThemedText>
```

### 3. Using Font Family Constants

Import font families:

```typescript
import { FontFamily } from "@/src/constants/Typography";
```

Use directly in styles:

```typescript
const styles = StyleSheet.create({
  customText: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
  },
});
```

### 4. Creating Custom Text Styles

Use the helper function:

```typescript
import { createTextStyle } from "@/src/constants/Typography";

const styles = StyleSheet.create({
  customText: createTextStyle("semiBold", 20, 28, 0.5),
});
```

## Available Typography Variants

### Headings

- `h1` - Bold 32px
- `h2` - Bold 28px
- `h3` - SemiBold 24px
- `h4` - SemiBold 20px
- `h5` - Medium 18px
- `h6` - Medium 16px

### Body Text

- `bodyLarge` - Regular 18px
- `bodyMedium` - Regular 16px
- `bodySmall` - Regular 14px
- `bodyXSmall` - Regular 12px

### Labels

- `labelLarge` - Medium 16px
- `labelMedium` - Medium 14px
- `labelSmall` - Medium 12px

### Buttons

- `buttonLarge` - SemiBold 16px
- `buttonMedium` - SemiBold 14px
- `buttonSmall` - SemiBold 12px

### Special

- `caption` - Regular 12px with letter spacing
- `overline` - Medium 10px uppercase

## Available Font Weights

- `thin` - Poppins-Thin
- `extraLight` - Poppins-ExtraLight
- `light` - Poppins-Light
- `regular` - Poppins-Regular
- `medium` - Poppins-Medium
- `semiBold` - Poppins-SemiBold
- `bold` - Poppins-Bold
- `extraBold` - Poppins-ExtraBold
- `black` - Poppins-Black

## Best Practices

1. **Use predefined variants** for consistency across the app
2. **Limit custom styles** - only create custom styles when necessary
3. **Maintain hierarchy** - use heading variants for titles, body variants for content
4. **Consider accessibility** - ensure sufficient contrast and readable sizes
5. **Test on different devices** - verify readability on various screen sizes

## Example Usage

```typescript
import React from "react";
import { View, StyleSheet } from "react-native";
import ThemedText from "@/src/components/ThemedText";
import { Typography } from "@/src/constants/Typography";

export default function ExampleScreen() {
  return (
    <View style={styles.container}>
      <ThemedText variant="h1" style={styles.title}>
        Welcome to Our App
      </ThemedText>

      <ThemedText variant="bodyMedium" style={styles.description}>
        This is an example of how to use our typography system effectively.
      </ThemedText>

      <ThemedText variant="buttonLarge" style={styles.buttonText}>
        Get Started
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    color: "#333",
    marginBottom: 16,
  },
  description: {
    color: "#666",
    marginBottom: 24,
  },
  buttonText: {
    color: "#fff",
  },
});
```

## Why Poppins?

Poppins is an excellent choice for mobile apps because:

- **High readability** on small screens
- **Modern and clean** design
- **Excellent weight variations** for hierarchy
- **Optimized for digital interfaces**
- **Free and widely supported**
- **Consistent across platforms**

This typography system ensures consistent, professional typography throughout your React Native application.

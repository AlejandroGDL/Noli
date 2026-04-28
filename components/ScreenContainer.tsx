import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { theme } from '../constants/theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  scroll?: boolean;
}

export default function ScreenContainer({ children, scroll = true }: ScreenContainerProps) {
  const content = (
    <View style={styles.container}>
      {children}
    </View>
  );

  if (scroll) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
});

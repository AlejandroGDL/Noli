import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../constants/theme';

interface TriggerOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

const TRIGGER_OPTIONS: TriggerOption[] = [
  {
    id: 'abrir-app',
    name: 'Abrir aplicación',
    description: 'Cuando abras una app específica',
    icon: 'mobile-alt',
    color: '#3b82f6',
  },
  {
    id: 'hora',
    name: 'Hora específica',
    description: 'A una hora y día determinados',
    icon: 'clock',
    color: '#f59e0b',
  },
  {
    id: 'encender',
    name: 'Encender dispositivo',
    description: 'Cuando un dispositivo se encienda',
    icon: 'power-off',
    color: '#10b981',
  },
  {
    id: 'lugar',
    name: 'Llegar a un lugar',
    description: 'Al entrar o salir de una zona',
    icon: 'map-marker-alt',
    color: '#ef4444',
  },
];

export default function SeleccionarDisparadorScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome5 name="chevron-left" size={16} color={theme.colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Seleccionar disparador</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>Elige qué activará tu automatización</Text>

        <View style={styles.listContainer}>
          {TRIGGER_OPTIONS.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === TRIGGER_OPTIONS.length - 1;

            return (
              <Pressable
                key={item.id}
                style={[
                  styles.listItem,
                  isFirst && styles.listItemFirst,
                  isLast && styles.listItemLast,
                ]}
                onPress={() => {
                  if (item.id === 'abrir-app') {
                    router.replace('/configurar/abrir-app');
                  } else if (item.id === 'hora') {
                    router.replace('/configurar/hora');
                  } else if (item.id === 'encender') {
                    router.replace('/configurar/encender');
                  } else if (item.id === 'lugar') {
                    router.replace('/configurar/lugar');
                  } else {
                    router.replace(`/configurar-disparador?tipo=${item.id}`);
                  }
                }}
              >
                <View style={[styles.iconCircle, { backgroundColor: item.color + '14' }]}>
                  <FontAwesome5 name={item.icon as any} size={16} color={item.color} />
                </View>

                <View style={styles.itemContent}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>

                <FontAwesome5 name="chevron-right" size={12} color={theme.colors.textMuted} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    letterSpacing: -0.3,
  },
  headerSpacer: {
    width: 36,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    letterSpacing: -0.2,
  },
  listContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  listItemFirst: {
    paddingTop: theme.spacing.lg,
  },
  listItemLast: {
    borderBottomWidth: 0,
    paddingBottom: theme.spacing.lg,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  itemContent: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.textPrimary,
    letterSpacing: -0.2,
  },
  itemDescription: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 2,
    letterSpacing: -0.2,
  },
});

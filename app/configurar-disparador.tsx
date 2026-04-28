import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import { useRuleStore } from '../stores/ruleStore';

const TRIGGER_CONFIGS: Record<string, { name: string; icon: string; color: string; fields: string[] }> = {
  'abrir-app': {
    name: 'Abrir aplicación',
    icon: 'mobile-alt',
    color: '#3b82f6',
    fields: ['Nombre de la app', 'Condición adicional'],
  },
  'hora': {
    name: 'Hora específica',
    icon: 'clock',
    color: '#f59e0b',
    fields: ['Hora', 'Repetir'],
  },
  'encender': {
    name: 'Encender dispositivo',
    icon: 'power-off',
    color: '#10b981',
    fields: ['Dispositivo', 'Umbral de energía'],
  },
  'lugar': {
    name: 'Llegar a un lugar',
    icon: 'map-marker-alt',
    color: '#ef4444',
    fields: ['Ubicación', 'Radio (metros)'],
  },
};

export default function ConfigurarDisparadorScreen() {
  const router = useRouter();
  const { tipo } = useLocalSearchParams<{ tipo: string }>();
  const { setTrigger } = useRuleStore();

  const config = TRIGGER_CONFIGS[tipo] || {
    name: 'Disparador desconocido',
    icon: 'question',
    color: theme.colors.textMuted,
    fields: [],
  };

  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});

  const handleSave = () => {
    const filledValues = Object.values(fieldValues).filter((v) => v.trim().length > 0);
    const descriptiveName = filledValues.length > 0 ? `${config.name}: ${filledValues.join(' · ')}` : config.name;
    setTrigger({
      type: tipo || 'unknown',
      name: descriptiveName,
      config: fieldValues,
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome5 name="chevron-left" size={16} color={theme.colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Configurar</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={[styles.heroIcon, { backgroundColor: config.color + '14' }]}>
            <FontAwesome5 name={config.icon as any} size={24} color={config.color} />
          </View>
          <Text style={styles.heroTitle}>{config.name}</Text>
        </View>

        <View style={styles.fieldsContainer}>
          {config.fields.map((field, index) => {
            const isFirst = index === 0;
            const isLast = index === config.fields.length - 1;

            return (
              <View
                key={field}
                style={[
                  styles.fieldWrapper,
                  isFirst && styles.fieldWrapperFirst,
                  isLast && styles.fieldWrapperLast,
                ]}
              >
                <Text style={styles.fieldLabel}>{field}</Text>
                <TextInput
                  style={styles.fieldInput}
                  placeholder={`Ingresa ${field.toLowerCase()}`}
                  placeholderTextColor={theme.colors.textMuted}
                  value={fieldValues[field] || ''}
                  onChangeText={(text) => setFieldValues((prev) => ({ ...prev, [field]: text }))}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar disparador</Text>
        </Pressable>
      </View>
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
  hero: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    letterSpacing: -0.3,
  },
  fieldsContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    overflow: 'hidden',
  },
  fieldWrapper: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  fieldWrapperFirst: {
    paddingTop: theme.spacing.lg,
  },
  fieldWrapperLast: {
    borderBottomWidth: 0,
    paddingBottom: theme.spacing.lg,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    letterSpacing: -0.2,
    textTransform: 'uppercase',
  },
  fieldInput: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    paddingVertical: theme.spacing.xs,
    letterSpacing: -0.2,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
    backgroundColor: theme.colors.background,
  },
  saveButton: {
    backgroundColor: theme.colors.textPrimary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  saveButtonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});

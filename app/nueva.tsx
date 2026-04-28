import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import { useRuleStore } from '../stores/ruleStore';
import { saveRule } from '../services/api';

function formatConfigSummary(config: Record<string, string | boolean | number | string[]>): string {
  const entries = Object.entries(config);
  if (entries.length === 0) return '';
  return entries
    .map(([key, value]) => {
      if (typeof value === 'boolean') return value ? key : null;
      if (Array.isArray(value)) return value.join(', ');
      return `${value}`;
    })
    .filter(Boolean)
    .join(' · ');
}

export default function NuevaAutomatizacionScreen() {
  const router = useRouter();
  const { nombre, trigger, accion, setNombre, resetRule } = useRuleStore();
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!trigger || !accion || !nombre.trim()) return;
    try {
      setSaving(true);
      await saveRule({ nombre, trigger, accion });
      resetRule();
      router.back();
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <FontAwesome5 name="times" size={18} color={theme.colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Nueva automatización</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Sección Si */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Si</Text>
          {trigger ? (
            <Pressable style={styles.configuredButton} onPress={() => router.push('/seleccionar-disparador')}>
              <View style={styles.configuredIconCircle}>
                <FontAwesome5 name="check" size={14} color={theme.colors.background} />
              </View>
              <View style={styles.configuredContent}>
                <Text style={styles.configuredText}>{trigger.name}</Text>
                <Text style={styles.configuredSub}>{formatConfigSummary(trigger.config)}</Text>
              </View>
              <FontAwesome5 name="chevron-right" size={12} color={theme.colors.textMuted} />
            </Pressable>
          ) : (
            <Pressable style={styles.addButton} onPress={() => router.push('/seleccionar-disparador')}>
              <View style={styles.addIconCircle}>
                <FontAwesome5 name="plus" size={14} color={theme.colors.accent} />
              </View>
              <Text style={styles.addButtonText}>Agregar disparador</Text>
            </Pressable>
          )}
        </View>

        {/* Conector */}
        <View style={styles.connector}>
          <View style={styles.connectorLine} />
        </View>

        {/* Sección Entonces */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Entonces</Text>
          {accion ? (
            <Pressable style={styles.configuredButton} onPress={() => router.push('/seleccionar-accion')}>
              <View style={styles.configuredIconCircle}>
                <FontAwesome5 name="check" size={14} color={theme.colors.background} />
              </View>
              <View style={styles.configuredContent}>
                <Text style={styles.configuredText}>{accion.name}</Text>
                <Text style={styles.configuredSub}>{formatConfigSummary(accion.config)}</Text>
              </View>
              <FontAwesome5 name="chevron-right" size={12} color={theme.colors.textMuted} />
            </Pressable>
          ) : (
            <Pressable style={styles.addButton} onPress={() => router.push('/seleccionar-accion')}>
              <View style={styles.addIconCircle}>
                <FontAwesome5 name="plus" size={14} color={theme.colors.accent} />
              </View>
              <Text style={styles.addButtonText}>Agregar acción</Text>
            </Pressable>
          )}
        </View>

        {/* Nombre */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Modo Noche"
            placeholderTextColor={theme.colors.textMuted}
            value={nombre}
            onChangeText={setNombre}
          />
        </View>
      </ScrollView>

      {/* Botón inferior */}
      <View style={styles.footer}>
        <Pressable
          style={[styles.nextButton, ((!trigger || !accion || !nombre.trim()) || saving) && styles.nextButtonDisabled]}
          disabled={!trigger || !accion || !nombre.trim() || saving}
          onPress={handleSubmit}
        >
          {saving ? (
            <ActivityIndicator color={theme.colors.background} size="small" />
          ) : (
            <Text style={[styles.nextButtonText, (!trigger || !accion || !nombre.trim()) && styles.nextButtonTextDisabled]}>
              Guardar automatización
            </Text>
          )}
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
  closeButton: {
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
  section: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
    letterSpacing: -0.2,
    textTransform: 'uppercase',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  addIconCircle: {
    width: 36,
    height: 36,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.accent,
    letterSpacing: -0.2,
  },
  configuredButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    gap: 12,
  },
  configuredIconCircle: {
    width: 36,
    height: 36,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  configuredContent: {
    flex: 1,
  },
  configuredText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    letterSpacing: -0.2,
  },
  configuredSub: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 2,
    letterSpacing: -0.2,
  },
  connector: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  connectorLine: {
    width: 2,
    height: 28,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.full,
  },
  inputSection: {
    marginTop: theme.spacing.xl,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
    letterSpacing: -0.2,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    letterSpacing: -0.2,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
    backgroundColor: theme.colors.background,
  },
  nextButton: {
    backgroundColor: theme.colors.textPrimary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: theme.colors.border,
  },
  nextButtonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  nextButtonTextDisabled: {
    color: theme.colors.textMuted,
  },
});

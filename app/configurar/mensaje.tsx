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
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { useRuleStore } from '../../stores/ruleStore';

const VARIANT_OPTIONS = [
  { id: 'info', label: 'Información', color: '#3b82f6', icon: 'info-circle' },
  { id: 'success', label: 'Éxito', color: '#10b981', icon: 'check-circle' },
  { id: 'warning', label: 'Advertencia', color: '#f59e0b', icon: 'exclamation-circle' },
];

const DURATION_OPTIONS = [
  { id: 2, label: '2s' },
  { id: 5, label: '5s' },
  { id: 10, label: '10s' },
];

export default function ConfigurarMensajeScreen() {
  const router = useRouter();
  const { setAccion } = useRuleStore();

  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('info');
  const [duration, setDuration] = useState(5);

  const canSave = message.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    const variantLabel = VARIANT_OPTIONS.find((v) => v.id === variant)?.label || variant;
    setAccion({
      type: 'show_message',
      name: `Mensaje ${variantLabel.toLowerCase()}: "${message.slice(0, 25)}${message.length > 25 ? '...' : ''}"`,
      config: {
        message,
        variant,
        duration,
      },
    });
    router.back();
  };

  const selectedVariant = VARIANT_OPTIONS.find((v) => v.id === variant);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome5 name="chevron-left" size={16} color={theme.colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Mostrar mensaje</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <View style={[styles.heroIcon, { backgroundColor: (selectedVariant?.color || '#3b82f6') + '14' }]}>
            <FontAwesome5 name="comment" size={24} color={selectedVariant?.color || '#3b82f6'} />
          </View>
          <Text style={styles.heroTitle}>Mostrar mensaje</Text>
        </View>

        {/* Mensaje */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Mensaje</Text>
          <View style={styles.inputCard}>
            <TextInput
              style={styles.textArea}
              placeholder="Escribe el mensaje que se mostrará en pantalla..."
              placeholderTextColor={theme.colors.textMuted}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Tipo */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Tipo</Text>
          <View style={styles.listContainer}>
            {VARIANT_OPTIONS.map((opt, index) => {
              const isSelected = variant === opt.id;
              const isFirst = index === 0;
              const isLast = index === VARIANT_OPTIONS.length - 1;
              return (
                <Pressable
                  key={opt.id}
                  style={[
                    styles.listItem,
                    isFirst && styles.listItemFirst,
                    isLast && styles.listItemLast,
                  ]}
                  onPress={() => setVariant(opt.id)}
                >
                  <View style={styles.itemLeft}>
                    <View style={[styles.iconCircle, { backgroundColor: opt.color + '14' }]}>
                      <FontAwesome5 name={opt.icon as any} size={14} color={opt.color} />
                    </View>
                    <Text style={[styles.listItemText, isSelected && styles.listItemTextActive]}>
                      {opt.label}
                    </Text>
                  </View>
                  <View style={[styles.radioOuter, isSelected && styles.radioOuterActive]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Duración */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Duración</Text>
          <View style={styles.chipsRow}>
            {DURATION_OPTIONS.map((opt) => {
              const isSelected = duration === opt.id;
              return (
                <Pressable
                  key={opt.id}
                  style={[styles.durationChip, isSelected && styles.durationChipActive]}
                  onPress={() => setDuration(opt.id)}
                >
                  <Text style={[styles.durationChipText, isSelected && styles.durationChipTextActive]}>
                    {opt.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Botón inferior */}
      <View style={styles.footer}>
        <Pressable
          style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
          disabled={!canSave}
          onPress={handleSave}
        >
          <Text style={[styles.saveButtonText, !canSave && styles.saveButtonTextDisabled]}>
            Guardar acción
          </Text>
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
    gap: theme.spacing.xl,
  },
  hero: {
    alignItems: 'center',
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
  section: {
    gap: theme.spacing.md,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    letterSpacing: -0.2,
    textTransform: 'uppercase',
  },
  inputCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  textArea: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    lineHeight: 22,
    minHeight: 80,
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
    justifyContent: 'space-between',
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
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  listItemText: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    letterSpacing: -0.2,
  },
  listItemTextActive: {
    fontWeight: '500',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: theme.colors.textPrimary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.textPrimary,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  durationChip: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    minWidth: 64,
    alignItems: 'center',
  },
  durationChipActive: {
    backgroundColor: theme.colors.textPrimary,
    borderColor: theme.colors.textPrimary,
  },
  durationChipText: {
    fontSize: 15,
    color: theme.colors.textPrimary,
    fontWeight: '500',
    letterSpacing: -0.2,
    fontVariant: ['tabular-nums'],
  },
  durationChipTextActive: {
    color: theme.colors.background,
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
  saveButtonDisabled: {
    backgroundColor: theme.colors.border,
  },
  saveButtonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  saveButtonTextDisabled: {
    color: theme.colors.textMuted,
  },
});

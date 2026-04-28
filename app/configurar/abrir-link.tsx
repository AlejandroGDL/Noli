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

const MODE_OPTIONS = [
  { id: 'browser', label: 'Navegador', description: 'Abrir en el navegador predeterminado' },
  { id: 'app', label: 'Aplicación', description: 'Abrir en la app nativa si está instalada' },
];

function isValidUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;
  return pattern.test(trimmed);
}

export default function ConfigurarAbrirLinkScreen() {
  const router = useRouter();
  const { setAccion } = useRuleStore();

  const [url, setUrl] = useState('');
  const [mode, setMode] = useState('browser');

  const trimmedUrl = url.trim();
  const isValid = isValidUrl(trimmedUrl);

  const handleSave = () => {
    if (!isValid) return;
    const modeLabel = MODE_OPTIONS.find((m) => m.id === mode)?.label || mode;
    setAccion({
      type: 'open_link',
      name: `Abrir enlace en ${modeLabel.toLowerCase()}`,
      config: {
        url: trimmedUrl,
        mode,
      },
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome5 name="chevron-left" size={16} color={theme.colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Abrir enlace</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <View style={[styles.heroIcon, { backgroundColor: '#8b5cf6' + '14' }]}>
            <FontAwesome5 name="link" size={24} color="#8b5cf6" />
          </View>
          <Text style={styles.heroTitle}>Abrir enlace</Text>
        </View>

        {/* URL */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>URL</Text>
          <View style={[styles.inputCard, !isValid && trimmedUrl.length > 0 && styles.inputCardError]}>
            <TextInput
              style={styles.input}
              placeholder="https://ejemplo.com"
              placeholderTextColor={theme.colors.textMuted}
              value={url}
              onChangeText={setUrl}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
            />
          </View>
          {!isValid && trimmedUrl.length > 0 && (
            <Text style={styles.errorText}>URL no válida</Text>
          )}
        </View>

        {/* Modo */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Abrir en</Text>
          <View style={styles.listContainer}>
            {MODE_OPTIONS.map((opt, index) => {
              const isSelected = mode === opt.id;
              const isFirst = index === 0;
              const isLast = index === MODE_OPTIONS.length - 1;
              return (
                <Pressable
                  key={opt.id}
                  style={[
                    styles.listItem,
                    isFirst && styles.listItemFirst,
                    isLast && styles.listItemLast,
                  ]}
                  onPress={() => setMode(opt.id)}
                >
                  <View style={styles.itemContent}>
                    <Text style={[styles.itemTitle, isSelected && styles.itemTitleActive]}>
                      {opt.label}
                    </Text>
                    <Text style={styles.itemDescription}>{opt.description}</Text>
                  </View>
                  <View style={[styles.radioOuter, isSelected && styles.radioOuterActive]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Botón inferior */}
      <View style={styles.footer}>
        <Pressable
          style={[styles.saveButton, !isValid && styles.saveButtonDisabled]}
          disabled={!isValid}
          onPress={handleSave}
        >
          <Text style={[styles.saveButtonText, !isValid && styles.saveButtonTextDisabled]}>
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
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  inputCardError: {
    borderColor: theme.colors.error + '44',
  },
  input: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    letterSpacing: -0.2,
  },
  errorText: {
    fontSize: 13,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
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
  itemContent: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  itemTitle: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    letterSpacing: -0.2,
  },
  itemTitleActive: {
    fontWeight: '500',
  },
  itemDescription: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 2,
    letterSpacing: -0.2,
    lineHeight: 18,
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

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

const MAX_LENGTH = 120;

const DEVICE_OPTIONS = [
  { id: 'todos', label: 'Todos los dispositivos' },
  { id: 'este', label: 'Solo este dispositivo' },
  { id: 'elegir', label: 'Elegir dispositivos' },
];

const PRIORITY_OPTIONS = [
  { id: 'normal', label: 'Normal', color: theme.colors.textSecondary },
  { id: 'urgent', label: 'Urgente', color: theme.colors.error },
];

const SOUND_OPTIONS = [
  { id: 'default', label: 'Predeterminado' },
  { id: 'chime', label: 'Campana' },
  { id: 'ping', label: 'Ping' },
  { id: 'none', label: 'Silencio' },
];

export default function ConfigurarNotificacionScreen() {
  const router = useRouter();
  const { setAccion } = useRuleStore();

  const [message, setMessage] = useState('');
  const [devices, setDevices] = useState('todos');
  const [priority, setPriority] = useState('normal');
  const [sound, setSound] = useState('default');

  const canSave = message.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    setAccion({
      type: 'notify',
      name: `Notificar "${message.slice(0, 30)}${message.length > 30 ? '...' : ''}"`,
      config: {
        message,
        devices,
        sound,
        priority,
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
        <Text style={styles.headerTitle}>Notificación</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <View style={[styles.heroIcon, { backgroundColor: '#3b82f6' + '14' }]}>
            <FontAwesome5 name="bell" size={24} color="#3b82f6" />
          </View>
          <Text style={styles.heroTitle}>Enviar notificación</Text>
        </View>

        {/* Mensaje */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Mensaje</Text>
            <Text style={[styles.counter, message.length > MAX_LENGTH && styles.counterOver]}>
              {message.length}/{MAX_LENGTH}
            </Text>
          </View>
          <View style={styles.inputCard}>
            <TextInput
              style={styles.textArea}
              placeholder="Escribe el mensaje de la notificación..."
              placeholderTextColor={theme.colors.textMuted}
              value={message}
              onChangeText={(text) => {
                if (text.length <= MAX_LENGTH) setMessage(text);
              }}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              maxLength={MAX_LENGTH}
            />
          </View>
        </View>

        {/* Dispositivos */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Dispositivos</Text>
          <View style={styles.listContainer}>
            {DEVICE_OPTIONS.map((opt, index) => {
              const isSelected = devices === opt.id;
              const isFirst = index === 0;
              const isLast = index === DEVICE_OPTIONS.length - 1;
              return (
                <Pressable
                  key={opt.id}
                  style={[
                    styles.listItem,
                    isFirst && styles.listItemFirst,
                    isLast && styles.listItemLast,
                  ]}
                  onPress={() => setDevices(opt.id)}
                >
                  <Text style={[styles.listItemText, isSelected && styles.listItemTextActive]}>
                    {opt.label}
                  </Text>
                  <View style={[styles.radioOuter, isSelected && styles.radioOuterActive]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Tipo */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Prioridad</Text>
          <View style={styles.chipsRow}>
            {PRIORITY_OPTIONS.map((opt) => {
              const isSelected = priority === opt.id;
              return (
                <Pressable
                  key={opt.id}
                  style={[
                    styles.chip,
                    isSelected && { borderColor: opt.color, backgroundColor: opt.color + '10' },
                  ]}
                  onPress={() => setPriority(opt.id)}
                >
                  <View style={[styles.chipDot, { backgroundColor: opt.color }]} />
                  <Text style={[styles.chipText, isSelected && { color: opt.color, fontWeight: '600' }]}>
                    {opt.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Sonido */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Sonido</Text>
          <View style={styles.listContainer}>
            {SOUND_OPTIONS.map((opt, index) => {
              const isSelected = sound === opt.id;
              const isFirst = index === 0;
              const isLast = index === SOUND_OPTIONS.length - 1;
              return (
                <Pressable
                  key={opt.id}
                  style={[
                    styles.listItem,
                    isFirst && styles.listItemFirst,
                    isLast && styles.listItemLast,
                  ]}
                  onPress={() => setSound(opt.id)}
                >
                  <View style={styles.itemLeft}>
                    <FontAwesome5
                      name={opt.id === 'none' ? 'volume-mute' : 'music'}
                      size={14}
                      color={theme.colors.textSecondary}
                      style={styles.itemIcon}
                    />
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    letterSpacing: -0.2,
    textTransform: 'uppercase',
  },
  counter: {
    fontSize: 13,
    color: theme.colors.textMuted,
    fontVariant: ['tabular-nums'],
  },
  counterOver: {
    color: theme.colors.error,
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
  itemIcon: {
    marginRight: theme.spacing.md,
    width: 20,
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
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  chipDot: {
    width: 8,
    height: 8,
    borderRadius: theme.borderRadius.full,
  },
  chipText: {
    fontSize: 14,
    color: theme.colors.textPrimary,
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

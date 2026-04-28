import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { useRuleStore } from '../../stores/ruleStore';

const SOUND_OPTIONS = [
  { id: 'alarma', label: 'Alarma', icon: 'exclamation-triangle' },
  { id: 'notificacion', label: 'Notificación', icon: 'bell' },
  { id: 'campana', label: 'Campana', icon: 'music' },
];

export default function ConfigurarSonidoScreen() {
  const router = useRouter();
  const { setAccion } = useRuleStore();

  const [sound, setSound] = useState('alarma');
  const [volume, setVolume] = useState(80);
  const [loop, setLoop] = useState(false);

  const handleSave = () => {
    const soundLabel = SOUND_OPTIONS.find((s) => s.id === sound)?.label || sound;
    setAccion({
      type: 'play_sound',
      name: `Sonido "${soundLabel}" al ${Math.round(volume)}%`,
      config: {
        sound,
        volume: Math.round(volume),
        loop,
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
        <Text style={styles.headerTitle}>Reproducir sonido</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <View style={[styles.heroIcon, { backgroundColor: '#f59e0b' + '14' }]}>
            <FontAwesome5 name="volume-up" size={24} color="#f59e0b" />
          </View>
          <Text style={styles.heroTitle}>Reproducir sonido</Text>
        </View>

        {/* Lista de sonidos */}
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
                    <View style={[styles.iconCircle, isSelected && styles.iconCircleActive]}>
                      <FontAwesome5
                        name={opt.icon as any}
                        size={14}
                        color={isSelected ? theme.colors.background : theme.colors.textSecondary}
                      />
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

        {/* Volumen */}
        <View style={styles.section}>
          <View style={styles.volumeHeader}>
            <Text style={styles.sectionLabel}>Volumen</Text>
            <View style={styles.volumeBadge}>
              <Text style={styles.volumeValue}>{Math.round(volume)}%</Text>
            </View>
          </View>
          <View style={styles.sliderContainer}>
            <FontAwesome5 name="volume-down" size={14} color={theme.colors.textMuted} />
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={volume}
              onValueChange={setVolume}
              minimumTrackTintColor={theme.colors.textPrimary}
              maximumTrackTintColor={theme.colors.border}
              thumbTintColor={theme.colors.textPrimary}
            />
            <FontAwesome5 name="volume-up" size={14} color={theme.colors.textMuted} />
          </View>
        </View>

        {/* Toggle repetir */}
        <View style={styles.toggleSection}>
          <View style={styles.toggleContent}>
            <Text style={styles.toggleLabel}>Repetir</Text>
            <Text style={styles.toggleDescription}>
              El sonido se reproducirá en bucle hasta que se detenga manualmente
            </Text>
          </View>
          <Switch
            value={loop}
            onValueChange={setLoop}
            trackColor={{ false: theme.colors.border, true: theme.colors.warning + '66' }}
            thumbColor={loop ? theme.colors.warning : '#f4f3f4'}
            ios_backgroundColor={theme.colors.border}
            style={styles.toggleSwitch}
          />
        </View>
      </ScrollView>

      {/* Botón inferior */}
      <View style={styles.footer}>
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar acción</Text>
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
    backgroundColor: theme.colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  iconCircleActive: {
    backgroundColor: theme.colors.textPrimary,
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
  volumeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  volumeBadge: {
    backgroundColor: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  volumeValue: {
    color: theme.colors.background,
    fontSize: 13,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  toggleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  toggleContent: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.textPrimary,
    letterSpacing: -0.2,
  },
  toggleDescription: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 4,
    letterSpacing: -0.2,
    lineHeight: 18,
  },
  toggleSwitch: {
    transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
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

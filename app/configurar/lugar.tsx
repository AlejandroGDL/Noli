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
import Slider from '@react-native-community/slider';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { useRuleStore } from '../../stores/ruleStore';

const EVENT_TYPES = [
  { id: 'arrive', label: 'Llegar' },
  { id: 'leave', label: 'Salir' },
];

export default function ConfigurarLugarScreen() {
  const router = useRouter();
  const { setTrigger } = useRuleStore();

  const [placeName, setPlaceName] = useState('');
  const [radius, setRadius] = useState(100);
  const [eventType, setEventType] = useState('arrive');
  const [device, setDevice] = useState('este');

  // Coordenadas mock (ej: CDMX)
  const lat = 19.4326;
  const lng = -99.1332;

  const canSave = placeName.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    const eventLabel = EVENT_TYPES.find((e) => e.id === eventType)?.label || eventType;
    setTrigger({
      type: 'location',
      name: `${eventLabel} a "${placeName}"`,
      config: {
        lat,
        lng,
        radius,
        eventType,
        name: placeName,
        device,
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
        <Text style={styles.headerTitle}>Llegar a un lugar</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Mapa placeholder */}
        <View style={styles.mapSection}>
          <View style={styles.mapPlaceholder}>
            <View style={styles.mapGrid}>
              <View style={styles.mapLineH} />
              <View style={styles.mapLineH} />
              <View style={styles.mapLineH} />
              <View style={styles.mapLineV} />
              <View style={styles.mapLineV} />
              <View style={styles.mapLineV} />
            </View>
            <View style={styles.pinContainer}>
              <FontAwesome5 name="map-marker-alt" size={28} color={theme.colors.error} />
              <View style={styles.pinPulse} />
            </View>
            <View style={styles.mapOverlay}>
              <Text style={styles.mapCoords}>
                {lat.toFixed(4)}, {lng.toFixed(4)}
              </Text>
            </View>
          </View>
        </View>

        {/* Nombre del lugar */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Nombre del lugar</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Gym, Casa, Oficina..."
            placeholderTextColor={theme.colors.textMuted}
            value={placeName}
            onChangeText={setPlaceName}
          />
        </View>

        {/* Radio */}
        <View style={styles.section}>
          <View style={styles.radiusHeader}>
            <Text style={styles.sectionLabel}>Radio</Text>
            <View style={styles.radiusBadge}>
              <Text style={styles.radiusValue}>{Math.round(radius)} m</Text>
            </View>
          </View>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>50 m</Text>
            <Slider
              style={styles.slider}
              minimumValue={50}
              maximumValue={500}
              step={10}
              value={radius}
              onValueChange={setRadius}
              minimumTrackTintColor={theme.colors.textPrimary}
              maximumTrackTintColor={theme.colors.border}
              thumbTintColor={theme.colors.textPrimary}
            />
            <Text style={styles.sliderLabel}>500 m</Text>
          </View>
        </View>

        {/* Tipo de evento */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Tipo de evento</Text>
          <View style={styles.listContainer}>
            {EVENT_TYPES.map((opt, index) => {
              const isSelected = eventType === opt.id;
              const isFirst = index === 0;
              const isLast = index === EVENT_TYPES.length - 1;
              return (
                <Pressable
                  key={opt.id}
                  style={[
                    styles.listItem,
                    isFirst && styles.listItemFirst,
                    isLast && styles.listItemLast,
                  ]}
                  onPress={() => setEventType(opt.id)}
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

        {/* Dispositivo */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Dispositivo</Text>
          <Pressable
            style={[styles.deviceChip, device === 'este' && styles.deviceChipActive]}
            onPress={() => setDevice('este')}
          >
            <FontAwesome5
              name="mobile-alt"
              size={14}
              color={device === 'este' ? theme.colors.background : theme.colors.textSecondary}
            />
            <Text style={[styles.deviceChipText, device === 'este' && styles.deviceChipTextActive]}>
              Este dispositivo
            </Text>
          </Pressable>
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
            Guardar disparador
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
  mapSection: {
    gap: theme.spacing.md,
  },
  mapPlaceholder: {
    height: 200,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: '#e8e6e1',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  mapGrid: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-evenly',
  },
  mapLineH: {
    height: 1,
    backgroundColor: theme.colors.border,
    opacity: 0.5,
  },
  mapLineV: {
    position: 'absolute',
    width: 1,
    top: 0,
    bottom: 0,
    backgroundColor: theme.colors.border,
    opacity: 0.5,
  },
  pinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  pinPulse: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.error,
    opacity: 0.15,
    top: -6,
  },
  mapOverlay: {
    position: 'absolute',
    bottom: theme.spacing.md,
    left: theme.spacing.md,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    ...theme.shadows.sm,
  },
  mapCoords: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontVariant: ['tabular-nums'],
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
  radiusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radiusBadge: {
    backgroundColor: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  radiusValue: {
    color: theme.colors.background,
    fontSize: 13,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderLabel: {
    fontSize: 12,
    color: theme.colors.textMuted,
    fontVariant: ['tabular-nums'],
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
  deviceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  deviceChipActive: {
    backgroundColor: theme.colors.textPrimary,
    borderColor: theme.colors.textPrimary,
  },
  deviceChipText: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    letterSpacing: -0.2,
  },
  deviceChipTextActive: {
    color: theme.colors.background,
    fontWeight: '500',
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

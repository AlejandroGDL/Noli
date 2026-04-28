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
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { useRuleStore } from '../../stores/ruleStore';

const MOCK_APPS = [
  { id: 'whatsapp', name: 'WhatsApp', icon: 'comment' },
  { id: 'instagram', name: 'Instagram', icon: 'camera' },
  { id: 'spotify', name: 'Spotify', icon: 'music' },
  { id: 'maps', name: 'Google Maps', icon: 'map' },
  { id: 'youtube', name: 'YouTube', icon: 'play' },
];

const MOCK_DEVICES = [
  { id: 'iphone', name: 'iPhone 15 Pro' },
  { id: 'ipad', name: 'iPad Air' },
  { id: 'android', name: 'Samsung Galaxy S24' },
];

export default function ConfigurarAbrirAppScreen() {
  const router = useRouter();
  const { setTrigger } = useRuleStore();
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [foregroundOnly, setForegroundOnly] = useState(true);

  const canSave = selectedApp !== null && selectedDevice !== null;

  const handleSave = () => {
    if (!canSave) return;
    const appName = MOCK_APPS.find((a) => a.id === selectedApp)?.name || selectedApp;
    const deviceName = MOCK_DEVICES.find((d) => d.id === selectedDevice)?.name || selectedDevice;
    setTrigger({
      type: 'abrir-app',
      name: `Abrir ${appName} en ${deviceName}`,
      config: {
        app: appName,
        device: deviceName,
        foregroundOnly,
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
        <Text style={styles.headerTitle}>Abrir aplicación</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Sección: App */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Aplicación</Text>
          <View style={styles.listContainer}>
            {MOCK_APPS.map((app, index) => {
              const isSelected = selectedApp === app.id;
              const isFirst = index === 0;
              const isLast = index === MOCK_APPS.length - 1;

              return (
                <Pressable
                  key={app.id}
                  style={[
                    styles.listItem,
                    isFirst && styles.listItemFirst,
                    isLast && styles.listItemLast,
                  ]}
                  onPress={() => setSelectedApp(app.id)}
                >
                  <View style={[styles.iconCircle, isSelected && styles.iconCircleActive]}>
                    <FontAwesome5
                      name={app.icon as any}
                      size={14}
                      color={isSelected ? theme.colors.background : theme.colors.textSecondary}
                    />
                  </View>
                  <Text style={[styles.itemName, isSelected && styles.itemNameActive]}>
                    {app.name}
                  </Text>
                  {isSelected && (
                    <FontAwesome5 name="check" size={14} color={theme.colors.textPrimary} />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Sección: Dispositivo */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Dispositivo</Text>
          <View style={styles.listContainer}>
            {MOCK_DEVICES.map((device, index) => {
              const isSelected = selectedDevice === device.id;
              const isFirst = index === 0;
              const isLast = index === MOCK_DEVICES.length - 1;

              return (
                <Pressable
                  key={device.id}
                  style={[
                    styles.listItem,
                    isFirst && styles.listItemFirst,
                    isLast && styles.listItemLast,
                  ]}
                  onPress={() => setSelectedDevice(device.id)}
                >
                  <View style={[styles.radioOuter, isSelected && styles.radioOuterActive]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                  <Text style={[styles.itemName, isSelected && styles.itemNameActive]}>
                    {device.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Toggle: Primer plano */}
        <View style={styles.toggleSection}>
          <View style={styles.toggleContent}>
            <Text style={styles.toggleLabel}>Solo cuando esté en primer plano</Text>
            <Text style={styles.toggleDescription}>
              Ignora la app cuando corre en segundo plano
            </Text>
          </View>
          <Switch
            value={foregroundOnly}
            onValueChange={setForegroundOnly}
            trackColor={{ false: theme.colors.border, true: theme.colors.accent + '66' }}
            thumbColor={foregroundOnly ? theme.colors.accent : '#f4f3f4'}
            ios_backgroundColor={theme.colors.border}
            style={styles.toggleSwitch}
          />
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
  itemName: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.textPrimary,
    letterSpacing: -0.2,
  },
  itemNameActive: {
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
    marginRight: theme.spacing.md,
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
    marginTop: 2,
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

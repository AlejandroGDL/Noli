import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { useRuleStore } from '../../stores/ruleStore';

const DAYS = [
  { id: 'L', label: 'L' },
  { id: 'M', label: 'M' },
  { id: 'X', label: 'M' },
  { id: 'J', label: 'J' },
  { id: 'V', label: 'V' },
  { id: 'S', label: 'S' },
  { id: 'D', label: 'D' },
];

const TIMEZONES = [
  { id: 'auto', label: 'Automática' },
  { id: 'utc', label: 'UTC' },
  { id: 'et', label: 'Este (ET)' },
  { id: 'ct', label: 'Central (CT)' },
  { id: 'mt', label: 'Montaña (MT)' },
  { id: 'pt', label: 'Pacífico (PT)' },
];

const DEVICE_OPTIONS = [
  { id: 'todos', label: 'Todos los dispositivos' },
  { id: 'este', label: 'Solo este dispositivo' },
  { id: 'elegir', label: 'Elegir dispositivos' },
];

function formatTime12h(date: Date): { time: string; period: string } {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return { time: `${hours}:${minutes}`, period };
}

export default function ConfigurarHoraScreen() {
  const router = useRouter();
  const { setTrigger } = useRuleStore();

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');
  const [selectedDays, setSelectedDays] = useState<string[]>(['L', 'M', 'X', 'J', 'V']);
  const [timezone, setTimezone] = useState('auto');
  const [devices, setDevices] = useState('todos');

  const toggleDay = (dayId: string) => {
    setSelectedDays((prev) =>
      prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]
    );
  };

  const onTimeChange = (_event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
  };

  const { time, period } = formatTime12h(date);

  const handleSave = () => {
    const tzLabel = TIMEZONES.find((t) => t.id === timezone)?.label || timezone;
    const daysLabel = selectedDays.length === 7 ? 'Todos los días' : selectedDays.join(', ');
    setTrigger({
      type: 'time',
      name: `Hora específica: ${time} ${period} · ${daysLabel}`,
      config: {
        time,
        period,
        days: selectedDays,
        timezone: tzLabel,
        devices,
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
        <Text style={styles.headerTitle}>Hora específica</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Sección: Hora */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Hora</Text>
          <View style={styles.timeCard}>
            {Platform.OS === 'android' && !showPicker ? (
              <Pressable style={styles.timeDisplay} onPress={() => setShowPicker(true)}>
                <Text style={styles.timeText}>{time}</Text>
                <Text style={styles.periodText}>{period}</Text>
              </Pressable>
            ) : (
              <View style={styles.timeDisplay}>
                <Text style={styles.timeText}>{time}</Text>
                <Text style={styles.periodText}>{period}</Text>
              </View>
            )}
            {showPicker && (
              <DateTimePicker
                value={date}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onTimeChange}
                style={styles.picker}
              />
            )}
          </View>
        </View>

        {/* Sección: Repetir */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Repetir</Text>
          <View style={styles.daysContainer}>
            {DAYS.map((day) => {
              const isSelected = selectedDays.includes(day.id);
              return (
                <Pressable
                  key={day.id}
                  style={[styles.dayCircle, isSelected && styles.dayCircleActive]}
                  onPress={() => toggleDay(day.id)}
                >
                  <Text style={[styles.dayLabel, isSelected && styles.dayLabelActive]}>
                    {day.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Sección: Zona horaria */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Zona horaria</Text>
          <View style={styles.listContainer}>
            {TIMEZONES.map((tz, index) => {
              const isSelected = timezone === tz.id;
              const isFirst = index === 0;
              const isLast = index === TIMEZONES.length - 1;
              return (
                <Pressable
                  key={tz.id}
                  style={[
                    styles.listItem,
                    isFirst && styles.listItemFirst,
                    isLast && styles.listItemLast,
                  ]}
                  onPress={() => setTimezone(tz.id)}
                >
                  <Text style={[styles.listItemText, isSelected && styles.listItemTextActive]}>
                    {tz.label}
                  </Text>
                  <View style={[styles.radioOuter, isSelected && styles.radioOuterActive]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Sección: Dispositivos */}
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
      </ScrollView>

      {/* Botón inferior */}
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
  timeCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    alignItems: 'center',
  },
  timeDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: theme.spacing.md,
  },
  timeText: {
    fontSize: 42,
    fontWeight: '300',
    color: theme.colors.textPrimary,
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
  },
  periodText: {
    fontSize: 18,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  picker: {
    width: 200,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCircleActive: {
    backgroundColor: theme.colors.textPrimary,
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  dayLabelActive: {
    color: theme.colors.background,
    fontWeight: '600',
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

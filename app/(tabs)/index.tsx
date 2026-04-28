import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Switch, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenContainer from '../../components/ScreenContainer';
import { theme } from '../../constants/theme';
import { FontAwesome5 } from '@expo/vector-icons';

interface Automation {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconColor: string;
  active: boolean;
}

const MOCK_AUTOMATIONS: Automation[] = [
  {
    id: '1',
    name: 'Modo Noche',
    description: 'Baja el brillo y activa No Molestar a las 22:00',
    icon: 'moon',
    iconColor: '#6366f1',
    active: true,
  },
  {
    id: '2',
    name: 'Llegada a Casa',
    description: 'Enciende luces y ajusta termostato al llegar',
    icon: 'home',
    iconColor: '#10b981',
    active: true,
  },
  {
    id: '3',
    name: 'Ahorro de Energía',
    description: 'Apaga dispositivos en standby tras 30 min',
    icon: 'leaf',
    iconColor: '#f59e0b',
    active: false,
  },
  {
    id: '4',
    name: 'Alerta de Seguridad',
    description: 'Envía notificación si detecta movimiento',
    icon: 'shield-alt',
    iconColor: '#ef4444',
    active: true,
  },
  {
    id: '5',
    name: 'Backup Diario',
    description: 'Sincroniza fotos a la nube cada medianoche',
    icon: 'cloud',
    iconColor: '#3b82f6',
    active: false,
  },
];

function AutomationCard({
  item,
  onToggle,
}: {
  item: Automation;
  onToggle: (id: string, value: boolean) => void;
}) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: item.iconColor + '14' }]}>
        <FontAwesome5 name={item.icon as any} size={18} color={item.iconColor} />
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      </View>

      <Switch
        value={item.active}
        onValueChange={(value) => onToggle(item.id, value)}
        trackColor={{ false: theme.colors.border, true: item.iconColor + '66' }}
        thumbColor={item.active ? item.iconColor : '#f4f3f4'}
        ios_backgroundColor={theme.colors.border}
        style={styles.switch}
      />
    </View>
  );
}

export default function InicioScreen() {
  const router = useRouter();
  const [automations, setAutomations] = useState<Automation[]>(MOCK_AUTOMATIONS);

  const handleToggle = (id: string, value: boolean) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: value } : a))
    );
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Automatizaciones</Text>
          <Text style={styles.subtitle}>{automations.filter((a) => a.active).length} activas</Text>
        </View>

        <Pressable style={styles.newButton} onPress={() => router.push('/nueva')}>
          <FontAwesome5 name="plus" size={12} color={theme.colors.background} />
          <Text style={styles.newButtonText}>Nueva</Text>
        </Pressable>
      </View>

      <FlatList
        data={automations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AutomationCard item={item} onToggle={handleToggle} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xl,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    letterSpacing: -0.2,
  },
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    gap: 6,
  },
  newButtonText: {
    color: theme.colors.background,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  listContent: {
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    ...theme.shadows.sm,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  content: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 2,
    lineHeight: 18,
    letterSpacing: -0.2,
  },
  switch: {
    transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
  },
});

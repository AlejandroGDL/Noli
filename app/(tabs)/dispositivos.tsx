import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import SectionCard from '../../components/SectionCard';
import { theme } from '../../constants/theme';

const devices = [
  { id: '1', name: 'iPhone 15 Pro', status: 'Conectado', lastActive: 'Ahora' },
  { id: '2', name: 'iPad Air', status: 'Conectado', lastActive: 'Hace 2h' },
  { id: '3', name: 'MacBook Pro', status: 'Desconectado', lastActive: 'Hace 1d' },
];

export default function DispositivosScreen() {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Dispositivos</Text>
        <Text style={styles.subtitle}>Gestiona tus dispositivos vinculados</Text>
      </View>

      <SectionCard title="Dispositivos activos">
        {devices.map((device, index) => (
          <View 
            key={device.id} 
            style={[
              styles.deviceItem,
              index === devices.length - 1 && styles.deviceItemLast
            ]}
          >
            <View style={styles.deviceInfo}>
              <Text style={styles.deviceName}>{device.name}</Text>
              <View style={styles.deviceMeta}>
                <View style={[
                  styles.statusDot,
                  device.status === 'Conectado' ? styles.statusConnected : styles.statusDisconnected
                ]} />
                <Text style={styles.deviceStatus}>{device.status}</Text>
              </View>
            </View>
            <Text style={styles.lastActive}>{device.lastActive}</Text>
          </View>
        ))}
      </SectionCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    letterSpacing: -0.2,
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  deviceItemLast: {
    borderBottomWidth: 0,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.colors.textPrimary,
    letterSpacing: -0.2,
  },
  deviceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: theme.borderRadius.full,
    marginRight: 6,
  },
  statusConnected: {
    backgroundColor: theme.colors.success,
  },
  statusDisconnected: {
    backgroundColor: theme.colors.textMuted,
  },
  deviceStatus: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  lastActive: {
    fontSize: 12,
    color: theme.colors.textMuted,
  },
});

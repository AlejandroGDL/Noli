import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import SectionCard from '../../components/SectionCard';
import { theme } from '../../constants/theme';

const menuItems = [
  { id: '1', label: 'Editar perfil', icon: '✏️' },
  { id: '2', label: 'Configuración', icon: '⚙️' },
  { id: '3', label: 'Notificaciones', icon: '🔔' },
  { id: '4', label: 'Tema', icon: '🎨' },
];

export default function PerfilScreen() {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>U</Text>
        </View>
        <Text style={styles.name}>Usuario</Text>
        <Text style={styles.email}>usuario@ejemplo.com</Text>
      </View>

      <SectionCard title="Configuración">
        {menuItems.map((item, index) => (
          <Pressable 
            key={item.id} 
            style={[
              styles.menuItem,
              index === menuItems.length - 1 && styles.menuItemLast
            ]}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </Pressable>
        ))}
      </SectionCard>

      <Pressable style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    letterSpacing: -0.3,
  },
  email: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    fontSize: 18,
    marginRight: theme.spacing.md,
    width: 24,
    textAlign: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.textPrimary,
    letterSpacing: -0.2,
  },
  menuArrow: {
    fontSize: 18,
    color: theme.colors.textMuted,
  },
  logoutButton: {
    marginTop: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.colors.error,
    letterSpacing: -0.2,
  },
});

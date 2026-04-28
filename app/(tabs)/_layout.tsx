import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          letterSpacing: -0.2,
        },
        tabBarActiveTintColor: theme.colors.textPrimary,
        tabBarInactiveTintColor: theme.colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size - 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="plantillas"
        options={{
          title: 'Plantillas',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="th-large" size={size - 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dispositivos"
        options={{
          title: 'Dispositivos',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="mobile-alt" size={size - 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={size - 2} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

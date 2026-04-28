import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import SectionCard from '../../components/SectionCard';
import { theme } from '../../constants/theme';

const templates = [
  { id: '1', name: 'Reunión semanal', description: 'Estructura para reuniones de equipo' },
  { id: '2', name: 'Notas diarias', description: 'Plantilla para tus notas diarias' },
  { id: '3', name: 'Proyecto nuevo', description: 'Inicia un proyecto desde cero' },
  { id: '4', name: 'Lista de tareas', description: 'Organiza tus pendientes' },
];

export default function PlantillasScreen() {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Plantillas</Text>
        <Text style={styles.subtitle}>Organiza tu trabajo con estilo</Text>
      </View>

      <SectionCard title="Populares">
        {templates.map((template, index) => (
          <Pressable 
            key={template.id} 
            style={[
              styles.templateItem,
              index === templates.length - 1 && styles.templateItemLast
            ]}
          >
            <View style={styles.templateIcon}>
              <Text style={styles.templateIconText}>{template.name[0]}</Text>
            </View>
            <View style={styles.templateContent}>
              <Text style={styles.templateName}>{template.name}</Text>
              <Text style={styles.templateDescription}>{template.description}</Text>
            </View>
          </Pressable>
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
  templateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  templateItemLast: {
    borderBottomWidth: 0,
  },
  templateIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  templateIconText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.accent,
  },
  templateContent: {
    flex: 1,
  },
  templateName: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.colors.textPrimary,
    letterSpacing: -0.2,
  },
  templateDescription: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 2,
    letterSpacing: -0.2,
  },
});

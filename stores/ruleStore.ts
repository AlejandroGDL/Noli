import { create } from 'zustand';

export interface TriggerConfig {
  type: string;
  name: string;
  config: Record<string, string | boolean | number | string[]>;
}

export interface ActionConfig {
  type: string;
  name: string;
  config: Record<string, string | boolean | number | string[]>;
}

interface RuleState {
  nombre: string;
  trigger: TriggerConfig | null;
  accion: ActionConfig | null;
  setNombre: (nombre: string) => void;
  setTrigger: (trigger: TriggerConfig) => void;
  setAccion: (accion: ActionConfig) => void;
  resetRule: () => void;
}

export const useRuleStore = create<RuleState>((set) => ({
  nombre: '',
  trigger: null,
  accion: null,
  setNombre: (nombre) => set({ nombre }),
  setTrigger: (trigger) => set({ trigger }),
  setAccion: (accion) => set({ accion }),
  resetRule: () => set({ nombre: '', trigger: null, accion: null }),
}));

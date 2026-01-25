'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings2,
  Sun,
  Layers,
  Eye,
  X,
  Cloud,
} from 'lucide-react';
import { clsx } from 'clsx';
import type { PlanetariumSettings, LightingPreset, QualityLevel } from '../planetarium.types';

interface PlanetControlsProps {
  settings: PlanetariumSettings;
  onSettingsChange: (settings: Partial<PlanetariumSettings>) => void;
  isOpen: boolean;
  onToggle: () => void;
  hasAtmosphere: boolean;
}

export function PlanetControls({
  settings,
  onSettingsChange,
  isOpen,
  onToggle,
  hasAtmosphere,
}: PlanetControlsProps) {
  return (
    <>
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className={clsx(
          'absolute top-4 left-4 z-10 p-2.5 rounded-lg border transition-all',
          isOpen
            ? 'bg-planetarium-glow/20 border-planetarium-glow text-planetarium-glow'
            : 'bg-planetarium-panel border-planetarium-border text-gray-400 hover:text-white hover:border-planetarium-glow/50'
        )}
      >
        <Settings2 className="w-5 h-5" />
      </button>

      {/* Controls panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 left-0 h-full w-72 bg-planetarium-panel backdrop-blur-xl border-r border-planetarium-border z-20 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-planetarium-border">
              <h3 className="text-sm font-medium text-white">Ustawienia widoku</h3>
              <button
                onClick={onToggle}
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Controls */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Lighting */}
              <ControlSection icon={Sun} title="Oświetlenie">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {(['left', 'right', 'top', 'front'] as LightingPreset[]).map((preset) => (
                    <button
                      key={preset}
                      onClick={() => onSettingsChange({ lighting: preset })}
                      className={clsx(
                        'px-3 py-2 text-xs rounded-lg border transition-colors capitalize',
                        settings.lighting === preset
                          ? 'bg-planetarium-glow/20 border-planetarium-glow text-planetarium-glow'
                          : 'border-planetarium-border text-gray-400 hover:text-white hover:border-planetarium-glow/50'
                      )}
                    >
                      {preset === 'left' && 'Lewo'}
                      {preset === 'right' && 'Prawo'}
                      {preset === 'top' && 'Góra'}
                      {preset === 'front' && 'Przód'}
                    </button>
                  ))}
                </div>
                <Slider
                  label="Intensywność"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={settings.lightIntensity}
                  onChange={(value) => onSettingsChange({ lightIntensity: value })}
                />
              </ControlSection>

              {/* Quality */}
              <ControlSection icon={Layers} title="Jakość">
                <div className="grid grid-cols-2 gap-2">
                  {(['low', 'high'] as QualityLevel[]).map((level) => (
                    <button
                      key={level}
                      onClick={() => onSettingsChange({ quality: level })}
                      className={clsx(
                        'px-3 py-2 text-xs rounded-lg border transition-colors',
                        settings.quality === level
                          ? 'bg-planetarium-glow/20 border-planetarium-glow text-planetarium-glow'
                          : 'border-planetarium-border text-gray-400 hover:text-white hover:border-planetarium-glow/50'
                      )}
                    >
                      {level === 'low' ? 'Niska' : 'Wysoka'}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {settings.quality === 'low'
                    ? 'Optymalna dla słabszych urządzeń'
                    : 'Pełne detale i efekty'}
                </p>
              </ControlSection>

              {/* Display options */}
              <ControlSection icon={Eye} title="Widok">
                <ToggleSwitch
                  label="Pokaż HUD"
                  checked={settings.showHUD}
                  onChange={(checked) => onSettingsChange({ showHUD: checked })}
                />
                {hasAtmosphere && (
                  <ToggleSwitch
                    label="Pokaż atmosferę"
                    checked={settings.showAtmosphere}
                    onChange={(checked) => onSettingsChange({ showAtmosphere: checked })}
                    icon={Cloud}
                  />
                )}
              </ControlSection>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-planetarium-border">
              <p className="text-xs text-gray-500 text-center">
                Użyj myszy do obracania i scrollowania
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ControlSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-planetarium-glow" />
        <h4 className="text-xs text-gray-400 uppercase tracking-wider">{title}</h4>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ToggleSwitch({
  label,
  checked,
  onChange,
  icon: Icon,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: React.ElementType;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="flex items-center gap-2 text-sm text-gray-300 group-hover:text-white transition-colors">
        {Icon && <Icon className="w-4 h-4" />}
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={clsx(
          'relative w-10 h-5 rounded-full transition-colors',
          checked ? 'bg-planetarium-glow' : 'bg-planetarium-border'
        )}
      >
        <span
          className={clsx(
            'absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform',
            checked && 'translate-x-5'
          )}
        />
      </button>
    </label>
  );
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-xs text-white font-mono">{value.toFixed(1)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 bg-planetarium-border rounded-lg appearance-none cursor-pointer accent-planetarium-glow"
      />
    </div>
  );
}

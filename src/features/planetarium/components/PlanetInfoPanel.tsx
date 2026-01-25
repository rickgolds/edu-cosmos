'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Info,
  Lightbulb,
  Rocket,
  GitCompare,
  ChevronRight,
  X,
} from 'lucide-react';
import { clsx } from 'clsx';
import type { PlanetInfo } from '../planetarium.types';
import { PLANETS } from '../planetarium.data';
import {
  formatDistance,
  formatTemperature,
  formatGravity,
  formatDayLength,
  formatYearLength,
  formatRatio,
  compareValues,
} from '../utils/formatters';

interface PlanetInfoPanelProps {
  planet: PlanetInfo;
  isOpen: boolean;
  onClose: () => void;
}

type TabId = 'overview' | 'facts' | 'missions' | 'compare';

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Przegląd', icon: Info },
  { id: 'facts', label: 'Ciekawostki', icon: Lightbulb },
  { id: 'missions', label: 'Misje', icon: Rocket },
  { id: 'compare', label: 'Porównaj', icon: GitCompare },
];

export function PlanetInfoPanel({ planet, isOpen, onClose }: PlanetInfoPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [comparePlanet, setComparePlanet] = useState<PlanetInfo | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute top-0 right-0 h-full w-full sm:w-[400px] bg-planetarium-panel backdrop-blur-xl border-l border-planetarium-border z-20 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-planetarium-border">
            <div>
              <h2 className="text-lg font-bold text-white">{planet.namePL}</h2>
              <p className="text-xs text-gray-400">{planet.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-planetarium-border">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 text-xs font-medium transition-colors',
                    isActive
                      ? 'text-planetarium-glow border-b-2 border-planetarium-glow bg-white/5'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {activeTab === 'overview' && <OverviewTab planet={planet} />}
            {activeTab === 'facts' && <FactsTab planet={planet} />}
            {activeTab === 'missions' && <MissionsTab planet={planet} />}
            {activeTab === 'compare' && (
              <CompareTab
                planet={planet}
                comparePlanet={comparePlanet}
                onSelectPlanet={setComparePlanet}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function OverviewTab({ planet }: { planet: PlanetInfo }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-300 leading-relaxed">{planet.description}</p>

      <div className="grid grid-cols-2 gap-3">
        <DataCard label="Promień" value={formatDistance(planet.radiusKm)} />
        <DataCard label="Masa" value={planet.massKg} />
        <DataCard label="Grawitacja" value={formatGravity(planet.gravity)} />
        <DataCard label="Temperatura" value={formatTemperature(planet.avgTempC)} />
        <DataCard label="Doba" value={formatDayLength(planet.dayLengthHours)} />
        <DataCard label="Rok" value={formatYearLength(planet.yearLengthDays)} />
        <DataCard label="Księżyce" value={planet.moons.toString()} />
        <DataCard
          label="Atmosfera"
          value={planet.hasAtmosphere ? 'Tak' : 'Nie'}
        />
      </div>

      {planet.composition.length > 0 && (
        <div className="pt-2">
          <h4 className="text-xs text-planetarium-glow uppercase tracking-wider mb-2">
            Skład atmosfery
          </h4>
          <div className="flex flex-wrap gap-2">
            {planet.composition.map((comp, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-white/5 border border-planetarium-border rounded text-gray-300"
              >
                {comp}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FactsTab({ planet }: { planet: PlanetInfo }) {
  return (
    <div className="space-y-3">
      {planet.funFacts.map((fact, i) => (
        <div
          key={i}
          className="flex gap-3 p-3 bg-white/5 border border-planetarium-border rounded-lg"
        >
          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-planetarium-glow/20 text-planetarium-glow text-xs font-bold">
            {i + 1}
          </div>
          <p className="text-sm text-gray-300">{fact}</p>
        </div>
      ))}
    </div>
  );
}

function MissionsTab({ planet }: { planet: PlanetInfo }) {
  return (
    <div className="space-y-3">
      {planet.keyMissions.length === 0 ? (
        <p className="text-sm text-gray-400">Brak danych o misjach</p>
      ) : (
        planet.keyMissions.map((mission, i) => (
          <div
            key={i}
            className="p-3 bg-white/5 border border-planetarium-border rounded-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-white">{mission.name}</h4>
                <p className="text-xs text-planetarium-glow">{mission.agency}</p>
              </div>
              <span className="text-xs text-gray-400 font-mono">{mission.year}</span>
            </div>
            <p className="mt-2 text-sm text-gray-400">{mission.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

function CompareTab({
  planet,
  comparePlanet,
  onSelectPlanet,
}: {
  planet: PlanetInfo;
  comparePlanet: PlanetInfo | null;
  onSelectPlanet: (p: PlanetInfo | null) => void;
}) {
  const otherPlanets = PLANETS.filter((p) => p.id !== planet.id);

  if (!comparePlanet) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-gray-400 mb-4">
          Wybierz planetę do porównania z {planet.namePL}:
        </p>
        {otherPlanets.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelectPlanet(p)}
            className="w-full flex items-center justify-between p-3 bg-white/5 border border-planetarium-border rounded-lg hover:border-planetarium-glow transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              <div>
                <span className="text-white font-medium">{p.namePL}</span>
                <p className="text-xs text-gray-400">{p.subtitle}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div
              className="w-10 h-10 rounded-full mx-auto"
              style={{ backgroundColor: planet.color }}
            />
            <span className="text-xs text-white">{planet.namePL}</span>
          </div>
          <span className="text-gray-500">vs</span>
          <div className="text-center">
            <div
              className="w-10 h-10 rounded-full mx-auto"
              style={{ backgroundColor: comparePlanet.color }}
            />
            <span className="text-xs text-white">{comparePlanet.namePL}</span>
          </div>
        </div>
        <button
          onClick={() => onSelectPlanet(null)}
          className="text-xs text-planetarium-glow hover:underline"
        >
          Zmień
        </button>
      </div>

      <div className="space-y-2">
        <CompareRow
          label="Promień"
          valueA={planet.radiusKm}
          valueB={comparePlanet.radiusKm}
          format={(v) => formatDistance(v)}
        />
        <CompareRow
          label="Grawitacja"
          valueA={planet.gravity}
          valueB={comparePlanet.gravity}
          format={(v) => formatGravity(v)}
        />
        <CompareRow
          label="Temperatura"
          valueA={planet.avgTempC}
          valueB={comparePlanet.avgTempC}
          format={(v) => formatTemperature(v)}
        />
        <CompareRow
          label="Doba (h)"
          valueA={planet.dayLengthHours}
          valueB={comparePlanet.dayLengthHours}
          format={(v) => v.toFixed(1)}
        />
        <CompareRow
          label="Rok (dni)"
          valueA={planet.yearLengthDays}
          valueB={comparePlanet.yearLengthDays}
          format={(v) => v.toString()}
        />
        <CompareRow
          label="Księżyce"
          valueA={planet.moons}
          valueB={comparePlanet.moons}
          format={(v) => v.toString()}
        />
      </div>
    </div>
  );
}

function DataCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-white/5 border border-planetarium-border rounded-lg">
      <div className="text-xs text-gray-500 uppercase">{label}</div>
      <div className="text-sm text-white font-mono mt-1">{value}</div>
    </div>
  );
}

function CompareRow({
  label,
  valueA,
  valueB,
  format,
}: {
  label: string;
  valueA: number;
  valueB: number;
  format: (v: number) => string;
}) {
  const comparison = compareValues(valueA, valueB);

  return (
    <div className="flex items-center gap-2 p-2 bg-white/5 rounded">
      <span className="text-xs text-gray-500 w-24">{label}</span>
      <span className="flex-1 text-xs text-white font-mono text-right">
        {format(valueA)}
      </span>
      <span
        className={clsx(
          'text-xs px-1.5 py-0.5 rounded',
          comparison.comparison === 'larger'
            ? 'bg-green-500/20 text-green-400'
            : comparison.comparison === 'smaller'
            ? 'bg-red-500/20 text-red-400'
            : 'bg-gray-500/20 text-gray-400'
        )}
      >
        {comparison.comparison === 'equal' ? '=' : formatRatio(comparison.ratio)}
      </span>
      <span className="flex-1 text-xs text-white font-mono">{format(valueB)}</span>
    </div>
  );
}

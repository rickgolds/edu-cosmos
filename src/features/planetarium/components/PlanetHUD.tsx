'use client';

import { useEffect, useState } from 'react';
import { Crosshair, Signal, Thermometer, Clock } from 'lucide-react';
import type { PlanetInfo } from '../planetarium.types';
import {
  formatTemperature,
  formatGravity,
  formatDistance,
} from '../utils/formatters';

interface PlanetHUDProps {
  planet: PlanetInfo;
  visible: boolean;
}

/**
 * Mission Control style HUD overlay
 * Displays telemetry-like data for immersive experience
 */
export function PlanetHUD({ planet, visible }: PlanetHUDProps) {
  const [time, setTime] = useState('');
  const [signalStrength, setSignalStrength] = useState(85);

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('pl-PL', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate signal strength fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setSignalStrength((prev) => {
        const change = (Math.random() - 0.5) * 10;
        return Math.min(100, Math.max(60, prev + change));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* Top left - Target info (below controls button) */}
      <div className="absolute top-16 left-4 space-y-2">
        <div className="hud-panel">
          <div className="flex items-center gap-2 text-planetarium-glow">
            <Crosshair className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Target</span>
          </div>
          <div className="mt-1 text-lg font-bold text-white">{planet.name}</div>
          <div className="text-xs text-gray-400">{planet.namePL}</div>
        </div>

        <div className="hud-panel">
          <div className="flex items-center gap-2 text-planetarium-glow">
            <Thermometer className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Temp</span>
          </div>
          <div className="mt-1 text-sm font-mono text-white">
            {formatTemperature(planet.avgTempC)}
          </div>
        </div>
      </div>

      {/* Top right - Status (below info button) */}
      <div className="absolute top-16 right-4 space-y-2">
        <div className="hud-panel">
          <div className="flex items-center gap-2 text-planetarium-glow">
            <Clock className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">UTC</span>
          </div>
          <div className="mt-1 text-sm font-mono text-white">{time}</div>
        </div>

        <div className="hud-panel">
          <div className="flex items-center gap-2 text-planetarium-glow">
            <Signal className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Signal</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex-1 h-1 bg-planetarium-border rounded overflow-hidden">
              <div
                className="h-full bg-planetarium-accent transition-all duration-500"
                style={{ width: `${signalStrength}%` }}
              />
            </div>
            <span className="text-xs font-mono text-white">
              {Math.round(signalStrength)}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom left - Telemetry (above planet selector) */}
      <div className="absolute bottom-28 left-4">
        <div className="hud-panel">
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
            <TelemetryRow label="Radius" value={formatDistance(planet.radiusKm)} />
            <TelemetryRow label="Gravity" value={formatGravity(planet.gravity)} />
            <TelemetryRow label="Moons" value={planet.moons.toString()} />
            <TelemetryRow label="Mass" value={planet.massKg} />
          </div>
        </div>
      </div>

      {/* Bottom right - Mission status (above planet selector) */}
      <div className="absolute bottom-28 right-4">
        <div className="hud-panel">
          <div className="text-xs text-planetarium-glow uppercase tracking-wider">
            Missions: {planet.keyMissions.length}
          </div>
          <div className="mt-1 text-xs text-gray-400">
            Latest: {planet.keyMissions[planet.keyMissions.length - 1]?.name || 'N/A'}
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <CornerBrackets />

      {/* Scan line effect (subtle) */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="w-full h-[2px] bg-planetarium-glow animate-scan-line" />
      </div>
    </div>
  );
}

function TelemetryRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <span className="text-gray-500 uppercase">{label}</span>
      <span className="text-white font-mono">{value}</span>
    </>
  );
}

function CornerBrackets() {
  const cornerStyle =
    'absolute w-8 h-8 border-planetarium-border opacity-50';

  return (
    <>
      <div
        className={`${cornerStyle} top-14 left-2 border-l-2 border-t-2`}
      />
      <div
        className={`${cornerStyle} top-14 right-2 border-r-2 border-t-2`}
      />
      <div
        className={`${cornerStyle} bottom-24 left-2 border-l-2 border-b-2`}
      />
      <div
        className={`${cornerStyle} bottom-24 right-2 border-r-2 border-b-2`}
      />
    </>
  );
}

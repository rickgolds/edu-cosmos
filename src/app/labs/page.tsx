'use client';

import { useState } from 'react';
import { FlaskConical, Scale, Rocket, Award } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { useProgress } from '@/hooks';
import { GravityLab, TravelLab } from '@/features/labs';

type LabTab = 'gravity' | 'travel';

export default function LabsPage() {
  const [activeTab, setActiveTab] = useState<LabTab>('gravity');
  const { isLabCompleted, progress } = useProgress();

  const gravityCompleted = isLabCompleted('gravity');
  const travelCompleted = isLabCompleted('travel');
  const allCompleted = gravityCompleted && travelCompleted;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-accent-pink/20">
            <FlaskConical className="w-6 h-6 text-accent-pink" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white">
            Laboratoria
          </h1>
          {allCompleted && (
            <Badge variant="success">
              <Award className="w-4 h-4 mr-1" />
              Wszystkie ukończone!
            </Badge>
          )}
        </div>
        <p className="text-gray-400">
          Interaktywne symulacje pomagające zrozumieć podstawowe pojęcia fizyki i astronomii.
        </p>
      </div>

      {/* Lab selector tabs */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab('gravity')}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
            activeTab === 'gravity'
              ? 'border-accent-purple bg-accent-purple/10 text-white'
              : 'border-cosmos-border bg-cosmos-card text-gray-400 hover:border-accent-purple/50 hover:text-white'
          }`}
        >
          <Scale className="w-5 h-5" />
          <span className="font-medium">Gravity Lab</span>
          {gravityCompleted && (
            <Badge variant="success" size="sm">✓</Badge>
          )}
        </button>
        <button
          onClick={() => setActiveTab('travel')}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
            activeTab === 'travel'
              ? 'border-accent-cyan bg-accent-cyan/10 text-white'
              : 'border-cosmos-border bg-cosmos-card text-gray-400 hover:border-accent-cyan/50 hover:text-white'
          }`}
        >
          <Rocket className="w-5 h-5" />
          <span className="font-medium">Travel Time Lab</span>
          {travelCompleted && (
            <Badge variant="success" size="sm">✓</Badge>
          )}
        </button>
      </div>

      {/* Progress indicator */}
      <Card padding="sm" className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Postęp w laboratoriach</span>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-cosmos-dark rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full transition-all"
                style={{
                  width: `${((gravityCompleted ? 1 : 0) + (travelCompleted ? 1 : 0)) * 50}%`,
                }}
              />
            </div>
            <span className="text-sm text-white font-medium">
              {(gravityCompleted ? 1 : 0) + (travelCompleted ? 1 : 0)}/2
            </span>
          </div>
        </div>
      </Card>

      {/* Active lab */}
      {activeTab === 'gravity' && <GravityLab />}
      {activeTab === 'travel' && <TravelLab />}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, ExternalLink, CheckCircle, Ruler, Gauge, Navigation, Calendar } from 'lucide-react';
import { Card, CardTitle, Button, Badge, Skeleton, ErrorState } from '@/components/ui';
import { useProgress } from '@/hooks';
import {
  fetchNeoById,
  formatDistance,
  formatVelocity,
  formatDiameter,
  getHazardLevel,
  type NeoSummary,
} from '@/features/asteroid-watch';

interface AsteroidDetailPageProps {
  params: { neoId: string };
}

export default function AsteroidDetailPage({ params }: AsteroidDetailPageProps) {
  const [neo, setNeo] = useState<NeoSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addAsteroidAnalysis, progress } = useProgress();
  const isAnalyzed = (progress.asteroidAnalyses ?? []).some((a) => a.neoId === params.neoId);

  useEffect(() => {
    const loadNeo = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchNeoById(params.neoId);
        if (!data) {
          setError('Nie znaleziono asteroidy o podanym ID.');
        } else {
          setNeo(data);
        }
      } catch (err) {
        setError('Nie udało się pobrać danych o asteroidzie.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadNeo();
  }, [params.neoId]);

  const handleMarkAsAnalyzed = () => {
    addAsteroidAnalysis(params.neoId);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton height={40} className="w-48 mb-6" />
        <Skeleton height={300} className="w-full rounded-lg mb-6" />
        <Skeleton height={200} className="w-full rounded-lg" />
      </div>
    );
  }

  if (error || !neo) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/asteroid-watch">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Powrót
          </Button>
        </Link>
        <div className="mt-8">
          <ErrorState message={error || 'Nie znaleziono asteroidy.'} />
        </div>
      </div>
    );
  }

  const hazardLevel = getHazardLevel(neo);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <Link href="/asteroid-watch">
        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} className="mb-6">
          Powrót do Asteroid Watch
        </Button>
      </Link>

      {/* Header */}
      <Card padding="lg" className="mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-display font-bold text-white">
                {neo.name}
              </h1>
              {neo.isPotentiallyHazardous && (
                <Badge variant="error">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Potencjalnie niebezpieczna
                </Badge>
              )}
            </div>
            <p className="text-gray-400">ID: {neo.id}</p>
          </div>

          <div className="flex gap-2">
            {isAnalyzed ? (
              <Badge variant="success">
                <CheckCircle className="w-4 h-4 mr-1" />
                Przeanalizowano
              </Badge>
            ) : (
              <Button onClick={handleMarkAsAnalyzed}>
                Oznacz jako przeanalizowana
              </Button>
            )}
            <a href={neo.nasaUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" leftIcon={<ExternalLink className="w-4 h-4" />}>
                NASA JPL
              </Button>
            </a>
          </div>
        </div>

        {/* Stats grid */}
        {neo.closestApproach && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<Calendar className="w-5 h-5" />}
              label="Data podejścia"
              value={new Date(neo.closestApproach.date + 'T00:00:00').toLocaleDateString('pl-PL', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
              color="cyan"
            />
            <StatCard
              icon={<Navigation className="w-5 h-5" />}
              label="Dystans"
              value={formatDistance(neo.closestApproach.distanceKm)}
              subValue={`${neo.closestApproach.distanceAu.toFixed(5)} AU`}
              color="purple"
            />
            <StatCard
              icon={<Ruler className="w-5 h-5" />}
              label="Średnica"
              value={formatDiameter(neo.estimatedDiameterMin, neo.estimatedDiameterMax)}
              color="pink"
            />
            <StatCard
              icon={<Gauge className="w-5 h-5" />}
              label="Prędkość"
              value={formatVelocity(neo.closestApproach.velocityKmPerSec)}
              subValue={`${neo.closestApproach.velocityKmPerHour.toLocaleString('pl-PL', { maximumFractionDigits: 0 })} km/h`}
              color="warning"
            />
          </div>
        )}
      </Card>

      {/* Detailed info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distance comparison */}
        <Card padding="md">
          <CardTitle className="mb-4">Porównanie dystansu</CardTitle>
          {neo.closestApproach && (
            <div className="space-y-3">
              <DistanceBar
                label="Dystans Księżyca"
                value={1}
                max={Math.max(neo.closestApproach.distanceLunar, 100)}
                color="gray"
              />
              <DistanceBar
                label="Ta asteroida"
                value={neo.closestApproach.distanceLunar}
                max={Math.max(neo.closestApproach.distanceLunar, 100)}
                color={hazardLevel === 'high' ? 'red' : hazardLevel === 'medium' ? 'yellow' : 'green'}
              />
              <p className="text-sm text-gray-400 mt-4">
                Asteroida przeleci w odległości{' '}
                <span className="text-white font-medium">
                  {neo.closestApproach.distanceLunar.toFixed(1)} LD
                </span>{' '}
                (dystansów księżycowych).
              </p>
            </div>
          )}
        </Card>

        {/* Size comparison */}
        <Card padding="md">
          <CardTitle className="mb-4">Porównanie wielkości</CardTitle>
          <div className="space-y-3">
            <SizeComparison
              label="Piramida Cheopsa (140m)"
              size={140}
              asteroidMin={neo.estimatedDiameterMin * 1000}
              asteroidMax={neo.estimatedDiameterMax * 1000}
            />
            <SizeComparison
              label="Statua Wolności (93m)"
              size={93}
              asteroidMin={neo.estimatedDiameterMin * 1000}
              asteroidMax={neo.estimatedDiameterMax * 1000}
            />
            <SizeComparison
              label="Samolot pasażerski (70m)"
              size={70}
              asteroidMin={neo.estimatedDiameterMin * 1000}
              asteroidMax={neo.estimatedDiameterMax * 1000}
            />
            <p className="text-sm text-gray-400 mt-4">
              Szacowana średnica:{' '}
              <span className="text-white font-medium">
                {formatDiameter(neo.estimatedDiameterMin, neo.estimatedDiameterMax)}
              </span>
            </p>
          </div>
        </Card>
      </div>

      {/* Additional info */}
      <Card padding="md" className="mt-6">
        <CardTitle className="mb-4">Informacje dodatkowe</CardTitle>
        <dl className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <dt className="text-gray-500">Jasność absolutna (H)</dt>
            <dd className="text-white font-medium">{neo.absoluteMagnitude.toFixed(2)}</dd>
          </div>
          {neo.closestApproach && (
            <>
              <div>
                <dt className="text-gray-500">Dystans (AU)</dt>
                <dd className="text-white font-medium">
                  {neo.closestApproach.distanceAu.toFixed(6)}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Dystans (km)</dt>
                <dd className="text-white font-medium">
                  {neo.closestApproach.distanceKm.toLocaleString('pl-PL', {
                    maximumFractionDigits: 0,
                  })}
                </dd>
              </div>
            </>
          )}
        </dl>
      </Card>
    </div>
  );
}

// Stat card component
function StatCard({
  icon,
  label,
  value,
  subValue,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  color: 'cyan' | 'purple' | 'pink' | 'warning';
}) {
  const colors = {
    cyan: 'text-accent-cyan bg-accent-cyan/20',
    purple: 'text-accent-purple bg-accent-purple/20',
    pink: 'text-accent-pink bg-accent-pink/20',
    warning: 'text-warning bg-warning/20',
  };

  return (
    <div className="p-4 rounded-lg bg-cosmos-dark/50 border border-cosmos-border">
      <div className={`inline-flex p-2 rounded-lg ${colors[color]} mb-2`}>
        {icon}
      </div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-white font-medium">{value}</p>
      {subValue && <p className="text-xs text-gray-500">{subValue}</p>}
    </div>
  );
}

// Distance bar component
function DistanceBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: 'gray' | 'red' | 'yellow' | 'green';
}) {
  const colors = {
    gray: 'bg-gray-600',
    red: 'bg-error',
    yellow: 'bg-warning',
    green: 'bg-success',
  };

  const width = Math.min(100, (value / max) * 100);

  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-gray-300">{value.toFixed(1)} LD</span>
      </div>
      <div className="h-2 bg-cosmos-dark rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${colors[color]}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

// Size comparison component
function SizeComparison({
  label,
  size,
  asteroidMin,
  asteroidMax,
}: {
  label: string;
  size: number;
  asteroidMin: number;
  asteroidMax: number;
}) {
  const avgAsteroid = (asteroidMin + asteroidMax) / 2;
  const ratio = avgAsteroid / size;

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <Badge
        variant={ratio >= 1 ? 'error' : ratio >= 0.5 ? 'warning' : 'success'}
        size="sm"
      >
        {ratio >= 1
          ? `${ratio.toFixed(1)}x większa`
          : `${(ratio * 100).toFixed(0)}% rozmiaru`}
      </Badge>
    </div>
  );
}

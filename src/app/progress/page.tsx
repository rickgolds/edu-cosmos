import { Metadata } from 'next';
import { ProgressDashboard } from '@/features/progress';

export const metadata: Metadata = {
  title: 'Twój postęp',
  description: 'Śledź swoje postępy w nauce o kosmosie. Statystyki, osiągnięcia i historia aktywności.',
};

export default function ProgressPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          Twój postęp
        </h1>
        <p className="text-gray-400">
          Śledź swoje postępy w nauce, zdobywaj osiągnięcia i kontynuuj naukę.
        </p>
      </div>

      {/* Dashboard */}
      <ProgressDashboard />
    </div>
  );
}

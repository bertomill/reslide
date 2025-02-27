'use client';

import Link from 'next/link';
import DashboardLayout from '@/app/components/Layout/DashboardLayout';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Create a New Presentation</h2>
        <p className="text-gray-600 mb-6">
          Start by setting up your research topic and presentation context.
        </p>
        <Link
          href="/research"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Start New Research
        </Link>
      </div>
    </DashboardLayout>
  );
} 
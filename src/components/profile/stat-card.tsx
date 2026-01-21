import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  iconColor: string;
}

export function StatCard({ label, value, icon: Icon, gradient, iconColor }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`${iconColor} p-3 rounded-lg bg-opacity-10`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-sm font-medium text-gray-600">{label}</p>
        </div>
      </div>
    </div>
  );
}

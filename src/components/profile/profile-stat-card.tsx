import { LucideIcon } from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";

interface ProfileStatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  iconBg: string;
  iconColor: string;
}

export function ProfileStatCard({
  label,
  value,
  icon: Icon,
  color,
  gradientFrom,
  gradientTo,
  iconBg,
  iconColor,
}: ProfileStatCardProps) {
  return (
    <CardSpotlight
      color={color}
      className="group relative overflow-hidden !bg-white rounded-xl !border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-0"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-0 group-hover:opacity-5 transition-opacity`} />
      <div className="relative p-4">
        <div className="flex items-center justify-between mb-3">
          <div className={`${iconColor} ${iconBg} p-2.5 rounded-lg`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="space-y-0.5">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs font-medium text-gray-600">{label}</p>
        </div>
      </div>
    </CardSpotlight>
  );
}

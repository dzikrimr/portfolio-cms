import { Users, Eye, Clock, Zap, Mail } from "lucide-react";
import { getAnalyticsSummary } from "./analytics";
import { StatCard } from "./StatCard";
import { DailyViewsChart } from "./DailyViewsChart";
import { StatusCodeChart } from "./StatusCodeChart";

export const dynamic = "force-dynamic";

const formatMs = (ms: number) => {
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.round(ms)}ms`;
};

const formatDuration = (ms: number) => {
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}d`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}d`;
};

export default async function DashboardOverviewPage() {
  const data = await getAnalyticsSummary();

  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-lg font-semibold text-foreground mb-1">Overview</h1>
        <p className="text-sm text-muted-foreground">Statistik kunjungan dan performa website.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon={Users} label="Unique Visitors" value={String(data.uniqueVisitors)} />
        <StatCard icon={Eye} label="Total Page Views" value={String(data.totalViews)} />
        <StatCard icon={Clock} label="Rata-rata Durasi" value={formatDuration(data.avgDurationMs)} />
        <StatCard icon={Zap} label="Rata-rata Load" value={formatMs(data.avgLoadMs)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 border border-border rounded-lg p-4">
          <p className="text-sm font-medium text-foreground mb-2">Kunjungan 14 Hari Terakhir</p>
          <DailyViewsChart data={data.dailyViews} />
        </div>

        <div className="border border-border rounded-lg p-4">
          <p className="text-sm font-medium text-foreground mb-2">Status Response</p>
          <StatusCodeChart data={data.statusBuckets} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border border-border rounded-lg p-4">
          <p className="text-sm font-medium text-foreground mb-3">Halaman Terpopuler</p>
          <div className="space-y-2">
            {data.topPaths.length === 0 && (
              <p className="text-sm text-muted-foreground">Belum ada data.</p>
            )}
            {data.topPaths.map((p) => (
              <div key={p.path} className="flex items-center justify-between text-sm">
                <span className="text-foreground truncate">{p.path}</span>
                <span className="text-muted-foreground shrink-0 ml-2">{p.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Mail size={14} className="text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">Pesan Masuk Terbaru</p>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {data.recentContacts.length === 0 && (
              <p className="text-sm text-muted-foreground">Belum ada pesan masuk.</p>
            )}
            {data.recentContacts.map((c) => (
              <div key={c.id} className="border-b border-border pb-2 last:border-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{c.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString("id-ID") : ""}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{c.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

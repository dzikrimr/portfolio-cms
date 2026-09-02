"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface StatusCodeChartProps {
  data: { bucket: string; count: number }[];
}

const BUCKET_COLOR: Record<string, string> = {
  "2xx": "#16a34a",
  "4xx": "#ea580c",
  "5xx": "#dc2626",
};

export function StatusCodeChart({ data }: StatusCodeChartProps) {
  const ordered = ["2xx", "4xx", "5xx"]
    .map((bucket) => data.find((d) => d.bucket === bucket) ?? { bucket, count: 0 });

  const total = ordered.reduce((sum, d) => sum + d.count, 0);

  if (total === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-sm text-muted-foreground">
        Belum ada log request.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={ordered} layout="vertical" margin={{ left: -10 }}>
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="bucket"
          tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            fontSize: 12,
          }}
        />
        <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={22}>
          {ordered.map((entry) => (
            <Cell key={entry.bucket} fill={BUCKET_COLOR[entry.bucket]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

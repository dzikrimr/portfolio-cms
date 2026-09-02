import { sql } from 'drizzle-orm';
import { db } from '@/db';
import { pageViews, requestLogs, contactSubmissions } from '@/db/schema';

export async function getAnalyticsSummary() {
  const [visitorRow] = await db
    .select({ count: sql<number>`count(distinct ${pageViews.visitorId})` })
    .from(pageViews);

  const [viewRow] = await db.select({ count: sql<number>`count(*)` }).from(pageViews);

  const [avgDurationRow] = await db
    .select({ avgMs: sql<number>`avg(${pageViews.durationMs})` })
    .from(pageViews)
    .where(sql`${pageViews.durationMs} is not null`);

  const [avgLoadRow] = await db
    .select({ avgMs: sql<number>`avg(${requestLogs.durationMs})` })
    .from(requestLogs);

  const statusRows = await db
    .select({
      bucket: sql<string>`
        case
          when ${requestLogs.statusCode} < 300 then '2xx'
          when ${requestLogs.statusCode} < 500 then '4xx'
          else '5xx'
        end
      `,
      count: sql<number>`count(*)`,
    })
    .from(requestLogs)
    .groupBy(sql`1`);

  const dailyViews = await db
    .select({
      day: sql<string>`to_char(${pageViews.createdAt}, 'YYYY-MM-DD')`,
      count: sql<number>`count(*)`,
    })
    .from(pageViews)
    .where(sql`${pageViews.createdAt} > now() - interval '14 days'`)
    .groupBy(sql`1`)
    .orderBy(sql`1`);

  const topPaths = await db
    .select({
      path: pageViews.path,
      count: sql<number>`count(*)`,
    })
    .from(pageViews)
    .groupBy(pageViews.path)
    .orderBy(sql`count(*) desc`)
    .limit(5);

  const recentContacts = await db
    .select()
    .from(contactSubmissions)
    .orderBy(sql`${contactSubmissions.createdAt} desc`)
    .limit(10);

  return {
    uniqueVisitors: Number(visitorRow?.count ?? 0),
    totalViews: Number(viewRow?.count ?? 0),
    avgDurationMs: Number(avgDurationRow?.avgMs ?? 0),
    avgLoadMs: Number(avgLoadRow?.avgMs ?? 0),
    statusBuckets: statusRows.map((r) => ({ bucket: r.bucket, count: Number(r.count) })),
    dailyViews: dailyViews.map((r) => ({ day: r.day, count: Number(r.count) })),
    topPaths: topPaths.map((r) => ({ path: r.path, count: Number(r.count) })),
    recentContacts,
  };
}

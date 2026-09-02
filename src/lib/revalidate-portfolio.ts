import 'server-only';

export const PORTFOLIO_PATHS = {
  home: '/',
  privacy: '/privacy',
  terms: '/terms',
  privateRepo: '/private-repo',
} as const;

type PortfolioPath = (typeof PORTFOLIO_PATHS)[keyof typeof PORTFOLIO_PATHS];

/**
 * Portfolio pages are statically cached, so a CMS write is invisible until its
 * cache expires. Ping the portfolio to drop those entries immediately.
 *
 * Failures are swallowed: the content is already saved, and the page still
 * refreshes on its own schedule.
 */
export const revalidatePortfolio = async (paths: readonly PortfolioPath[]) => {
  const baseUrl = process.env.PORTFOLIO_URL;
  const secret = process.env.REVALIDATE_SECRET;

  if (!baseUrl || !secret) return;

  try {
    const response = await fetch(`${baseUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({ paths }),
    });

    if (!response.ok) {
      console.error('Portfolio revalidation failed', {
        status: response.status,
        paths,
      });
    }
  } catch (error) {
    console.error('Portfolio revalidation request failed', { error, paths });
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import ogs from 'open-graph-scraper';

export async function scrapeMetadata(url: string) {
  try {
    const options = { url }; // This is the minimum required option — it tells ogs() which page to scrape.
    const { error, result } = await ogs(options); // it will either return error or result

    if (error) {
      return {
        success: false,
        message: 'Open Graph scrape failed',
      };
    }

    return {
      success: true,
      message: 'Metadata fetched successfully',
      data: {
        title: result.ogTitle || '',
        description: result.ogDescription || '',
        image: Array.isArray(result.ogImage) && result.ogImage.length > 0
          ? result.ogImage[0].url || ''
          : (result.ogImage as any)?.url || '',
        favicon: `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}`,
        url: result.ogUrl || url
      }
    };
  } catch (err) {
    console.error('OGS error:', err);
    return {
      success: false,
      message: 'Something went wrong',
      data: {}
    };
  }
}

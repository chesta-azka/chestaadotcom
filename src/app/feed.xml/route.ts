import { NextResponse } from 'next/server';
import { adminDb } from '../../lib/firebase-admin';

export async function GET() {
  try {
    const siteUrl = 'https://chestaadotcom.com'; // Adjust to actual production URL if available
    const blogCollection = adminDb.collection('blogs');
    const snapshot = await blogCollection
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get();

    const items = snapshot.docs.map((doc) => {
      const data = doc.data();
      const pubDate = data.createdAt 
        ? (data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt)).toUTCString()
        : new Date().toUTCString();

      return `
    <item>
      <title><![CDATA[${data.title || 'Untitled Post'}]]></title>
      <link>${siteUrl}/blog/${data.slug || doc.id}</link>
      <guid isPermaLink="false">${doc.id}</guid>
      <description><![CDATA[${data.desc || data.description || ''}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${data.cat ? `<category><![CDATA[${data.cat}]]></category>` : ''}
    </item>`;
    }).join('');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CHESTAADOTCOM Studio Journal</title>
    <link>${siteUrl}</link>
    <description>Technical insights on Enterprise Architecture, AI Solutions, and Modern Web Performance.</description>
    <language>id-ID</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';

async function handleProxy(req: NextRequest) {
  const token = req.headers.get('x-bot-token');
  if (!token) {
    return NextResponse.json({ error: 'Missing x-bot-token header' }, { status: 401 });
  }

  // Extract path following /api/discord/
  const path = req.nextUrl.pathname.replace('/api/discord/', '');
  const targetUrl = `https://discord.com/api/v10/${path}${req.nextUrl.search}`;

  const body = ['GET', 'HEAD'].includes(req.method) ? undefined : await req.text();

  try {
    const discordRes = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Authorization': `Bot ${token}`,
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await discordRes.json();
    return NextResponse.json(data, { status: discordRes.status });
  } catch (err) {
    return NextResponse.json({ error: 'Discord proxy request failed' }, { status: 500 });
  }
}

export { handleProxy as GET, handleProxy as POST, handleProxy as PATCH, handleProxy as DELETE };

import { NextRequest, NextResponse } from 'next/server'

const CLIENT_ID = process.env.GITHUB_OAUTH_CLIENT_ID
const CLIENT_SECRET = process.env.GITHUB_OAUTH_CLIENT_SECRET

export async function GET(req: NextRequest, { params }: { params: Promise<{ auth?: string[] }> }) {
  const { auth } = await params
  const path = (auth ?? []).join('/')
  const url = new URL(req.url)
  const origin = url.origin

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return new Response(
      'GitHub OAuth not configured. Set GITHUB_OAUTH_CLIENT_ID and GITHUB_OAUTH_CLIENT_SECRET.',
      { status: 500 }
    )
  }

  if (path === '' || path === 'login' || url.searchParams.get('type') === 'login') {
    const githubUrl = new URL('https://github.com/login/oauth/authorize')
    githubUrl.searchParams.set('client_id', CLIENT_ID)
    githubUrl.searchParams.set('scope', 'public_repo')

    return new Response(
      `<!doctype html><html><body><script>window.location.href='${githubUrl}'</script></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  if (path === 'callback') {
    const code = url.searchParams.get('code')
    if (!code) return new Response('Missing code', { status: 400 })

    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }),
    })

    const data = await tokenRes.json()
    const token = data.access_token
    if (!token) return new Response(`Token error: ${JSON.stringify(data)}`, { status: 400 })

    return new Response(
      `<!doctype html>
<html><body>
<script>
  window.opener.postMessage({ access_token: ${JSON.stringify(token)} }, '*');
  window.close();
<\/script>
</body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  if (path === 'logout') return NextResponse.json({})
  return NextResponse.json({ error: 'unknown endpoint' }, { status: 404 })
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'no code' }, { status: 400 })

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }),
  })

  const data = await tokenRes.json()
  if (data.access_token) return NextResponse.json({ token: data.access_token })
  return NextResponse.json({ error: 'failed to get token' }, { status: 400 })
}

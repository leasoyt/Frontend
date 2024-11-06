// app/api/auth/token/route.ts
import { getAccessToken } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { accessToken } = await getAccessToken(); // Aquí es importante pasar el req (request).
    console.log('token', accessToken);
    return NextResponse.json({ token: accessToken });
  } catch (error) {
    console.error('Error obteniendo el token:', error);
    return NextResponse.json({ error: 'Error obteniendo el token de acceso' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Middleware admin yolları için çalışacak
export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Sadece admin yolları için kontrol et
  if (pathname.startsWith('/admin')) {
    // Login ve register sayfaları için kontrol yapmıyoruz, bu sayfalara erişime izin veriyoruz
    if (pathname === '/admin/login' || pathname === '/admin/register') {
      return NextResponse.next();
    }
    
    // LocalStorage'da saklanan token'ı almak için cookie kontrol ediyoruz
    // AuthContext localStorage'a TOKEN_KEY olarak token kaydediyor
    const token = request.cookies.get('next-auth.session-token')?.value || 
                 request.cookies.get('__Secure-next-auth.session-token')?.value;
    
    if (!token) {
      // Token yoksa login sayfasına yönlendir
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    try {
      // Token doğrulaması - gerçek uygulamada JWT secret kullanın
      // Bu örnek sadece token varlığını kontrol ediyor
      // JWT doğrulaması eklemek için:
      // const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      
      // Admin rolünü kontrol et - bu adımı doğrulamanın bir parçası olarak ekleyebilirsiniz
      // if (payload.role !== 'admin') {
      //   return NextResponse.redirect(new URL('/unauthorized', request.url));
      // }
      
      // Token geçerliyse devam et
      return NextResponse.next();
    } catch (error) {
      console.error('Token doğrulama hatası:', error);
      // Geçersiz token - login sayfasına yönlendir
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // Admin yolu değilse middleware bir şey yapmaz
  return NextResponse.next();
}

// Bu middleware sadece belirtilen yollar için çalışır
export const config = {
  matcher: [
    '/admin/:path*',
  ],
};

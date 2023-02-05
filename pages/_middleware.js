import { NextResponse } from 'next/server';


export default async function middleware(NextRequest, NextFetchEvent) {
    const userData = NextRequest.cookies?.user_login_information
    const pathName = NextRequest.nextUrl.pathname
    const baseUrl = NextRequest.nextUrl.origin


    const publicPages = ['/', '/auth/forget_password', '/auth/register', '/auth/forget_password/confirm_email', '/auth/forget_password/confirm_email/reset_password', '/images/logo.png']


    if (userData && publicPages.includes(pathName)) {
        return NextResponse.redirect(baseUrl + '/admin/agenda')
    }


    else if (!userData && !publicPages.includes(pathName)) {
        return NextResponse.redirect(baseUrl + '/')
    }


}

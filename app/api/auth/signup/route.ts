import { getAdminAuth, getAdminDb } from "@/firebase/firebase-admin";
import { NextResponse } from "next/server";

export async function POST(req : Request){

    const {username , password , email} = await req.json();
    if(!email || !username || !password) {
        return NextResponse.json(
            {message : "Missing required fields"},
            {status : 400}
        )
    }

    const adminAuth = getAdminAuth();
    const adminDb = getAdminDb();

    const user = await adminAuth.createUser({
        email,
        password,
        displayName : username
    })
    
}
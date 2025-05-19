import twilio from 'twilio';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { getOrganizationByDomain } from '@/services/organization';
import { getCustomerByEmail } from '@/services/customer';
import { hashToPassword } from '@/services/credentials';
import { generateJWT, verifyJWT } from '@/lib/encryption';
import { cookies, headers } from 'next/headers';

export async function GET() {
    try {
        const header = await headers()
        if (header.get('Authorization')) {
            const decoded = verifyJWT(header.get('Authorization') as string)
            return NextResponse.json(decoded);
        }
    }  catch (error) {
        console.error('Error during fetching account:', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching account.' },
            { status: 500 }
        );
    }
}
export async function POST(request: Request) {
    try {
        const { email, password, passkey, hostname } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email and either password or passkey are required.' },
                { status: 400 }
            );
        }
        
        if (!hostname) return NextResponse.json(
            { error: 'Please provide a hostname.' },
            { status: 401 }
        );

        const domain = await getOrganizationByDomain(hostname)

        const customer = await getCustomerByEmail(email)
        // Example logic for handling login
        if (customer?.password_hash && password) {
            // XQFujDCBUMmpFY5vfiEKorfhSbDOJ
            // Handle login with email and password
            
            const isPasswordValid = hashToPassword(password) === customer.password_hash;
            if (!isPasswordValid) {
                return NextResponse.json(
                    { error: 'Invalid email or password.' },
                    { status: 401 }
                );
            } else {
                const { email_hash, password_hash, ...record } = customer
                const organization = (domain as any).organizations
                const token = generateJWT({
                    ...record,
                    email,
                }, '1h')
                ;(await cookies()).set('token', token)
                return NextResponse.json({ message: 'Login successful.', organization, record: { token, ...record } });
            }
        } else if (passkey) {
            // Handle login with passkey
            const isPasskeyValid = await validatePasskey(email, passkey);
            if (!isPasskeyValid) {
                return NextResponse.json(
                    { error: 'Invalid email or passkey.' },
                    { status: 401 }
                );
            }
        }

        // // Generate a session or token for the user
        // const token = await generateAuthToken(email);

        return NextResponse.json({ message: 'Login successful.', domain });
    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json(
            { error: 'An error occurred during login.' },
            { status: 500 }
        );
    }
}

// Mock functions for validation and token generation
async function validatePassword(email: string, password: string): Promise<boolean> {
    // Replace with actual password validation logic
    return email === 'test@example.com' && password === 'password123';
}

async function validatePasskey(email: string, passkey: string): Promise<boolean> {
    // Replace with actual passkey validation logic
    return email === 'test@example.com' && passkey === 'valid-passkey';
}

async function generateAuthToken(email: string): Promise<string> {
    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    return OTP;
}

async function generateWhatsappToken(email: string): Promise<string> {
    // Replace with actual token generation logic
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);
    const OTP = Math.floor(100000 + Math.random() * 900000).toString();
    const message = await client.messages.create({
        body: `Your password for this year is ${generateRandomPassword()}`,
        from: `whatsapp:+${process.env.WHATSAPP_SENDER}`,
        to: "whatsapp:+12367771283",
    });

    return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateRandomPassword(length: number = 15): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_+-|;:,.';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = await createClient()
        const res = await supabase.from('customers')
        console.log(res)
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
        const { email, password, passkey } = await request.json();

        if (!email || (!password && !passkey)) {
            return NextResponse.json(
                { error: 'Email and either password or passkey are required.' },
                { status: 400 }
            );
        }

        // Example logic for handling login
        if (password) {
            // Handle login with email and password
            const isPasswordValid = await validatePassword(email, password);
            if (!isPasswordValid) {
                return NextResponse.json(
                    { error: 'Invalid email or password.' },
                    { status: 401 }
                );
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

        // Generate a session or token for the user
        const token = await generateAuthToken(email);

        return NextResponse.json({ message: 'Login successful.', token });
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
    // Replace with actual token generation logic
    return `token-for-${email}`;
}
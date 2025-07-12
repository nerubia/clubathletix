'use server';
import { redirect } from 'next/navigation';

export async function gotoLoginPage() {
	redirect('/login');
}

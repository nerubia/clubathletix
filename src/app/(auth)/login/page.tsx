import { Logo } from '@/app/logo';
import { Button } from '@/components/button';
import { Checkbox, CheckboxField } from '@/components/checkbox';
import { Field, Label } from '@/components/fieldset';
import Form from '@/components/form';
import { Heading } from '@/components/heading';
import { Input } from '@/components/input';
import { Strong, Text, TextLink } from '@/components/text';
import { verifyJWT } from '@/lib/encryption';
import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { signOut } from './actions';

export const metadata: Metadata = {
	title: 'Login',
};

export default async function Login() {
	const h = await headers();
	const cookie = await cookies();

	const token = cookie.get('token')?.value;

	if (token) {
		const verified = verifyJWT(token);
	}

	if (h.get('referer')) {
		const { pathname } = new URL(h.get('referer') as string);
		if (pathname === '/d' || pathname.startsWith('/d/')) {
			await signOut();
		}
	}

	return (
		<Form action="/api/auth" className="grid w-full max-w-sm grid-cols-1 gap-8">
			<Logo className="h-6 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]" />
			<Heading>Sign in to your account</Heading>
			<Field>
				<Label>Email</Label>
				<Input type="email" name="email" />
			</Field>
			<Field>
				<Label>Password</Label>
				<Input type="password" name="password" />
			</Field>
			<div className="flex items-center justify-between">
				<CheckboxField>
					<Checkbox name="remember" />
					<Label>Remember me</Label>
				</CheckboxField>
				{/* <Text>
          <TextLink href="/forgot-password">
            <Strong>Forgot password?</Strong>
          </TextLink>
        </Text> */}
			</div>
			<Button type="submit" className="w-full">
				Login
			</Button>
			<Text>
				<TextLink href="/forgot-password">
					<Strong>Forgot password?</Strong>
				</TextLink>{' '}
				Don’t have an account?{' '}
				<TextLink href="/register">
					<Strong>Sign up</Strong>
				</TextLink>
			</Text>
		</Form>
	);
}

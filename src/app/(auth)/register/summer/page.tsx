import { Button } from '@/components/button';
import { Field, Label } from '@/components/fieldset';
import { Heading, Subheading } from '@/components/heading';
import { Input } from '@/components/input';
import { Select } from '@/components/select';
import type { Metadata } from 'next';
import Image from 'next/image';
import { signup } from './actions';

export const metadata: Metadata = {
	title: 'Summer Training 2025',
};

export default function Login() {
	return (
		<form action={signup} className="grid w-full max-w-sm grid-cols-1 gap-2">
			<div className="flex w-full flex-col items-center justify-center">
				<Image src="/pf/pf-logo-sm.png" height={68} width={68} title="PF Football Academy" alt="PF Logo" />
				<Heading>Summer Training 2025</Heading>
				<Subheading>Registration Form</Subheading>
			</div>

			<Heading className="mt-8 mb-4">Player information</Heading>
			<div className="flex flex-col gap-1 sm:flex-row">
				<Field>
					<Label>First name</Label>
					<Input name="fname" />
				</Field>
				<Field>
					<Label>Last name</Label>
					<Input name="lname" />
				</Field>
			</div>
			<div className="mt-2 flex gap-1">
				<Field className="w-1/2">
					<Label>Date of birth</Label>
					<Select name="month">
						<option value="01">January</option>
						<option value="02">February</option>
						<option value="03">March</option>
						<option value="04">April</option>
						<option value="05">May</option>
						<option value="06">June</option>
						<option value="07">July</option>
						<option value="08">August</option>
						<option value="09">Septembre</option>
						<option value="10">October</option>
						<option value="11">November</option>
						<option value="12">December</option>
					</Select>
				</Field>
				<Field className="w-1/5">
					<Label>&nbsp;</Label>

					<Select name="day">
						{Array.from({ length: 31 }, (_, i) => (
							<option key={i + 1} value={String(i + 1).padStart(2, '0')}>
								{String(i + 1).padStart(2, '0')}
							</option>
						))}
					</Select>
				</Field>

				<Field className="flex-1">
					<Label>&nbsp;</Label>

					<Select name="year">
						{Array.from({ length: 12 }, (_, i) => (
							<option key={2020 - i} value={2020 - i}>
								{2020 - i}
							</option>
						))}
					</Select>
				</Field>
			</div>

			<Heading className="mt-8">Parent / Guardian Information</Heading>

			<div className="flex flex-col gap-1 sm:flex-row">
				<Field>
					<Label>First name</Label>
					<Input name="fname" />
				</Field>
				<Field>
					<Label>Last name</Label>
					<Input name="lname" />
				</Field>
			</div>

			<Field className="mt-2">
				<Label>Email</Label>
				<Input type="email" name="email" />
			</Field>

			<Field className="mt-2">
				<Label>Mobile no.</Label>
				<Input name="phone" type="tel" />
			</Field>

			<Button type="submit" className="mt-4 w-full">
				Register
			</Button>
		</form>
	);
}

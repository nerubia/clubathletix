'use client';
import { Button } from '@/components/button';
import { Checkbox, CheckboxField } from '@/components/checkbox';
import { Field, Label } from '@/components/fieldset';
import { Heading, Subheading } from '@/components/heading';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { useState } from 'react';

export type CompetitionFormContainerData = {
	name: string;
	slug: string;
	organizations: {
		id: string;
		name: string;
		colours?: string;
	};
	divisions: {
		id: string;
		name: string;
	}[];
};

type FormState = {
	club_academy: string;
	team_name: string;
	first_name: string;
	last_name: string;
	email_address: string;
	phone_number: string;
	description?: string;
	agree?: boolean;
};
export default function FormContainer({ competition }: { competition: CompetitionFormContainerData }) {
	const [formState, setFormState] = useState<FormState>({
		club_academy: '',
		team_name: '',
		first_name: '',
		last_name: '',
		email_address: '',
		phone_number: '',
		...competition,
	} as FormState & { agree?: boolean; description?: string });
	const [submitting, toggleSubmit] = useState<boolean>(false);
	return (
		<>
			<div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
				<Heading force="text-zinc-950 mb-2">Team information</Heading>
				<div className="mb-12 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<Field data-theme="light">
						<Label data-theme="light">Club / Academy name</Label>
						<Input
							name="club_academy"
							data-theme="light"
							onChange={(e) =>
								setFormState(
									(prev) =>
										({
											...prev,
											[e.target.name]: e.target.value,
										}) as unknown as FormState
								)
							}
							defaultValue={formState.club_academy}
						/>
					</Field>

					<Field data-theme="light">
						<Label data-theme="light">Team name</Label>
						<Input
							name="team_name"
							data-theme="light"
							onChange={(e) =>
								setFormState(
									(prev) =>
										({
											...prev,
											[e.target.name]: e.target.value,
										}) as unknown as FormState
								)
							}
							defaultValue={formState.team_name}
						/>
					</Field>
				</div>

				<Heading force="text-zinc-950 my-2">Coach&rsquo;s Information</Heading>
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<Field data-theme="light">
						<Label data-theme="light">First name</Label>
						<Input
							name="first_name"
							data-theme="light"
							onChange={(e) =>
								setFormState(
									(prev) =>
										({
											...prev,
											[e.target.name]: e.target.value,
										}) as unknown as FormState
								)
							}
							defaultValue={formState.first_name}
						/>
					</Field>
					<Field data-theme="light">
						<Label data-theme="light">Last name</Label>
						<Input
							name="last_name"
							data-theme="light"
							onChange={(e) =>
								setFormState(
									(prev) =>
										({
											...prev,
											[e.target.name]: e.target.value,
										}) as unknown as FormState
								)
							}
							defaultValue={formState.last_name}
						/>
					</Field>
					<Field data-theme="light">
						<Label data-theme="light">Email</Label>
						<Input
							type="email"
							name="email_address"
							data-theme="light"
							onChange={(e) =>
								setFormState(
									(prev) =>
										({
											...prev,
											[e.target.name]: e.target.value,
										}) as unknown as FormState
								)
							}
							defaultValue={formState.email_address}
						/>
					</Field>
					<Field data-theme="light">
						<Label data-theme="light">Phone</Label>
						<Input
							type="tel"
							name="phone_number"
							data-theme="light"
							onChange={(e) =>
								setFormState(
									(prev) =>
										({
											...prev,
											[e.target.name]: e.target.value,
										}) as unknown as FormState
								)
							}
							defaultValue={formState.phone_number}
						/>
					</Field>

					<div className="sm:col-span-2">
						<label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
							Message
						</label>
						<div className="mt-2.5">
							<textarea
								id="message"
								name="description"
								rows={4}
								className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-600"
								defaultValue={''}
								onChange={(e) =>
									setFormState(
										(prev) =>
											({
												...prev,
												[e.target.name]: e.target.value,
											}) as unknown as FormState
									)
								}
							/>
						</div>
					</div>
				</div>
				<section className="mt-8">
					<div id="waiver" className="mb-8 rounded-lg bg-slate-900 p-6">
						<Heading className="mb-4 text-4xl font-semibold tracking-tight text-pretty" force='text-white'>
							Competition Waiver
						</Heading>
						<Text data-theme="dark" className="text-justify mb-4">
							I, the undersigned coach, acknowledge that I am registering a team to participate in the{' '}
							{competition?.name || 'competition'}, organized by {competition?.organizations.name || 'academy'}. I
							understand that participation in this competition involves physical activity that carries an inherent risk
							of injury. I confirm that all players, coaches, and team officials under my care have agreed to comply
							with the rules, codes of conduct, and safety policies outlined by the competition organizers. I hereby
							release {competition?.organizations.name || 'academy'}, its officers, volunteers, and affiliates from any
							liability arising from injuries, accidents, or losses incurred during participation in the competition. I
							agree to ensure that all players are covered by appropriate insurance and understand that registration is
							not complete until payment has been received and confirmed.
						</Text>


                        <Subheading level={4} className="mb-2 font-semibold tracking-tight text-pretty" force='text-white'>
                            Photography/Video Usage Policy
                        </Subheading>
						<Text data-theme="dark" className="text-justify">
							By registering for this event, you are consenting to the use of any photographs and/or video recordings,
							of any team player(s) or staff member(s), taken by {competition?.organizations.name || 'academy'} for use
							on our website, social media sites, and/or in any marketing materials. 
						</Text>
					</div>
					<CheckboxField data-theme="light">
						<Checkbox
							color="rose"
							aria-required
							name="agree"
							value="yes"
							data-theme="light"
							onChange={(agree) =>
								setFormState(
									(prev) =>
										({
											...prev,
											agree,
										}) as unknown as FormState
								)
							}
						/>
						<Label data-theme="light">
							I have read and agree to the <a href="#waiver">competition waiver</a> and represent my team&rsquo;s
							compliance with its terms.
						</Label>
					</CheckboxField>
				</section>
				<div className="mt-8 flex justify-end">
					<Button
						type="submit"
						disabled={Boolean(
							!formState?.agree ||
								!formState?.team_name ||
								!formState?.first_name ||
								!formState?.last_name ||
								!formState?.email_address ||
								!formState?.phone_number
						)}
						onClick={() => {
							toggleSubmit(true);
						}}
					>
						{submitting && (
							<svg
								aria-hidden="true"
								className="inline h-3 w-3 animate-spin fill-white text-gray-200 dark:text-gray-600"
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="currentColor"
								/>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="currentFill"
								/>
							</svg>
						)}
						{submitting ? 'Submitting...' : 'Submit Registration'}
					</Button>
				</div>
			</div>
		</>
	);
}

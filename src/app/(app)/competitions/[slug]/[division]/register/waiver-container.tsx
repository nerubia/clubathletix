import { Heading, Subheading } from '@/components/heading';
import { Text } from '@/components/text';

export default function WaiverContainer(props: { organizer_name: string; competition_name: string }) {
	return (
		<div id="waiver" className="mb-8 rounded-lg bg-zinc-900 p-6">
			<Heading className="mb-4 text-4xl font-semibold tracking-tight text-pretty" force="text-white">
				Competition Waiver
			</Heading>
			<Text color="text-zinc-300" className="mb-4 text-justify">
				I, the undersigned coach, acknowledge that I am registering a team to participate in the{' '}
				{props.competition_name || 'competition'}, organized by {props.organizer_name || 'academy'}. I understand that
				participation in this competition involves physical activity that carries an inherent risk of injury.
				<br />
				<br />
				I confirm that all players, coaches, and team officials under my care have agreed to comply with the rules,
				codes of conduct, and safety policies outlined by the competition organizers.
				<br />
				<br />I hereby release {props.organizer_name || 'academy'}, its officers, volunteers, and affiliates from any
				liability arising from injuries, accidents, or losses incurred during participation in the competition.
				<br />
				<br />I agree to ensure that all players are covered by appropriate insurance and understand that registration
				is not complete until payment has been received and confirmed.
			</Text>

			<Subheading level={4} className="mb-2 font-semibold tracking-tight text-pretty" force="text-white">
				Photography/Video Usage Policy
			</Subheading>
			<Text data-theme="dark" className="text-justify">
				By registering for this event, you are consenting to the use of any photographs and/or video recordings, of any
				team player(s) or staff member(s), taken by {props.organizer_name || 'academy'} for use on our website, social
				media sites, and/or in any marketing materials. 
			</Text>
		</div>
	);
}

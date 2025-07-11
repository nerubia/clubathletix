'use client';
import { Checkbox, CheckboxField } from "@/components/checkbox";
import { Label } from "@/components/fieldset";
import { Heading } from "@/components/heading";
import { Text } from "@/components/text";

type Competition = {
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
}
export default function FormContainer({competition}: {competition: Competition}) {
    return <>
    <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className='mb-8'>
                <label htmlFor="team-name" className="block text-sm/6 font-semibold text-gray-900">
                  Team name
                </label>
                <div className="mt-2.5">
                  <input
                    id="team-name"
                    name="team_name"
                    type="text"
                    autoComplete="team-name"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-600"
                  />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <h2 className='sm:col-span-2 text-2xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-3xl'>Coach&rsquo;s Information</h2>
              <div>
                <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    name="first_name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-600"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    id="last-name"
                    name="last_name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-600"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-600"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-gray-900">
                  Phone number
                </label>
                <div className="mt-2.5">
                  <input
                    id="phone-number"
                    name="phone_number"
                    type="tel"
                    autoComplete="tel"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-600"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-600"
                    defaultValue={''}
                  />
                </div>
              </div>
            </div>
            <section className='mt-8'>
                <div id='waiver' className='bg-slate-900 mb-8 p-6 rounded-lg'>
                    <Heading className='text-4xl font-semibold tracking-tight text-pretty text-white mb-4'>Competition Waiver</Heading>
                <Text data-theme='dark' className='text-justify'>I, the undersigned coach, acknowledge that I am registering a team to participate in the {competition?.name || 'competition'}, organized by {competition?.organizations.name || 'academy'}. I understand that participation in this competition involves physical activity that carries an inherent risk of injury.

                                I confirm that all players, coaches, and team officials under my care have agreed to comply with the rules, codes of conduct, and safety policies outlined by the competition organizers.

                    I hereby release {competition?.organizations.name || 'academy'}, its officers, volunteers, and affiliates from any liability arising from injuries, accidents, or losses incurred during participation in the competition.

                    I agree to ensure that all players are covered by appropriate insurance and understand that registration is not complete until payment has been received and confirmed.</Text>

                </div>
                <CheckboxField data-theme='light'> 
                    <Checkbox color="rose" aria-required name="agree" value="yes" data-theme='light' />
                    <Label data-theme='light'>I have read and agree to the <a href="#waiver">competition waiver</a> and represent my team&rsquo;s compliance with its terms.</Label>
                </CheckboxField>
            </section>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className={`rounded-md ${competition?.organizations.colours?.split(',').shift()} px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600`}
              >
                Submit Registration
              </button>
            </div>
          </div>
    </>
}
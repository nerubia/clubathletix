import { Combobox, ComboboxLabel, ComboboxOption } from "@/components/combobox";
import { Field } from "@/components/fieldset"
import { Input } from "@/components/input";
import { Database } from "@/database.types";

type OrganizationEvent = Database['public']['Tables']['organization_events']['Row'];
export default function Form() {
    const options = {
        event_types: [
            { value: 'training', name: 'Training' },
            { value: 'match', name: 'Match' },
        ]
    };
	return (
		<div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <Field className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label className="mt-2 text-sm font-bold" htmlFor="title">Title</label>
                <Input name="title" id="title" placeholder="Enter event name" />
            </Field>

            <Field className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label className="mt-2 text-sm font-bold" htmlFor="title">Type</label>
                <Combobox name="event_type" placeholder="Select event type" options={options.event_types} displayValue={(opt) => (opt as { [k: string]: string}).name}>
                    {(opt) => (
                        <ComboboxOption key={(opt as { [k: string]: string}).value} value={opt}>
                            <ComboboxLabel>{(opt as { [k: string]: string}).name}</ComboboxLabel>
                        </ComboboxOption>
                    )}
                </Combobox>
            </Field>

		</div>
	);
}

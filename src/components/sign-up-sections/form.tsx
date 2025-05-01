
import { signUp } from "./actions";
import FormContents from "./form-contents";

export default function RegistrationForm() {

    return <form action={signUp} className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-24">
        <FormContents />
    </form>
}
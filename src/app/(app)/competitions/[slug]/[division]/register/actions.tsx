'use server';
export async function submitAction(formData: FormData) {
    console.log(Object.fromEntries(formData.entries()))
}
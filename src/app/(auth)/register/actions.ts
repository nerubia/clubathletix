'use server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    fname: formData.get('fname') as string,
    lname: formData.get('lname') as string,
    cfname: formData.get('cfname') as string,
    clname: formData.get('clname') as string,
    birth_month: formData.get('birth_month') as string,
    birth_date: formData.get('birth_date') as string,
    birth_year: formData.get('birth_year') as string,
    street_1: formData.get('street_1') as string,
    street_2: formData.get('street_2') as string,
    city_town: formData.get('city_town') as string,
    state_province: formData.get('state_province') as string,
    postal_zip_code: formData.get('postal_zip_code') as string,
    country: formData.get('country') as string,
    media_release: formData.get('media_release') as string,
    signed_agreement: formData.get('signed_agreement') as string,
  }
  console.log(JSON.stringify(data, null, 2))
  // const { error } = await supabase.auth.signUp(data)
  // console.log(JSON.stringify({ data, error }, null, 2))
  // if (error) {
  //   // redirect('/register?error=' + error.code)
  // }
  revalidatePath('/', 'layout')
  // redirect('/dashboard')
}
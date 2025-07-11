'use server';

import { joinCompetition } from "@/services/competition";
import { sendEmail } from "@/services/email-helper";
import { redirect } from "next/navigation";
import { CompetitionFormContainerData } from "./form-container";
import { headers } from "next/headers";
import { stringToBase64URL } from "@supabase/ssr";

export async function submitAction(formData: FormData) {
    const hdr = await headers();
    const page = Object.fromEntries(hdr.entries());
    const { pathname } = new URL(page.referer || page.origin)
    const {
        club_academy,
        team_name,
        first_name,
        last_name,
        email_address,
        phone_number,
        description,
        division_id,
        competition_id,
        competition_name,
        organization_name,
        phone: organization_phone,
        email: organization_email,
        fee,
        logo_url,
    } = Object.fromEntries(formData.entries()) as unknown as Record<string, string>;

    const waiver_signed_at = new Date();

    const submission = {
        organization_name: club_academy as string,
        team_name: team_name as string,
        first_name: first_name as string,
        last_name: last_name as string,
        email_address: email_address as string,
        phone_number: phone_number as string,
        waiver_signed_at,
        description: description as string,
        logo_url: logo_url as string,
        division_id: Number(division_id),
        competition_id: Number(competition_id),
    };
    const TemplateModel = {
            competition_name,
            team_name: submission.team_name,
            name: submission.first_name,
            etransfer_email: 'register@progressfooty.com',
            organization_name,
            phone_number: organization_phone,
            email: organization_email,
            fee,
        }
    await sendEmail({
        To: submission.email_address,
        TemplateAlias: 'competition_registration_confirmation',
        TemplateModel,
    })
    const record = await joinCompetition(submission);
    console.log('Competition registration record:', record);

    const [dir,slug] = pathname.split('/').filter(Boolean)
    redirect(`/${dir}/${slug}?team=${stringToBase64URL(submission.team_name)}`);
}
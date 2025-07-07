import { getOrganizationByDomain } from "@/services/organization";
import { getCurrentSeason } from "@/services/seasons";
import { NextResponse } from "next/server";

export async function GET (request: Request) {
    const organization = await getOrganizationByDomain(request.headers.get('host') || 'localhost' )
    if (organization.id) {
        const season = await getCurrentSeason(organization.id);
        if (season) {
            
            return NextResponse.json({
                organization,
                season
            })
        }
    }
    return NextResponse.json({
        organization
    })
}
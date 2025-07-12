'use client'
import { Address } from "@/app/(app)/d/account/address";
import { Input } from "../input";
import { Heading } from "../heading";import Birthdate from "./birth";
import PlanSelect from "./plan";
import { Button } from "../button";
import { Checkbox, CheckboxField } from "../checkbox";
import { Description, Label } from "../fieldset";
import DialogButton from "../dialog-button";
import WaiverAgreementForm from "./waiver-contents";
import { FormEvent, useEffect, useState } from "react";
import { Dialog, DialogActions, DialogBody, DialogTitle } from "../dialog";

export default function FormContents() {
    const [success, toggleSuccessDialog] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [loading, toggleLoader] = useState(false)
    const [isElite, toggleElite] = useState(false)
    const [formData, setFormData] = useState<{
        [k: string]: string | boolean
    }>({
        fname: '',
        lname: '',
        cfname: '',
        clname: '',
        street_1: '',
        postal_zip_code: '',
        city_town: '',
        wants_kit: false,
        state_province: 'British Columbia',
        country: 'Canada',
        media_release: true,
        plan: 'training',
        signed_agreement: false,
    })

    function isSummer() {
        const month = new Date().getMonth();

        if (month > 5 && month < 8) return true
    }

    function toggleAgreement(yes: boolean) {
        setFormData(prev => ({
            ...prev,
            signed_agreement: true,
        }))
        setDisabled(!yes)
    }

    useEffect(() => {
        if (formData.date_of_birth) {
            const [year] = `${formData.date_of_birth}`.split('-').map(Number)
            year && toggleElite(year <= 2013)
        }
    }, [formData.plan, formData.date_of_birth])

    useEffect(() => {
        if (!isElite) setFormData(prev => ({
            ...prev,
            plan: 'training'
        }))
    }, [isElite])

    return <div className="mx-auto max-w-xl lg:max-w-sm">
    <section id="signup-form">
        <div className="border-b border-gray-200 pb-5 mb-5">
            <Heading className="text-base text-zinc-600 font-semibold" force="text-gray-900">Child information</Heading>
        </div>
        <div className="flex gap-y-6 flex-wrap">
            <div className="w-1/2 pr-1">
                <label htmlFor="child-first-name" className="block text-sm/6 font-semibold text-gray-900">
                First name
                </label>
                <div className="mt-2.5">
                <Input
                    id="child-first-name"
                    name="cfname"
                    type="text"
                    autoComplete="given-name"
                    data-theme="light"
                    required
                    value={`${formData?.cfname || ''}`}
                    onChange={e => {
                        setFormData(prev => ({
                            ...prev,
                            [e.target.name]: e.target.value
                        }))
                    }}
                />
                </div>
            </div>
            <div className="w-1/2 pl-1">
                <label htmlFor="child-last-name" className="block text-sm/6 font-semibold text-gray-900">
                Last name
                </label>
                <div className="mt-2.5">
                <Input
                    id="child-last-name"
                    name="clname"
                    type="text"
                    autoComplete="family-name"
                    data-theme='light'
                    required
                    value={`${formData?.clname || ''}`}
                    onChange={e => {
                        setFormData(prev => ({
                            ...prev,
                            [e.target.name]: e.target.value
                        }))
                    }}
                />
                </div>
            </div>
            <div className="w-full">
                <label htmlFor="child-birthdate" className="block text-sm/6 font-semibold text-gray-900">
                Child&rsquo;s date of birth
                </label>
                
                <Birthdate id="child-birthdate" 
                    data-theme="light"
                    value={`${formData?.date_of_birth || ''}`} onChange={e => {
                    setFormData(prev => ({
                        ...prev,
                        date_of_birth: e
                    }))
                }} />
            </div>

        </div>


        <div className="border-b border-gray-200 pt-15 pb-5 mb-5">
            <Heading className="text-base font-semibold" force="text-gray-900">Parent / guardian information</Heading>
        </div>
        <div className="flex gap-y-6 flex-wrap">
            <div className="w-1/2 pr-1">
                <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">
                    First name
                </label>
                <div className="mt-2.5">
                    <Input
                        id="first-name"
                        name="fname"
                        type="text"
                        autoComplete="first-name"
                        data-theme="light"
                        required
                        value={`${formData?.fname || ''}`}
                        onChange={e => {
                            setFormData(prev => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }))
                        }}
                    />
                </div>
            </div>
            <div className="w-1/2 pl-1">
                <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">
                    Last name
                </label>
                <div className="mt-2.5">
                    <Input
                        id="last-name"
                        name="lname"
                        type="text"
                        autoComplete="last-name"
                        data-theme="light"
                        required
                        value={`${formData?.lname || ''}`}
                        onChange={e => {
                            setFormData(prev => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }))
                        }}
                    />
                </div>
            </div>
            <div className="col-span-2 pb-4">
                <label htmlFor="street_1" className="block text-sm/6 font-semibold text-gray-900 mb-4">
                    Address
                </label>
                <Address {...formData as any} data-theme="light" onChange={address => {
                    setFormData(prev => ({
                        ...prev,
                        ...address,
                    }))
                }} />
            </div>

            <section className="flex flex-col sm:flex-row gap-2">
            <div>
                <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
                    Email
                </label>
                <div className="mt-2.5">
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        data-theme="light"
                        required
                        value={`${formData?.email || ''}`}
                        onChange={e => {
                            setFormData(prev => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }))
                        }}
                    />
                </div>
            </div>
            <div>
                <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-gray-900">
                    Phone number
                </label>
                <div className="mt-2.5">
                    <Input
                        id="phone-number"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        data-theme="light"
                        required
                        value={`${formData?.phone || ''}`}
                        onChange={e => {
                            setFormData(prev => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }))
                        }}
                    />
                </div>
            </div>
            </section>
        </div>
        <div className="col-span-2 mt-16">
            {isElite ? <PlanSelect
                defaultValue={`${formData.plan || ''}`}
                onChange={p => {
                setFormData(prev => ({
                    ...prev,
                    plan: p
                }))
            }} /> : 
            <div className="col-span-2 mt-8">
                <CheckboxField data-theme="light">          
                    <Checkbox color="rose" aria-required name="wants_kit" value="yes" defaultChecked={Boolean(formData.wants_kit)} data-theme="light" onChange={yes => {
                        setFormData(prev => ({
                            ...prev,
                            wants_kit: yes
                        }))
                    }} />
                    <Label data-theme="light">I&rsquo;d like a player kit (CA$80)</Label>
                    <Description data-theme="light">Our team kit includes a pair of jerseys, shorts, and socks.  This is just optional (although recommended).</Description>
                </CheckboxField>
            </div>}
        </div>


        <div className="border-b border-gray-200 pb-5 mb-0 mt-8">
            <Heading className="text-base font-semibold" force="text-zinc-900">Terms & Waiver Agreement</Heading>
        </div>
        <div className="col-span-2 mt-8">
            <CheckboxField data-theme="light">          
                <Checkbox color="rose" aria-required name="media_release" value="yes" defaultChecked data-theme="light" onChange={yes => {
                    setFormData(prev => ({
                        ...prev,
                        media_release: yes
                    }))
                }} />
                <Label data-theme="light">Media release</Label>
                <Description data-theme="light">I grant permission to Progress Footy Academy Inc. to use photos, videos, or recordings of my child for marketing, social media, or promotional purposes.</Description>
            </CheckboxField>
        </div>
        <div className="col-span-2 mt-8">
            <CheckboxField data-theme="light">          
                <Checkbox color="rose" aria-required name="signed_agreement" value="yes" data-theme="light" onChange={toggleAgreement} defaultChecked={Boolean(formData.signed_agreement)} />
                <Label data-theme="light">Parent&rsquo;s agreement</Label>
                <Description data-theme="light">By signing up, you agree to our <DialogButton dialog={{
                    title: 'Progress Footy Football Academy Inc. Waiver and Parent\'s Agreement',
                    action: 'Yes, I agree',
                    body: <WaiverAgreementForm />,
                }}><span className="underline font-semibold text-red-700 cursor-pointer">terms of services</span></DialogButton>. <br/>  You&rsquo;ll have to agree to this prior to registration.</Description>
            </CheckboxField>
        </div>
    </section>
    <div className="mt-8 flex flex-col sm:flex-row items-center">
        <Button type="submit" className="w-32" color="dark" disabled={disabled} onClick={async (e: FormEvent<HTMLButtonElement>) => {
            e.preventDefault();
            toggleLoader(true)
 
            const xhr = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    contentType: 'application/json'
                }
            })
            toggleLoader(false)

            if (xhr.ok) {
                toggleSuccessDialog(true);
            }
        }}>
            {loading ? 'Loading...' : 'Sign up'}
        </Button>
        <p className="text-slate-500 sm:ml-8 mt-8 sm:mt-0 text-xs">We will contact you via WhatsApp for next steps.</p>
    </div>

    <Dialog open={success} onClose={() => {
        setFormData(prev => ({
            ...prev,
            cfname: '',
            clname: '',
            media_release: true,
            plan: 'training',
            wants_kit: false,
        }))
    }}>
        <DialogTitle>Beauty!</DialogTitle>
        <DialogBody className="flex flex-col gap-y-4">
            <p>Hey {(formData.fname as string).split(' ').reverse().pop()}! Thanks for signing {(formData.cfname as string).split(' ').reverse().pop()} up.</p>
            <p className="text-sm">
                We&rsquo;re so thrilled to have you and {(formData.cfname as string).split(' ').reverse().pop()} join the PF Academy family!
                <br />
                We can&rsquo;t wait to help {(formData.cfname as string).split(' ').reverse().pop()} grow into a better player and person, both on and off the field.
            </p>

            <p className="text-sm">The training season is currently underway at the moment but we accept players any time of the year.</p>

            <p className="text-sm">We will contact you via WhatsApp for next steps within the next 24 hours.</p>
            <p className="text-sm">In the meantime, for any questions or inquiries, feel free to emai us at registration@progressfooty.com.</p>

            <p>⚽ We&rsquo;re excited to have you on board! ⚽</p>
        </DialogBody>
        <DialogActions>
            <Button type="button" onClick={() => {
                setFormData(prev => ({
                    ...prev,
                    cfname: '',
                    clname: '',
                    plan: 'training',
                    wants_kit: false,
                }))
                toggleSuccessDialog(false)
                
            }}>Close</Button>
        </DialogActions>
    </Dialog>
</div>
}
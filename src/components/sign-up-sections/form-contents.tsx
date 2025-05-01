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
import { FormEvent, useState } from "react";
import { Dialog, DialogActions, DialogBody, DialogTitle } from "../dialog";

export default function FormContents() {
    const [success, toggleSuccessDialog] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [loading, toggleLoader] = useState(false)
    const [formData, setFormData] = useState<{
        [k: string]: string | boolean
    }>({
        street_1: '',
        city_town: '',
        state_province: '',
        postal_zip_code: '',
        country: 'Canada',
    })
    function toggleAgreement(yes: boolean) {
        setFormData(prev => ({
            ...prev,
            signed_agreement: true,
        }))
        setDisabled(!yes)
    }

    return <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
    <section>
        <div className="border-b border-gray-200 pb-5 mb-5">
            <Heading className="text-base text-zinc-600 font-semibold" force="text-gray-900">Child information</Heading>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
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
                    onChange={e => {
                        setFormData(prev => ({
                            ...prev,
                            [e.target.name]: e.target.value
                        }))
                    }}
                />
                </div>
            </div>
            <div className="col-span-2">
                <label htmlFor="child-birthdate" className="block text-sm/6 font-semibold text-gray-900">
                Child&rsquo;s date of birth
                </label>
                
                <Birthdate id="child-birthdate" onChange={e => {
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
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
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
                        onChange={e => {
                            setFormData(prev => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }))
                        }}
                    />
                </div>
            </div>
        </div>
        <div className="col-span-2 mt-8">
            <PlanSelect />
        </div>
        <div className="col-span-2 mt-8">
            <CheckboxField data-theme="light">          
                <Checkbox color="rose" aria-required name="media_release" value="yes" data-theme="light" onChange={yes => {
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
                <Checkbox color="rose" aria-required name="signed_agreement" value="yes" data-theme="light" onChange={toggleAgreement} />
                <Label data-theme="light">Parent&rsquo;s agreement</Label>
                <Description data-theme="light">By signing up, you agree to our <DialogButton dialog={{
                    title: 'Progress Footy Football Academy Inc. Waiver and Parent\'s Agreement',
                    action: 'Yes, I agree',
                    body: <WaiverAgreementForm />,
                }}><span className="underline font-semibold text-red-700 cursor-pointer">terms of services</span></DialogButton>.</Description>
            </CheckboxField>
        </div>
    </section>
    <div className="mt-8 flex items-center">
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
                const response = await xhr.json()
                toggleSuccessDialog(true)
            }
        }}>
            {loading ? 'Loading...' : 'Sign up'}
        </Button>
        <p className="text-slate-500 sm:ml-8 text-xs">Payment instructions will be sent to your phone.</p>
    </div>

    <Dialog open={success} onClose={() => {}}>
        <DialogTitle>Beauty!</DialogTitle>
        <DialogBody className="flex flex-col gap-y-4">
            <p>Hey {(formData.fname as string).split(' ').reverse().pop()}! Thanks for signing {(formData.cfname as string).split(' ').reverse().pop()} up.</p>
            <p>We&rsquo;re so thrilled to have you and {(formData.cfname as string).split(' ').reverse().pop()} join the PF Academy family!<br />We can&rsquo;t wait to help {(formData.cfname as string).split(' ').reverse().pop()} grow into a better player and individual both on and off the field.
            </p>
            <p>You should be getting a WhatsApp message shortly.</p></DialogBody>
        <DialogActions>
            <Button type="button" onClick={() => {
                toggleSuccessDialog(false)
            }}>Close</Button>
        </DialogActions>
    </Dialog>
</div>
}
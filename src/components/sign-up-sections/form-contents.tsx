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
const stats = [
    { id: 1, name: 'Creators on the platform', value: '8,000+' },
    { id: 2, name: 'Flat platform fee', value: '3%' },
    { id: 3, name: 'Uptime guarantee', value: '99.9%' },
    { id: 4, name: 'Paid out to creators', value: '$70M' },
  ]
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
        city_town: 'White Rock',
        state_province: 'British Columbia',
        country: 'Canada',
        media_release: true,
        plan: 'training',
    })

    function isSummer() {
        const month = new Date().getMonth();

        if (month > 5 && month < 8) return true
    }
    function getRate() {
        let rate = formData.plan === 'training' || !isElite ? 24 : 27

        if (!isSummer()) {
            if (rate === 27) rate = 30
            rate = 25
        }

        let finalMonth = 5
        if (new Date().getMonth() >= finalMonth) finalMonth = 7

        let sessionsRemaining = (new Date(2025, 5, 27).getTime() - new Date().getTime()) / 7 / 24 / 60 / 60000
        sessionsRemaining = Math.floor(sessionsRemaining)
        return `${rate * sessionsRemaining} for ${sessionsRemaining} sessions`
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

    return <div className="mx-auto max-w-xl xl:mr-0 lg:max-w-sm">
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
                    defaultValue={`${formData?.date_of_birth || ''}`} onChange={e => {
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
            {isElite && <PlanSelect
                defaultValue={`${formData.plan || ''}`}
                onChange={p => {
                setFormData(prev => ({
                    ...prev,
                    plan: p
                }))
            }} />}

            {/* {formData.date_of_birth && <section className="text-slate">
                <dl className="mt-16 grid max-w-xl grid-cols-1 gap-8 sm:grid-cols-2 xl:mt-8 bg-slate-100 py-4 rounded-xl">

                    {isSummer() ? <div className="flex flex-col gap-y-3 border-l border-transparent pl-6">
                        <dt className="text-sm/6 text-gray-600">{Number(`${formData.date_of_birth || ''}`.split('-')?.[0]) < 2013 ? 'Weds & Fri' : 'Tues & Thurs'}</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">6-7PM</dd>
                    </div> : <div className="flex flex-col gap-y-3 border-l border-transparent pl-6">
                        <dt className="text-sm/6 text-gray-600">5:30-6:45PM</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">Fridays</dd>
                    </div>}

                    <div className="flex flex-col gap-y-3 border-l border-gray-900/10 pl-6">
                        <dt className="text-sm/6 text-gray-600">per session</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">${getRate()}</dd>
                    </div>

                    {formData.plan === 'training' || !isElite ? <div className="flex flex-col gap-y-3 border-l border-transparent pl-6">
                        <dt className="text-sm/6 text-gray-600">PF {isSummer() ? 'Summer' : 'Spring'} Cup</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{isSummer() ? 'August 31' : 'June 22'}</dd>
                    </div> : <div className="flex flex-col gap-y-3 border-l border-transparent pl-6">
                        <dt className="text-xs/6 text-gray-600">Matches + Summer Cup</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">4 + 1</dd>
                    </div>}

                    <div className="flex flex-col gap-y-3 border-l border-gray-900/10 pl-6">
                        <dt className="text-xs/6 text-gray-600">Total sessions</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">15</dd>
                    </div>
                </dl>
            </section>} */}
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
                <Checkbox color="rose" aria-required name="signed_agreement" value="yes" data-theme="light" onChange={toggleAgreement} />
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
        <p className="text-slate-500 sm:ml-8 mt-8 sm:mt-0 text-xs">Payment instructions will be sent to your phone.</p>
    </div>

    <Dialog open={success} onClose={() => {
        location.href = '/';
        setFormData({
            fname: '',
            lname: '',
            cfname: '',
            clname: '',
            street_1: '',
            postal_zip_code: '',
            city_town: 'White Rock',
            state_province: 'British Columbia',
            country: 'Canada',
            media_release: true,
            plan: 'training',
        })
    }}>
        <DialogTitle>Beauty!</DialogTitle>
        <DialogBody className="flex flex-col gap-y-4">
            <p>Hey {(formData.fname as string).split(' ').reverse().pop()}! Thanks for signing {(formData.cfname as string).split(' ').reverse().pop()} up.</p>
            <p className="text-sm">
                We&rsquo;re so thrilled to have you and {(formData.cfname as string).split(' ').reverse().pop()} join the PF Academy family!
                <br />
                We can&rsquo;t wait to help {(formData.cfname as string).split(' ').reverse().pop()} grow into a better player and person, both on and off the field.
            </p>

            <p><strong>Your total registration fee is ${getRate()}.</strong></p>

            <p style={{
                backgroundImage: 'url(/interac.png)'
            }} className="text-sm pr-18 bg-right bg-contain bg-no-repeat">Please e-transfer the amount to register@progressfooty.com to complete your registration.</p>
            
            <p className="text-sm">You&rsquo;ll receive a WhatsApp message with your payment confirmation from (236) 777-1283 shortly after payment is received.</p>
            <p className="text-sm">For any questions or inquiries, feel free to call or text us at the same number.</p>

            <p>⚽ We&rsquo;re excited to have you on board! ⚽</p>
        </DialogBody>
        <DialogActions>
            <Button type="button" onClick={() => {
                setFormData({
                    fname: '',
                    lname: '',
                    cfname: '',
                    clname: '',
                    street_1: '',
                    postal_zip_code: '',
                    city_town: 'White Rock',
                    state_province: 'British Columbia',
                    country: 'Canada',
                    media_release: true,
                    plan: 'training',
                })
                toggleSuccessDialog(false)
                
            }}>Close</Button>
        </DialogActions>
    </Dialog>
</div>
}
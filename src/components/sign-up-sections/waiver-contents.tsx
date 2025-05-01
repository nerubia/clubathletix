'use client'

import React, { useState } from 'react';
import { Heading, Subheading } from '../heading';
import { Button } from '../button';

type WaiverFormData = {
  participantName: string;
  dateOfBirth: string;
  parentName: string;
  date: string;
  medicalConditions: string;
  allergies: string;
  mediaConsent: boolean | null;
  participantSignature: string;
  parentSignature: string;
};

const WaiverAgreementForm: React.FC = () => {
  const [formData, setFormData] = useState<WaiverFormData>({
    participantName: '',
    dateOfBirth: '',
    parentName: '',
    date: '',
    medicalConditions: '',
    allergies: '',
    mediaConsent: null,
    participantSignature: '',
    parentSignature: '',
  });

  return (
    <div className='text-black'>
      <Heading force='text-slate-700'>1. Assumption of Risk and Waiver of Liability</Heading>
      <p className='text-sm text-slate-600 text-justify pl-5 mb-6'>
      I, the undersigned parent or legal guardian of the participant, understand that participation in football activities involves risk of injury, 
      including but not limited to sprains, fractures, concussions, or other serious harm. I assume full responsibility for any risks, injuries, 
      or damages known or unknown, which may be incurred as a result of participation in this program.
      
      I hereby for myself, my heirs, executors and administrators, waive and release any and all rights and claims that I may have or that may arise against Progress Footy Football Academy Inc. representatives 
      for any and all injuries or losses suffered by my child, named on this form, while competing in connection with the program(s).
      </p>

      <Heading force='text-slate-700'>2. Medical Authorization</Heading>
      <p className='text-sm text-slate-600 text-justify pl-5 mb-6'>
        In the event of an emergency and I cannot be reached, I authorize the staff of Progress Footy Football Academy Inc. to seek medical treatment for my child.
        This includes permission to call emergency services and have my child transported to a hospital or medical facility.

        I confirm that my child is physically fit to participate in the football program and I have disclosed any relevant medical conditions.
      </p>

      <Heading force='text-slate-700'>3. Code of Conduct Agreement</Heading>
      <p className='text-sm text-slate-600 text-justify pl-5 mb-6'>
        I agree to ensure my child will:<br />
        •	Show respect to coaches, teammates, referees, and opponents<br />
        •	Abide by the rules of the academy and sport<br />
        •	Demonstrate good sportsmanship and behavior at all times<br /><br />

        I understand that repeated misconduct or failure to follow rules may result in suspension or removal from the program without refund.
      </p>

      <Heading force='text-slate-700'>4. Refund and Cancellation Policy</Heading>
      <p className='text-sm text-slate-600 text-justify pl-5 mb-6'>
        I acknowledge that registration fees are non-refundable once the program begins, except under circumstances approved by the academy director.
      </p>

      <Heading force='text-slate-700'>5. Consent and Agreement</Heading>
      <p className='text-sm text-slate-600 text-justify pl-5 mb-6'>
      I have read, understood, and voluntarily agree to the terms and conditions of this Waiver and Parent’s Agreement. By signing up, I confirm the information provided is true and accurate.
      </p>
    </div>
  );
};

export default WaiverAgreementForm;
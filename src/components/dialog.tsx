'use client';
import * as Headless from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type React from 'react';
import { useState } from 'react';
import { Button } from './button';
import { Text } from './text';

const sizes = {
	xs: 'sm:max-w-xs',
	sm: 'sm:max-w-sm',
	md: 'sm:max-w-md',
	lg: 'sm:max-w-lg',
	xl: 'sm:max-w-xl',
	'2xl': 'sm:max-w-2xl',
	'3xl': 'sm:max-w-3xl',
	'4xl': 'sm:max-w-4xl',
	'5xl': 'sm:max-w-5xl',
	full: 'max-w-full sm:max-w-full max-h-full sm:max-h-full',
};

export function Dialog({
	size = 'lg',
	className,
	children,
	...props
}: { size?: keyof typeof sizes; className?: string; children: React.ReactNode } & Omit<
	Headless.DialogProps,
	'as' | 'className'
>) {
	return (
		<Headless.Dialog {...props}>
			<Headless.DialogBackdrop
				transition
				className="fixed inset-0 flex w-screen justify-center overflow-y-auto bg-zinc-950/25 px-2 py-2 transition duration-100 focus:outline-0 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in sm:px-6 sm:py-8 lg:px-8 lg:py-16 dark:bg-zinc-950/50"
			/>

			<div className="fixed inset-0 w-screen overflow-y-auto pt-6 sm:pt-0">
				<div className="grid min-h-full grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr] sm:p-4">
					<Headless.DialogPanel
						transition
						className={clsx(
							className,
							sizes[size],
							'row-start-2 w-full min-w-0 rounded-t-3xl bg-white p-(--gutter) shadow-lg ring-1 ring-zinc-950/10 [--gutter:--spacing(8)] sm:mb-auto sm:rounded-2xl dark:bg-zinc-900 dark:ring-white/10 forced-colors:outline',
							'transition duration-100 will-change-transform data-closed:translate-y-12 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in sm:data-closed:translate-y-0 sm:data-closed:data-enter:scale-95'
						)}
					>
						{children}
					</Headless.DialogPanel>
				</div>
			</div>
		</Headless.Dialog>
	);
}

export function DialogTitle({
	className,
	...props
}: { className?: string } & Omit<Headless.DialogTitleProps, 'as' | 'className'>) {
	return (
		<Headless.DialogTitle
			{...props}
			className={clsx(className, 'text-lg/6 font-semibold text-balance text-zinc-950 sm:text-base/6 dark:text-white')}
		/>
	);
}

export function DialogDescription({
	className,
	...props
}: { className?: string } & Omit<Headless.DescriptionProps<typeof Text>, 'as' | 'className'>) {
	return <Headless.Description as={Text} {...props} className={clsx(className, 'mt-2 text-pretty')} />;
}

export function DialogBody({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
	return <div {...props} className={clsx(className, 'mt-6')} />;
}

export function DialogActions({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
	return (
		<div
			{...props}
			className={clsx(
				className,
				'mt-8 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto'
			)}
		/>
	);
}

export function DialogTrigger(p: {
	title: string;
	'button-label': string;
	'button-icon'?: React.ReactNode;
	children: React.ReactNode;
	size?: keyof typeof sizes;
	onClick?(): Promise<void>;
}) {
	const [isOpen, toggleDialog] = useState(false);

	return (
		<>
			{p['button-icon'] ? (
				<div
					role="button"
					onClick={async () => {
						if (!isOpen && p.onClick) await p.onClick();
						toggleDialog((prev) => !prev);
					}}
				>
					{p['button-icon']}
				</div>
			) : (
				<Button
					type="button"
					onClick={async () => {
						if (!isOpen && p.onClick) await p.onClick();
						toggleDialog((prev) => !prev);
					}}
				>
					{p['button-label']}
				</Button>
			)}
			<Dialog
				open={isOpen}
				onClose={() => {
					toggleDialog(false);
				}}
				size={p.size || 'xl'}
				className="overflow-x-hidden"
			>
				<DialogActions className="absolute -top-2 right-4">
					<XMarkIcon
						className="h-6 w-6 cursor-pointer text-zinc-600"
						role="button"
						onClick={() => toggleDialog(false)}
					/>
				</DialogActions>
				<DialogTitle>{p.title}</DialogTitle>
				<DialogBody>{p.children}</DialogBody>
			</Dialog>
		</>
	);
}

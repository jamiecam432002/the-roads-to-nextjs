'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { useImperativeHandle, useState } from 'react';

export type ImperativeHandleFromDatePicker = {
	reset: () => void;
};

type DatePickerProps = {
	id: string;
	name: string;
	defaultValue?: string | undefined;
	imperativeHandleRef?: React.RefObject<ImperativeHandleFromDatePicker>;
};

export function DatePicker({
	id,
	name,
	defaultValue,
	imperativeHandleRef,
}: DatePickerProps) {
	const [date, setDate] = useState<Date | undefined>(
		defaultValue ? new Date(defaultValue) : new Date(),
	);

	useImperativeHandle(imperativeHandleRef, () => ({
		reset: () => setDate(new Date()),
	}));

	const [open, setOpen] = useState(false);
	const handleSelect = (selectedDate: Date | undefined) => {
		console.log('this is where we should do the close');
		setDate(selectedDate);
		setOpen(false);
	};

	const formattedStringDate = date ? format(date, 'yyyy-MM-dd') : '';

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger className='w-full' id={id} asChild>
				<Button
					variant='outline'
					data-empty={!date}
					className='justify-start text-left font-normal'>
					<CalendarIcon />
					{formattedStringDate}
					<input type='hidden' name={name} value={formattedStringDate} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='start'>
				<Calendar
					mode='single'
					selected={date}
					onSelect={handleSelect}
					defaultMonth={date}
				/>
			</PopoverContent>
		</Popover>
	);
}

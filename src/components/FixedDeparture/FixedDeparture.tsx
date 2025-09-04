'use client';

import { format, addDays, parseISO } from 'date-fns';
import React, { useState } from 'react';
import Link from 'next/link';

export interface Departure {
  id: number;
  package_id: number;
  departure_date: string;
  departure_cost: number;
  departure_note?: string | null;
  departure_status: string;
}

interface FixedDepartureProps {
  data: Departure[];
  duration?: number | string;
}

const FixedDeparture: React.FC<FixedDepartureProps> = ({ data, duration }) => {
  const monthYears = Array.from(
    new Set(
      data.map(d => {
        const date = parseISO(d.departure_date);
        return `${date.getFullYear()}-${date.getMonth()}`;
      })
    )
  ).sort((a, b) => {
    const [yearA, monthA] = a.split('-').map(Number);
    const [yearB, monthB] = b.split('-').map(Number);
    return yearA - yearB || monthA - monthB;
  });

  const currentDate = new Date();
  const currentKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
  const [selectedMonthYear, setSelectedMonthYear] = useState(
    monthYears.includes(currentKey) ? currentKey : monthYears[0]
  );

  const filteredDepartures = data
    .filter(d => {
      const date = parseISO(d.departure_date);
      return `${date.getFullYear()}-${date.getMonth()}` === selectedMonthYear;
    })
    .sort(
      (a, b) =>
        new Date(a.departure_date).getTime() -
        new Date(b.departure_date).getTime()
    );

  return (
    <div className="w-full">
      <ul className="flex flex-wrap gap-2 mb-4">
        {monthYears.map(key => {
          const [year, month] = key.split('-').map(Number);
          return (
            <li
              key={key}
              className={`cursor-pointer px-3 py-1 rounded text-sm ${
                selectedMonthYear === key
                  ? 'bg-primary text-white'
                  : 'bg-primary/10 text-gray-700'
              }`}
              onClick={() => setSelectedMonthYear(key)}>
              {format(new Date(year, month, 1), 'MMM yyyy')}
            </li>
          );
        })}
      </ul>

      <ul className="[&>li]:px-6 [&>li]:py-3 [&>li]:rounded-lg [&>li]:bg-primary/5 [&>li]:flex [&>li]:flex-col [&>li]:sm:flex-row [&>li]:sm:justify-between [&>li]:sm:items-center [&>li]:gap-2 [&>li>div>p]:text-sm [&>li>div>p]:text-gray-600 [&>li>div>p]:font-bold [&>li>div>span]:font-medium [&>li>div>span]:text-headings space-y-2">
        {filteredDepartures.map(departure => {
          const startDate = parseISO(departure.departure_date);
          const finalDate = duration
            ? addDays(startDate, Number(duration) - 1)
            : startDate;

          return (
            <li key={departure.id}>
              <div>
                <p>Starting From:</p>
                <span>{format(startDate, 'do MMM yyyy')}</span>
              </div>

              <div>
                <p>End At:</p>
                <span>{format(finalDate, 'do MMM yyyy')}</span>
              </div>

              <div className="capitalize">
                <p>Status</p>
                <span>{departure.departure_status}</span>
              </div>

              <div>
                <Link
                  href="#"
                  className="inline-block px-4 py-[6px] border border-primary/50 bg-primary/10 text-primary rounded-md hover:bg-primary hover:text-white text-center">
                  Book Now
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FixedDeparture;

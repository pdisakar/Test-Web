import React from 'react';
import Link from 'next/link';

interface PrimaryButtonProps {
  href: string;
  label: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ href, label }) => {
  return (
    <div className="button group">
      <Link
        href={href}
        className="flex items-center justify-center gap-[6px] w-fit"
        aria-label={label}>
        <span className="py-[14px] px-[26px] bg-primary rounded-full text-white font-bold leading-[1] capitalize border-b-[3px] border-r-[3px] border-[#5C6554]">
          {label}
        </span>
      </Link>
    </div>
  );
};

export default PrimaryButton;

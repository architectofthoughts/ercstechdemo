
import React from 'react';

interface IconProps {
    className?: string;
}

export const SwordIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 17.5l-10-10 3-3 10 10-3 3z" />
        <path d="M5 14l-1 5 5-1" />
        <path d="M15 9l4-4" />
        <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v8" strokeWidth="1" strokeOpacity="0.5"/>
        <path d="M8 12h8" strokeWidth="1" strokeOpacity="0.5"/>
    </svg>
);

export const DebuffIcon: React.FC<IconProps> = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 13a3 3 0 100-6 3 3 0 000 6z" />
        <path d="M12 2v20" transform="rotate(45 12 12)"/>
        <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
);

export const ManaIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <circle cx="12" cy="12" r="8" opacity="0.8"/>
    <circle cx="12" cy="12" r="4" fill="white" />
  </svg>
);

export const SheikahEyeIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M50 20c-20 0-36 15-40 30 4 15 20 30 40 30s36-15 40-30c-4-15-20-30-40-30z" />
        <circle cx="50" cy="50" r="12" />
        <path d="M50 38v-18" />
        <path d="M50 80v-18" />
        <circle cx="50" cy="50" r="2" fill="currentColor" />
    </svg>
);

export const PlayArrowIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 5v14M5 12h14" />
    </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6v6l4 2" />
    </svg>
);

export const CampfireIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a9 9 0 0 0 9-9c0-4.97-9-13-9-13S3 8.03 3 13a9 9 0 0 0 9 9Z" />
        <path d="M12 13v.01" />
        <path d="M12 17v.01" />
        <path d="M15 15v.01" />
        <path d="M9 15v.01" />
    </svg>
);

export const QuestionIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
    </svg>
);

export const SkullIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7Z" />
        <path d="M9 9h6" />
        <path d="M9 12h6" />
    </svg>
);

export const CrownIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </svg>
);

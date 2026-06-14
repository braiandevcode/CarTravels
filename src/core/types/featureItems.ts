import type { JSXElementConstructor } from 'react';

export interface IFeatureItem {
    id:`${string}-${string}-${string}-${string}-${string}`,
    icon: JSXElementConstructor<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false'; }>;
    title: string;
    desc: string;
    iconColor: string;
}

export type TLandingList = IFeatureItem[];
export type TOnBoardingGuideList = IFeatureItem[]
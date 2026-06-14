import type { LucideIcon } from 'lucide-react'
import type { IconType } from 'react-icons'

type TFooterIcon = LucideIcon | IconType

export interface LegalLink{
    to: string;
    label: string;
    icon: TFooterIcon;
}

export interface SocialLink{
    href: string;
    label: string;
    icon: TFooterIcon;
}

import { LucideIcon } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  subtitle: string
  highlight?: string
  icon?: LucideIcon
}

export default function SectionHeader({ title, subtitle, highlight, icon: Icon }: SectionHeaderProps) {
  return (
    <header className="space-y-2">
      <h1 className="text-4xl font-black tracking-tighter uppercase italic">
        {title} {highlight && <span className="text-[#FF0000]">{highlight}</span>}
      </h1>
      <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-[#FF0000]/50" />}
        {subtitle}
      </p>
    </header>
  )
}

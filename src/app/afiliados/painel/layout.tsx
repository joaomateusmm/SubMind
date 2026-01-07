import {
  DollarSign,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

export default function AffiliateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      {/* --- SIDEBAR --- */}
      <aside className="hidden w-64 flex-col border-r border-white/10 bg-[#111] md:flex">
        <div className="border-b border-white/10 p-6">
          <h2 className="text-xl font-bold tracking-tight">
            Afiliados<span className="text-red-600">.</span>
          </h2>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          <SidebarLink
            href="/afiliados/painel"
            icon={<LayoutDashboard size={20} />}
            label="Visão Geral"
          />
          <SidebarLink
            href="/afiliados/painel/produtos"
            icon={<ShoppingBag size={20} />}
            label="Produtos & Links"
          />
          <SidebarLink
            href="/afiliados/painel/financeiro"
            icon={<DollarSign size={20} />}
            label="Financeiro"
          />
          <SidebarLink
            href="/afiliados/painel/configuracoes"
            icon={<Settings size={20} />}
            label="Configurações"
          />
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-neutral-400 transition-all hover:bg-white/5 hover:text-white"
          >
            <LogOut size={20} />
            Sair do Painel
          </Link>
        </div>
      </aside>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="flex-1 overflow-y-auto">
        {/* Header Mobile (opcional, simplificado aqui) */}
        <header className="flex items-center justify-between border-b border-white/10 bg-[#111] p-4 md:hidden">
          <span className="font-bold">Menu Afiliado</span>
          {/* Aqui você colocaria um Sheet/Drawer para mobile */}
        </header>

        <div className="mx-auto max-w-6xl p-8">{children}</div>
      </main>
    </div>
  );
}

// Componente auxiliar para os links
function SidebarLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-neutral-400 transition-all hover:bg-white/5 hover:text-white"
    >
      {icon}
      {label}
    </Link>
  );
}

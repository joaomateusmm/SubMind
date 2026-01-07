import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Link from "next/link"; // Importação do Link corrigida
import { redirect } from "next/navigation";

import { db } from "@/db";
import { affiliate } from "@/db/schema";
import { auth } from "@/lib/auth";

import { AffiliateRegisterButton } from "./components/affiliate-register-button"; // Vamos criar esse botão abaixo

export default async function AffiliatePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Se não estiver logado, manda pro login
  if (!session) {
    redirect("/login?callbackUrl=/afiliados");
  }

  // Verifica se já é afiliado
  const isAffiliate = await db.query.affiliate.findFirst({
    where: eq(affiliate.userId, session.user.id),
  });

  // Se já for afiliado, redireciona para o painel
  if (isAffiliate) {
    redirect("/afiliados/painel");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#111] p-4 text-white">
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tighter text-white">
          Torne-se um Parceiro
        </h1>
        <p className="text-neutral-400">
          Promova nossos produtos e ganhe comissões por cada venda realizada
          através do seu link exclusivo.
        </p>

        <div className="space-y-4 rounded-xl border border-white/5 bg-[#191919] p-6">
          <ul className="space-y-2 text-left text-sm text-neutral-300">
            <li className="flex items-center gap-2">
              ✅ <span className="text-white">Comissões atrativas</span> por
              venda
            </li>
            <li className="flex items-center gap-2">
              ✅ <span className="text-white">Painel exclusivo</span> de
              métricas
            </li>
            <li className="flex items-center gap-2">
              ✅ <span className="text-white">Pagamentos via Pix</span>
            </li>
          </ul>

          <AffiliateRegisterButton />
        </div>

        <Link
          href="/"
          className="block text-sm text-neutral-500 transition-colors hover:text-white"
        >
          Voltar para a loja
        </Link>
      </div>
    </div>
  );
}

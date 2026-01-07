import { desc, eq } from "drizzle-orm"; // Adicionado desc
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { affiliate, product } from "@/db/schema";
import { auth } from "@/lib/auth";

import { AffiliateProductsTable } from "./affiliate-products-table";

export default async function AffiliateProductsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  // 1. Busca o código do afiliado
  const currentAffiliate = await db.query.affiliate.findFirst({
    where: eq(affiliate.userId, session.user.id),
  });

  if (!currentAffiliate) redirect("/afiliados");

  // 2. Busca todos os produtos ATIVOS da loja
  // (Afiliados não devem ver rascunhos ou inativos)
  const activeProducts = await db.query.product.findMany({
    where: eq(product.status, "active"),
    orderBy: [desc(product.createdAt)], // Ordena pelos mais novos
  });

  // URL base do site (para montar o link)
  const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Produtos Disponíveis</h1>
        <p className="text-neutral-400">
          Escolha um produto, copie o link e comece a divulgar para ganhar
          comissões.
        </p>
      </div>

      <AffiliateProductsTable
        data={activeProducts}
        affiliateCode={currentAffiliate.code}
        domain={domain}
      />
    </div>
  );
}

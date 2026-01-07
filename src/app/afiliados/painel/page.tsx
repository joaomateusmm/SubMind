import { desc, eq } from "drizzle-orm"; // Adicionei 'desc' para ordenar
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { affiliate, commission } from "@/db/schema"; // Importar tabelas
import { auth } from "@/lib/auth";

// Interface para as propriedades do Card (Corrige o erro do ESLint)
interface CardProps {
  title: string;
  value: string | number;
  desc: string;
  highlight?: boolean;
  mono?: boolean;
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  // Busca dados atualizados do afiliado
  const affData = await db.query.affiliate.findFirst({
    where: eq(affiliate.userId, session.user.id),
    with: {
      // Graças ao 'affiliateRelations' no schema, isto agora funciona:
      commissions: {
        orderBy: [desc(commission.createdAt)], // Ordena as mais recentes primeiro
        limit: 5, // Traz apenas as 5 últimas
      },
    },
  });

  if (!affData) redirect("/afiliados");

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val / 100);

  // Garante que commissions seja um array (mesmo se vier undefined por algum motivo)
  const commissionsList = affData.commissions || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Olá, {session.user.name.split(" ")[0]} 👋
        </h1>
        <p className="text-neutral-400">Aqui está o resumo dos seus ganhos.</p>
      </div>

      {/* CARDS DE MÉTRICAS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card
          title="Saldo Disponível"
          value={formatCurrency(affData.balance)}
          desc="Pronto para saque"
          highlight
        />
        <Card
          title="Total Ganho"
          value={formatCurrency(affData.totalEarnings)}
          desc="Desde o início"
        />
        <Card
          title="Seu Código"
          value={affData.code}
          desc="Use ?ref=SEUCODIGO nos links"
          mono
        />
      </div>

      {/* LISTA DE VENDAS RECENTES */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#191919]">
        <div className="border-b border-white/10 p-6">
          <h3 className="font-semibold text-white">Vendas Recentes</h3>
        </div>
        <div className="p-6">
          {commissionsList.length === 0 ? (
            <p className="text-sm text-neutral-500">
              Nenhuma venda registrada ainda. Comece a divulgar!
            </p>
          ) : (
            <ul className="space-y-4">
              {commissionsList.map((comm) => (
                <li
                  key={comm.id}
                  className="flex items-center justify-between border-b border-white/5 pb-2 text-sm last:border-0"
                >
                  <span className="text-neutral-300">
                    {comm.description || "Comissão de Venda"}
                  </span>
                  <div className="text-right">
                    <span className="block font-medium text-green-400">
                      + {formatCurrency(comm.amount)}
                    </span>
                    <span className="text-xs text-neutral-600 capitalize">
                      {comm.status === "pending" ? "Pendente" : "Disponível"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente Card com tipagem correta
function Card({ title, value, desc, highlight, mono }: CardProps) {
  return (
    <div
      className={`rounded-xl border p-6 ${
        highlight
          ? "border-transparent bg-white text-black"
          : "border-white/10 bg-[#191919] text-white"
      }`}
    >
      <h3
        className={`text-sm font-medium ${
          highlight ? "text-neutral-600" : "text-neutral-400"
        }`}
      >
        {title}
      </h3>
      <p
        className={`mt-2 text-3xl font-bold ${
          mono ? "font-mono tracking-wider" : ""
        }`}
      >
        {value}
      </p>
      <p
        className={`mt-1 text-xs ${
          highlight ? "text-neutral-500" : "text-neutral-500"
        }`}
      >
        {desc}
      </p>
    </div>
  );
}

import { NextResponse } from "next/server";

import { db } from "@/db";
import { product } from "@/db/schema";

export async function GET() {
  try {
    // Este comando ATUALIZA todos os produtos da loja para ter 20% de comissão
    // Não importa se era 10, null ou 0. Tudo vira 20.
    await db.update(product).set({
      affiliateRate: 20,
    });

    return NextResponse.json({
      message:
        "SUCESSO! Todos os produtos foram atualizados para 20% no banco de dados.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar banco" },
      { status: 500 },
    );
  }
}

"use client";

import { ArrowLeft, CheckCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store"; // Importe sua store do carrinho

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  // Limpa o carrinho assim que a página carrega
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex min-h-screen flex-col bg-[#010000]">
      <Header />

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        {/* Ícone Animado */}
        <div className="animate-in zoom-in mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10 duration-500">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>

        <h1 className="font-clash-display mb-2 text-3xl font-bold text-white md:text-4xl">
          Pagamento Confirmado!
        </h1>

        <p className="mb-8 max-w-md text-neutral-400">
          Obrigado por comprar conosco. Seu pedido foi processado e você
          receberá os detalhes por email em breve.
        </p>

        {/* Card de Ações */}
        <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl border border-white/10 bg-[#0A0A0A] p-6">
          {/* Botão 1: Histórico de Compras */}
          <Link href="/minha-conta/compras" className="w-full">
            <Button className="h-12 w-full gap-2 bg-[#D00000] text-base font-medium text-white hover:bg-[#a00000]">
              <ShoppingBag className="h-4 w-4" />
              Ver Meus Pedidos
            </Button>
          </Link>

          {/* Botão 2: Voltar ao Catálogo */}
          <Link href="/" className="w-full">
            <Button
              variant="outline"
              className="h-12 w-full gap-2 border-white/10 bg-transparent text-white hover:bg-white/5"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para o Catálogo
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

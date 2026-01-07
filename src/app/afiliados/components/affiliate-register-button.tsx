"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { registerAffiliate } from "@/actions/affiliate";

export function AffiliateRegisterButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await registerAffiliate();
      if (res.success && res.redirectUrl) {
        router.push(res.redirectUrl);
      }
    } catch (error) {
      alert("Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRegister}
      disabled={loading}
      className="w-full rounded-lg bg-white py-3 font-bold text-black transition-colors hover:bg-neutral-200 disabled:opacity-50"
    >
      {loading ? "Criando painel..." : "Ativar Minha Conta de Afiliado"}
    </button>
  );
}

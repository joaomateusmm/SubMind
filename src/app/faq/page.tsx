"use client";

import { motion } from "motion/react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Dados EXATOS que me passaste
const faqData = [
  {
    value: "item-1",
    question: "Quem nós somos?",
    answer:
      "Somos um serviço online de revenda de citizens, mods de som, configs e etc para Fivem, com a disponibilidade de vendas de contas Rockstar para os que não tem e para os 'banidinhos', oferecendo o melhor preço e melhor serviço desde 2020.",
  },
  {
    value: "item-2",
    question: "Corre risco de banimentos?",
    answer:
      "Como todos os mods e citizens o usuario dos mesmos se torna sujeito a algum tipo de punição dependendo da cidade, porém nós sempre mantemos nossas citizens, mods e etc o mais atualizados possivel para evitar banimentos ou punições vindas das próprias cidades.",
  },
  {
    value: "item-3",
    question: "Como recebo meu produto?",
    answer:
      "O seu produto é enviado automaticamente pro seu email após a confirmação do pagamento. (Coloque um email valido para recebimento.)",
  },
  {
    value: "item-4",
    question: "E se eu tiver algum problema com a compra ou produto?",
    answer:
      "Você deverá abrir ticket no Discord e informar seu problema para podermos lhe ajudar da melhor forma.",
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#010000] text-white">
      <Header />

      {/* Container Principal com espaçamento para o Header (pt-32) */}
      <div className="container mx-auto px-4 pt-42 pb-20">
        {/* Cabeçalho da Secção (Título e Subtítulo) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 flex max-w-[600px] flex-col items-center text-center"
        >
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Perguntas Frequentes
          </h1>
          <p className="mt-6 text-lg text-neutral-400">
            Algumas perguntas básicas sobre a loja e sobre nós.
          </p>
        </motion.div>

        {/* O Accordion (As perguntas) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((item, i) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="border-white/10 px-2" // Ajuste sutil nas bordas
              >
                <AccordionTrigger className="py-6 text-left text-lg font-medium hover:text-white/90 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-neutral-400">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}

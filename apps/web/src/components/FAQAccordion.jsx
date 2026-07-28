import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "As lingeries marcam sob roupas justas?",
    answer: "Não. Nossa linha Invisível e as peças seamless contam com tecnologia de corte a laser ultra-preciso nas bordas e tramas invisíveis. Elas desaparecem completamente sob tecidos finos e vestidos justos, garantindo segurança e caimento escultural.",
    link: "/categoria/conjuntos",
    linkLabel: "Ver mais vendidos"
  },
  {
    question: "Como escolher o tamanho ideal para meu biotipo?",
    answer: "Desenvolvemos lingeries desenhadas sob medida para a mulher brasileira. Siga nosso Guia de Medidas oficial comparando suas dimensões. Caso sua medida fique exatamente entre dois tamanhos, recomendamos selecionar o tamanho maior para o máximo conforto de sustentação.",
    link: "/guia-de-tamanhos",
    linkLabel: "Acessar guia de tamanhos"
  },
  {
    question: "E se a peça não vestir bem? Como funciona a troca?",
    answer: "Sua satisfação e conforto são nossa prioridade máxima. Oferecemos troca simplificada! Você tem até 7 dias corridos após o recebimento para trocas por arrependimento, e 30 dias para trocas por defeito de fábrica comprovado.",
    link: "/trocas-e-devolucoes",
    linkLabel: "Política de trocas"
  },
  {
    question: "Vocês realizam entregas para todo o território nacional?",
    answer: "Sim. Realizamos envios para todos os estados do Brasil via Sedex e transportadoras premium parceiras. Todos os pedidos são enviados em caixas discretas, lacradas, perfumadas com nossa fragrância exclusiva e com rastreamento em tempo real.",
    link: "/carrinho",
    linkLabel: "Ir para o carrinho"
  },
  {
    question: "Como funciona o plano de lucro para revendedoras?",
    answer: "Nosso sistema foi feito para impulsionar sua independência financeira. Oferecemos descontos progressivos incríveis: pedidos acima de R$500 garantem ativação automática do desconto de atacado (B2B) direto no carrinho. Margens excelentes de revenda de até 100% de lucro.",
    link: "/revendedora",
    linkLabel: "Seja uma revendedora"
  },
  {
    question: "Preciso investir muito para começar a revender?",
    answer: "Não. A Avante incentiva o crescimento gradual. Você pode iniciar com um pedido inicial acessível e expandir conforme suas vendas aumentam, sem a necessidade de manter grandes estoques parados.",
    link: "/area-revendedora",
    linkLabel: "Acessar área da revendedora"
  },
  {
    question: "Quais as formas de pagamento aceitas?",
    answer: "Aceitamos PIX com 5% de desconto de processamento imediato, e cartões de crédito Visa, MasterCard, Elo e Amex em até 6x sem juros em um checkout com ambiente 100% criptografado e seguro.",
    link: "/checkout",
    linkLabel: "Finalizar pedido"
  }
];

export default function FAQAccordion() {
  const faqsToRender = faqData;

  return (
    <Accordion 
      type="single" 
      collapsible 
      className="w-full max-w-5xl mx-auto bg-white rounded-[2rem] border border-[#c59b5f]/25 p-4 md:p-8 shadow-sm"
    >
      {faqsToRender.map((item, index) => (
        <AccordionItem 
          key={index} 
          value={`item-${index}`} 
          className="border-b border-[#c59b5f]/15 last:border-0 px-2 md:px-6"
        >
          <AccordionTrigger 
            className="text-left text-gray-900 hover:text-[#c59b5f] transition-colors duration-300 text-base md:text-lg font-serif font-bold py-6 group"
          >
            <span className="group-data-[state=open]:text-[#c59b5f] transition-colors leading-snug">
              {item.question}
            </span>
          </AccordionTrigger>
          <AccordionContent 
            className="text-gray-500 font-light leading-relaxed text-sm md:text-base pb-6 flex flex-col gap-3.5"
          >
            <p>{item.answer}</p>
            {item.link && (
              <Link 
                to={item.link} 
                className="inline-flex items-center gap-1.5 text-[#c59b5f] hover:text-black font-bold text-xs uppercase tracking-wider mt-2 transition-colors w-fit group/link"
              >
                {item.linkLabel || 'Saiba mais'} 
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1 shrink-0" />
              </Link>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
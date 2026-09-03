import React from 'react';
import { MapPin, Clock, Phone, Mail, Star } from 'lucide-react';

export default function StoreSection() {
  const reviews = [
    {
      name: 'Maria Silva',
      text: 'Produtos de excelente qualidade! Entrega rápida, atendimento impecável e lingeries extremamente confortáveis. Recomendo de olhos fechados!'
    },
    {
      name: 'Ana Costa',
      text: 'Adorei a compra! Peças com caimento perfeito, costuras muito bem acabadas e tecidos nobres. Voltarei a comprar com certeza!'
    },
    {
      name: 'Juliana Oliveira',
      text: 'Ótima experiência de compra no ateliê da Avante. Produtos premium de alto padrão, entrega pontual e suporte VIP. Perfeito!'
    }
  ];

  return (
    <section className="bg-[#FFFDFB] border-t border-[#c59b5f]/15 py-24 px-4 sm:px-6 w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(197,155,95,0.02)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        
        {/* LEFT COLUMN: MAP & CONTACT */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f]">
              Espaço Físico Avante
            </span>
            <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-gray-900">
              Nossa Loja, Seu Espaço
            </h2>
            <div className="w-16 h-0.5 bg-[#c59b5f] rounded-full"></div>
          </div>
          
          <div className="w-full rounded-2xl overflow-hidden border border-[#c59b5f]/20 shadow-md aspect-square md:aspect-video">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.1987251313058!2d-42.53743612470715!3d-22.308322879680734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x978a696111a4df%3A0x9c881f173c9a29cf!2sRua%20Odenir%20Pinheiro%2C%2020%20-%20Lot.%20Nosso%20Sonho%2C%20Nova%20Friburgo%20-%20RJ%2C%2028623-620!5e0!3m2!1spt-PT!2sbr!4v1785507054099!5m2!1spt-PT!2sbr" 
              width="100%" 
              height="100%" 
              className="border-0" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="strict-origin-when-cross-origin" 
              title="Mapa da Loja Avante Lingerie"
            ></iframe>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-gray-600 font-sans text-sm">
            <a 
              href="https://maps.google.com/?q=Rua+Odenir+Pinheiro,+20,+Loteamento+Nosso+Sonho,+Olaria,+Nova+Friburgo+-+RJ,+28623-620" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-start gap-3 hover:text-[#c59b5f] transition-all group p-3 bg-white border border-gray-100 rounded-xl shadow-sm"
            >
              <MapPin className="w-5 h-5 text-[#c59b5f] shrink-0 mt-0.5 group-hover:scale-105 transition-transform" />
              <div>
                <p className="font-bold text-gray-900 mb-0.5">Endereço Oficial</p>
                <p className="font-light text-xs">Rua Odenir Pinheiro, nº 20 - 3º Andar, Olaria, Nova Friburgo, RJ, 28623-620</p>
              </div>
            </a>
            
            <div className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
              <Clock className="w-5 h-5 text-[#c59b5f] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 mb-0.5">Horário de Funcionamento</p>
                <p className="font-light">Segunda a Quinta: 8h às 17h<br />Sexta: 8h às 13h</p>
              </div>
            </div>
            
            <a 
              href="https://wa.me/5522997618591" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-start gap-3 hover:text-[#c59b5f] transition-all group p-3 bg-white border border-gray-100 rounded-xl shadow-sm"
            >
              <Phone className="w-5 h-5 text-[#c59b5f] shrink-0 mt-0.5 group-hover:scale-105 transition-transform" />
              <div>
                <p className="font-bold text-gray-900 mb-0.5">WhatsApp Premium</p>
                <p className="font-light hover:underline">(22) 99761-8591</p>
              </div>
            </a>
            
            <a 
              href="mailto:contato@avantelingerie.com.br" 
              className="flex items-start gap-3 hover:text-[#c59b5f] transition-all group p-3 bg-white border border-gray-100 rounded-xl shadow-sm"
            >
              <Mail className="w-5 h-5 text-[#c59b5f] shrink-0 mt-0.5 group-hover:scale-105 transition-transform" />
              <div>
                <p className="font-bold text-gray-900 mb-0.5">E-mail Corporativo</p>
                <p className="font-light hover:underline">contato@avantelingerie.com.br</p>
              </div>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: GOOGLE REVIEWS */}
        <div className="lg:col-span-5 flex flex-col space-y-6 lg:pl-4">
          <div className="space-y-2">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f]">
              Feedback Google Business
            </span>
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              O Que Dizem Sobre Nós
            </h2>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#c59b5f] text-[#c59b5f]" />
                ))}
              </div>
              <span>4.9 / 5.0 — 380 avaliações oficiais</span>
            </div>
          </div>

          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-900 font-sans text-sm">{review.name}</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#c59b5f] text-[#c59b5f]" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-light italic">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <a 
              href="https://www.google.com/maps/place/Avante+Lingerie+%7C+Confec%C3%A7%C3%A3o+de+Moda+%C3%8Dntima/@-22.308239,-42.5385156,17z/data=!4m6!3m5!1s0x978bdb9789feb5:0x5d20d7898a7ded38!8m2!3d-22.308239!4d-42.5385156!16s%2Fg%2F11qzlqz5z5" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center gap-2 bg-[#c59b5f] hover:bg-black text-black hover:text-[#c59b5f] border border-transparent hover:border-[#c59b5f] font-bold font-sans py-3.5 px-8 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto uppercase text-xs tracking-wider"
            >
              <Star className="w-4 h-4 fill-current shrink-0" />
              Deixar Minha Avaliação no Google
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
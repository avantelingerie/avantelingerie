import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, ArrowRight, CheckCircle2, ChevronLeft, Shirt, Activity } from 'lucide-react';

export default function ProvadorVirtual({ isOpen, onClose, productName, category }) {
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Form Data
  const [formData, setFormData] = useState({
    sutia: '',
    jeans: '',
    altura: '',
    peso: '',
    formatoCorpo: '',
    caimento: 'normal'
  });

  const [resultado, setResultado] = useState(null);

  // Reseta ao abrir/fechar
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setResultado(null);
      setIsCalculating(false);
      setFormData({
        sutia: '', jeans: '', altura: '', peso: '', formatoCorpo: '', caimento: 'normal'
      });
    }
  }, [isOpen]);

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  // Lógica de Cálculo Híbrida (Tamanhos de marca + IMC simplificado)
  const calculateSize = () => {
    setIsCalculating(true);
    setStep(4); // Tela de loading

    setTimeout(() => {
      let score = 0; // P=1, M=2, G=3, GG=4
      
      // Peso do Sutiã (Top)
      const s = parseInt(formData.sutia);
      if (s <= 40) score += 1;
      else if (s <= 42) score += 2;
      else if (s <= 44) score += 2.5;
      else if (s <= 46) score += 3;
      else if (s <= 48) score += 3.5;
      else score += 4;

      // Peso do Jeans (Bottom)
      const j = parseInt(formData.jeans);
      if (j <= 36) score += 1;
      else if (j <= 40) score += 2;
      else if (j <= 44) score += 3;
      else score += 4;

      // Média base
      let finalScore = score / 2;

      // Ajuste por IMC (se preenchido)
      if (formData.peso && formData.altura) {
        const peso = parseFloat(formData.peso);
        const altura = parseFloat(formData.altura) / 100; // cm para m
        const imc = peso / (altura * altura);
        
        if (imc < 18.5) finalScore -= 0.5;
        else if (imc > 25 && imc < 30) finalScore += 0.5;
        else if (imc >= 30) finalScore += 1;
      }

      // Ajuste por formato de corpo (Heurística focada em Lingerie)
      if (formData.formatoCorpo === 'pera') finalScore += 0.2; // Geralmente quadril maior exige tamanho ligeiramente maior
      if (formData.formatoCorpo === 'triangulo_invertido') finalScore -= 0.1; 

      // Ajuste de caimento
      if (formData.caimento === 'solto') finalScore += 0.4;
      if (formData.caimento === 'justo') finalScore -= 0.3;

      // Arredondamento e mapeamento
      let sizeStr = 'M';
      let descricao = 'Este tamanho vai vestir perfeitamente, proporcionando sustentação e conforto sem apertar.';
      
      if (finalScore <= 1.5) {
        sizeStr = 'P';
        descricao = 'Com base nas suas medidas, o P terá um encaixe perfeito no seu corpo, valorizando suas curvas de forma natural.';
      } else if (finalScore > 1.5 && finalScore <= 2.5) {
        sizeStr = 'M';
        descricao = 'O tamanho M é o ideal. Ele acompanhará o formato do seu corpo mantendo a elegância e o conforto absoluto.';
      } else if (finalScore > 2.5 && finalScore <= 3.5) {
        sizeStr = 'G';
        descricao = 'Sugerimos o tamanho G para garantir que a modelagem não marque a pele e ofereça a melhor sustentação.';
      } else {
        sizeStr = 'GG';
        descricao = 'O tamanho GG será sua melhor escolha, entregando máximo conforto e um caimento luxuoso sem restrições.';
      }

      setResultado({ tamanho: sizeStr, descricao });
      setIsCalculating(false);
      setStep(5); // Tela de resultado
    }, 2000); // 2 segundos de loading para sensação de processamento
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 text-[#c59b5f]">
            <Ruler className="w-5 h-5" />
            <h2 className="text-xl font-serif font-bold text-gray-900">Provador Virtual</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 min-h-[360px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Medidas Conhecidas (Sutiã e Jeans) */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">O que você já usa?</h3>
                  <p className="text-gray-500 text-sm">Essa é a forma mais precisa de encontrarmos o seu caimento perfeito na Avante.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Tamanho de Sutiã (Numeração)</label>
                    <select
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-xl focus:ring-[#c59b5f] focus:border-[#c59b5f] block p-3.5 transition-colors"
                      value={formData.sutia}
                      onChange={(e) => setFormData({ ...formData, sutia: e.target.value })}
                    >
                      <option value="">Selecione...</option>
                      <option value="38">38 (PP)</option>
                      <option value="40">40 (P)</option>
                      <option value="42">42 (M)</option>
                      <option value="44">44 (G)</option>
                      <option value="46">46 (GG)</option>
                      <option value="48">48 (XG)</option>
                      <option value="50">50+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Tamanho de Calça Jeans</label>
                    <select
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-xl focus:ring-[#c59b5f] focus:border-[#c59b5f] block p-3.5 transition-colors"
                      value={formData.jeans}
                      onChange={(e) => setFormData({ ...formData, jeans: e.target.value })}
                    >
                      <option value="">Selecione...</option>
                      <option value="34">34/36</option>
                      <option value="38">38</option>
                      <option value="40">40</option>
                      <option value="42">42</option>
                      <option value="44">44</option>
                      <option value="46">46</option>
                      <option value="48">48+</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  disabled={!formData.sutia || !formData.jeans}
                  className="w-full bg-[#111] hover:bg-[#c59b5f] text-white font-bold py-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próximo <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* STEP 2: Biotipo (Peso/Altura e Formato) */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Ajuste de Biotipo</h3>
                  <p className="text-gray-500 text-sm">Para refinar ainda mais a recomendação (Opcional).</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Peso (kg)</label>
                    <input
                      type="number"
                      placeholder="Ex: 65"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-xl focus:ring-[#c59b5f] focus:border-[#c59b5f] block p-3.5 transition-colors"
                      value={formData.peso}
                      onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Altura (cm)</label>
                    <input
                      type="number"
                      placeholder="Ex: 165"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-xl focus:ring-[#c59b5f] focus:border-[#c59b5f] block p-3.5 transition-colors"
                      value={formData.altura}
                      onChange={(e) => setFormData({ ...formData, altura: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Como seu peso se distribui?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Proporcional', 'Mais no Quadril (Pêra)', 'Mais no Busto', 'Corpo Reto'].map((tipo) => (
                      <button
                        key={tipo}
                        onClick={() => setFormData({ ...formData, formatoCorpo: tipo })}
                        className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                          formData.formatoCorpo === tipo 
                          ? 'border-[#c59b5f] bg-[#c59b5f]/10 text-[#c59b5f]' 
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      >
                        {tipo}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={handlePrev} className="px-6 py-4 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 bg-[#111] hover:bg-[#c59b5f] text-white font-bold py-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    Próximo <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Preferência de Caimento */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Como você prefere?</h3>
                  <p className="text-gray-500 text-sm">O ajuste final para o caimento do seu gosto.</p>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'justo', label: 'Mais Justinho', desc: 'Firme no corpo, modelagem abraçada' },
                    { id: 'normal', label: 'Caimento Ideal', desc: 'Confortável, sem apertar e sem sobrar' },
                    { id: 'solto', label: 'Mais Soltinho', desc: 'Prioridade total para mobilidade e conforto' }
                  ].map((opcao) => (
                    <button
                      key={opcao.id}
                      onClick={() => setFormData({ ...formData, caimento: opcao.id })}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                        formData.caimento === opcao.id 
                        ? 'border-[#c59b5f] bg-[#c59b5f]/5' 
                        : 'border-transparent bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div>
                        <div className={`font-bold ${formData.caimento === opcao.id ? 'text-[#c59b5f]' : 'text-gray-900'}`}>{opcao.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{opcao.desc}</div>
                      </div>
                      {formData.caimento === opcao.id && <CheckCircle2 className="w-5 h-5 text-[#c59b5f]" />}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 pt-6">
                  <button onClick={handlePrev} className="px-6 py-4 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={calculateSize}
                    className="flex-1 bg-gradient-to-r from-[#c59b5f] to-[#e5c595] hover:opacity-90 text-black font-bold py-4 rounded-xl transition-opacity shadow-lg shadow-[#c59b5f]/20 flex items-center justify-center gap-2"
                  >
                    Descobrir Meu Tamanho
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Calculando (Loading Inteligente) */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 space-y-6"
              >
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-gray-100 rounded-full"></div>
                  <div className="w-20 h-20 border-4 border-[#c59b5f] rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Activity className="w-8 h-8 text-[#c59b5f] animate-pulse" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Processando medidas...</h3>
                  <p className="text-sm text-gray-500">Cruzando seus dados com a modelagem Avante</p>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Resultado */}
            {step === 5 && resultado && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center space-y-6 py-4"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-[#c59b5f] to-[#e5c595] rounded-full flex items-center justify-center shadow-xl shadow-[#c59b5f]/30 mb-2 relative">
                  <div className="absolute inset-2 border-2 border-white/30 rounded-full border-dashed animate-spin-slow"></div>
                  <span className="text-4xl font-black text-black tracking-tighter">{resultado.tamanho}</span>
                </div>
                
                <div>
                  <h3 className="text-3xl font-serif font-bold text-gray-900 mb-3">Tamanho Ideal: {resultado.tamanho}</h3>
                  <p className="text-base text-gray-600 leading-relaxed max-w-sm mx-auto">
                    {resultado.descricao}
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 w-full mt-4 flex items-start gap-3 text-left">
                  <Shirt className="w-5 h-5 text-[#c59b5f] shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500">
                    Nossa IA combinou o seu manequim de <strong>Sutiã ({formData.sutia})</strong> e <strong>Jeans ({formData.jeans})</strong> com as diretrizes exclusivas de alta costura desta peça.
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="w-full bg-[#111] hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-md mt-4"
                >
                  Continuar Comprando
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Indicador de Progresso (Somente nos passos 1-3) */}
        {step <= 3 && (
          <div className="bg-gray-50 p-4 flex justify-center gap-2">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${step === i ? 'w-8 bg-[#c59b5f]' : 'w-2 bg-gray-200'}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, ArrowRight, CheckCircle2, ChevronLeft, Shirt, Activity } from 'lucide-react';

export default function ProvadorVirtual({ isOpen, onClose, productName, category }) {
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const [formData, setFormData] = useState({
    sutia: '',
    jeans: '',
    altura: '',
    peso: '',
    formatoCorpo: 'proporcional',
    caimento: 'normal'
  });

  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setResultado(null);
      setIsCalculating(false);
      setFormData({
        sutia: '', jeans: '', altura: '', peso: '', formatoCorpo: 'proporcional', caimento: 'normal'
      });
    }
  }, [isOpen]);

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const calculateSize = () => {
    setIsCalculating(true);
    setStep(4);

    setTimeout(() => {
      let score = 0;
      const s = parseInt(formData.sutia);
      if (s <= 40) score += 1;
      else if (s <= 42) score += 2;
      else if (s <= 44) score += 2.5;
      else if (s <= 46) score += 3;
      else if (s <= 48) score += 3.5;
      else score += 4;

      const j = parseInt(formData.jeans);
      if (j <= 36) score += 1;
      else if (j <= 40) score += 2;
      else if (j <= 44) score += 3;
      else score += 4;

      let finalScore = score / 2;

      if (formData.peso && formData.altura) {
        const peso = parseFloat(formData.peso);
        const altura = parseFloat(formData.altura) / 100;
        const imc = peso / (altura * altura);
        if (imc < 18.5) finalScore -= 0.5;
        else if (imc > 25 && imc < 30) finalScore += 0.5;
        else if (imc >= 30) finalScore += 1;
      }

      if (formData.formatoCorpo === 'pera') finalScore += 0.2;
      if (formData.formatoCorpo === 'triangulo_invertido') finalScore -= 0.1; 
      if (formData.caimento === 'solto') finalScore += 0.4;
      if (formData.caimento === 'justo') finalScore -= 0.3;

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
      setStep(5);
    }, 2500);
  };

  // Cálculos dinâmicos para a largura das linhas guia da modelo
  const bustWidth = formData.sutia ? 30 + ((parseInt(formData.sutia) - 38) * 3) : 35; // base 35%, cresce com numeração
  const hipWidth = formData.jeans ? 35 + ((parseInt(formData.jeans) - 34) * 3.5) : 40; // base 40%, cresce com numeração

  // Cálculo de opacidade/destaque dependendo do passo atual
  const isBustActive = step === 1 && formData.sutia !== '';
  const isHipActive = step === 1 && formData.jeans !== '';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-900 bg-white/80 backdrop-blur-md hover:bg-white rounded-full transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lado Esquerdo: Modelo e Transformação Visual */}
        <div className="hidden md:block w-[45%] relative bg-[#f4ece1] overflow-hidden border-r border-[#c59b5f]/20">
          {/* Fundo dinâmico simulando a IA processando */}
          <motion.div 
            animate={{ opacity: step === 4 ? 0.8 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-[#c59b5f]/40 to-transparent z-10 mix-blend-multiply transition-opacity duration-1000"
          />

          {/* Imagem da Modelo (Lia) */}
          {/* Usaremos a imagem enviada por você. Nome sugerido: lia-provador.jpg na pasta public */}
          <div className="absolute inset-0 bg-[url('/lia-provador.jpg')] bg-cover bg-center transition-all duration-1000">
            {/* Fallback de cor caso a imagem não exista ainda */}
            <div className="absolute inset-0 bg-[#f4ece1]/30 mix-blend-overlay"></div>
          </div>

          {/* Elementos Interativos (Linhas de Medida) */}
          {/* Apenas renderiza a linha dinâmica (sem números ou fundos) e com uma cor de contraste vibrante (Rubi/Rosa) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            
            {/* Linha Busto */}
            <div className="absolute top-[38%] left-1/2 -translate-x-1/2 flex items-center justify-center w-full transition-all duration-500">
              <motion.div 
                animate={{ width: `${bustWidth}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className={`relative border-t-2 border-dashed transition-opacity duration-300 ${isBustActive || step === 4 ? 'border-[#e11d48] shadow-[0_0_12px_rgba(225,29,72,0.6)] opacity-100' : 'border-transparent opacity-0'}`}
              >
                <div className={`absolute -right-2 -top-1 w-2 h-2 rounded-full ${isBustActive || step === 4 ? 'bg-[#e11d48] shadow-[0_0_8px_rgba(225,29,72,0.8)]' : 'bg-transparent'}`}></div>
                <div className={`absolute -left-2 -top-1 w-2 h-2 rounded-full ${isBustActive || step === 4 ? 'bg-[#e11d48] shadow-[0_0_8px_rgba(225,29,72,0.8)]' : 'bg-transparent'}`}></div>
              </motion.div>
            </div>

            {/* Linha Cintura */}
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 flex items-center justify-center w-full transition-all duration-500">
              <motion.div 
                animate={{ width: `${Math.max(25, hipWidth - 15)}%` }} // Cintura acompanha o quadril de forma menor
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className={`relative border-t-2 border-dashed transition-opacity duration-300 ${isHipActive || step === 4 ? 'border-[#e11d48] shadow-[0_0_12px_rgba(225,29,72,0.6)] opacity-100' : 'border-transparent opacity-0'}`}
              >
                <div className={`absolute -right-2 -top-1 w-2 h-2 rounded-full ${isHipActive || step === 4 ? 'bg-[#e11d48] shadow-[0_0_8px_rgba(225,29,72,0.8)]' : 'bg-transparent'}`}></div>
                <div className={`absolute -left-2 -top-1 w-2 h-2 rounded-full ${isHipActive || step === 4 ? 'bg-[#e11d48] shadow-[0_0_8px_rgba(225,29,72,0.8)]' : 'bg-transparent'}`}></div>
              </motion.div>
            </div>

            {/* Linha Quadril */}
            <div className="absolute top-[72%] left-1/2 -translate-x-1/2 flex items-center justify-center w-full transition-all duration-500">
              <motion.div 
                animate={{ width: `${hipWidth}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className={`relative border-t-2 border-dashed transition-opacity duration-300 ${isHipActive || step === 4 ? 'border-[#e11d48] shadow-[0_0_12px_rgba(225,29,72,0.6)] opacity-100' : 'border-transparent opacity-0'}`}
              >
                <div className={`absolute -right-2 -top-1 w-2 h-2 rounded-full ${isHipActive || step === 4 ? 'bg-[#e11d48] shadow-[0_0_8px_rgba(225,29,72,0.8)]' : 'bg-transparent'}`}></div>
                <div className={`absolute -left-2 -top-1 w-2 h-2 rounded-full ${isHipActive || step === 4 ? 'bg-[#e11d48] shadow-[0_0_8px_rgba(225,29,72,0.8)]' : 'bg-transparent'}`}></div>
              </motion.div>
            </div>

            {/* Scanning Laser (Aparece no processamento) */}
            <AnimatePresence>
              {step === 4 && (
                <motion.div
                  initial={{ top: '20%', opacity: 0 }}
                  animate={{ top: ['20%', '80%', '20%'], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2.5, ease: "linear" }}
                  className="absolute left-0 w-full h-[2px] bg-[#e11d48] shadow-[0_0_20px_#e11d48]"
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Lado Direito: Formulário */}
        <div className="w-full md:w-[55%] flex flex-col justify-between p-6 sm:p-10 md:p-12 overflow-y-auto relative bg-white">
          
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">Descubra seu tamanho</h2>
            <p className="text-gray-500 text-sm">Personalizado por Inteligência Artificial</p>
          </div>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Sutiã e Jeans */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Tamanho de Sutiã</label>
                      <select
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-xl focus:ring-[#c59b5f] focus:border-[#c59b5f] block p-4 transition-colors shadow-sm"
                        value={formData.sutia}
                        onChange={(e) => setFormData({ ...formData, sutia: e.target.value })}
                      >
                        <option value="">Selecione a numeração...</option>
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
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-xl focus:ring-[#c59b5f] focus:border-[#c59b5f] block p-4 transition-colors shadow-sm"
                        value={formData.jeans}
                        onChange={(e) => setFormData({ ...formData, jeans: e.target.value })}
                      >
                        <option value="">Selecione a numeração...</option>
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
                    className="w-full bg-[#111] hover:bg-[#c59b5f] text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Próximo Passo
                  </button>
                </motion.div>
              )}

              {/* STEP 2: Biotipo */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Peso (kg)</label>
                      <input type="number" placeholder="Ex: 65" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-[#c59b5f] focus:border-[#c59b5f] shadow-sm" value={formData.peso} onChange={(e) => setFormData({ ...formData, peso: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Altura (cm)</label>
                      <input type="number" placeholder="Ex: 165" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-[#c59b5f] focus:border-[#c59b5f] shadow-sm" value={formData.altura} onChange={(e) => setFormData({ ...formData, altura: e.target.value })} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Distribuição do Corpo (Opcional)</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'proporcional', label: 'Proporcional' }, 
                        { id: 'pera', label: 'Mais no Quadril' }, 
                        { id: 'triangulo_invertido', label: 'Mais no Busto' }, 
                        { id: 'reto', label: 'Corpo Reto' }
                      ].map((tipo) => (
                        <button
                          key={tipo.id}
                          onClick={() => setFormData({ ...formData, formatoCorpo: tipo.id })}
                          className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                            formData.formatoCorpo === tipo.id 
                            ? 'border-[#c59b5f] bg-[#c59b5f]/10 text-[#c59b5f] shadow-inner' 
                            : 'border-gray-200 hover:border-gray-300 text-gray-600 shadow-sm'
                          }`}
                        >
                          {tipo.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button onClick={handlePrev} className="px-6 py-4 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 shadow-sm"><ChevronLeft className="w-5 h-5" /></button>
                    <button onClick={handleNext} className="flex-1 bg-[#111] hover:bg-[#c59b5f] text-white font-bold py-4 rounded-xl transition-all shadow-md">Próximo Passo</button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Caimento */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Como você prefere o caimento?</label>
                  <div className="space-y-3">
                    {[
                      { id: 'justo', label: 'Mais Justinho', desc: 'Firme no corpo, modelagem abraçada' },
                      { id: 'normal', label: 'Caimento Ideal', desc: 'Confortável, sem apertar e sem sobrar' },
                      { id: 'solto', label: 'Mais Soltinho', desc: 'Prioridade para mobilidade e fluidez' }
                    ].map((opcao) => (
                      <button
                        key={opcao.id}
                        onClick={() => setFormData({ ...formData, caimento: opcao.id })}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between shadow-sm ${
                          formData.caimento === opcao.id ? 'border-[#c59b5f] bg-[#c59b5f]/5' : 'border-transparent bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div>
                          <div className={`font-bold ${formData.caimento === opcao.id ? 'text-[#c59b5f]' : 'text-gray-900'}`}>{opcao.label}</div>
                          <div className="text-xs text-gray-500 mt-1">{opcao.desc}</div>
                        </div>
                        {formData.caimento === opcao.id && <CheckCircle2 className="w-5 h-5 text-[#c59b5f]" />}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-6">
                    <button onClick={handlePrev} className="px-6 py-4 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 shadow-sm"><ChevronLeft className="w-5 h-5" /></button>
                    <button onClick={calculateSize} className="flex-1 bg-gradient-to-r from-[#c59b5f] to-[#e5c595] hover:opacity-90 text-black font-bold py-4 rounded-xl shadow-lg shadow-[#c59b5f]/20">
                      Descobrir Tamanho
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Calculando */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-12 space-y-6">
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-gray-100 rounded-full"></div>
                    <div className="w-24 h-24 border-4 border-[#c59b5f] rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Activity className="w-10 h-10 text-[#c59b5f] animate-pulse" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Mapeando biotipo...</h3>
                    <p className="text-sm text-gray-500">Cruzando suas medidas com a modelagem de alta costura da Avante.</p>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Resultado */}
              {step === 5 && resultado && (
                <motion.div key="step5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center space-y-6 py-4">
                  <div className="w-28 h-28 bg-gradient-to-br from-[#c59b5f] to-[#e5c595] rounded-full flex items-center justify-center shadow-xl shadow-[#c59b5f]/30 mb-2 relative">
                    <div className="absolute inset-2 border-2 border-white/30 rounded-full border-dashed animate-spin-slow"></div>
                    <span className="text-5xl font-black text-black tracking-tighter">{resultado.tamanho}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-gray-900 mb-3">Tamanho: {resultado.tamanho}</h3>
                    <p className="text-base text-gray-600 leading-relaxed max-w-sm mx-auto">
                      {resultado.descricao}
                    </p>
                  </div>

                  <button onClick={onClose} className="w-full bg-[#111] hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-md mt-4">
                    Continuar Comprando
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Indicador de Progresso */}
          {step <= 3 && (
            <div className="mt-8 flex justify-center gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${step === i ? 'w-8 bg-[#c59b5f]' : 'w-2 bg-gray-200'}`} />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

const fs = require('fs');
let code = fs.readFileSync('apps/web/src/pages/admin/ProdutoForm.jsx', 'utf8');

const target = `<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-gray-300">Categoria *</label>
                    <select required className="flex h-10 w-full rounded-md border border-[#c59b5f]/25 bg-[#121212] px-3 py-2 text-sm text-white focus:outline-none" value={formData.categoria_id} onChange={(e) => handleInputChange('categoria_id', e.target.value)}>
                      <option value="">Selecionar Categoria...</option>
                      {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                    </select>
                  </div>`;

const replacement = `<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-gray-300">Categoria *</label>
                    <select required className="flex h-10 w-full rounded-md border border-[#c59b5f]/25 bg-[#121212] px-3 py-2 text-sm text-white focus:outline-none" value={formData.categoria_id} onChange={(e) => handleInputChange('categoria_id', e.target.value)}>
                      <option value="">Selecionar Categoria...</option>
                      {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 flex items-center justify-between text-gray-300">
                      <span>NCM (Fiscal)</span>
                      <span className="text-[10px] text-[#c59b5f]" title="Suede/Renda = 6108.32.00 | Algodão = 6208.21.00">┧ Automático</span>
                    </label>
                    <input type="text" placeholder="Ex: 6208.21.00" className="flex h-10 w-full rounded-md border border-[#c59b5f]/25 bg-[#121212] px-3 py-2 text-sm text-white focus:outline-none" value={formData.ncm || ''} onChange={(e) => handleInputChange('ncm', e.target.value)} />
                  </div>`;

code = code.replace(target, replacement);
fs.writeFileSync('apps/web/src/pages/admin/ProdutoForm.jsx', code);
console.log('UI grid updated');

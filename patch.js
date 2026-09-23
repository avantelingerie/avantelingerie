const fs = require('fs');
let code = fs.readFileSync('apps/web/src/pages/admin/ProdutoForm.jsx', 'utf8');

code = code.replace(/categoria_id: '',/g, 'categoria_id: \'\',\n    ncm: \"\",');
code = code.replace(/categoria_id: record.categoria_id \|\| '',/g, 'categoria_id: record.categoria_id || \"\",\n          ncm: record.ncm || \"\",');
code = code.replace(/pbFormData.append(\'categoria_id\', formData.categoria_id);/g, 'pbFormData.append(\'categoria_id\', formData.categoria_id);\n        if (formData.ncm) pbFormData.append(\"ncm\", formData.ncm);');

const guessNcmCode = `
  const guessNcm = (nome) => {
    const text = nome.toLowerCase();
    if (text.includes('suede') || text.includes('renda') || text.includes('sintético')) {
      if (text.includes('pijama') || text.includes('baby') || text.includes('camisola') || text.includes('robe') || text.includes('short doll')) return '6108.32.00';
    }
    if (text.includes('pijama') || text.includes('baby') || text.includes('camisola') || text.includes('robe') || text.includes('short doll')) return '6208.21.00';
    if (text.includes('suti') || text.includes('conjunt') || text.includes('corpet')) return '6212.10.00';
    if (text.includes('calcinha') || text.includes('cinta') || text.includes('fio')) return '6212.20.00';
    if (text.includes('praia') || text.includes('biquini') || text.includes('mai')) return '6112.41.00';
    if (text.includes('body')) return '6114.30.00';
    return '6109.90.00';
  };`;

code = code.replace(/const handleInputChange = /g, guessNcmCode + '\n  const handleInputChange = ');

const onchangePatch = `
  const handleInputChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    if (field === 'name') {
      updated.ncm = guessNcm(value);
    }
    setFormData(updated);
  };
`;
code = code.replace(/const handleInputChange = \(field, value\) => \{[\s\S]*?setFormData\({ \.\.\.formData, \[field\]: value }\);\s*\};/m, onchangePatch);


const uiField = `
                  <div>
                    <label className="text-sm font-medium mb-1.5 flex items-center justify-between text-gray-300">
                      <span>NCM (Fiscal)</span>
                      <span className="text-xs text-muted-foreground" title="Calculado automaticamente pelo titulo. Suede/Renda = 6108.32.00 | Algodao = 6208.21.00">┧ Regras</span>
                    </label>
                    <input type="text" placeholder="Ex: 6208.21.00" className="flex h-10 w-full rounded-md border border-[#c59b5f]/25 bg-[#121212] px-3 py-2 text-sm text-white focus:outline-none" value={formData.ncm} onChange={(e) => handleInputChange('ncm', e.target.value)} />
                  </div>
`;
code = code.replace(/<select required[s\S]*?handleInputChange([\s-~]*)\'categoria_id\' [s\S]*><\/select>\s*<\/div>/, '$&\n' + uiField);

fs.writeFileSync('apps/web/src/pages/admin/ProdutoForm.jsx', code);
console.log('ProdutoForm updated - Success');

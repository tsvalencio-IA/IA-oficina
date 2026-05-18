/**
 * â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
 * JARVIS ERP â€” SCRIPT DE DIAGNÃ“STICO COMPLETO
 * Cole no console do DevTools com o jarvis.html aberto e logado
 * Powered by thIAguinho SoluÃ§Ãµes Digitais
 * â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
 */
(function() {
  const ok  = (msg) => console.log('%c âœ… ' + msg, 'color:#00ff88;font-weight:bold');
  const err = (msg) => console.log('%c âŒ ' + msg, 'color:#ff3b3b;font-weight:bold');
  const warn= (msg) => console.log('%c âš ï¸  ' + msg, 'color:#fbbf24;font-weight:bold');
  const inf = (msg) => console.log('%c â„¹ï¸  ' + msg, 'color:#00d4ff');
  const sep = ()    => console.log('%c' + 'â”€'.repeat(60), 'color:#444');

  console.clear();
  console.log('%c JARVIS ERP â€” DIAGNÃ“STICO COMPLETO', 'background:#0a0a1a;color:#00d4ff;font-size:1.2rem;font-weight:bold;padding:8px 20px;border-radius:4px;');
  sep();

  // â”€â”€â”€ 1. ESTADO GLOBAL J{} â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  console.log('%c 1. ESTADO GLOBAL window.J', 'color:#a78bfa;font-weight:bold;font-size:1rem;');
  if (!window.J) { err('window.J nÃ£o existe â€” jarvis.html nÃ£o carregou corretamente'); }
  else {
    ok('window.J existe');
    inf('tid (oficina): '     + (window.J.tid    || 'âŒ VAZIO'));
    inf('role (perfil): '     + (window.J.role   || 'âŒ VAZIO'));
    inf('IA Local key: '        + (window.J.IA Local ? 'âœ“ configurada (' + window.J.IA Local.slice(0,8)+'...)' : 'âŒ NÃƒO configurada'));
    inf('OS carregadas: '     + (window.J.os?.length      ?? 0));
    inf('Clientes: '          + (window.J.clientes?.length ?? 0));
    inf('VeÃ­culos: '          + (window.J.veiculos?.length ?? 0));
    inf('Estoque items: '     + (window.J.estoque?.length  ?? 0));
    inf('Financeiro: '        + (window.J.financeiro?.length ?? 0));
    inf('Equipe: '            + (window.J.equipe?.length    ?? 0));
    if (!window.J.tid)  err('J.tid vazio â€” verifique se estÃ¡ logado e se config.js estÃ¡ carregado');
    if (!window.J.role) err('J.role vazio â€” sessionStorage j_role nÃ£o foi setado no login');
  }
  sep();

  // â”€â”€â”€ 2. FIREBASE / FIRESTORE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  console.log('%c 2. FIREBASE / FIRESTORE', 'color:#a78bfa;font-weight:bold;font-size:1rem;');
  if (window.firebase?.apps?.length > 0) ok('Firebase inicializado (' + window.firebase.apps[0].name + ')');
  else err('Firebase NÃƒO inicializado');
  if (window.db) ok('window.db (Firestore) existe');
  else err('window.db nÃ£o existe â€” initFirebase() falhou ou config.js nÃ£o carregou');
  sep();

  // â”€â”€â”€ 3. MÃ“DULOS JS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  console.log('%c 3. MÃ“DULOS JS CARREGADOS', 'color:#a78bfa;font-weight:bold;font-size:1rem;');
  const fncs = {
    'os.js â†’ salvarOS':              window.salvarOS,
    'os.js â†’ calcOSTotal':           window.calcOSTotal,
    'os.js â†’ buscarHistoricoOS':     window.buscarHistoricoOS,
    'os.js â†’ importarCilia':         window.importarCilia,
    'os.js â†’ adicionarPecaReal':     window.adicionarPecaReal,
    'os.js â†’ adicionarPecaRealRow':  window.adicionarPecaRealRow,
    'os.js â†’ verificarStatusOS':     window.verificarStatusOS,
    'os.js â†’ escutarOS':             window.escutarOS,
    'ia.js â†’ iaPerguntar':           window.iaPerguntar,
    'financeiro.js â†’ renderFinanceiro': window.renderFinanceiro,
    'tabela-tempa.js â†’ initTempa':   window.initTempa,
    'exportar-pmsp.js â†’ exportarOrcamentoPMSP': window.exportarOrcamentoPMSP,
  };
  Object.entries(fncs).forEach(([nome, fn]) => {
    if (typeof fn === 'function') ok(nome);
    else err(nome + ' â€” FUNÃ‡ÃƒO NÃƒO EXISTE');
  });
  sep();

  // â”€â”€â”€ 4. ELEMENTOS HTML DO MODAL OS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  console.log('%c 4. ELEMENTOS HTML DO MODAL OS', 'color:#a78bfa;font-weight:bold;font-size:1rem;');
  const els = [
    'modalOS','osStatus','osCliente','osVeiculo','osPlaca',
    'containerServicosOS','containerPecasOS','containerPecasReais',
    'blocoReais','histBuscaPlaca','histBuscaTermo','histBuscaResultado',
    'ciliaFileInput','osTotalVal','areaPgtoOS','areaEntregaPara',
    'osProxRev','osProxKm','tabOS1','tabOS2','tabOS3'
  ];
  els.forEach(id => {
    const el = document.getElementById(id);
    if (el) ok('#' + id + ' existe');
    else err('#' + id + ' NÃƒO ENCONTRADO no DOM');
  });
  sep();

  // â”€â”€â”€ 5. TESTE: PARSER CÃLIA (simula o PDF real) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  console.log('%c 5. TESTE PARSER CÃLIA (formato real)', 'color:#a78bfa;font-weight:bold;font-size:1rem;');
  const linhasCiliaTest = [
    'T R&I 0,00 1.00 BOMBA DE COMBUSTÃVEL CÃ³d: 172029382R Oficina R$ 1.795,30 % 48,00 R$ 933,56',
    'T R&I 0,00 1.00 AMORTECEDOR DIANT CÃ³d: 543020714R Oficina R$ 549,90 % 48,00 R$ 285,95',
    'T R&I 0,00 1.00 BATENTE DO AMORTECEDOR DIANT CÃ³d: 540505149R Oficina R$ 72,10 % 48,00 R$ 37,49',
    'T R&I 0,00 1.00 COXIM DO AMORTECEDOR DIANT CÃ³d: 6001547499 Oficina R$ 84,20 % 48,00 R$ 43,78',
    'T R&I 0,00 1.00 BICO INJETOR DE COMBUSTÃVEL CÃ³d: 8200207049 Oficina R$ 169,30 % 48,00 R$ 88,04',
  ];
  const brl = s => parseFloat((s||'0').replace(/[^\d,]/g,'').replace(',','.')) || 0;
  const rgx = /(?:[TR](?:\s+R&I)?)\s+[\d,]+\s+([\d,]+)\s+(.+?)\s+C[oÃ³]d[:\.]?\s*([A-Z0-9\-\.\/]+)\s+\w+\s+R\$\s*([\d\.,]+)\s+%\s*[\d,]+\s+R\$\s*([\d\.,]+)/i;
  let ciliaOk = 0;
  linhasCiliaTest.forEach(linha => {
    const m = linha.match(rgx);
    if (m) {
      ciliaOk++;
      ok(`CÃ­lia OK â†’ [${m[3]}] ${m[2].trim()} Ã— ${m[1]} = R$ ${brl(m[5]).toFixed(2)}`);
    } else {
      err('CÃ­lia FALHOU â†’ ' + linha.slice(0,60));
    }
  });
  if (ciliaOk === linhasCiliaTest.length) ok('Parser CÃ­lia: TODOS os ' + ciliaOk + ' itens reconhecidos âœ“');
  else err('Parser CÃ­lia: apenas ' + ciliaOk + '/' + linhasCiliaTest.length + ' reconhecidos');
  sep();

  // â”€â”€â”€ 6. TESTE: BUSCA HISTÃ“RICA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  console.log('%c 6. TESTE BUSCA HISTÃ“RICA', 'color:#a78bfa;font-weight:bold;font-size:1rem;');
  if (!window.J?.os?.length) {
    warn('Nenhuma OS em J.os â€” nÃ£o Ã© possÃ­vel testar a busca. Verifique se Firestore carregou.');
  } else {
    const primeiraOS = window.J.os[0];
    const placa = (primeiraOS.placa||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
    if (!placa) { warn('Primeira OS nÃ£o tem placa registrada.'); }
    else {
      const hits = window.J.os.filter(o => (o.placa||'').toUpperCase().replace(/[^A-Z0-9]/g,'') === placa);
      ok('Busca por placa "' + placa + '" retorna ' + hits.length + ' OS(s)');
      inf('ServiÃ§os na primeira OS: ' + (primeiraOS.servicos?.length ?? 0));
      inf('PeÃ§as na primeira OS: '    + (primeiraOS.pecas?.length    ?? 0));
      inf('PeÃ§asReais na primeira OS: '+ (primeiraOS.pecasReais?.length ?? 0));
    }
  }
  sep();

  // â”€â”€â”€ 7. TESTE: IA IA Local â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  console.log('%c 7. IA IA Local', 'color:#a78bfa;font-weight:bold;font-size:1rem;');
  const gemKey = window.J?.IA Local || window.J?.oficina?.apiKeys?.IA Local;
  if (!gemKey) {
    err('Chave IA Local NÃƒO encontrada em J.IA Local');
    warn('SoluÃ§Ã£o: no Firestore, acesse oficinas/{id_oficina} e adicione o campo cerebro com sua chave do Google AI Studio');
  } else {
    ok('Chave IA Local encontrada: ' + gemKey.slice(0,8) + '...');
    inf('Para testar, tente enviar uma mensagem no chat da IA no jarvis.html');
  }
  sep();

  // â”€â”€â”€ 8. PERMISSÃ•ES (RBAC) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  console.log('%c 8. PERMISSÃ•ES (RBAC)', 'color:#a78bfa;font-weight:bold;font-size:1rem;');
  const role = (window.J?.role||'').toLowerCase();
  inf('Role atual: ' + (role || 'nÃ£o definida'));
  const isDono = ['admin','superadmin'].includes(role);
  if (isDono) ok('Ã‰ admin/superadmin â†’ blocoReais DEVE estar visÃ­vel ao abrir uma OS');
  else        warn('Role nÃ£o Ã© admin â†’ blocoReais ficarÃ¡ oculto (correto para mecÃ¢nico/atendente)');
  sep();

  // â”€â”€â”€ 9. SESSIONSSTORAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  console.log('%c 9. SESSIONSTORAGE', 'color:#a78bfa;font-weight:bold;font-size:1rem;');
  ['j_tid','j_role','j_nome','j_IA Local'].forEach(k => {
    const v = sessionStorage.getItem(k);
    if (v) ok(k + ' = ' + (k==='j_IA Local'?v.slice(0,8)+'...':v));
    else   err(k + ' = VAZIO');
  });
  sep();

  // â”€â”€â”€ RESUMO FINAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  console.log('%c DIAGNÃ“STICO CONCLUÃDO â€” verifique os itens âŒ acima', 'background:#0a0a1a;color:#fbbf24;font-size:1rem;font-weight:bold;padding:6px 16px;border-radius:4px;');
})();


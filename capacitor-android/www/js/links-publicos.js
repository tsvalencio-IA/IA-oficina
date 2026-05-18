/*
 * Configuracao central dos links publicos do SaaS.
 * Base publica oficial no GitHub Pages:
 * https://tsvalencio-ia.github.io/OFICIN-IA/
 */
(function () {
  'use strict';

  const PUBLIC_BASE_URL = 'https://tsvalencio-ia.github.io/OFICIN-IA/';

  window.THIA_PUBLIC_LINKS = Object.assign({
    baseUrl: PUBLIC_BASE_URL,
    cliente: 'https://tsvalencio-ia.github.io/OFICIN-IA/cliente.html',
    clienteOficial: 'https://tsvalencio-ia.github.io/OFICIN-IA/clienteOficial.html',
    cotacaoFornecedor: 'https://tsvalencio-ia.github.io/OFICIN-IA/cotacao.html',
    cotacaoFornecedorCurta: 'https://tsvalencio-ia.github.io/OFICIN-IA/c.html',
    jarvis: 'https://tsvalencio-ia.github.io/OFICIN-IA/jarvis.html',
    equipe: 'https://tsvalencio-ia.github.io/OFICIN-IA/equipe.html',
    superadmin: 'https://tsvalencio-ia.github.io/OFICIN-IA/superadmin.html',
    login: 'https://tsvalencio-ia.github.io/OFICIN-IA/index.html',
    selecionarPerfil: 'https://tsvalencio-ia.github.io/OFICIN-IA/selecionar-perfil.html',
    usarLinkCurtoCotacao: true,
    incluirFirebaseConfigNoLink: false,
    qrCliente: 'https://tsvalencio-ia.github.io/OFICIN-IA/cliente.html',
    apkShareBase: 'https://tsvalencio-ia.github.io/OFICIN-IA/'
  }, window.THIA_PUBLIC_LINKS || {});

  function cleanBase(url) {
    return String(url || '').trim().replace(/\/+$/, '');
  }

  function runtimeBase() {
    try {
      const loc = window.location || {};
      if (!/^https?:$/i.test(loc.protocol || '')) return '';
      const path = String(loc.pathname || '/');
      const dir = path.endsWith('/') ? path : path.slice(0, path.lastIndexOf('/') + 1);
      return cleanBase(loc.origin + dir);
    } catch (_) {
      return '';
    }
  }

  function officeBase() {
    try {
      const ofi = (window.thiaGetOficinaAtual && window.thiaGetOficinaAtual()) || JSON.parse(sessionStorage.getItem('j_oficina') || 'null') || {};
      return cleanBase(ofi.publicBaseUrl || ofi.linksPublicos?.baseUrl || '');
    } catch (_) {
      return '';
    }
  }

  function joinUrl(base, path) {
    base = cleanBase(base);
    path = String(path || '').replace(/^\/+/, '');
    if (!base) return path || '';
    return path ? `${base}/${path}` : base;
  }

  function normalizarTelefoneBR(phone) {
    let n = String(phone || '').replace(/\D/g, '');
    if (!n) return '';
    if (!n.startsWith('55')) n = '55' + n;
    return n;
  }

  function isMobileRuntime() {
    return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
  }

  const PAGE_BY_KIND = {
    cliente: 'cliente.html',
    clienteOficial: 'clienteOficial.html',
    qrCliente: 'cliente.html',
    cotacaoFornecedor: 'c.html',
    jarvis: 'jarvis.html',
    equipe: 'equipe.html',
    superadmin: 'superadmin.html',
    login: 'index.html',
    selecionarPerfil: 'selecionar-perfil.html'
  };

  window.thiaGetPublicUrl = function (kind, params) {
    const cfg = window.THIA_PUBLIC_LINKS || {};
    const base = officeBase() || cleanBase(cfg.baseUrl) || runtimeBase();
    let url = '';

    if (kind === 'cotacaoFornecedor') {
      const page = cfg.usarLinkCurtoCotacao === false ? 'cotacao.html' : 'c.html';
      url = cfg.usarLinkCurtoCotacao === false
        ? (cfg.cotacaoFornecedor || joinUrl(base, page))
        : (cfg.cotacaoFornecedorCurta || cfg.cotacaoFornecedor || joinUrl(base, page));
    } else if (kind === 'qrCliente') {
      url = cfg.qrCliente || cfg.cliente || joinUrl(base, PAGE_BY_KIND.qrCliente);
    } else if (cfg[kind]) {
      url = cfg[kind];
    } else {
      url = joinUrl(base, PAGE_BY_KIND[kind] || PAGE_BY_KIND.cliente);
    }

    if (!url) {
      const page = kind === 'cotacaoFornecedor' ? 'cotacao.html' : (kind === 'clienteOficial' ? 'clienteOficial.html' : 'cliente.html');
      url = page;
    }

    const qp = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && String(value) !== '') qp.set(key, String(value));
    });
    const qs = qp.toString();
    return qs ? `${url}${url.includes('?') ? '&' : '?'}${qs}` : url;
  };

  window.thiaGetClientePortalUrl = function (ctx) {
    ctx = ctx || {};
    const cliente = ctx.cliente || {};
    const os = ctx.os || {};
    const veiculo = ctx.veiculo || {};
    const isGov = cliente.tipoCliente === 'governo' || ctx.tipoCliente === 'governo' || ctx.oficial === true;
    const login = cliente.login || ctx.login || os.loginCliente || os.placa || veiculo.placa || '';
    const placa = os.placa || veiculo.placa || ctx.placa || '';
    const ofi = (window.thiaGetOficinaAtual && window.thiaGetOficinaAtual()) || {};
    const tenantRef = ctx.tenant || ctx.tenantId || cliente.slug || cliente.publicSlug || os.tenantSlug || ofi.slug || ofi.publicSlug || ofi.oficinaSlug || '';
    const params = {
      tenant: tenantRef,
      os: os.id || ctx.osId || '',
      placa,
      login
    };
    return window.thiaGetPublicUrl(isGov ? 'clienteOficial' : 'cliente', params);
  };

  window.thiaBuildWhatsAppUrl = function (phone, message, opts) {
    opts = opts || {};
    const fone = normalizarTelefoneBR(phone);
    if (!fone) return '';
    const text = encodeURIComponent(message || '');
    if (opts.forceWaMe || isMobileRuntime()) {
      return `https://wa.me/${fone}?text=${text}`;
    }
    return `https://web.whatsapp.com/send?phone=${fone}&text=${text}`;
  };

  window.thiaOpenWhatsApp = function (phone, message, opts) {
    opts = Object.assign({ fallbackNavigate: true }, opts || {});
    const url = window.thiaBuildWhatsAppUrl(phone, message, opts);
    if (!url) return false;
    const opened = window.open(url, '_blank');
    if (opened) {
      try { opened.focus(); } catch (_) {}
      return true;
    }
    if (opts.fallbackNavigate) {
      try { window.location.href = url; } catch (_) {}
    }
    return false;
  };
})();

# JARVIS ERP V2 â€” Sistema de GestÃ£o Automotiva

**Sistema 100% funcional para GitHub Pages** â€” Vanilla JavaScript + Firestore + IA Local

---

## ðŸ“‹ Estrutura de Arquivos

```
JARVIS_V2_FINAL/
â”œâ”€â”€ index.html              # Login (Master + Equipe + PIN)
â”œâ”€â”€ jarvis.html             # Dashboard Admin
â”œâ”€â”€ equipe.html             # Painel Equipe
â”œâ”€â”€ css/
â”‚   â””â”€â”€ design.css          # Design System Dark Mode Premium
â”œâ”€â”€ js/
â”‚   â”œâ”€â”€ config.js           # Firebase + White-label
â”‚   â”œâ”€â”€ core.js             # Namespace J + Listeners Firestore
â”‚   â”œâ”€â”€ auth.js             # AutenticaÃ§Ã£o hÃ­brida
â”‚   â”œâ”€â”€ os.js               # Ordens de ServiÃ§o (Kanban)
â”‚   â”œâ”€â”€ financeiro.js       # DRE + Parcelamento + NF
â”‚   â””â”€â”€ ia.js               # IA local \+ cérebro JSON
â””â”€â”€ README.md               # Este arquivo
```

---

## ðŸš€ Deployment no GitHub Pages

### 1. Preparar RepositÃ³rio

```bash
# Clonar este projeto
git clone https://github.com/tsvalencio-ia/OFICIN-IA.git
cd OFICIN-IA

# Criar branch gh-pages (se nÃ£o existir)
git checkout --orphan gh-pages
git reset --hard
git commit --allow-empty -m "Initial commit"
git push -u origin gh-pages
```

### 2. Copiar Arquivos

Copie todos os arquivos de `JARVIS_V2_FINAL/` para a raiz do repositÃ³rio.

### 3. Configurar GitHub Pages

No repositÃ³rio:
- **Settings** â†’ **Pages**
- Source: `Deploy from a branch`
- Branch: `gh-pages` / `root`
- Salvar

### 4. Fazer Push

```bash
git add .
git commit -m "Deploy JARVIS ERP V2"
git push origin gh-pages
```

Seu site estarÃ¡ disponÃ­vel em: `https://tsvalencio-ia.github.io/OFICIN-IA/`

---

## ðŸ” ConfiguraÃ§Ã£o do Firebase

### 1. Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Crie um novo projeto
3. Ative **Firestore Database** (modo teste ou produÃ§Ã£o)
4. Copie as credenciais

### 2. Atualizar `js/config.js`

```javascript
window.JARVIS_FB_CONFIG = {
  apiKey:            "SUA_API_KEY",
  authDomain:        "seu-projeto.firebaseapp.com",
  projectId:         "seu-projeto",
  storageBucket:     "seu-projeto.firebasestorage.app",
  messagingSenderId: "SEU_MESSAGING_ID",
  appId:             "SEU_APP_ID"
};
```

### 3. Estrutura Firestore

Crie as coleÃ§Ãµes:

```
oficinas/
â”œâ”€â”€ {id_oficina}/
â”‚   â”œâ”€â”€ nomeFantasia: "Oficina XYZ"
â”‚   â”œâ”€â”€ usuario: "admin"
â”‚   â”œâ”€â”€ senha: "senha123"
â”‚   â”œâ”€â”€ status: "Ativo"
â”‚   â”œâ”€â”€ brandColor: "#3B82F6"
â”‚   â”œâ”€â”€ apiKeys: {
â”‚   â”‚   IA Local: "CEREBRO_JSON",
â”‚   â”‚   cloudName: "seu-cloudinary",
â”‚   â”‚   cloudPreset: "seu-preset"
â”‚   â”‚ }
â”‚   â””â”€â”€ subcoleÃ§Ãµes:
â”‚       â”œâ”€â”€ ordens_servico/
â”‚       â”œâ”€â”€ clientes/
â”‚       â”œâ”€â”€ veiculos/
â”‚       â”œâ”€â”€ funcionarios/
â”‚       â”œâ”€â”€ estoqueItems/
â”‚       â”œâ”€â”€ financeiro/
â”‚       â”œâ”€â”€ fornecedores/
â”‚       â”œâ”€â”€ mensagens/
â”‚       â”œâ”€â”€ chat_equipe/
â”‚       â”œâ”€â”€ agendamentos/
â”‚       â”œâ”€â”€ conhecimento_ia/
â”‚       â””â”€â”€ lixeira_auditoria/
```

---

## ðŸ¤– Configurar IA Local

1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikeys)
2. Crie uma chave de API
3. Salve em `oficinas/{id}/apiKeys/IA Local`

---

## ðŸ‘¥ Criar UsuÃ¡rios

### Admin (Master)

```javascript
// Firestore: oficinas/{id}
{
  usuario: "admin",
  senha: "senha123",
  nomeFantasia: "Oficina ABC",
  status: "Ativo"
}
```

### FuncionÃ¡rio (Equipe)

```javascript
// Firestore: oficinas/{id}/funcionarios/{id}
{
  usuario: "joao",
  senha: "senha123",
  pin: "1234",
  nome: "JoÃ£o Silva",
  cargo: "mecanico",
  comissao: 10,
  tenantId: "{id_oficina}"
}
```

---

## ðŸ“Š MÃ³dulos Implementados

### âœ… AutenticaÃ§Ã£o
- Login Master (Admin)
- Login Equipe (FuncionÃ¡rio)
- Login com PIN (4 dÃ­gitos)
- SessÃ£o persistente (sessionStorage)

### âœ… Ordens de ServiÃ§o
- Kanban visual com 6 status
- CRUD completo
- AtribuiÃ§Ã£o de mecÃ¢nicos
- Dashboard com resumos

### âœ… Financeiro
- DRE (Entradas Ã— SaÃ­das)
- LanÃ§amentos manuais
- NF Entrada com **parcelamento automÃ¡tico**
- ComissÃµes por mecÃ¢nico
- Status: Pago/Pendente

### âœ… IA (RAG)
- IA local integrada
- Contexto dinÃ¢mico (dados da oficina)
- Base de conhecimento tÃ©cnico
- Chat com admin

### âœ… Estoque
- CRUD de itens
- Controle de mÃ­nimo
- SugestÃ£o automÃ¡tica em NF

### âœ… Clientes & Equipe
- Cadastro completo
- VinculaÃ§Ã£o com O.S.
- Chat CRM (admin â†” cliente)

---

## ðŸŽ¨ CustomizaÃ§Ã£o

### Cores (White-Label)

Edite `js/config.js`:

```javascript
window.JARVIS_BRAND = {
  name:        "Sua Oficina",
  tagline:     "Seu slogan",
  logoLetter:  "S",
  color:       "#FF6B35",  // Cor principal
  colorDark:   "#D84315"   // Cor escura
};
```

### Temas

Modifique `css/design.css`:

```css
:root {
  --brand:      #3B82F6;
  --success:    #22D3A0;
  --danger:     #F43F5E;
  /* ... */
}
```

---

## ðŸ”§ Troubleshooting

### "Erro ao conectar com o servidor"
- Verifique credenciais do Firebase em `js/config.js`
- Confirme que Firestore estÃ¡ ativo
- Verifique regras de seguranÃ§a (modo teste = aberto)

### "API Key invÃ¡lida"
- Gere nova chave em [Google AI Studio](https://aistudio.google.com/app/apikeys)
- Salve em `oficinas/{id}/apiKeys/IA Local`

### Dados nÃ£o aparecem
- Abra DevTools (F12) â†’ Console
- Verifique se hÃ¡ erros de Firestore
- Confirme que `tenantId` estÃ¡ correto

---

## ðŸ“± Responsividade

Sistema otimizado para:
- âœ… Desktop (1920px+)
- âœ… Tablet (768px - 1024px)
- âœ… Mobile (320px - 767px)

---

## ðŸ”’ SeguranÃ§a

### Regras Firestore (Modo Teste)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**âš ï¸ PRODUÃ‡ÃƒO:** Implemente autenticaÃ§Ã£o Firebase Auth e regras de seguranÃ§a apropriadas.

---

## ðŸ“ž Suporte

Para dÃºvidas ou bugs:
1. Verifique o console (F12)
2. Consulte o README de cada mÃ³dulo
3. Abra issue no GitHub

---

## ðŸ“„ LicenÃ§a

Desenvolvido por **thIAguinho SoluÃ§Ãµes Digitais** â€” 2026

---

## ðŸŽ¯ Roadmap

- [ ] ExportaÃ§Ã£o de relatÃ³rios (PDF)
- [ ] IntegraÃ§Ã£o com WhatsApp API
- [ ] Dashboard mobile nativo
- [ ] Backup automÃ¡tico
- [ ] SincronizaÃ§Ã£o offline
- [ ] IntegraÃ§Ã£o com sistemas de pagamento

---

**VersÃ£o:** 2.0.0  
**Ãšltima atualizaÃ§Ã£o:** Abril 2026  
**Status:** âœ… ProduÃ§Ã£o


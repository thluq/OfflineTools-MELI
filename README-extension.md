# OfflineTools MELI — Extension Branch

Versão Chrome Extension do projeto [OfflineTools-MELI](https://github.com/thluq/OfflineTools-MELI).  
A branch `main` continua sendo a versão web (GitHub Pages). Esta branch (`extension`) contém apenas os arquivos modificados para funcionar como popup do Chrome.

---

## O que mudou em relação à `main`

| Arquivo | O que mudou |
|---|---|
| `manifest.json` | **Novo.** Coração da extensão. |
| `index.html` | CDNs externos removidos → referências locais |
| `css/global.css` | `position: fixed` removido do header; dimensões de popup; espaçamentos compactos |
| `css/index.css` | Cards e grid menores pra caber no popup (780×580px) |
| `libs/font-awesome/` | **Baixar manualmente** (veja abaixo) |
| `icons/meli-logo.png` | **Baixar manualmente** (veja abaixo) |
| `icons/icon-16.png` | **Criar/exportar** (veja abaixo) |
| `icons/icon-48.png` | **Criar/exportar** |
| `icons/icon-128.png` | **Criar/exportar** |

---

## Setup — arquivos que precisam ser baixados manualmente

### 1. Font Awesome (local)

O Chrome bloqueia CDNs externos em extensões por CSP.  
Baixe o Font Awesome Free em: https://fontawesome.com/download

Extraia e copie para o projeto:
```
libs/
└── font-awesome/
    ├── css/
    │   └── all.min.css
    └── webfonts/
        ├── fa-brands-400.woff2
        ├── fa-solid-900.woff2
        └── fa-regular-400.woff2
```

### 2. Logo do Mercado Livre

Salve o logo localmente em `icons/meli-logo.png`:
```
https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.5/mercadolibre/logo__large_plus.png
```

### 3. Ícones da extensão (16, 48, 128px)

O Chrome exige ícones nos 3 tamanhos para exibir na barra de extensões.  
Use qualquer um dos SVGs existentes em `/icons/` e exporte em PNG nos tamanhos:
- `icons/icon-16.png`
- `icons/icon-48.png`
- `icons/icon-128.png`

Ferramentas gratuitas para converter SVG → PNG: [Squoosh](https://squoosh.app), [CloudConvert](https://cloudconvert.com/svg-to-png).

---

## Como instalar no Chrome (modo desenvolvedor)

1. Abra `chrome://extensions/`
2. Ative o **Modo do desenvolvedor** (toggle no canto superior direito)
3. Clique em **"Carregar sem compactação"**
4. Selecione a pasta raiz do projeto (onde está o `manifest.json`)
5. O ícone aparecerá na barra do Chrome — clique para abrir o popup

---

## Estrutura da branch

```
OfflineTools-MELI/          ← mesma estrutura da main
├── manifest.json           ← NOVO
├── index.html              ← modificado
├── css/
│   ├── global.css          ← modificado
│   ├── index.css           ← modificado
│   └── (demais .css)       ← iguais à main (a fazer: adaptar padding/scroll)
├── js/                     ← igual à main
├── pages/                  ← igual à main
├── libs/
│   ├── JsBarcode.all.min.js
│   ├── qrcode.min.js
│   └── font-awesome/       ← NOVO (baixar manualmente)
└── icons/
    ├── (SVGs originais)
    ├── meli-logo.png        ← NOVO (baixar manualmente)
    ├── icon-16.png          ← NOVO
    ├── icon-48.png          ← NOVO
    └── icon-128.png         ← NOVO
```

---

## Páginas internas (a fazer)

As páginas em `/pages/` ainda usam o `global.css` compartilhado, então já herdam  
as correções de header. Mas podem precisar de ajustes pontuais de scroll/padding  
para encaixar melhor no popup. Sugestão: testar cada ferramenta e ajustar conforme necessário.

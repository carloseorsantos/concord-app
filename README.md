# 🎬 Concord — Clone do Discord com Foco em Watch Party & Streaming 60 FPS

O **Concord** é uma plataforma de comunicação em tempo real desenvolvida com **Next.js 14**, **Clerk Auth**, **Prisma ORM (PostgreSQL)** e **LiveKit WebRTC SFU**, projetada especificamente para oferecer compartilhamento de tela de altíssima fidelidade (1080p/4K a 60 FPS), canais no formato **Palco de Cinema** e áudio estéreo intocado para conteúdos de mídia e serviços de streaming (como Netflix, YouTube, Prime Video, etc.).

---

## ✨ Principais Diferenciais e Funcionalidades

1. **Streaming 60 FPS com Áudio Estéreo Dedicado:**
   - Pipeline de áudio separado: a voz do usuário recebe cancelamento de ruído e eco, enquanto a transmissão de tela recebe áudio estéreo puro (Opus 48kHz).
   - Seletor de qualidade dinâmico: 720p 30fps, 1080p 60fps, 4K 60fps ou Nativo.
2. **Contorno de Tela Preta por DRM (Netflix / Prime Video):**
   - Modal interativo com guia passo a passo para streaming de abas sem bloqueio de DRM.
3. **Canais no Formato Palco de Cinema (Watch Party Stage):**
   - Layout focado em transmissão maximizada, Picture-in-Picture (PiP), modo cinema e tela cheia.
   - Mixer de volume individual para ajustar o áudio do filme separado da voz do apresentador.
4. **Hierarquia Completa Discord:**
   - Servidores com ícones, convites instantâneos e gerenciamento de cargos (Admin, Moderador, Membro).
   - Canais organizados por seções: Texto, Voz e Palcos de Cinema.
   - Chat com paginação automática e suporte a mensagens instantâneas.

---

## 🚀 Como Rodar o Projeto Localmente

### 1. Pré-requisitos
- Node.js 18+ instalado.
- Docker (opcional, para rodar o PostgreSQL e LiveKit localmente) ou contas em serviços em nuvem (Neon/Supabase + LiveKit Cloud).

### 2. Instalação das Dependências
```bash
npm install
```

### 3. Configuração das Variáveis de Ambiente
Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```
Preencha suas chaves do [Clerk](https://clerk.com) e a URL do banco PostgreSQL.

### 4. Rodando o LiveKit Localmente (Docker)
Para testar a transmissão de voz e tela sem criar conta no LiveKit Cloud, execute o servidor LiveKit em modo dev:
```bash
docker run --rm -p 7880:7880 -p 7881:7881 -p 7882:7882/udp livekit/livekit-server --dev
```

### 5. Banco de Dados e Prisma
```bash
npx prisma generate
npx prisma db push
```

### 6. Executar o Servidor de Desenvolvimento
```bash
npm run dev
```
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

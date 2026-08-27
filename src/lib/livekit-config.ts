export type StreamQualityPreset = "720p30" | "1080p60" | "4k60" | "source";

export interface QualityPresetConfig {
  label: string;
  description: string;
  width: number;
  height: number;
  frameRate: number;
  maxBitrate: number; // in bps
}

export const STREAM_PRESETS: Record<StreamQualityPreset, QualityPresetConfig> = {
  "720p30": {
    label: "HD 720p (30 FPS)",
    description: "Ideal para conexões mais lentas ou economia de dados",
    width: 1280,
    height: 720,
    frameRate: 30,
    maxBitrate: 2_500_000, // 2.5 Mbps
  },
  "1080p60": {
    label: "Full HD 1080p (60 FPS) - Recomendado",
    description: "Excelente para filmes, séries (Netflix/YouTube) e jogos com alta fluidez",
    width: 1920,
    height: 1080,
    frameRate: 60,
    maxBitrate: 6_000_000, // 6 Mbps
  },
  "4k60": {
    label: "Ultra HD 4K (60 FPS)",
    description: "Qualidade cinematográfica máxima para telas de alta resolução",
    width: 3840,
    height: 2160,
    frameRate: 60,
    maxBitrate: 15_000_000, // 15 Mbps
  },
  "source": {
    label: "Resolução Nativa Original (60 FPS)",
    description: "Captura sem redimensionamento na taxa nativa do monitor",
    width: 0, // dynamic
    height: 0,
    frameRate: 60,
    maxBitrate: 8_000_000,
  }
};

/**
 * Retorna as opções otimizadas para getDisplayMedia com foco em Watch Parties.
 * Desativa cancelamento de ruído e eco no áudio da tela para manter a fidelidade estéreo original.
 */
export function getOptimizedScreenShareConstraints(preset: StreamQualityPreset = "1080p60"): DisplayMediaStreamOptions {
  const config = STREAM_PRESETS[preset];

  const videoConstraints: MediaTrackConstraints = {
    frameRate: { ideal: config.frameRate, max: config.frameRate },
  };

  if (config.width > 0 && config.height > 0) {
    videoConstraints.width = { ideal: config.width, max: config.width };
    videoConstraints.height = { ideal: config.height, max: config.height };
  }

  return {
    video: {
      ...videoConstraints,
      displaySurface: "browser", // Prioriza abas para captura nativa de áudio do tab
      // @ts-ignore
      suppressLocalAudioPlayback: false, // Mantém o som tocando no fone do host
      preferCurrentTab: false,
      selfBrowserSurface: "exclude",
      surfaceSwitching: "include",
      systemAudio: "include"
    },
    audio: {
      echoCancellation: false, // Desativa processamento de voz no som do filme
      noiseSuppression: false, // Mantém frequências graves e efeitos sonoros intactos
      autoGainControl: false,  // Não altera dinâmica de volume de músicas/filmes
      channelCount: 2,         // Força áudio estéreo
      sampleRate: 48000,
    } as MediaTrackConstraints,
  };
}

export const DRM_TIPS = [
  {
    title: "Como evitar Tela Preta no Netflix / Prime / HBO / Disney+",
    steps: [
      "1. No navegador onde está o filme (Chrome, Brave, Edge), abra as Configurações do Navegador.",
      "2. Pesquise por 'Aceleração de hardware' ou 'Hardware Acceleration' e DESATIVE essa opção.",
      "3. Reinicie o navegador onde o filme está aberto.",
      "4. Ao clicar em 'Compartilhar Tela' no Concord, escolha a opção 'Aba do Chrome/Navegador' em vez de Tela Inteira.",
      "5. Certifique-se de marcar a caixinha 'Compartilhar áudio da aba'."
    ]
  },
  {
    title: "Garantindo Áudio Estéreo de Alta Definição",
    steps: [
      "O Concord transmite o áudio da tela em um canal de áudio dedicado separado do seu microfone.",
      "Isso significa que a música e os efeitos sonoros do filme não são afetados pelo cancelamento de ruído do microfone!"
    ]
  }
];

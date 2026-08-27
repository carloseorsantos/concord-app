"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { DRM_TIPS } from "@/lib/livekit-config";
import { MonitorPlay, ShieldAlert, CheckCircle2, Sparkles, Volume2 } from "lucide-react";

export const ScreenShareDRMModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "screenShareDRM";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#313338] text-white p-0 overflow-hidden max-w-lg border-0">
        <DialogHeader className="pt-8 px-6 bg-[#2B2D31]">
          <div className="flex items-center gap-x-2 text-[#5865F2] font-semibold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="h-4 w-4" />
            Guia de Transmissão em Alta Performance
          </div>
          <DialogTitle className="text-2xl font-bold flex items-center gap-x-2 text-white">
            <MonitorPlay className="h-6 w-6 text-[#5865F2]" />
            Streaming sem Tela Preta (DRM)
          </DialogTitle>
          <DialogDescription className="text-zinc-300 text-sm mt-1 pb-4">
            Aprenda a transmitir filmes e séries (Netflix, Prime Video, HBO Max, YouTube) com imagem fluida a 60 FPS e áudio estéreo intocado.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="bg-[#2B2D31] p-4 rounded-lg border border-[#3F4147] space-y-2">
            <div className="flex items-center gap-x-2 text-[#FEE75C] font-semibold text-sm">
              <ShieldAlert className="h-4 w-4" />
              Por que a tela fica preta no streaming comum?
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Navegadores utilizam proteção DRM (Widevine) junto com a GPU. Ao desativar a aceleração de hardware ou transmitir diretamente a <strong>Aba do Navegador</strong>, o Concord captura os frames com máxima nitidez sem bloqueios.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-zinc-200 flex items-center gap-x-2">
              <CheckCircle2 className="h-4 w-4 text-[#23A55A]" />
              Passo a Passo Rápido:
            </h4>
            <div className="space-y-2 text-xs text-zinc-300">
              {DRM_TIPS[0].steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-x-2 bg-[#1E1F22] p-2.5 rounded-md border border-zinc-800">
                  <span className="text-[#5865F2] font-bold shrink-0">{idx + 1}.</span>
                  <span>{step.replace(/^\d+\.\s*/, "")}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#23A55A]/10 border border-[#23A55A]/30 p-3 rounded-lg flex items-start gap-x-3 text-xs text-zinc-200">
            <Volume2 className="h-5 w-5 text-[#23A55A] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Áudio Estéreo de Cinema Ativo:</strong>
              O Concord separa o canal de áudio da tela do seu microfone, garantindo graves, agudos e trilha sonora originais sem cancelamento de ruído artificial.
            </div>
          </div>
        </div>

        <DialogFooter className="bg-[#2B2D31] px-6 py-4">
          <Button variant="default" onClick={onClose} className="w-full sm:w-auto">
            Entendi, iniciar transmissão!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

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
import { useStreamQuality } from "@/hooks/use-stream-quality";
import { STREAM_PRESETS, StreamQualityPreset } from "@/lib/livekit-config";
import { Settings2, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const StreamQualityModal = () => {
  const { isOpen, onClose, type } = useModal();
  const { preset: currentPreset, setPreset } = useStreamQuality();

  const isModalOpen = isOpen && type === "streamQuality";

  const handleSelect = (key: StreamQualityPreset) => {
    setPreset(key);
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#313338] text-white p-0 overflow-hidden max-w-lg border-0">
        <DialogHeader className="pt-8 px-6 bg-[#2B2D31]">
          <div className="flex items-center gap-x-2 text-[#5865F2] font-semibold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="h-4 w-4" />
            Configurações de Transmissão
          </div>
          <DialogTitle className="text-2xl font-bold flex items-center gap-x-2 text-white">
            <Settings2 className="h-6 w-6 text-[#5865F2]" />
            Qualidade do Stream
          </DialogTitle>
          <DialogDescription className="text-zinc-300 text-sm mt-1 pb-4">
            Escolha a resolução e taxa de quadros (FPS) ideais para sua transmissão no Concord.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-3">
          {(Object.keys(STREAM_PRESETS) as StreamQualityPreset[]).map((key) => {
            const config = STREAM_PRESETS[key];
            const isSelected = currentPreset === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelect(key)}
                className={cn(
                  "w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between",
                  isSelected
                    ? "bg-[#5865F2]/10 border-[#5865F2] shadow-sm"
                    : "bg-[#2B2D31] border-[#3F4147] hover:bg-[#35373C] hover:border-zinc-500"
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-x-2">
                    <span className="font-bold text-sm text-white">
                      {config.label}
                    </span>
                    {key === "1080p60" && (
                      <span className="bg-[#5865F2] text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded text-white tracking-wider">
                        Recomendado
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400">
                    {config.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="h-6 w-6 rounded-full bg-[#5865F2] flex items-center justify-center text-white shrink-0 ml-3">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <DialogFooter className="bg-[#2B2D31] px-6 py-4">
          <Button variant="ghost" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

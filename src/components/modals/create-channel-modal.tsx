"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChannelType } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Hash, Mic, Clapperboard, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export const CreateChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const { server, channelType } = data;

  const [name, setName] = useState("");
  const [selectedType, setSelectedType] = useState<ChannelType>(ChannelType.TEXT);
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "createChannel";

  useEffect(() => {
    if (channelType) {
      setSelectedType(channelType);
    } else {
      setSelectedType(ChannelType.TEXT);
    }
  }, [channelType]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !server) return;

    try {
      setIsLoading(true);
      await axios.post(`/api/channels?serverId=${server.id}`, {
        name: name.toLowerCase().replace(/\s+/g, "-"),
        type: selectedType,
      });

      setName("");
      onClose();
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    onClose();
  };

  const channelTypesList = [
    {
      type: ChannelType.TEXT,
      label: "Canal de Texto",
      description: "Envie mensagens, imagens, memes e opiniões.",
      icon: Hash,
    },
    {
      type: ChannelType.AUDIO,
      label: "Canal de Voz",
      description: "Converse por voz com áudio HD e baixa latência.",
      icon: Mic,
    },
    {
      type: ChannelType.CINEMA_STAGE,
      label: "Palco de Cinema / Watch Party",
      description: "Transmita tela a 60fps com áudio estéreo intocado e modo cinema.",
      icon: Clapperboard,
      badge: "Watch Party",
    },
  ];

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#313338] text-white p-0 overflow-hidden max-w-md border-0">
        <DialogHeader className="pt-8 px-6 bg-[#2B2D31]">
          <DialogTitle className="text-2xl font-bold flex items-center gap-x-2 text-white">
            <Plus className="h-6 w-6 text-[#5865F2]" />
            Criar Canal
          </DialogTitle>
          <p className="text-zinc-400 text-xs mt-1">
            em #{server?.name}
          </p>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 p-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-zinc-300 tracking-wider">
              Tipo de Canal
            </label>
            <div className="space-y-2">
              {channelTypesList.map((item) => {
                const Icon = item.icon;
                const isSelected = selectedType === item.type;

                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setSelectedType(item.type)}
                    className={cn(
                      "w-full flex items-start p-3 rounded-lg border text-left transition-all",
                      isSelected
                        ? "bg-[#5865F2]/15 border-[#5865F2]"
                        : "bg-[#2B2D31] border-[#3F4147] hover:bg-[#35373C]"
                    )}
                  >
                    <Icon className="h-5 w-5 text-zinc-400 mr-3 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-x-2">
                        <span className="font-semibold text-sm text-white">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="bg-[#5865F2] text-[10px] uppercase font-bold px-1.5 py-0.2 rounded text-white">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-zinc-300 tracking-wider">
              Nome do Canal *
            </label>
            <Input
              disabled={isLoading}
              className="bg-[#1E1F22] border-0 text-white focus-visible:ring-1 focus-visible:ring-[#5865F2]"
              placeholder="ex: cinema-da-noite, bate-papo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <DialogFooter className="bg-[#2B2D31] -mx-6 -mb-6 px-6 py-4 mt-6">
            <Button
              variant="ghost"
              type="button"
              disabled={isLoading}
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              variant="default"
              type="submit"
              disabled={isLoading || !name.trim()}
              className="bg-[#5865F2] hover:bg-[#4752C4]"
            >
              {isLoading ? "Criando..." : "Criar Canal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

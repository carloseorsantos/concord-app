"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Server, Sparkles } from "lucide-react";

export const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "createServer";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setIsLoading(true);
      const res = await axios.post("/api/servers", {
        name,
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60",
      });

      setName("");
      setImageUrl("");
      onClose();
      router.refresh();
      router.push(`/servers/${res.data.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setImageUrl("");
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#313338] text-white p-0 overflow-hidden max-w-md border-0">
        <DialogHeader className="pt-8 px-6 bg-[#2B2D31]">
          <div className="flex items-center gap-x-2 text-[#5865F2] font-semibold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="h-4 w-4" />
            Novo Espaço no Concord
          </div>
          <DialogTitle className="text-2xl font-bold flex items-center gap-x-2 text-white">
            <Server className="h-6 w-6 text-[#5865F2]" />
            Crie seu Servidor
          </DialogTitle>
          <DialogDescription className="text-zinc-300 text-sm mt-1 pb-4">
            Seu servidor é onde você e seus amigos se reúnem para conversar, jogar e assistir juntos.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 p-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-zinc-300 tracking-wider">
              Nome do Servidor *
            </label>
            <Input
              disabled={isLoading}
              className="bg-[#1E1F22] border-0 text-white focus-visible:ring-1 focus-visible:ring-[#5865F2]"
              placeholder="Ex: Cinema dos Amigos, Clube do Filme, Squad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-zinc-300 tracking-wider">
              URL do Ícone (Opcional)
            </label>
            <Input
              disabled={isLoading}
              className="bg-[#1E1F22] border-0 text-white focus-visible:ring-1 focus-visible:ring-[#5865F2]"
              placeholder="https://exemplo.com/icone.png"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
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
              {isLoading ? "Criando..." : "Criar Servidor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

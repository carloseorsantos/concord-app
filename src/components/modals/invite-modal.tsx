"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Copy, Check, RefreshCw, UserPlus } from "lucide-react";
import axios from "axios";

export const InviteModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "invite";
  const { server } = data;

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const res = await axios.patch(`/api/servers/${server?.id}/invite-code`);
      onOpen("invite", { server: res.data });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#313338] text-white p-0 overflow-hidden max-w-md border-0">
        <DialogHeader className="pt-8 px-6 bg-[#2B2D31]">
          <DialogTitle className="text-2xl font-bold flex items-center gap-x-2 text-white">
            <UserPlus className="h-6 w-6 text-[#5865F2]" />
            Convidar Amigos
          </DialogTitle>
          <p className="text-zinc-400 text-xs mt-1">
            para #{server?.name}
          </p>
        </DialogHeader>

        <div className="p-6 space-y-4">
          <label className="text-xs font-bold uppercase text-zinc-300 tracking-wider">
            Envie este link para um amigo
          </label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={isLoading}
              className="bg-[#1E1F22] border-0 text-white focus-visible:ring-1 focus-visible:ring-[#5865F2]"
              value={inviteUrl}
              readOnly
            />
            <Button
              disabled={isLoading}
              onClick={onCopy}
              size="icon"
              className={copied ? "bg-[#23A55A]" : "bg-[#5865F2] hover:bg-[#4752C4]"}
            >
              {copied ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <Copy className="w-4 h-4 text-white" />
              )}
            </Button>
          </div>
          <Button
            onClick={onNew}
            disabled={isLoading}
            variant="link"
            size="sm"
            className="text-xs text-zinc-400 mt-2 p-0 hover:text-white flex items-center gap-x-1"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Gerar um novo link de convite
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

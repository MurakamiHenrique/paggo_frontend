import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { Button } from "../button";

interface HistoryToggleButtonProps {
  isOpen: boolean;
  count: number;
  onClick: () => void;
}

export function HistoryToggleButton({
  isOpen,
  count,
  onClick,
}: HistoryToggleButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      size="md"
      style={{ border: 0, padding: 16 }}
    >
      {isOpen ? <PanelLeftClose size={28} /> : <PanelLeftOpen size={28} />}
    </Button>
  );
}

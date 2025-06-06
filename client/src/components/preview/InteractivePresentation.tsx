import { Button } from "@/components/ui/button";

interface InteractivePresentationProps {
  onComplete: () => void;
}

export default function InteractivePresentation({ onComplete }: InteractivePresentationProps) {
  return (
    <div className="w-full min-h-screen relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Пустая страница превью */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">VODeco</h1>
          <p className="text-gray-300 mb-8">Система управления водными ресурсами</p>
          <Button
            onClick={onComplete}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Далее
          </Button>
        </div>
      </div>
    </div>
  );
}
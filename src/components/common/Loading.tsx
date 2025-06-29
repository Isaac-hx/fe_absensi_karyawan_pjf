import { Loader } from "lucide-react"


const Loading: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={`fixed inset-0 ${className} bg-black/20 w-full h-full z-[9999] flex items-center justify-center pointer-events-auto`}
      style={{ pointerEvents: 'all' }}
    >
      <Loader size={40} className="animate-spin text-slate-700" />
    </div>
  );
};

export default Loading
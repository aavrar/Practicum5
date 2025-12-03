import { MOCK_USER_TENSOR } from '@/lib/mockData';
import { UserTensorVisualization } from '@/components/tensor/UserTensorVisualization';
import { PremiseGenerator } from '@/components/tensor/PremiseGenerator';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="relative z-10 py-20">
        <UserTensorVisualization tensor={MOCK_USER_TENSOR} />
        <PremiseGenerator tensor={MOCK_USER_TENSOR} />
      </div>
    </main>
  );
}

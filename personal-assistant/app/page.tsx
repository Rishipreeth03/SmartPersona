import Image from "next/image";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div suppressHydrationWarning={true}>
      <button>Click me</button>
    </div>
  );
}

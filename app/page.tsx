import Image from "next/image";
import YourBillingComponent from "./components/YourBillingComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <YourBillingComponent />
    </main>
  );
}

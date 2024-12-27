import dynamic from "next/dynamic";
import Home from "@/components/home/Home";
import NavigationBar from "@/components/layout/navigation/NavigationBar";
const Footer = dynamic(() => import("@/components/layout/footer/Footer"),{
  loading: () => <p>Loading...</p>,
});

export default function Page() {
  return (
    <main>
      <Home />
    </main>
  );
}

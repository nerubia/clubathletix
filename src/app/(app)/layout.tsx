import Footer from "@/components/footer";
import Navigation from "@/components/headers/navigation";
import Sponsors from "@/components/sponsors";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  
  return <div className="bg-white flex flex-col min-h-screen">
        <Navigation />
        
        <div className="mx-auto">
            {children}
        </div>
        <div className="flex-1" />
        <Sponsors />
        <Footer />
  </div>
}

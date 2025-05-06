import Footer from "@/components/footer";
import Navigation from "@/components/headers/navigation";
import Sponsors from "@/components/sponsors";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  
  return <div className="bg-white">
        <Navigation />
        
        <div className="max-w-7xl mx-auto">
            {children}
        </div>
  
        <Sponsors />
        <Footer />
  </div>
}

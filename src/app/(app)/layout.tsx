import Footer from "@/components/footer";
import Navigation from "@/components/headers/navigation";
import Sponsors from "@/components/sponsors";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  
  return <div>
        <Navigation />
        
        {children}
  
        <Sponsors />
        <Footer />
  </div>
}

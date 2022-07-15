import Header from "./Header";
import Footer from "./Footer";
import MobileHeader from "./MobileHeader";

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children}: LayoutProps) {
    return (
        <>
        <MobileHeader />
        <div className="h-screen bg-neutral-200 font-ibm-plex-mono text-cyan-900 px-2 md:px-6 pb-44">
            <Header />
                {children}
            <Footer />
        </div>
        </>
    )
}
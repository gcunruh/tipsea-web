import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children}: LayoutProps) {
    return (
        <div className="h-screen bg-neutral-200 font-ibm-plex-mono text-cyan-900 px-3 md:px-6 pb-44">
            <Header />
                {children}
            <Footer />
        </div>
    )
}
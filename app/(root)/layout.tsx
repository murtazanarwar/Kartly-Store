import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactUsSticky from "@/components/contact-us-sticky";

export default async function SetupLayout({
    children
} : {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            {children}
            <ContactUsSticky />
            <Footer />
        </>
    )
}
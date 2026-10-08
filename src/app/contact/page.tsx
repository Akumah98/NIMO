import type { Metadata } from "next";
import ContactHelpSection from "@/components/contact/ContactHelpSection";
import ContactForm from "@/components/contact/ContactForm";
import ContactDetailsCard from "@/components/contact/ContactDetailsCard";

export const metadata: Metadata = {
  title: "Contact Us | NIMO - Need Help? We're Here",
  description: "Reach out to NIMO Association. Get in touch with our Buea headquarters or send us an inquiry.",
};

export default function ContactPage() {
  return (
    <main className="min-h-dvh bg-bg px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl space-y-16 sm:space-y-20">
        {/* Top Hero Section: Need Help? with 2 Elevated Cards & Photography */}
        <ContactHelpSection />

        {/* Bottom Section: Send Us a Message Form & Physical Office Details */}
        <div className="border-t border-border/80 pt-12 sm:pt-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
              Send Us a Message
            </h2>
            <p className="mt-2 text-sm sm:text-base text-text-light">
              Submit your project inquiry, partnership request, or general question directly to our field team:
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
            <div className="lg:col-span-5">
              <ContactDetailsCard />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

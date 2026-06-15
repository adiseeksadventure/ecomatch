import React from "react";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-nature-bg py-20 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <div className="p-5 rounded-[2rem] bg-nature-accent shadow-xl shadow-nature-sage/10 border-4 border-white">
              <Shield className="h-10 w-10 text-nature-heading" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-nature-heading mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-nature-sage font-bold uppercase tracking-widest text-xs">
            Last updated June 2026
          </p>
        </div>

        <div className="card shadow-2xl shadow-nature-sage/10 rounded-[2.5rem] p-10 md:p-14 border-nature-sage/20 space-y-8 text-nature-primary font-medium leading-relaxed">
          <p className="opacity-80">
            EcoMatch is committed to protecting your privacy. This page explains
            what information the app handles and how it is used.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-black text-nature-heading">What we store</h2>
            <p className="opacity-80">
              The Sustainability Quiz and Carbon Calculator run entirely in your
              browser. Your answers and logged activities are saved to your
              device's local storage and are never sent anywhere unless you
              choose to create an account.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-black text-nature-heading">Accounts</h2>
            <p className="opacity-80">
              If you register, we store your name, email, and an encrypted
              password to sync your data across devices. You can delete your
              account at any time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-black text-nature-heading">Contact</h2>
            <p className="opacity-80">
              Questions about privacy? Reach us at{" "}
              <span className="text-nature-heading font-black">hello@ecomatch.com</span>.
            </p>
          </section>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-nature-primary font-black hover:text-nature-heading transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

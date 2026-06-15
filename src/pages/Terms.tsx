import React from "react";
import { Link } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-nature-bg py-20 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <div className="p-5 rounded-[2rem] bg-nature-accent shadow-xl shadow-nature-sage/10 border-4 border-white">
              <FileText className="h-10 w-10 text-nature-heading" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-nature-heading mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-nature-sage font-bold uppercase tracking-widest text-xs">
            Last updated June 2026
          </p>
        </div>

        <div className="card shadow-2xl shadow-nature-sage/10 rounded-[2.5rem] p-10 md:p-14 border-nature-sage/20 space-y-8 text-nature-primary font-medium leading-relaxed">
          <p className="opacity-80">
            By using EcoMatch you agree to these terms. EcoMatch is provided to
            help you make more sustainable choices and is offered on an
            "as-is" basis.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-black text-nature-heading">Using the app</h2>
            <p className="opacity-80">
              You may use the quiz, calculator, and directory for personal,
              non-commercial purposes. Carbon estimates and sustainability
              ratings are guidance only and should not be treated as certified
              measurements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-black text-nature-heading">Business listings</h2>
            <p className="opacity-80">
              Directory listings are provided for discovery. EcoMatch does not
              guarantee the accuracy of any third-party business information or
              endorse any particular vendor.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-black text-nature-heading">Contact</h2>
            <p className="opacity-80">
              Questions about these terms? Reach us at{" "}
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

export default Terms;

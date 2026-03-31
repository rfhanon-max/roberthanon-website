import { ContactForm } from "@/components/site/contact-form";
import { contactDetails, siteContent } from "@/lib/site-content";

export default function ContactPage() {
  const content = siteContent.contact;

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-line bg-white p-8 shadow-panel md:p-10">
          <p className="text-xs uppercase tracking-[0.32em] text-muted">{content.eyebrow}</p>
          <h1 className="mt-5 font-display text-4xl leading-tight text-navy md:text-5xl">
            {content.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted md:text-lg">
            {content.description}
          </p>

          <div className="mt-10 space-y-5 text-sm leading-7 text-muted">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-muted">Email</p>
              <p className="mt-1 text-base text-navy">{contactDetails.email}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-muted">Phone</p>
              <p className="mt-1 text-base text-navy">{contactDetails.phone}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-muted">Office</p>
              <p className="mt-1 text-base text-navy">
                {contactDetails.office}, {contactDetails.region}
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-[1.5rem] bg-paper p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-muted">Helpful Starting Points</p>
            <div className="mt-4 grid gap-3">
              {content.prompts.map((prompt) => (
                <div
                  key={prompt}
                  className="rounded-[1.25rem] border border-line bg-white px-4 py-3 text-sm leading-7 text-muted"
                >
                  {prompt}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-line bg-white p-8 shadow-panel md:p-10">
          <p className="text-xs uppercase tracking-[0.32em] text-muted">Inquiry Form</p>
          <h2 className="mt-5 font-display text-3xl text-navy">Send a Note</h2>
          <p className="mt-4 text-base leading-8 text-muted">
            This form is intentionally simple so it is easy to connect to email, a CRM, or another service later.
          </p>

          {/* This version opens the visitor's email app with the form details prefilled. */}
          <ContactForm email={contactDetails.email} />
        </div>
      </div>
    </section>
  );
}

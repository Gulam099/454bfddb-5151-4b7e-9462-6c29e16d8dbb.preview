import { Card } from '@/components/ui/card'
import { FileText, ShieldPlus, BriefcaseBusiness, IndianRupee, Calculator, LineChart } from 'lucide-react'
import Image from 'next/image'

export default function ServicesSection() {
    const services = [
        {
            Icon: <Calculator className="w-6 h-6" />,
            title: 'GST Filing',
            description: 'Accurate and timely GST return filing to keep your business fully compliant.',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
            points: [
                "GST Registration",
                "GSTR-1, 3B & 9 Filing",
                "GST Assessment & Advisory",
            ],
        },
        {
            Icon: <FileText className="w-6 h-6" />,
            title: 'Income Tax Return',
            description: 'Professional ITR preparation ensuring maximum benefits and zero errors.',
            image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
            points: [
                "Individual & Business ITR",
                "Capital Gains Calculation",
                "Tax Saving Strategies",
            ],
        },
        {
            Icon: <ShieldPlus className="w-6 h-6" />,
            title: 'Audit Services',
            description: 'Comprehensive internal and statutory audits for financial transparency.',
            image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800',
            points: [
                "Statutory Audit",
                "Internal Audit",
                "Tax Audit under IT Act",
            ],
        },
        {
            Icon: <BriefcaseBusiness className="w-6 h-6" />,
            title: 'Bookkeeping',
            description: 'Complete record-keeping and transaction management for your business.',
            image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=800',
            points: [
                "Daily Accounting",
                "Payroll Management",
                "Financial Statement Prep",
            ],
        },
        {
            Icon: <IndianRupee className="w-6 h-6" />,
            title: 'Business Registration',
            description: 'Seamless registration for all business types with expert guidance.',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
            points: [
                "Private Limited Company",
                "LLP & Partnership",
                "MSME & Trade License",
            ],
        },
        {
            Icon: <LineChart className="w-6 h-6" />,
            title: 'Financial Planning',
            description: 'Strategic financial advice to help your business grow sustainably.',
            image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800',
            points: [
                "Investment Advisory",
                "Project Reports & Loans",
                "Retirement Planning",
            ],
        },
    ];

    return (
        <section id="services" className="bg-gradient-to-b from-background to-secondary/20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-sm font-bold tracking-widest text-primary uppercase">Our Expertise</h2>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-foreground">Premium Services</h3>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Comprehensive and professional accounting solutions tailored specifically for your business growth and compliance.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className="group relative flex flex-col bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Image Header */}
                            <div className="relative w-full h-56 overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                            </div>

                            {/* Floating Icon */}
                            <div className="absolute top-48 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-lg transform -translate-y-1/2 group-hover:rotate-12 transition-transform duration-300">
                                {service.Icon}
                            </div>

                            {/* Content */}
                            <div className="p-8 pt-6 flex flex-col flex-grow">
                                <h4 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h4>
                                <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">
                                    {service.description}
                                </p>

                                <ul className="space-y-3 border-t border-border pt-6">
                                    {service.points.map((point, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm font-medium text-foreground">
                                            <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
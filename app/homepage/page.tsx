"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cpu,
  GitFork,
  Globe,
  LayoutDashboard,
  Menu,
  Network,
  Radio,
  ShieldCheck,
  Ship,
  Warehouse,
  X,
} from "lucide-react";
import shipmentsData from "@/data/shipments.json";
import customersData from "@/data/customers.json";
import suppliersData from "@/data/suppliers.json";
import inventoryData from "@/data/inventory.json";
import plantsData from "@/data/plants.json";
import scenariosData from "@/data/scenarios.json";
import eventsData from "@/data/events.json";

const APP_HOME = "/";

const navLinks = [
  { label: "Home", href: "/homepage" },
  { label: "Platform", href: "#platform" },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
];

const services = [
  {
    title: "Disruption Sensing",
    description:
      "Continuous monitoring of maritime telemetry, regulatory feeds, and weather signals with multi-source validation.",
    icon: Radio,
    tag: "Live Intelligence",
  },
  {
    title: "Scenario Rehearsal",
    description:
      "Multi-horizon stress testing from 2-hour delays to permanent closures — prepared before disruption strikes.",
    icon: GitFork,
    tag: "Continuous Rehearsal",
  },
  {
    title: "Digital Twin Network",
    description:
      "Computational graph of suppliers, ports, shipments, plants, and inventory with real-time health scoring.",
    icon: Network,
    tag: "Network Visibility",
  },
  {
    title: "Autonomous Agents",
    description:
      "Ten specialized agents for logistics, inventory, procurement, finance, compliance, and orchestration.",
    icon: Cpu,
    tag: "Agentic AI",
  },
  {
    title: "Decision Governance",
    description:
      "Ranked recovery strategies with proportional risk gates — auto-execute low-risk, human-approve high-impact.",
    icon: ShieldCheck,
    tag: "Governance",
  },
  {
    title: "Recovery Control Tower",
    description:
      "Unified command center to approve playbooks, execute recovery actions, and monitor network restoration.",
    icon: LayoutDashboard,
    tag: "Operations",
  },
];

const capabilities = [
  {
    title: "Shipment Tracking",
    description: "Monitor vessel status, ETAs, and risk levels across global maritime lanes.",
    icon: Ship,
  },
  {
    title: "Inventory Control",
    description: "Track buffer stock, burn rates, and redistribution capacity across staging hubs.",
    icon: Warehouse,
  },
  {
    title: "Network Analytics",
    description: "Financial exposure, service level impact, and recovery readiness across the supply graph.",
    icon: BarChart3,
  },
  {
    title: "Global Operations",
    description: "Multi-tier supplier network spanning Shanghai, Monterrey, Detroit, and deepwater ports.",
    icon: Globe,
  },
];

const stats = [
  { label: "Active Shipments", value: shipmentsData.length },
  { label: "OEM Customers", value: customersData.length },
  { label: "Tier-1/2 Suppliers", value: suppliersData.length },
  { label: "Staging Hubs", value: inventoryData.length },
  { label: "Assembly Plants", value: plantsData.length },
  { label: "Scenario Horizons", value: scenariosData.length },
  { label: "Active Signals", value: eventsData.length },
  { label: "Autonomous Agents", value: 10 },
];

const trustIndicators = [
  "Multi-source signal validation",
  "Proportional risk governance",
  "USMCA & Section 301 compliance",
  "Real-time digital twin sync",
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function EnterAppButton({
  className,
  children,
  onClick,
}: {
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link href={APP_HOME} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const enterAppClass =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-md hover:bg-brand-primary/90 transition-colors";

  return (
    <div className="min-h-screen bg-brand-background text-brand-dark">
      <header className="fixed top-0 inset-x-0 z-50 bg-brand-surface/95 border-b border-brand-border backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/homepage" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-md bg-brand-primary flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-lg text-brand-dark leading-tight block">
                  Resilience
                </span>
                <span className="text-[10px] font-mono text-brand-muted tracking-widest uppercase block">
                  Autopilot
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) =>
                link.href.startsWith("#") ? (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href.slice(1))}
                    className="text-sm font-medium text-brand-secondary hover:text-brand-primary transition-colors"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-brand-secondary hover:text-brand-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className="hidden md:flex items-center">
              <EnterAppButton className={enterAppClass}>
                Get Started
                <ArrowRight className="w-4 h-4" />
              </EnterAppButton>
            </div>

            <button
              className="md:hidden p-2 text-brand-secondary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-brand-border bg-brand-surface px-4 py-4 space-y-3">
            {navLinks.map((link) =>
              link.href.startsWith("#") ? (
                <button
                  key={link.label}
                  onClick={() => {
                    scrollToSection(link.href.slice(1));
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm font-medium text-brand-secondary py-2"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm font-medium text-brand-secondary py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <EnterAppButton
              className="block w-full text-center px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </EnterAppButton>
          </div>
        )}
      </header>

      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-primary/8 border border-brand-primary/15 rounded-md">
                <span className="w-2 h-2 rounded-full bg-brand-success animate-pulse" />
                <span className="text-xs font-mono font-medium text-brand-primary">
                  Enterprise Supply Chain Resilience Platform
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-brand-dark leading-[1.1] tracking-tight">
                  Your Complete Supply Chain Resilience Partner
                </h1>
                <p className="text-lg text-brand-secondary leading-relaxed max-w-xl">
                  Resilience Autopilot continuously monitors disruption signals, rehearses
                  multi-horizon scenarios, and executes validated recovery playbooks — so your
                  network stays prepared before damage occurs.
                </p>
              </div>

              <EnterAppButton className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand-primary text-white font-semibold rounded-md hover:bg-brand-primary/90 transition-colors">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </EnterAppButton>

              <div className="flex flex-wrap gap-6 pt-2">
                {trustIndicators.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-brand-muted">
                    <CheckCircle2 className="w-4 h-4 text-brand-success shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-lg overflow-hidden border border-brand-border shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
                  alt="Global container port logistics operations"
                  width={800}
                  height={560}
                  className="w-full h-[320px] sm:h-[400px] lg:h-[480px] object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-brand-surface/95 backdrop-blur-sm rounded-md p-3 border border-brand-border">
                      <div className="text-[10px] font-mono text-brand-muted uppercase">Network Health</div>
                      <div className="text-xl font-bold text-brand-success tabular-data">97%</div>
                    </div>
                    <div className="bg-brand-surface/95 backdrop-blur-sm rounded-md p-3 border border-brand-border">
                      <div className="text-[10px] font-mono text-brand-muted uppercase">Shipments</div>
                      <div className="text-xl font-bold text-brand-dark tabular-data">{shipmentsData.length}</div>
                    </div>
                    <div className="bg-brand-surface/95 backdrop-blur-sm rounded-md p-3 border border-brand-border">
                      <div className="text-[10px] font-mono text-brand-muted uppercase">Agents</div>
                      <div className="text-xl font-bold text-brand-primary tabular-data">10</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-brand-surface border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-brand-primary tabular-data">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-brand-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="landing-section py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <span className="text-sm font-mono font-semibold text-brand-primary uppercase tracking-wider">
                About Resilience Autopilot
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-dark leading-tight">
                We don&apos;t wait for disruption to plan. We continuously rehearse it.
              </h2>
              <p className="text-brand-secondary leading-relaxed">
                Resilience Autopilot is an agentic decision and resilience control system for
                global supply chains. It monitors external-world signals, validates them through
                independent sources, rehearses increasingly severe scenarios, and evaluates recovery
                strategies through specialized decision agents.
              </p>
              <p className="text-brand-secondary leading-relaxed">
                When disruption becomes real, the system re-evaluates the situation, automatically
                executes low-risk actions, routes high-impact decisions to humans, and re-optimizes
                until the network heals. Prediction is not the outcome — preparedness is.
              </p>
            </div>

            <div className="bg-brand-surface border border-brand-border rounded-lg p-8 space-y-6">
              <h3 className="font-display text-xl font-bold text-brand-dark">System Loop</h3>
              <div className="space-y-4">
                {[
                  "Sense external disruption signals",
                  "Validate through multi-source correlation",
                  "Rehearse multi-horizon scenarios",
                  "Optimize recovery strategies",
                  "Govern with proportional risk gates",
                  "Act and verify network restoration",
                ].map((step, i) => (
                  <div key={step} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-md bg-brand-primary/10 text-brand-primary flex items-center justify-center text-sm font-bold shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-brand-secondary pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="landing-section py-20 lg:py-28 bg-brand-surface border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-mono font-semibold text-brand-primary uppercase tracking-wider">
              Platform Modules
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-dark mt-3 leading-tight">
              End-to-end supply chain resilience
            </h2>
            <p className="text-brand-secondary mt-4 leading-relaxed">
              Every module connects to live operational data in your Resilience Autopilot
              workspace — from signal detection to recovery execution.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-brand-background border border-brand-border rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-md bg-brand-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-primary" />
                    </div>
                    <span className="text-[10px] font-mono font-medium text-brand-muted uppercase tracking-wider px-2 py-1 bg-brand-surface border border-brand-border rounded">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-brand-dark mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-brand-secondary leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="capabilities" className="landing-section py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <span className="text-sm font-mono font-semibold text-brand-primary uppercase tracking-wider">
                Supply Chain Capabilities
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-dark mt-3 leading-tight">
                Built for automotive OEM supply networks
              </h2>
              <p className="text-brand-secondary mt-4 leading-relaxed">
                Manage tier-1 semiconductor suppliers, deepwater port operations, cross-border
                assembly plants, and OEM contract fulfillment — all from a unified resilience
                platform.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {capabilities.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={cap.title}
                    className="p-5 bg-brand-surface border border-brand-border rounded-lg"
                  >
                    <Icon className="w-5 h-5 text-brand-primary mb-3" />
                    <h3 className="font-semibold text-brand-dark mb-1">{cap.title}</h3>
                    <p className="text-sm text-brand-muted leading-relaxed">{cap.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-brand-surface border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-mono font-semibold text-brand-primary uppercase tracking-wider">
              Enterprise Network
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-dark mt-3">
              Trusted by OEM supply chain operations
            </h2>
            <p className="text-brand-secondary mt-4">
              Active contracts and service level agreements across North American automotive
              assembly operations.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {customersData.map((customer) => (
              <div
                key={customer.id}
                className="bg-brand-background border border-brand-border rounded-lg p-6 text-center"
              >
                <h3 className="font-semibold text-brand-dark text-sm leading-snug mb-3">
                  {customer.name}
                </h3>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-brand-success tabular-data">
                    {customer.currentServiceLevel}%
                  </div>
                  <div className="text-xs text-brand-muted">Current Service Level</div>
                  <div className="text-xs font-mono text-brand-muted pt-2 border-t border-brand-border">
                    SLA Threshold: {customer.slaThresholdPercent}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-brand-dark rounded-lg overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <Image
                src="https://images.unsplash.com/photo-1494412574643-ff11f0e5c0c5?w=1200&q=80"
                alt=""
                fill
                className="object-cover"
                aria-hidden="true"
              />
            </div>
            <div className="relative px-8 py-16 sm:px-12 sm:py-20 text-center">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight max-w-2xl mx-auto">
                Ready to orchestrate your supply chain resilience?
              </h2>
              <p className="text-white/70 mt-4 max-w-xl mx-auto leading-relaxed">
                Open the Control Tower to monitor live signals, rehearse scenarios, and execute
                validated recovery playbooks across your global network.
              </p>
              <div className="flex justify-center mt-8">
                <EnterAppButton className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-primary text-white font-semibold rounded-md hover:bg-brand-primary/90 transition-colors">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </EnterAppButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-brand-surface border-t border-brand-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-brand-primary flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-brand-dark block leading-tight">
                  Resilience Autopilot
                </span>
                <span className="text-xs text-brand-muted">
                  Enterprise Decision &amp; Resilience Control System
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-brand-border text-center text-sm text-brand-muted">
            &copy; {new Date().getFullYear()} Resilience Autopilot. Supply chain resilience through continuous rehearsal.
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useMemo, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Check, CircleHelp, Crosshair, Gauge, Menu, Plus, Search, Shield, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories, equipment, toggleCompareSelection, type Equipment } from "@/data/equipment";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arsenal of Bharat — Indian Defence Equipment Archive" },
      { name: "description", content: "Explore India's defence equipment across the Army, Navy, and Air Force." },
      { property: "og:title", content: "Arsenal of Bharat — Indian Defence Equipment Archive" },
      { property: "og:description", content: "Explore India's defence equipment across the Army, Navy, and Air Force." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArsenalPage,
});

function ArsenalPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<Equipment | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = useMemo(() => {
    const search = query.trim().toLowerCase();
    return search ? equipment.filter((item) => `${item.name} ${item.category} ${item.branch}`.toLowerCase().includes(search)).slice(0, 4) : [];
  }, [query]);
  const filteredEquipment = useMemo(() => {
    const search = query.trim().toLowerCase();
    return equipment.filter((item) => {
      const categoryMatch = activeCategory === "All"
        || item.branch === activeCategory
        || (activeCategory === "Guided Missiles" && item.group === "Guided missiles")
        || (activeCategory === "Drones" && item.group === "Uncrewed");
      const searchMatch = !search || `${item.name} ${item.category} ${item.branch} ${item.manufacturer}`.toLowerCase().includes(search);
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, query]);
  const compared = compareIds.map((id) => equipment.find((item) => item.id === id)).filter((item): item is Equipment => Boolean(item));

  const chooseSuggestion = (item: Equipment) => {
    setQuery(item.name);
    setShowSuggestions(false);
    setSelectedItem(item);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="relative z-20 border-b border-line/70 bg-background/95">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10">
          <a href="#top" className="group flex items-center gap-3" aria-label="Arsenal of Bharat home">
            <span className="flex size-9 items-center justify-center border border-saffron/50 text-saffron"><Shield className="size-[18px]" strokeWidth={1.7} /></span>
            <span className="font-display text-xl font-bold uppercase tracking-[.04em]">Arsenal <span className="text-saffron">of</span> Bharat</span>
          </a>
          <nav className="hidden items-center gap-8 text-xs uppercase tracking-[.12em] text-muted-foreground md:flex">
            <a className="transition-colors hover:text-foreground" href="#collection">Collection</a>
            <a className="transition-colors hover:text-foreground" href="#about">About archive</a>
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-[10px] uppercase tracking-[.14em] text-muted-foreground sm:flex"><span className="size-1.5 rounded-full bg-leaf" /> Open archive</span>
            <Button variant="outline" size="icon" className="size-9 rounded-none border-line md:hidden" aria-label="Open navigation"><Menu className="size-4" /></Button>
            <Button onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })} className="hidden h-9 rounded-none px-4 text-xs uppercase tracking-[.08em] sm:inline-flex">Explore collection <ArrowRight /></Button>
          </div>
        </div>
      </header>

      <section id="top" className="relative min-h-[590px] overflow-hidden border-b border-line md:min-h-[650px]">
        <img src={equipment[0]?.image} alt="Tejas light combat aircraft on an airfield" width={1280} height={720} className="absolute inset-0 h-full w-full object-cover object-center opacity-65" />
        <div className="hero-grid absolute inset-0" />
        <div className="hero-dots absolute inset-0" />
        <div className="absolute right-[15%] top-[23%] hidden size-48 rounded-full border border-saffron/20 lg:block"><div className="hero-signal absolute inset-5 rounded-full border border-leaf/35" /><div className="absolute left-1/2 top-0 h-full w-px bg-saffron/20" /><div className="absolute left-0 top-1/2 h-px w-full bg-saffron/20" /><span className="absolute -right-16 top-5 text-[9px] uppercase tracking-[.2em] text-saffron/80">20° 35′ 12″ N</span></div>
        <div className="relative mx-auto flex min-h-[590px] max-w-[1440px] flex-col justify-center px-5 pb-20 pt-16 md:min-h-[650px] md:px-10 md:pb-24">
          <div className="mb-7 flex items-center gap-3 text-[10px] uppercase tracking-[.25em] text-saffron"><span className="h-px w-8 bg-saffron" /> A living archive · Est. 2026</div>
          <h1 className="max-w-[840px] font-display text-6xl font-bold uppercase leading-[.78] tracking-[0] sm:text-8xl xl:text-9xl">Arsenal <span className="text-saffron">of</span><br />Bharat<span className="text-saffron">.</span></h1>
          <p className="mt-8 max-w-lg text-sm leading-7 text-foreground/75 md:text-base">A field guide to the machines, systems and stories shaping India’s defence forces.</p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[10px] uppercase tracking-[.15em] text-muted-foreground">
            <span className="flex items-center gap-2"><span className="size-1.5 bg-saffron" /> Army</span><span className="flex items-center gap-2"><span className="size-1.5 bg-leaf" /> Air Force</span><span className="flex items-center gap-2"><span className="size-1.5 bg-steel" /> Navy</span>
          </div>
          <div className="mt-12 flex max-w-[650px] flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input aria-label="Search equipment" placeholder="Search equipment, systems, manufacturers..." value={query} onChange={(event) => { setQuery(event.target.value); setShowSuggestions(true); }} onFocus={() => setShowSuggestions(true)} onKeyDown={(event) => { if (event.key === "Escape") setShowSuggestions(false); if (event.key === "Enter" && suggestions[0]) chooseSuggestion(suggestions[0]); }} className="h-14 w-full border border-line bg-background/90 pl-11 pr-11 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-saffron/70" />
              {query && <Button variant="ghost" size="icon" onClick={() => { setQuery(""); setShowSuggestions(false); }} className="absolute right-2 top-1/2 size-9 -translate-y-1/2" aria-label="Clear search"><X /></Button>}
              {showSuggestions && suggestions.length > 0 && <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-40 border border-line bg-popover shadow-xl">{suggestions.map((item) => <Button key={item.id} variant="ghost" onMouseDown={(event) => event.preventDefault()} onClick={() => chooseSuggestion(item)} className="h-auto w-full justify-start gap-3 rounded-none border-b border-line/70 p-3 text-left last:border-0 hover:bg-accent"><img src={item.image} alt="" className="size-10 object-cover" /><span className="min-w-0 flex-1"><span className="block text-sm font-medium">{item.name}</span><span className="mt-1 block text-[10px] uppercase tracking-wider text-muted-foreground">{item.branch} · {item.category}</span></span><ArrowRight className="size-4 text-saffron" /></Button>)}</div>}
            </div>
            <Button onClick={() => { setShowSuggestions(false); document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" }); }} className="h-14 rounded-none px-6 uppercase tracking-[.1em]">Explore archive <ArrowDown /></Button>
          </div>
          <p className="mt-3 text-[10px] uppercase tracking-[.12em] text-muted-foreground">{equipment.length} systems catalogued <span className="mx-2 text-saffron">/</span> updated periodically</p>
        </div>
        <div className="absolute bottom-0 right-5 hidden gap-8 border-l border-line/50 px-7 py-4 text-right md:flex"><span className="text-[9px] uppercase tracking-[.15em] text-muted-foreground">From land<br />to ocean</span><span className="font-display text-lg uppercase tracking-wide">01 <span className="text-saffron">/</span> 07</span></div>
      </section>

      <section id="collection" className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
        <div className="mb-9 flex flex-col justify-between gap-5 border-b border-line pb-7 md:flex-row md:items-end">
          <div><div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[.2em] text-saffron"><SlidersHorizontal className="size-3.5" /> The collection</div><h2 className="font-display text-4xl font-bold uppercase leading-none md:text-5xl">Explore the <span className="text-muted-foreground">force.</span></h2></div>
          <p className="max-w-sm text-xs leading-5 text-muted-foreground">Browse selected platforms and systems across India’s armed forces. Compare publicly available specifications.</p>
        </div>
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-wrap gap-2" aria-label="Filter by category">{categories.map((category) => <Button key={category} variant={activeCategory === category ? "default" : "outline"} onClick={() => setActiveCategory(category)} className={`h-9 rounded-none px-4 text-[10px] uppercase tracking-[.12em] ${activeCategory === category ? "" : "border-line text-muted-foreground hover:text-foreground"}`}>{category}</Button>)}</div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground"><span>{filteredEquipment.length} results</span><span className="h-4 w-px bg-line"/><Button variant="ghost" onClick={() => { setActiveCategory("All"); setQuery(""); }} className="h-8 rounded-none px-1 text-[10px] uppercase tracking-wider text-muted-foreground hover:text-saffron">Reset filters <X className="ml-1 inline size-3" /></Button></div>
        </div>
        {filteredEquipment.length ? <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-x-5 gap-y-8">{filteredEquipment.map((item, index) => <EquipmentCard key={item.id} item={item} index={index} compared={compareIds.includes(item.id)} compareDisabled={compareIds.length >= 3 && !compareIds.includes(item.id)} onOpen={() => setSelectedItem(item)} onCompare={() => setCompareIds((previous) => toggleCompareSelection(previous, item.id))} />)}</div> : <div className="flex min-h-64 flex-col items-center justify-center border border-dashed border-line text-center"><Search className="mb-4 size-7 text-muted-foreground"/><h3 className="font-display text-2xl uppercase">No systems found</h3><p className="mt-2 text-sm text-muted-foreground">Try another name or change your filters.</p></div>}
      </section>

      <section id="about" className="border-y border-line bg-card/50">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 md:grid-cols-[1fr_auto] md:items-center md:px-10 md:py-14">
          <div className="flex gap-5"><div className="hidden h-16 w-1 shrink-0 bg-saffron sm:block"/><div><p className="mb-2 text-[10px] uppercase tracking-[.2em] text-saffron">About this archive</p><h2 className="font-display text-3xl font-bold uppercase">An evolving record.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">A non-official, educational reference. Specifications are indicative and sourced from public reporting; programme status and capabilities may change.</p></div></div>
          <div className="flex gap-8 border-t border-line pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0"><div><div className="font-display text-3xl font-bold">03</div><div className="mt-1 text-[9px] uppercase tracking-[.15em] text-muted-foreground">Services</div></div><div><div className="font-display text-3xl font-bold">07</div><div className="mt-1 text-[9px] uppercase tracking-[.15em] text-muted-foreground">Platforms</div></div><div><div className="font-display text-3xl font-bold text-leaf">IN</div><div className="mt-1 text-[9px] uppercase tracking-[.15em] text-muted-foreground">India</div></div></div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1440px] flex-col justify-between gap-3 px-5 py-7 text-[10px] uppercase tracking-[.13em] text-muted-foreground sm:flex-row sm:items-center md:px-10"><span>Arsenal of Bharat <span className="text-saffron">·</span> Open reference archive</span><span>For education & public interest <CircleHelp className="ml-1 inline size-3" /></span></footer>

      <Dialog open={Boolean(selectedItem)} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-h-[92vh] max-w-4xl gap-0 overflow-y-auto rounded-none border-line bg-background p-0">
          {selectedItem && <EquipmentDetail item={selectedItem} compared={compareIds.includes(selectedItem.id)} onCompare={() => setCompareIds((previous) => toggleCompareSelection(previous, selectedItem.id))} compareDisabled={compareIds.length >= 3 && !compareIds.includes(selectedItem.id)} />}
        </DialogContent>
      </Dialog>

      <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
        <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto rounded-none border-line bg-background p-0">
          <div className="border-b border-line p-6 md:p-8"><DialogHeader className="text-left"><p className="mb-2 text-[10px] uppercase tracking-[.2em] text-saffron">Side by side</p><DialogTitle className="font-display text-4xl uppercase">Compare systems</DialogTitle><DialogDescription className="text-muted-foreground">Publicly reported specifications · values may vary by variant</DialogDescription></DialogHeader></div>
          {compared.length > 0 ? <div className="overflow-x-auto p-5 md:p-8"><table className="w-full min-w-[640px] border-collapse text-left"><thead><tr><th className="w-40 border-b border-line p-3 text-[10px] uppercase tracking-widest text-muted-foreground">Specification</th>{compared.map((item) => <th key={item.id} className="min-w-44 border-b border-line p-3 align-top"><img src={item.image} alt="" className="mb-3 aspect-video w-full object-cover"/><span className="font-display text-xl uppercase">{item.name}</span><span className="mt-1 block text-[9px] uppercase tracking-widest text-saffron">{item.branch}</span></th>)}</tr></thead><tbody>{[["Category", ...compared.map((item) => item.category)], ["Speed", ...compared.map((item) => item.speed)], ["Range", ...compared.map((item) => item.range)], ["Payload / role", ...compared.map((item) => item.payload)], ["Manufacturer", ...compared.map((item) => item.manufacturer)], ["Service entry", ...compared.map((item) => item.serviceEntry)], ["Status", ...compared.map((item) => item.status)]].map((row) => <tr key={row[0]} className="border-b border-line/70"><th className="p-3 text-xs font-medium text-muted-foreground">{row[0]}</th>{row.slice(1).map((cell, index) => <td key={index} className="p-3 text-sm">{cell}</td>)}</tr>)}</tbody></table><div className="mt-6 text-right"><Button variant="outline" onClick={() => setCompareOpen(false)} className="rounded-none">Done <Check /></Button></div></div> : <div className="p-10 text-center text-muted-foreground">Select up to three systems to compare.</div>}
        </DialogContent>
      </Dialog>

      {compareIds.length > 0 && <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-popover/95 shadow-[0_-12px_40px_var(--background)] backdrop-blur"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between md:px-10"><div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center border border-saffron/50 text-saffron"><Crosshair className="size-4" /></span><span className="text-[10px] uppercase tracking-[.15em]">Compare <span className="text-saffron">{compareIds.length}/3</span></span><div className="flex gap-2">{compared.map((item) => <Button variant="outline" key={item.id} onClick={() => setCompareIds((previous) => toggleCompareSelection(previous, item.id))} className="h-8 rounded-none px-2 text-xs">{item.shortName}<X className="size-3 text-muted-foreground" /></Button>)}</div></div><div className="flex gap-2"><Button variant="ghost" onClick={() => setCompareIds([])} className="h-9 rounded-none text-xs uppercase tracking-wider text-muted-foreground">Clear</Button><Button onClick={() => setCompareOpen(true)} className="h-9 rounded-none px-4 text-xs uppercase tracking-wider" disabled={compareIds.length < 2}>Compare systems <ArrowRight /></Button></div></div></div>}
    </main>
  );
}

function EquipmentCard({ item, index, compared, compareDisabled, onOpen, onCompare }: { item: Equipment; index: number; compared: boolean; compareDisabled: boolean; onOpen: () => void; onCompare: () => void }) {
  return <article className="catalog-card group min-w-0 border border-line bg-card transition-all duration-300 hover:-translate-y-1 hover:border-saffron/50 hover:shadow-[0_18px_40px_color-mix(in_oklab,var(--background)_30%,transparent)]">
    <div className="relative aspect-video overflow-hidden bg-muted"><img src={item.image} alt={`${item.name} equipment`} width={1280} height={720} loading="lazy" className="catalog-image h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-background/65 via-transparent to-transparent"/><span className="absolute left-3 top-3 border border-background/20 bg-background/85 px-2.5 py-1 text-[9px] uppercase tracking-[.15em] text-foreground">{item.branch}</span><span className="absolute right-3 top-3 flex items-center gap-1.5 bg-background/85 px-2.5 py-1 text-[9px] uppercase tracking-wider text-muted-foreground"><span className={`size-1.5 rounded-full ${item.status === "In service" ? "bg-leaf" : "bg-saffron"}`} />{item.status}</span><Button variant={compared ? "default" : "outline"} size="icon" onClick={onCompare} disabled={compareDisabled} aria-label={compared ? `Remove ${item.name} from comparison` : `Add ${item.name} to comparison`} title={compareDisabled ? "Comparison supports up to three systems" : compared ? "Remove from comparison" : "Add to comparison"} className="absolute bottom-3 right-3 size-9 rounded-none border-background/30 bg-background/85 text-foreground hover:border-saffron hover:bg-background hover:text-saffron disabled:cursor-not-allowed disabled:opacity-40">{compared ? <Check className="size-4"/> : <Plus className="size-4"/>}</Button></div>
    <div className="p-4 md:p-5"><div className="mb-3 flex items-center justify-between gap-2"><span className="text-[9px] uppercase tracking-[.14em] text-saffron">{item.designation}</span><span className="text-[9px] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span></div><h3 className="font-display text-[28px] font-bold uppercase leading-none">{item.name}</h3><div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><span>{item.category}</span><span className="size-1 rounded-full bg-line"/><span>{item.manufacturer}</span></div><div className="my-4 grid grid-cols-2 border-y border-line/80 py-3"><Metric label="Speed" value={item.speed}/><Metric label="Range" value={item.range}/></div><Button variant="ghost" onClick={onOpen} className="h-9 w-full justify-between rounded-none px-0 text-[10px] uppercase tracking-[.13em] text-foreground hover:bg-transparent hover:text-saffron">View specifications <ArrowRight className="size-4 transition-transform group-hover:translate-x-1"/></Button></div>
  </article>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0"><span className="block text-[9px] uppercase tracking-[.14em] text-muted-foreground">{label}</span><span className="mt-1 block truncate text-sm font-medium" title={value}>{value}</span></div>;
}

function EquipmentDetail({ item, compared, compareDisabled, onCompare }: { item: Equipment; compared: boolean; compareDisabled: boolean; onCompare: () => void }) {
  const [activeTab, setActiveTab] = useState("overview");
  return <>
    <div className="relative aspect-[16/8.3] min-h-52 bg-muted"><img src={item.image} alt={`${item.name} equipment`} width={1280} height={720} className="h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent"/><span className="absolute left-6 top-6 border border-background/30 bg-background/80 px-3 py-1.5 text-[9px] uppercase tracking-[.18em]">{item.branch} · {item.category}</span><span className="absolute bottom-5 left-6 text-[10px] uppercase tracking-[.17em] text-saffron">{item.designation}</span></div>
    <div className="px-5 pb-7 md:px-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><DialogHeader className="text-left"><DialogTitle className="font-display text-4xl font-bold uppercase md:text-5xl">{item.name}</DialogTitle><DialogDescription>{item.manufacturer} <span className="mx-1 text-saffron">/</span> Service entry: {item.serviceEntry}</DialogDescription></DialogHeader><Button variant={compared ? "secondary" : "outline"} onClick={onCompare} disabled={compareDisabled} className="h-10 shrink-0 rounded-none text-xs uppercase tracking-wider">{compared ? <Check /> : <Plus />}{compared ? "Added to compare" : "Add to compare"}</Button></div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-7"><TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-none border-b border-line bg-transparent p-0"><TabsTrigger value="overview" className="h-10 rounded-none border-b-2 border-transparent px-4 text-[10px] uppercase tracking-[.13em] data-[state=active]:border-saffron data-[state=active]:bg-transparent data-[state=active]:text-saffron data-[state=active]:shadow-none">Overview</TabsTrigger><TabsTrigger value="specifications" className="h-10 rounded-none border-b-2 border-transparent px-4 text-[10px] uppercase tracking-[.13em] data-[state=active]:border-saffron data-[state=active]:bg-transparent data-[state=active]:text-saffron data-[state=active]:shadow-none">Specifications</TabsTrigger><TabsTrigger value="history" className="h-10 rounded-none border-b-2 border-transparent px-4 text-[10px] uppercase tracking-[.13em] data-[state=active]:border-saffron data-[state=active]:bg-transparent data-[state=active]:text-saffron data-[state=active]:shadow-none">History</TabsTrigger><TabsTrigger value="status" className="h-10 rounded-none border-b-2 border-transparent px-4 text-[10px] uppercase tracking-[.13em] data-[state=active]:border-saffron data-[state=active]:bg-transparent data-[state=active]:text-saffron data-[state=active]:shadow-none">Operational status</TabsTrigger></TabsList>
        <TabsContent value="overview" className="mt-6"><p className="max-w-3xl text-sm leading-7 text-muted-foreground">{item.description}</p><div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4"><DetailStat icon={<Gauge />} label="Maximum speed" value={item.speed}/><DetailStat icon={<ArrowRight />} label="Reported range" value={item.range}/><DetailStat icon={<Crosshair />} label="Payload / role" value={item.payload}/><DetailStat icon={<Shield />} label="Service entry" value={item.serviceEntry}/></div></TabsContent>
        <TabsContent value="specifications" className="mt-5"><div className="grid gap-x-10 sm:grid-cols-2">{[...item.specs, { label: "Manufacturer", value: item.manufacturer }, { label: "Service status", value: item.status }].map((spec) => <div key={spec.label} className="flex justify-between gap-4 border-b border-line py-3"><span className="text-xs text-muted-foreground">{spec.label}</span><span className="text-right text-sm">{spec.value}</span></div>)}</div><p className="mt-5 text-[10px] leading-5 text-muted-foreground">Figures are drawn from public sources and may vary by variant, configuration and reporting date.</p></TabsContent>
        <TabsContent value="history" className="mt-6"><div className="max-w-3xl border-l border-saffron/60 pl-5"><p className="text-[10px] uppercase tracking-[.15em] text-saffron">Programme notes</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.history}</p></div></TabsContent>
        <TabsContent value="status" className="mt-6"><div className="flex items-start gap-4 border border-line bg-card p-5"><span className={`mt-1 size-2 rounded-full ${item.status === "In service" ? "bg-leaf" : "bg-saffron"}`} /><div><div className="font-display text-2xl uppercase">{item.status}</div><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Operational programme status is presented from public information and is not a real-time readiness assessment.</p></div></div></TabsContent>
      </Tabs>
    </div>
  </>;
}

function DetailStat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return <div className="border border-line bg-card p-3"><span className="flex items-center gap-2 text-[9px] uppercase tracking-[.12em] text-muted-foreground">{icon}{label}</span><span className="mt-2 block font-display text-xl uppercase">{value}</span></div>;
}
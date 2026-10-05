"use client";

import Image from "next/image";
import Link from "next/link";
import { useConceptNavigation } from "./useConceptNavigation";
import { FormEvent, useEffect, useRef, useState } from "react";

type Meal = { id: string; name: string; description: string; category: string; price: number; image: string; tag: string };
const meals: Meal[] = [
  { id: "jollof", name: "Smoky jollof & chicken", description: "Party-style rice. Grilled chicken. All the flavour.", category: "Rice bowls", price: 6500, image: "jollof", tag: "The signature" },
  { id: "rice", name: "House rice bowl", description: "Our smoky jollof, just how you like it.", category: "Rice bowls", price: 4500, image: "rice", tag: "Comfort in a bowl" },
  { id: "chicken", name: "Herb-grilled chicken", description: "Golden, juicy chicken with a fresh herb finish.", category: "Grills", price: 7000, image: "chicken", tag: "Off the grill" },
  { id: "hibiscus", name: "Hibiscus cooler", description: "A bright hibiscus brew. Best served ice-cold.", category: "Drinks", price: 2000, image: "hibiscus", tag: "Something refreshing" }
];
const categories = ["All meals", "Rice bowls", "Grills", "Drinks"];
const extras = [{ id: "plantain", name: "Sweet plantain", price: 1000 }, { id: "slaw", name: "Fresh slaw", price: 700 }];
type BagItem = { key: string; mealId: string; quantity: number; spice: string; large: boolean; extras: string[]; note: string; unitPrice: number };
const money = (n: number) => `₦${n.toLocaleString("en-NG")}`;
const enquiry = "/?concept=kitchen-concept#enquiry";

function Icon({ kind, size = 20 }: { kind: "arrow" | "bag" | "close" | "pin" | "sun" | "check"; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {kind === "arrow" && <path d="M5 19 19 5M5 5h14v14" />}
    {kind === "bag" && <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M8 8V6a4 4 0 0 1 8 0v2" /></>}
    {kind === "close" && <path d="m6 6 12 12M6 18 18 6" />}
    {kind === "pin" && <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>}
    {kind === "check" && <path d="m5 12 4 4L19 6" />}
    {kind === "sun" && <><circle cx="12" cy="12" r="4" /><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4.2 4.2l1.4 1.4m12.8 12.8 1.4 1.4M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></>}
  </svg>;
}

const kitchenSections = ["owan-top", "owan-menu", "owan-kitchen"] as const;

export function OwanKitchen() {
  const { section, navigate } = useConceptNavigation(kitchenSections);
  const [category, setCategory] = useState("All meals");
  const [bag, setBag] = useState<BagItem[]>([]);
  const [view, setView] = useState<"meal" | "bag" | "checkout" | "complete" | null>(null);
  const [meal, setMeal] = useState<Meal>(meals[0]);
  const [spice, setSpice] = useState("Medium");
  const [large, setLarge] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [fulfilment, setFulfilment] = useState("Delivery");
  const [announcement, setAnnouncement] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const checkoutForm = useRef<HTMLFormElement>(null);
  const count = bag.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = bag.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const delivery = fulfilment === "Delivery" ? 1500 : 0;
  const isDrink = meal.category === "Drinks";
  const unitPrice = meal.price + (large ? 1200 : 0) + extras.filter(e => selectedExtras.includes(e.id)).reduce((sum, e) => sum + e.price, 0);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (view) {
      if (!element.open) element.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = previous; };
    }
    if (element.open) element.close();
  }, [view]);

  function customise(next: Meal) {
    setMeal(next); setSpice("Medium"); setLarge(false); setSelectedExtras([]); setQuantity(1); setNote(""); setView("meal");
  }

  function addMeal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const key = JSON.stringify([meal.id, isDrink ? "" : spice, large, [...selectedExtras].sort(), note.trim()]);
    setBag(current => {
      const existing = current.find(item => item.key === key);
      if (existing) return current.map(item => item.key === key ? { ...item, quantity: Math.min(20, item.quantity + quantity) } : item);
      return [...current, { key, mealId: meal.id, quantity, spice: isDrink ? "" : spice, large, extras: [...selectedExtras], note: note.trim(), unitPrice }];
    });
    setAnnouncement(`${meal.name} added to your bag.`); setView(null);
  }

  function updateQuantity(key: string, change: number) {
    setBag(current => current.map(item => item.key === key ? { ...item, quantity: Math.min(20, item.quantity + change) } : item).filter(item => item.quantity > 0));
  }

  function completePreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setView("complete");
  }

  return <div className="owan">
    <div className="owan-demo-bar">
      <Link href="/" className="owan-back">← <span>PaTH Digital Studio</span></Link>
      <span className="owan-demo-label">Food & restaurants <span>·</span> Concept demo</span>
      <Link href={enquiry}>Build something like this <Icon kind="arrow" size={13} /></Link>
    </div>
    <div className="owan-container">
      <nav className="owan-nav" aria-label="Kitchen Concept navigation">
        <a className="owan-logo" href="#owan-top" onClick={event => { event.preventDefault(); navigate("owan-top"); }} aria-label="Kitchen Concept home">kitchen<span>.</span><small>CONCEPT</small></a>
        <div className="owan-nav-links">{[["owan-top", "Home"], ["owan-menu", "The menu"], ["owan-kitchen", "Our kitchen"]].map(([id, label]) => <a key={id} href={`#${id}`} aria-current={section === id ? "page" : undefined} onClick={event => { event.preventDefault(); navigate(id); }}>{label}</a>)}</div>
        <button className="owan-bag" onClick={() => setView("bag")} aria-label={`Open your bag, ${count} items`}><Icon kind="bag" size={18} /><span>Your bag</span><b>{count}</b></button>
      </nav>
      <main>
        <section className="owan-hero" id="owan-top" hidden={section !== "owan-top"}>
          <div className="owan-hero-copy">
            <span className="owan-eyebrow"><span className="owan-dot" /> Lagos roots. Big flavour.</span>
            <h1>Good food.<br /><span>Better mood.</span></h1>
            <p>Your everyday favourites,<br className="owan-desktop-break" /> with a little extra soul.</p>
            <div className="owan-hero-actions"><a className="owan-primary" href="#owan-menu" onClick={event => { event.preventDefault(); navigate("owan-menu"); }}>Find your favourite <Icon kind="arrow" size={19} /></a><span>Made fresh.<br /><b>Always.</b></span></div>
            <div className="owan-hero-foot"><span>01 — A taste of home</span><span>Rice bowls / Grills / Good company</span></div>
          </div>
          <div className="owan-hero-visual">
            <div className="owan-photo-arch"><Image src="/concepts/owan/jollof.webp" alt="Nigerian jollof rice with grilled chicken, salad and plantain" fill priority sizes="(max-width: 760px) 90vw, 44vw" /></div>
            <div className="owan-soul-stamp"><Icon kind="sun" size={27} /><span>A little<br />extra soul.</span></div>
            <div className="owan-photo-label"><span>THE HOUSE SIGNATURE</span><b>Smoky jollof & chicken</b><button onClick={() => customise(meals[0])} aria-label="Customise smoky jollof and chicken"><Icon kind="arrow" size={18} /></button></div>
          </div>
        </section>
        <div className="owan-flavour-strip" hidden={section !== "owan-top"}><span>Cooked from scratch</span><Icon kind="sun" size={21} /><span>Full of flavour</span><Icon kind="sun" size={21} /><span>Made for your everyday</span></div>
        <section className="owan-menu" id="owan-menu" hidden={section !== "owan-menu"} aria-labelledby="owan-menu-title">
          <div className="owan-section-heading"><div><span className="owan-eyebrow">The good stuff</span><h2 id="owan-menu-title">What are you craving?</h2></div><span className="owan-menu-aside">Something for every kind of hungry.</span></div>
          <div className="owan-categories" aria-label="Filter meals">{categories.map(c => <button key={c} className={category === c ? "active" : ""} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>)}</div>
          <div className="owan-meal-grid">{meals.filter(m => category === "All meals" || m.category === category).map(m => <article className="owan-meal" key={m.id}>
            <button className="owan-meal-photo" onClick={() => customise(m)} aria-label={`Customise ${m.name}`}><Image src={`/concepts/owan/${m.image}.webp`} alt={m.name} fill sizes="(max-width: 540px) 90vw, (max-width: 1000px) 45vw, 23vw" /><span>{m.tag}</span><span className="owan-meal-arrow"><Icon kind="arrow" size={20} /></span></button>
            <h3>{m.name}</h3><p>{m.description}</p><div className="owan-meal-price"><b>{money(m.price)}</b><button onClick={() => customise(m)} aria-label={`Add ${m.name}`}>+<span className="owan-sr-only"> Customise and add</span></button></div>
          </article>)}</div>
        </section>
        <section className="owan-kitchen" id="owan-kitchen" hidden={section !== "owan-kitchen"}>
          <div className="owan-kitchen-photo"><Image src="/concepts/owan/table.webp" alt="A Nigerian meal spread with rice and chicken" fill sizes="(max-width: 760px) 90vw, 45vw" /></div>
          <div className="owan-kitchen-copy"><span className="owan-eyebrow">From our kitchen, with love</span><h2>A little spice.<br />A lot of soul.</h2><p>Comfort food, done properly. Smoky rice, a well-seasoned grill, and the familiar flavours that make a meal feel like home.</p><a href="#owan-menu" onClick={event => { event.preventDefault(); navigate("owan-menu"); }} className="owan-primary">Pull up a plate <Icon kind="arrow" size={18} /></a><span className="owan-kitchen-sign">Good food brings us together.</span></div>
        </section>
      </main>
      <footer className="owan-footer"><a className="owan-logo" href="#owan-top" onClick={event => { event.preventDefault(); navigate("owan-top"); }}>kitchen<span>.</span></a><span>A restaurant concept by <Link href="/">PaTH Digital Studio ↗</Link></span><details><summary>Photo credits</summary><p>Food photography: <a href="https://unsplash.com/@keeshasskitchen" target="_blank" rel="noreferrer">Keesha’s Kitchen</a>, <a href="https://unsplash.com/photos/icciS_O3Gkk" target="_blank" rel="noreferrer">Chibuzo Nwaneri</a>, <a href="https://unsplash.com/photos/46i7Fqy4bto" target="_blank" rel="noreferrer">Angela Bailey</a> and <a href="https://unsplash.com/photos/1Gm_xrfRzUA" target="_blank" rel="noreferrer">Anshu A</a> / Unsplash.</p></details></footer>
    </div>
    <div className="owan-sr-only" role="status" aria-live="polite">{announcement}</div>
    {count > 0 && !view && <button className="owan-floating-bag" onClick={() => setView("bag")}><span><Icon kind="bag" size={18} /> View your bag <b>{count}</b></span><strong>{money(subtotal)} →</strong></button>}
    <dialog ref={dialog} className={`owan-dialog ${view !== "meal" ? "owan-drawer" : ""}`} aria-labelledby="owan-dialog-title" onCancel={() => setView(null)} onClose={() => setView(null)} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setView(null); } }}>
      <button className="owan-close" onClick={() => setView(null)} aria-label="Close dialog" autoFocus><Icon kind="close" /></button>
      {view === "meal" && <form onSubmit={addMeal} className="owan-customise">
        <div className="owan-modal-photo"><Image src={`/concepts/owan/${meal.image}.webp`} alt={meal.name} fill sizes="(max-width: 760px) 90vw, 350px" /></div>
        <div className="owan-modal-content"><span className="owan-eyebrow">Make it yours</span><h2 id="owan-dialog-title">{meal.name}</h2><p className="owan-dialog-description">{meal.description}</p>
          {!isDrink && <><fieldset><legend>Your portion</legend><div className="owan-option-row">{[false, true].map(value => <label key={String(value)} className={large === value ? "selected" : ""}><input type="radio" name="portion" checked={large === value} onChange={() => setLarge(value)} /><span>{value ? "A little extra" : "Regular"}<small>{value ? `+${money(1200)}` : "Just right"}</small></span></label>)}</div></fieldset>
          <fieldset><legend>How much pepper?</legend><div className="owan-option-row">{["Mild", "Medium", "Hot"].map(value => <label key={value} className={spice === value ? "selected" : ""}><input type="radio" name="pepper" checked={spice === value} onChange={() => setSpice(value)} /><span>{value}</span></label>)}</div></fieldset>
          <fieldset><legend>The perfect extras <small>optional</small></legend>{extras.map(extra => <label className="owan-extra" key={extra.id}><input type="checkbox" checked={selectedExtras.includes(extra.id)} onChange={() => setSelectedExtras(current => current.includes(extra.id) ? current.filter(id => id !== extra.id) : [...current, extra.id])} /><span>{extra.name}</span><b>+{money(extra.price)}</b></label>)}</fieldset></>}
          <label className="owan-note">Anything we should know? <small>optional</small><input value={note} onChange={event => setNote(event.target.value)} maxLength={200} placeholder="e.g. Sauce on the side" /></label>
          <div className="owan-add-row"><div className="owan-quantity"><button type="button" aria-label="Decrease meal quantity" disabled={quantity <= 1} onClick={() => setQuantity(q => q - 1)}>−</button><output aria-label="Meal quantity">{quantity}</output><button type="button" aria-label="Increase meal quantity" disabled={quantity >= 20} onClick={() => setQuantity(q => q + 1)}>+</button></div><button className="owan-primary" type="submit">Add to bag <span>{money(unitPrice * quantity)}</span></button></div>
        </div>
      </form>}
      {view === "bag" && <div className="owan-drawer-content"><span className="owan-eyebrow">Good things inside</span><h2 id="owan-dialog-title">Your bag<span className="owan-count">{count}</span></h2>
        {count === 0 ? <div className="owan-empty"><Icon kind="bag" size={60} /><h3>Something good is missing.</h3><p>Find a favourite. Make it yours.</p><button className="owan-primary" onClick={() => { setView(null); navigate("owan-menu"); }}>Explore the menu <Icon kind="arrow" /></button></div> : <><div className="owan-bag-items">{bag.map(item => { const m = meals.find(m => m.id === item.mealId)!; return <article key={item.key} className="owan-bag-item"><Image src={`/concepts/owan/${m.image}.webp`} alt="" width={80} height={90} /><div><h3>{m.name}</h3><p>{[item.large ? "Extra portion" : "", item.spice ? `${item.spice} pepper` : "", ...extras.filter(e => item.extras.includes(e.id)).map(e => e.name)].filter(Boolean).join(" · ")}</p>{item.note && <p>{item.note}</p>}<div className="owan-item-bottom"><div className="owan-quantity"><button aria-label={`Decrease ${m.name} quantity`} onClick={() => updateQuantity(item.key, -1)}>−</button><span>{item.quantity}</span><button aria-label={`Increase ${m.name} quantity`} disabled={item.quantity >= 20} onClick={() => updateQuantity(item.key, 1)}>+</button></div><b>{money(item.unitPrice * item.quantity)}</b></div><button className="owan-remove" onClick={() => setBag(current => current.filter(i => i.key !== item.key))}>Remove<span className="owan-sr-only"> {m.name}</span></button></div></article>; })}</div><div className="owan-summary"><div><span>Subtotal</span><b>{money(subtotal)}</b></div><p>Choose delivery or pickup at checkout.</p><button className="owan-primary" onClick={() => setView("checkout")}>Go to checkout <Icon kind="arrow" /></button><button className="owan-text-button" onClick={() => { setView(null); navigate("owan-menu"); }}>Keep exploring the menu</button></div></>}
      </div>}
      {view === "checkout" && <form className="owan-drawer-content" onSubmit={completePreview} ref={checkoutForm}><button type="button" className="owan-text-button ow-back-to-bag" onClick={() => setView("bag")}>← Back to your bag</button><span className="owan-eyebrow">The last little step</span><h2 id="owan-dialog-title">Almost at the table.</h2><fieldset><legend>How would you like it?</legend><div className="owan-option-row">{["Delivery", "Pickup"].map(value => <label key={value} className={fulfilment === value ? "selected" : ""}><input type="radio" name="fulfilment" checked={fulfilment === value} onChange={() => setFulfilment(value)} /><span>{value}<small>{value === "Delivery" ? money(1500) : "Free"}</small></span></label>)}</div></fieldset>
        <div className="owan-sample-note"><span>Try checkout with sample details.</span><button type="button" onClick={() => { const form = checkoutForm.current; if (!form) return; (form.elements.namedItem("customer") as HTMLInputElement).value = "Demo guest"; const address = form.elements.namedItem("address") as HTMLInputElement | null; if (address) address.value = "12 Example Street, Lagos"; }}>Fill for me ↗</button></div>
        <label className="owan-note">Name<input name="customer" required maxLength={80} autoComplete="off" placeholder="Demo guest" /></label>
        {fulfilment === "Delivery" ? <label className="owan-note">Delivery address<input name="address" required maxLength={200} autoComplete="off" placeholder="Use a sample address" /></label> : <div className="owan-pickup"><Icon kind="pin" /><span>Kitchen Concept, Lagos<small>Sample pickup location</small></span></div>}
        <div className="owan-summary"><div><span>Meals ({count})</span><b>{money(subtotal)}</b></div><div><span>{fulfilment === "Delivery" ? "Delivery" : "Pickup"}</span><b>{delivery ? money(delivery) : "Free"}</b></div><div className="owan-total"><span>Total</span><b>{money(subtotal + delivery)}</b></div><button type="submit" className="owan-primary">Preview order <Icon kind="arrow" /></button><p className="owan-preview-note">Demo checkout · No payment or real order.</p></div>
      </form>}
      {view === "complete" && <div className="owan-drawer-content ow-complete"><div className="owan-success-icon"><Icon kind="check" size={40} /></div><span className="owan-eyebrow">That was deliciously easy</span><h2 id="owan-dialog-title">Your order,<br />looking good.</h2><p>{count} {count === 1 ? "item" : "items"} · {fulfilment} · {money(subtotal + delivery)}</p><p className="owan-preview-note">Demo complete. No order was placed.</p><Link href={enquiry} className="owan-primary">Build this for my business <Icon kind="arrow" /></Link><button className="owan-text-button" onClick={() => { setBag([]); setView(null); setAnnouncement("Demo complete. Your bag is now empty."); }}>Explore again</button></div>}
    </dialog>
  </div>;
}

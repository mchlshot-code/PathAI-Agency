"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useConceptNavigation } from "./useConceptNavigation";

const products = [
  { id: "linen", name: "Everyday linen", category: "Clothing", price: 24000, description: "Easy shapes. Quiet details. A shirt for your everyday.", sizes: ["S", "M", "L", "XL"], colours: [{ name: "Stone", swatch: "#9a9a90", image: "shirt" }, { name: "Natural", swatch: "#e6dfce", image: "shirt-sand" }] },
  { id: "backpack", name: "City backpack", category: "Accessories", price: 38000, description: "For the day ahead. A little room for everything you carry.", sizes: ["One size"], colours: [{ name: "Burgundy", swatch: "#844956", image: "bag" }] }
];
const sections = ["fashion-shop", "fashion-product-linen", "fashion-product-backpack", "fashion-bag"] as const;
const money = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;
const enquiry = "/contact?concept=fashion-concept";
type BagItem = { key: string; productId: string; colour: string; size: string; quantity: number; image: string };

function Arrow() { return <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>; }

export function FashionConcept() {
  const { section, navigate } = useConceptNavigation(sections);
  const [lastProduct, setLastProduct] = useState("linen");
  const product = products.find(item => item.id === (section.startsWith("fashion-product-") ? section.slice("fashion-product-".length) : lastProduct)) ?? products[0];
  const [filter, setFilter] = useState("All");
  const [colour, setColour] = useState("Stone");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [bag, setBag] = useState<BagItem[]>([]);
  const [checkout, setCheckout] = useState(0);
  const [fulfilment, setFulfilment] = useState("Delivery");
  const [guest, setGuest] = useState("");
  const [address, setAddress] = useState("");
  const [completeTotal, setCompleteTotal] = useState(0);
  const variant = product.colours.find(item => item.name === colour) ?? product.colours[0];
  const count = bag.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = bag.reduce((sum, item) => sum + products.find(p => p.id === item.productId)!.price * item.quantity, 0);
  const delivery = fulfilment === "Delivery" ? 2000 : 0;

  useEffect(() => { setLastProduct(product.id); setColour(product.colours[0].name); setSize(product.sizes.length === 1 ? product.sizes[0] : ""); setQuantity(1); }, [product.id]);

  function openProduct(id: string) { setLastProduct(id); navigate(`fashion-product-${id}`); }
  function addToBag() {
    if (!size) return;
    const key = JSON.stringify([product.id, variant.name, size]);
    setBag(current => {
      const existing = current.find(item => item.key === key);
      return existing ? current.map(item => item.key === key ? { ...item, quantity: Math.min(20, item.quantity + quantity) } : item) : [...current, { key, productId: product.id, colour: variant.name, size, quantity, image: variant.image }];
    });
    setCheckout(0); navigate("fashion-bag");
  }
  function updateQuantity(key: string, change: number) { setBag(current => current.map(item => item.key === key ? { ...item, quantity: Math.min(20, item.quantity + change) } : item).filter(item => item.quantity > 0)); }
  function review(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setCheckout(2); window.scrollTo({ top: 0, behavior: "instant" }); }
  function complete() { setCompleteTotal(subtotal + delivery); setBag([]); setCheckout(3); window.scrollTo({ top: 0, behavior: "instant" }); }

  return <div className="fashion">
    <div className="fashion-demo"><Link href="/">← PaTH Digital Studio</Link><span>Fashion & retail · Concept demo</span><Link href={enquiry}>Build something like this ↗</Link></div>
    <div className="fashion-wrap">
      <nav className="fashion-nav" aria-label="Fashion Concept navigation"><a href="#fashion-shop" className="fashion-logo" aria-label="Fashion Concept shop" onClick={event => { event.preventDefault(); navigate("fashion-shop"); }}>fashion<span aria-hidden="true">✳</span><small>CONCEPT STORE</small></a><div className="fashion-pages">{[["fashion-shop", "Shop"], [`fashion-product-${lastProduct}`, "Product"], ["fashion-bag", "Bag"]].map(([id, label]) => <a key={label} href={`#${id}`} aria-current={(label === "Product" ? section.startsWith("fashion-product-") : section === id) ? "page" : undefined} onClick={event => { event.preventDefault(); navigate(id); }}>{label}{label === "Bag" && <b>{count}</b>}</a>)}</div><span className="fashion-nav-note">Wear it your way.</span></nav>
      <main>
        <section id="fashion-shop" hidden={section !== "fashion-shop"} aria-labelledby="fashion-shop-title">
          <div className="fashion-hero"><div className="fashion-hero-copy"><span className="fashion-eyebrow">The everyday edit / 01</span><h1 id="fashion-shop-title">Your style.<br />Your rules.</h1><button className="fashion-hero-button" onClick={() => openProduct("linen")}>Find your fit <Arrow /></button></div><div className="fashion-hero-photo"><Image src="/concepts/fashion/shirt-sand.webp" alt="Natural-coloured linen shirt on a wooden hanger" fill priority sizes="(max-width: 760px) 34vw, 30vw" /><span>LESS NOISE.<br />MORE YOU.</span></div><span className="fashion-hero-index" aria-hidden="true">✳</span></div>
          <div className="fashion-shop-head"><h2>Good pieces. Your way.</h2><div className="fashion-filters" aria-label="Filter products">{["All", "Clothing", "Accessories"].map(value => <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}</button>)}</div></div>
          <div className="fashion-product-grid">{products.filter(item => filter === "All" || item.category === filter).map((item, index) => <article className="fashion-card" key={item.id}><button className="fashion-card-photo" aria-label={`Explore ${item.name}`} onClick={() => openProduct(item.id)}><Image src={`/concepts/fashion/${item.colours[0].image}.webp`} alt={item.name} fill sizes="(max-width: 760px) 75vw, 43vw" /><span className="fashion-card-number">0{index + 1} / {item.category}</span><span className="fashion-card-arrow"><Arrow /></span></button><div className="fashion-card-info"><div><h3>{item.name}</h3><span>{item.colours.length > 1 ? `${item.colours.length} colours` : item.colours[0].name}</span></div><b>{money(item.price)}</b></div></article>)}</div>
        </section>
        <section className="fashion-product" id={section.startsWith("fashion-product-") ? section : `fashion-product-${lastProduct}`} hidden={!section.startsWith("fashion-product-")} aria-labelledby="fashion-product-title">
          <div className="fashion-detail-photo"><Image src={`/concepts/fashion/${variant.image}.webp`} alt={`${product.name} in ${variant.name}`} fill sizes="(max-width: 760px) 38vw, 42vw" /><span>THE EVERYDAY EDIT</span></div>
          <div className="fashion-product-copy"><header className="fashion-product-heading"><span className="fashion-eyebrow">{product.category} / Concept piece</span><h2 id="fashion-product-title">{product.name}</h2><b className="fashion-price">{money(product.price)}</b><p>{product.description}</p></header><div className="fashion-product-options"><fieldset className="fashion-colours"><legend>Colour <b>{variant.name}</b></legend>{product.colours.map(item => <label key={item.name}><input type="radio" name="colour" aria-label={item.name} checked={variant.name === item.name} onChange={() => setColour(item.name)} /><span style={{ background: item.swatch }} /><small>{item.name}</small></label>)}</fieldset><fieldset className="fashion-sizes"><legend>Size {size && <b>{size}</b>}</legend>{product.sizes.map(value => <label key={value}><input type="radio" name="size" aria-label={`Size ${value}`} checked={size === value} onChange={() => setSize(value)} /><span>{value}</span></label>)}</fieldset>{product.sizes.length > 1 && <details className="fashion-size-guide"><summary>Size guide</summary><p>Sample chest measurements: S 92 cm · M 100 cm · L 108 cm · XL 116 cm. Illustrative sizes for this concept.</p></details>}<div className="fashion-add-row"><div className="fashion-quantity"><button type="button" aria-label="Decrease product quantity" disabled={quantity === 1} onClick={() => setQuantity(value => value - 1)}>−</button><output aria-label="Product quantity">{quantity}</output><button type="button" aria-label="Increase product quantity" disabled={quantity === 10} onClick={() => setQuantity(value => value + 1)}>+</button></div><button className="fashion-button" disabled={!size} onClick={addToBag}>{size ? "Add to bag" : "Choose a size"}<Arrow /></button></div><p className="fashion-detail-note">Sample collection. Make it yours.</p></div></div>
        </section>
        <section className="fashion-bag-view" id="fashion-bag" hidden={section !== "fashion-bag"} aria-labelledby="fashion-bag-title">
          <div className="fashion-bag-heading"><span className="fashion-eyebrow">{checkout === 0 ? "Good choices inside" : "Checkout preview"}</span><h2 id="fashion-bag-title">{checkout === 0 ? "Your bag." : checkout === 1 ? "Where shall it go?" : checkout === 2 ? "One last look." : "Your preview is ready."}</h2></div>
          {checkout === 3 ? <div className="fashion-complete" role="status"><span className="fashion-complete-mark">✓</span><h3>Your style. Sorted.</h3><p>Sample total: <b>{money(completeTotal)}</b>. No payment or real order.</p><button className="fashion-button" onClick={() => { setCheckout(0); navigate("fashion-shop"); }}>Back to the edit <Arrow /></button><Link href={enquiry}>Build a store like this →</Link></div> : count === 0 ? <div className="fashion-empty"><span aria-hidden="true">＋</span><h3>A little room for your next favourite.</h3><button className="fashion-button" onClick={() => navigate("fashion-shop")}>Explore the edit <Arrow /></button></div> : <div className="fashion-bag-layout"><div className="fashion-bag-panel">
            {checkout === 0 && <div className="fashion-bag-items">{bag.map(item => { const p = products.find(p => p.id === item.productId)!; const label = `${p.name} (${item.colour} / ${item.size})`; return <article key={item.key} className="fashion-bag-item"><Image src={`/concepts/fashion/${item.image}.webp`} alt={`${p.name} in ${item.colour}`} width={90} height={112} /><div><h3>{p.name}</h3><p>{item.colour} / {item.size}</p><div className="fashion-item-controls"><div className="fashion-quantity"><button aria-label={`Decrease ${label} quantity`} onClick={() => updateQuantity(item.key, -1)}>−</button><span>{item.quantity}</span><button aria-label={`Increase ${label} quantity`} disabled={item.quantity >= 20} onClick={() => updateQuantity(item.key, 1)}>+</button></div><button className="fashion-remove" aria-label={`Remove ${label}`} onClick={() => setBag(current => current.filter(value => value.key !== item.key))}>Remove</button></div></div><b>{money(p.price * item.quantity)}</b></article>; })}<button className="fashion-text-button" onClick={() => navigate("fashion-shop")}>← Keep exploring</button></div>}
            {checkout === 1 && <form onSubmit={review}><button type="button" className="fashion-text-button" onClick={() => setCheckout(0)}>← Back to your bag</button><fieldset className="fashion-fulfilment"><legend>Delivery or pickup?</legend>{["Delivery", "Pickup"].map(value => <label key={value}><input type="radio" name="fulfilment" checked={fulfilment === value} onChange={() => setFulfilment(value)} /><span>{value}<small>{value === "Delivery" ? money(2000) : "Free"}</small></span></label>)}</fieldset><label className="fashion-field">Name<input name="guest" value={guest} onChange={event => setGuest(event.target.value)} required maxLength={80} autoComplete="off" placeholder="Use a sample name" /></label>{fulfilment === "Delivery" ? <label className="fashion-field">Delivery address<input name="address" value={address} onChange={event => setAddress(event.target.value)} required maxLength={200} autoComplete="off" placeholder="Use a sample address" /></label> : <p className="fashion-pickup">Fashion Concept, Lagos · Sample pickup point</p>}<button type="button" className="fashion-text-button" onClick={() => { setGuest("Demo guest"); setAddress("12 Example Street, Lagos"); }}>Use sample details ↗</button><button type="submit" className="fashion-button fashion-next">Review order <Arrow /></button></form>}
            {checkout === 2 && <div><button className="fashion-text-button" onClick={() => setCheckout(1)}>← Edit details</button><dl className="fashion-review"><div><dt>Guest</dt><dd>{guest}</dd></div><div><dt>{fulfilment}</dt><dd>{fulfilment === "Delivery" ? address : "Sample pickup point, Lagos"}</dd></div>{bag.map(item => { const p = products.find(p => p.id === item.productId)!; return <div key={item.key}><dt>{p.name}<small>{item.colour} / {item.size} × {item.quantity}</small></dt><dd>{money(p.price * item.quantity)}</dd></div>; })}</dl><button className="fashion-button fashion-next" onClick={complete}>Preview order <Arrow /></button></div>}
          </div><aside className="fashion-order-summary"><span className="fashion-eyebrow">The little details</span><dl><div><dt>Pieces ({count})</dt><dd>{money(subtotal)}</dd></div><div><dt>{checkout === 0 ? "Delivery estimate" : fulfilment}</dt><dd>{checkout === 0 ? money(2000) : delivery ? money(delivery) : "Free"}</dd></div><div className="fashion-total"><dt>{checkout === 0 ? "Estimated total" : "Total"}</dt><dd>{money(subtotal + (checkout === 0 ? 2000 : delivery))}</dd></div></dl>{checkout === 0 && <button className="fashion-button" onClick={() => { setCheckout(1); window.scrollTo({ top: 0, behavior: "instant" }); }}>Try checkout <Arrow /></button>}<p>Demo checkout · No payment or real order.</p></aside></div>}
        </section>
      </main>
      <footer className="fashion-footer"><span>A fashion concept by <Link href="/">PaTH Digital Studio ↗</Link></span><details><summary>Photo credits</summary><p><a href="https://unsplash.com/@tiandayong" target="_blank" rel="noreferrer">tian dayong</a> and <a href="https://unsplash.com/@wiserbythemile" target="_blank" rel="noreferrer">Wiser by the Mile</a> / Unsplash. Editorial sample imagery.</p></details></footer>
    </div>
  </div>;
}

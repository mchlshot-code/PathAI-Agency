import type { Metadata } from "next";
import { OwanKitchen } from "@/components/concepts/OwanKitchen";
import "../owan-kitchen/owan.css";

export const metadata: Metadata = {
  title: "Kitchen Concept — Food & restaurant concept by PaTH",
  description: "Explore a restaurant and food-ordering concept by PaTH Digital Studio. Browse meals, customise your bowl and try the checkout preview.",
  alternates: { canonical: "https://pathai.name.ng/concepts/kitchen-concept" },
  openGraph: {
    title: "Kitchen Concept — A PaTH concept",
    description: "Good food. Better mood. An interactive restaurant concept.",
    url: "https://pathai.name.ng/concepts/kitchen-concept",
    images: [{ url: "https://pathai.name.ng/concepts/owan/jollof.webp" }]
  }
};

export default function RestaurantConcept() {
  return <OwanKitchen />;
}

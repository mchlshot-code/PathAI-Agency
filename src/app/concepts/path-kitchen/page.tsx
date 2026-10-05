import type { Metadata } from "next";
import { OwanKitchen } from "@/components/concepts/OwanKitchen";
import "../owan-kitchen/owan.css";

export const metadata: Metadata = {
  title: "PaTH Kitchen — Food & restaurant concept by PaTH",
  description: "Explore a restaurant and food-ordering concept by PaTH Digital Studio. Browse meals, customise your bowl and try the checkout preview.",
  alternates: { canonical: "https://pathai.name.ng/concepts/path-kitchen" },
  openGraph: {
    title: "PaTH Kitchen — A PaTH concept",
    description: "Good food. Better mood. An interactive restaurant concept.",
    url: "https://pathai.name.ng/concepts/path-kitchen",
    images: [{ url: "https://pathai.name.ng/concepts/owan/jollof.webp" }]
  }
};

export default function RestaurantConcept() {
  return <OwanKitchen />;
}

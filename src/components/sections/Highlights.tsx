import { highlights } from "@/data/highlights";
import Container from "@/components/ui/Container";
import HighlightCard from "./HighlightCard";

export default function Highlights() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, i) => (
            <HighlightCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

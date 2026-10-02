import { skills } from "@/data/skills";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillCategoryCard from "./SkillCategoryCard";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 py-24">
      <Container>
        <SectionHeading
          index="03"
          label="skills"
          title="Technical Skills"
          description="Organized by area, not arbitrary proficiency percentages."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((category, i) => (
            <SkillCategoryCard key={category.category} category={category} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

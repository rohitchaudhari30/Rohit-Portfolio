import { FileText, Eye, Download } from "lucide-react";
import { personal } from "@/data/personal";
import Container from "@/components/ui/Container";
import LinkButton from "@/components/ui/LinkButton";

export default function Resume() {
  const hasResume = Boolean(personal.resumeUrl);

  return (
    <section className="py-20">
      <Container>
        <div className="surface flex flex-col items-center gap-6 p-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md border border-ink-border text-signal">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-paper-100">Resume</h3>
              <p className="text-sm text-paper-400">
                A concise summary of my experience, skills, and projects — updated regularly.
              </p>
            </div>
          </div>

          <div className="flex flex-shrink-0 gap-3">
            {hasResume ? (
              <>
                <LinkButton href={personal.resumeUrl} target="_blank" variant="secondary" aria-label="View resume">
                  <Eye size={16} /> View
                </LinkButton>
                <LinkButton href={personal.resumeUrl} download variant="primary" aria-label="Download resume">
                  <Download size={16} /> Download
                </LinkButton>
              </>
            ) : (
              <p className="font-mono text-xs text-paper-500">Resume coming soon</p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

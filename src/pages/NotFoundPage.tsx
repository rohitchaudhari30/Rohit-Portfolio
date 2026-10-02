import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import LinkButton from "@/components/ui/LinkButton";

export default function NotFoundPage() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[70vh] items-center py-24"
    >
      <Container className="text-center">
        <p className="font-mono text-sm text-signal">404</p>
        <h1 className="mt-3 text-display-md font-semibold">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-paper-400">
          The page you're looking for doesn't exist, or the link may be out of date.
        </p>
        <div className="mt-8 flex justify-center">
          <LinkButton href="/" variant="primary">
            <ArrowLeft size={16} /> Back to Home
          </LinkButton>
        </div>
      </Container>
    </motion.section>
  );
}

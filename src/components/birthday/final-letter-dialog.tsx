import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { birthdayContent } from "@/constants/birthday-content";

export function FinalLetterDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="dream" size="lg">
          <span aria-hidden="true">♡</span>
          {birthdayContent.finalLetter.buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="heart-dialog max-h-[85vh] overflow-hidden rounded-[28px] border-border/60 bg-card/95 p-0 shadow-[var(--shadow-dream)] backdrop-blur-xl sm:max-w-2xl">
        <div className="heart-dialog-glow" />
        <DialogHeader className="border-b border-border/50 px-8 pb-5 pt-8 text-left">
          <DialogTitle className="font-display text-3xl text-foreground">
            {birthdayContent.finalLetter.title}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            {birthdayContent.finalLetter.subtitle}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[58vh] space-y-5 overflow-y-auto px-8 py-6 text-left text-base leading-8 text-foreground/90">
          {birthdayContent.finalLetter.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

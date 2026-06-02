import sweetMomentFireworks from "@/assets/sweet-moment-2.jpg";
import sweetMomentGarden from "@/assets/sweet-moment-4.jpg";
import sweetMomentRooftop from "@/assets/sweet-moment-5.jpg";

export const birthdayContent = {
  seo: {
    title: "Starry Birthday Surprise",
    description:
      "A starry-night birthday web app with surprises, scrapbook memories, and a heartfelt love letter.",
    canonical: "https://id-preview--1f4a2be1-f16f-43df-804f-28076f8f181a.lovable.app/",
  },
  intro: {
    eyebrow: "A little night sky made just for him",
    title: "Happy Birthday, My Favorite Person",
    subtitle:
      "A tiny constellation of surprises—tap, play, swipe, and save the sweetest part for the very end.",
  },
  loading: {
    label: "Loading something special...",
    hint: "The stars are lining everything up.",
  },
  cards: {
    title: "Tap the Cards",
    description: "Each little card is holding one thing I never want you to forget.",
    items: [
      {
        id: "wish",
        frontLabel: "Birthday Wish",
        backTitle: "My wish for you",
        message:
          "I hope this year feels lighter, kinder, and somehow even brighter than the last—full of calm mornings, lucky little moments, and the kind of joy that sneaks up on you.",
      },
      {
        id: "favorite",
        frontLabel: "Favorite Thing",
        backTitle: "What I adore most",
        message:
          "You make ordinary days feel warm and memorable. The way you care, laugh, and show up so naturally is the softest kind of magic in my life.",
      },
      {
        id: "promise",
        frontLabel: "My Promise",
        backTitle: "From me to you",
        message:
          "I’ll keep cheering for you, loving you loudly, and collecting more moments with you—the silly ones, the quiet ones, and every beautiful thing in between.",
      },
    ],
  },
  decorations: {
    title: "Just click on button",
    description: "One click at a time and we’ll build your birthday scene under the stars.",
    buttonLabels: [
      "Add the banner",
      "Release the balloons",
      "Bring in the cake",
      "Everything looks perfect",
    ],
    completion: "All set. Your birthday corner is glowing now.",
  },
  game: {
    title: "Pop the green balloon",
    description: "Ignore the red ones drifting by and pop all 5 green balloons to unlock the next surprise.",
    successTitle: "Happy Birthday!",
    successMessage: "You found every lucky green balloon. The night officially belongs to you now.",
  },
  scrapbook: {
    title: "Some Sweet Moments",
    description: "Swipe through this tiny stack of soft, starry memories.",
    photos: [
      {
        id: "rooftop",
        src: sweetMomentRooftop,
        alt: "Rooftop gifts under glowing string lights and a starry sky.",
        caption: "A rooftop full of little lights and reasons to celebrate you.",
      },
      {
        id: "fireworks",
        src: sweetMomentFireworks,
        alt: "A silhouette under pink fireworks in a night sky.",
        caption: "For the kind of birthday that deserves fireworks in the distance.",
      },
      {
        id: "garden",
        src: sweetMomentGarden,
        alt: "Flowers, gifts, and warm lanterns in a dreamy evening garden.",
        caption: "Soft lantern glow, sweet gifts, and all my best wishes tucked inside.",
      },
    ],
  },
  finalLetter: {
    buttonLabel: "Open My Message",
    title: "A Letter for You",
    subtitle: "Keep this one for the quiet moment at the end.",
    paragraphs: [
      "Happy birthday, my love. I wanted to make you something that feels a little like how you feel to me—soft, playful, warm, and impossible to forget.",
      "You have this beautiful way of making life feel gentler. Even on ordinary days, you somehow bring comfort, laughter, and that calm feeling of knowing everything is a little better because you’re here.",
      "I hope this next year gives back to you in every way. I hope your plans work out, your heart feels steady, your efforts are rewarded, and your happiest moments arrive more often than you expect.",
      "Thank you for being patient with me, for making me smile, for listening, for caring, and for being exactly yourself. There’s so much sweetness in the way you love, and I never want to take that for granted.",
      "Please keep dreaming big, resting when you need to, and trusting that you are deeply loved. I’ll be here celebrating your wins, holding your hand through the messy days, and loving you through all of it.",
      "So here’s to you—to your heart, your laugh, your future, and every soft little memory we still haven’t made yet. Happy birthday, forever and always.",
    ],
  },
} as const;

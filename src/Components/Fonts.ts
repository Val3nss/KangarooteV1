import { Inter, Montserrat, Lusitana, Agbalumo, Roboto as RobotoFont } from "next/font/google";

const inter = Inter({
  subsets: ['latin'],
  weight: "400",
});

const robotoLight = RobotoFont({
  subsets: ['latin'],
  weight: "300", // Light
});

const robotoRegular = RobotoFont({
  subsets: ['latin'],
  weight: "400", // Regular
});

const robotoBold = RobotoFont({
  subsets: ['latin'],
  weight: "700", // Bold
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: "600",
});

const lusitana = Lusitana({
  subsets: ['latin'],
  weight: "400",
});

const agbalumo = Agbalumo({
  subsets: ['latin'],
  weight: "400",
});

export const fonts = { inter, robotoLight, robotoRegular, robotoBold, montserrat, lusitana, agbalumo };

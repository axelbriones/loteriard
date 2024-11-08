// src/pages/_app.tsx
import type { AppProps } from "next/app";
import "@/styles/globals.scss"; // Importa los estilos globales aquí

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export const metadata = {
  title: "Meu Projeto Next.js",
  description: "Projeto criado com Next.js 13+",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head />
      <body>{children}</body>
    </html>
  );
}

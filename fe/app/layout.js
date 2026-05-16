import "./globals.css";

export const metadata = {
  title: "RideFlow | Premium Carpooling",
  description: "Discover safe, comfortable, and modern carpooling rides.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

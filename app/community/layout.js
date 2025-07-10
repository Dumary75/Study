import '../globals.css';

export const metadata = {
  title: 'Community!',
  description: 'Bla bla test',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

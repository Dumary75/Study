

export default function Meals({ params }) {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Meals / {params.slug}
      </h1>
    </main>
  );
}

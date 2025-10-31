async function deleteProduct(id) {
  if (!confirm('Willst du das Produkt wirklich löschen?')) return;
  try {
    const res = await fetch(`/admin/api/product/${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Produkt gelöscht!');
      window.location.reload();
    } else {
      alert('Fehler beim Löschen!');
    }
  } catch (err) {
    console.error(err);
  }
}

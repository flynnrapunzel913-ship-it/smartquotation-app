import Link from "next/link";
import "@/styles/cards.css";

export default function KleanTechPage() {
  return (
    <div className="cards-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem' }}>
        KLEAN TECH SYSTEMS Quotation Builder
      </h1>
      <p style={{ color: '#64748b', fontSize: '1.125rem', marginBottom: '2rem' }}>
        Coming Soon.
      </p>
    </div>
  );
}

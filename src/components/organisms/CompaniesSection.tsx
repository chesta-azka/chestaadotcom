export default function CompaniesSection() {
  const companies = ['Brand A', 'Brand B', 'Brand C', 'Brand D'];
  return (
    <section className="py-12 bg-purple-50/50">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm font-medium text-purple-400">TRUSTED BY</p>
        <div className="mt-8 flex justify-center gap-12 text-purple-950 font-bold tracking-tighter">
          {companies.map((c) => <span key={c}>{c}</span>)}
        </div>
      </div>
    </section>
  );
}

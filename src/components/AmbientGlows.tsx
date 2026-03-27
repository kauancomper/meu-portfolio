export default function AmbientGlows() {
  return (
    <>
      {/* Background Ornaments / Glows extracted for DRY code */}
      <div className="absolute top-0 right-10 w-[600px] h-[600px] bg-brand-primary-red/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-primary-red/5 rounded-full blur-[120px] pointer-events-none" />
    </>
  );
}

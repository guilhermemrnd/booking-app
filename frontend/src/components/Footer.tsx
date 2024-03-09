export default function Footer() {
  return (
    <div className="bg-blue-800 py-6 sm:py-10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0">
        <span className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          BookingClone.com
        </span>
        <span className="flex gap-4 font-normal tracking-tight text-white lg:font-bold">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
}

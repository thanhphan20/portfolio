export default function Heading({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center space-x-[3%] mb-6">
      <h2 className="w-fit text-5xl sm:text-heading-2 font-medium uppercase text-secondary-600">
        {title}
      </h2>
    </div>
  );
}

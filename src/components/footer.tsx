export default function Footer() {
  return (
    <footer className="mt-14 flex items-end justify-between px-[10%] py-4 sm:flex text-body-4 md:text-body-3">
      <div className="flex flex-col w-full md:flex-row justify-between">
        <div className="flex space-x-1">
          <span>&copy;</span>
          <span>2024</span>
          <span className="font-extrabold uppercase 2xl:text-body-1">
            Thanh Phan
          </span>
        </div>
        <div>
          <span className=" text-body-4 2xl:text-body-1">
            Site designed and coded with ❤️
          </span>
        </div>
      </div>
    </footer>
  );
}

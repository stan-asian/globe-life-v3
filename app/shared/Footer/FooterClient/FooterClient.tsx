export default function FooterClient() {
  return (
    <footer>
      <div className="h-20 w-full bg-[#00558C]"></div>
      <div className="flex flex-col items-center justify-center gap-2 max-h-[170px] w-full bg-[#044672] p-5">
        <ul className="flex flex-wrap items-center justify-center gap-5 text-white">
          <li className="text-sm font-extralight">
            <a>Privacy Policy</a>
          </li>
          <li className="text-sm font-extralight">
            <a>HIPAA</a>
          </li>
          <li className="text-sm font-extralight">
            <a>Terms of Use</a>
          </li>
          <li className="text-sm font-extralight">
            <a>Accessibility</a>
          </li>
        </ul>
        <h1 className="text-sm text-center text-gray-300/60">
          Copyright ©{new Date().getFullYear()} Globe Life American Income
          Division, All Rights Reserved.
        </h1>
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function ShellAdvert() {
  return (
    <Link href="https://www.shell.com.ng/">
      <div className="relative w-full aspect-[1/1.5]">
        <Image
          src="/SHELL-BRIEFING-NOTE-2024.jpg"
          alt="shell breifing note 2024"
          fill
          style={{ objectFit: "contain" }}
          quality={30}
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        />
      </div>
    </Link>
  );
}

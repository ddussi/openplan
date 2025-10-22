interface HeaderProps {
  name: string;
  variant?: 'light' | 'dark';
}

export function Header({ name, variant = 'light' }: HeaderProps) {
  const textColor = variant === 'light' ? 'text-[#1A1A1A]' : 'text-white';

  return (
    <header className="flex items-center justify-center px-5 py-[17px] h-[52px]">
      <h1
        className={`text-[15px] font-medium leading-[140%] tracking-[-0.02em] ${textColor} text-center`}
      >
        {name}
      </h1>
    </header>
  );
}


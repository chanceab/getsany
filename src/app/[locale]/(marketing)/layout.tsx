import { setRequestLocale } from 'next-intl/server';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { Navbar } from '@/components/Navbar';

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (

    <div className="text-xl [&_p]:my-6">
      <Navbar
        showLocaleSwitcher={true}
        LocaleSwitcher={LocaleSwitcher}
      />
      {props.children}
    </div>
  );
}

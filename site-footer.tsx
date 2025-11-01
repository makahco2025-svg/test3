
import Link from 'next/link';
import { AljoryLogo, WhatsAppIcon } from '@/components/icons';
import { Facebook, Instagram, Twitter, User } from 'lucide-react';

export function SiteFooter() {
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'Twitter', icon: Twitter, url: '#' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center md:items-start">
            <AljoryLogo />
            <p className="mt-4 text-center text-sm md:text-right">
              أجود أنواع الزيوت الطبيعية للعناية والجمال.
            </p>
            <div className="mt-4 flex items-center space-x-4 space-x-reverse">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  className="text-secondary-foreground hover:text-primary"
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6" />
                </Link>
              ))}
               <Link
                  href="/admin/login"
                  className="text-secondary-foreground hover:text-primary"
                  aria-label="Admin Login"
                >
                  <User className="h-6 w-6" />
                </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 md:text-right">
            <div>
              <h3 className="font-headline text-lg font-bold">تواصل معنا</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href="tel:+201030566078"
                    className="hover:text-primary"
                  >
                    الهاتف: 01030566078
                  </a>
                </li>
                <li>
                  <p>العنوان: 123 شارع النصر، القاهرة، مصر</p>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold">خدمة العملاء</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-primary">
                    سياسة الخصوصية
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    سياسة الإسترجاع
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    الشروط والأحكام
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
             <h3 className="font-headline text-lg font-bold">اطلب عبر الواتساب</h3>
             <a
                href="https://wa.me/201030566078"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 font-bold text-white transition-colors hover:bg-green-600"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>تواصل معنا مباشرة</span>
              </a>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} متجر الجوري. كل الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}

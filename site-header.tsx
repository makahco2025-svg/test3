
'use client';

import Link from 'next/link';
import { AljoryLogo } from '@/components/icons';
import { CartSheet } from '@/components/cart-sheet';
import { Button } from './ui/button';
import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { Input } from './ui/input';

interface SiteHeaderProps {
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  activeCategory: string;
}

export function SiteHeader({ onSearchChange, onCategoryChange, activeCategory }: SiteHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const categories = [
    'الكل',
    'زيوت الشعر',
    'زيوت البشرة',
    'زيوت عطرية',
    'زيوت عامة',
  ];

  const handleSearchToggle = () => {
    if (isSearchOpen) {
      onSearchChange('');
    }
    setIsSearchOpen(!isSearchOpen);
  };
  
  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
    // If search is open, close it when a category is selected.
    if (isSearchOpen) {
      setIsSearchOpen(false);
      onSearchChange('');
    }
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <AljoryLogo />
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSearchToggle}
          >
            {isSearchOpen ? <X /> : <Search />}
            <span className="sr-only">
              {isSearchOpen ? 'إغلاق البحث' : 'فتح البحث'}
            </span>
          </Button>
          <CartSheet />
        </div>
      </div>
      <nav className="border-t border-border/40">
        <div className="container max-w-7xl px-4 sm:px-6 lg:px-8">
          {isSearchOpen ? (
            <div className="py-2">
              <Input
                type="search"
                placeholder="ابحث عن منتجاتك..."
                className="w-full"
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
              />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 sm:gap-6 overflow-x-auto py-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  className={`shrink-0 text-sm font-medium hover:text-primary ${
                    activeCategory === category
                      ? 'text-primary'
                      : 'text-foreground/80'
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          )}
        </div>
      </nav>
      <div className="bg-primary py-2 text-center text-sm font-medium text-primary-foreground px-4">
        <p>🎉 عرض خاص: شحن مجاني للطلبات فوق 500 جنيه! 🎉</p>
      </div>
    </header>
  );
}

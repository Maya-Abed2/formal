import React, { useState, useEffect } from 'react';
import { PageType, Suit, CartItem } from './types';
import { SUITS_DATA } from './data/suits';
import { Navbar } from './components/Navbar';
import { CatalogPage } from './components/CatalogPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { SuitModal } from './components/SuitModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { CheckCircle2, Heart, X } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('catalog');
  const [selectedSuit, setSelectedSuit] = useState<Suit | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart state with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dar_alanaqa_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favorites state with localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dar_alanaqa_favs');
      return saved ? JSON.parse(saved) : ['suit-01', 'suit-02'];
    } catch {
      return ['suit-01', 'suit-02'];
    }
  });

  // Save cart to storage
  useEffect(() => {
    try {
      localStorage.setItem('dar_alanaqa_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Save favorites to storage
  useEffect(() => {
    try {
      localStorage.setItem('dar_alanaqa_favs', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add item to cart
  const handleAddToCart = (suit: Suit, size: string, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.suit.id === suit.id && item.selectedSize === size
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        return [...prev, { suit, selectedSize: size, quantity }];
      }
    });
    showToast(`تمت إضافة "${suit.name}" مقاس ${size} إلى سلة المشتريات`);
  };

  // Update quantity
  const handleUpdateQuantity = (suitId: string, size: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.suit.id === suitId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Remove item
  const handleRemoveItem = (suitId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.suit.id === suitId && item.selectedSize === size))
    );
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Toggle favorite
  const handleToggleFavorite = (suitId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(suitId);
      if (exists) {
        showToast('تمت الإزالة من قائمة المفضلة');
        return prev.filter((id) => id !== suitId);
      } else {
        showToast('تمت الإضافة إلى قائمة المفضلة');
        return [...prev, suitId];
      }
    });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Favorite suits objects
  const favoriteSuits = SUITS_DATA.filter((s) => favorites.includes(s.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0f14] text-neutral-100 selection:bg-[#c5a059] selection:text-[#0d0f14]">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 py-3 px-5 rounded-2xl bg-[#1a1f2b] border border-[#c5a059]/60 shadow-2xl text-xs sm:text-sm text-white animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-[#c5a059] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={totalCartCount}
        wishlistCount={favorites.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Main Body Pages */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentPage === 'catalog' && (
          <CatalogPage
            onSelectSuit={(suit) => setSelectedSuit(suit)}
            onAddToCart={handleAddToCart}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            onNavigateToContact={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigateToCatalog={() => {
              setCurrentPage('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToContact={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Modals & Drawers */}
      <SuitModal
        suit={selectedSuit}
        isOpen={Boolean(selectedSuit)}
        onClose={() => setSelectedSuit(null)}
        onAddToCart={handleAddToCart}
        isFavorite={selectedSuit ? favorites.includes(selectedSuit.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Drawer/Modal */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-[#131620] border border-[#262c3e] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#222736]">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400 fill-current" />
                <h3 className="text-base font-bold text-white">قائمة البدلات المفضلة لديك</h3>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              {favoriteSuits.length > 0 ? (
                favoriteSuits.map((suit) => (
                  <div
                    key={suit.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#171b26] border border-[#232938]"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={suit.image}
                        alt={suit.name}
                        className="w-14 h-18 object-cover rounded-lg bg-[#202535]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white">{suit.name}</h4>
                        <p className="text-xs text-[#c5a059]">{suit.price.toLocaleString('ar-SA')} ر.س</p>
                        <span className="text-[10px] text-neutral-400">{suit.fitLabel}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setIsWishlistOpen(false);
                          setSelectedSuit(suit);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#c5a059] text-[#0d0f14] text-xs font-bold hover:bg-[#d4af65]"
                      >
                        عرض ومقاس
                      </button>
                      <button
                        onClick={() => handleToggleFavorite(suit.id)}
                        className="p-1.5 text-neutral-500 hover:text-rose-400"
                        title="إزالة"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-neutral-400 text-xs">
                  لا توجد بدلات في قائمة المفضلة حالياً.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer
        onNavigate={(page) => setCurrentPage(page)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />
    </div>
  );
}

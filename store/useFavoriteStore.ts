import { create } from "zustand";
import { getFavorites, toggleFavorite } from "@/app/actions/favoriteActions";

interface FavoriteStore {
  favorites: string[];
  initialized: boolean;
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (productId: string) => Promise<void>;
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],
  initialized: false,
  fetchFavorites: async () => {
    if (get().initialized) return;
    try {
      const favs = await getFavorites();
      set({ favorites: favs, initialized: true });
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  },
  toggleFavorite: async (productId: string) => {
    const isFav = get().favorites.includes(productId);
    
    // Optimistic update
    set((state) => ({
      favorites: isFav 
        ? state.favorites.filter(id => id !== productId)
        : [...state.favorites, productId]
    }));

    try {
      const res = await toggleFavorite(productId);
      if (!res.success) {
        // Revert on failure
        set((state) => ({
          favorites: isFav 
            ? [...state.favorites, productId]
            : state.favorites.filter(id => id !== productId)
        }));
        if (res.error === "Debes iniciar sesión para agregar a favoritos") {
            alert(res.error);
        }
      }
    } catch (error) {
      // Revert on error
      set((state) => ({
        favorites: isFav 
          ? [...state.favorites, productId]
          : state.favorites.filter(id => id !== productId)
      }));
    }
  }
}));

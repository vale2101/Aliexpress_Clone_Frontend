# Arquitectura del Carrito de Compras

## Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────────┐
│                        PÁGINA DE DEMOSTRACIÓN                   │
│                        (app/carrito/page.tsx)                  │
└─────────────────────┬───────────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ ProductItem │ │    Cart     │ │  CartIcon   │
│ (Molecule)  │ │ (Molecule)  │ │   (Atom)    │
└─────────────┘ └─────────────┘ └─────────────┘
        │             │             │
        └─────────────┼─────────────┘
                      │
                      ▼
            ┌─────────────────┐
            │   CART STORE    │
            │ (Zustand + LS)  │
            └─────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│   addItem   │ │ removeItem  │ │updateQuantity│
│             │ │             │ │             │
└─────────────┘ └─────────────┘ └─────────────┘
```

## Flujo de Datos

```
1. Usuario interactúa con ProductItem
   ↓
2. ProductItem llama a addItem() del store
   ↓
3. Store actualiza el estado y localStorage
   ↓
4. Cart y CartIcon se re-renderizan automáticamente
   ↓
5. Usuario ve los cambios reflejados en tiempo real
```

## Estructura de Datos

```typescript
// Producto individual
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  rating?: number;
  reviews?: number;
}

// Item en el carrito
interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

// Estado del carrito
interface CartState {
  items: CartItem[];        // Lista de productos
  totalItems: number;       // Total de artículos
  totalPrice: number;       // Precio total
}
```

## Patrón Molecular

```
ATOMS (Componentes básicos)
├── CartIcon.tsx
├── Button.tsx
├── Price.tsx
└── Rating.tsx

MOLECULES (Componentes compuestos)
├── ProductItem.tsx
└── Cart.tsx

ORGANISMS (Componentes complejos)
└── (Se pueden crear según necesidad)

PAGES (Páginas completas)
└── app/carrito/page.tsx
```

## Persistencia

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Componente    │───▶│   Zustand       │───▶│  localStorage   │
│                 │    │   Store         │    │  (cart-storage) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Responsive Design

```
Desktop (lg:)
┌─────────────────────────────────────────────────────────┐
│ Header con CartIcon                                     │
├─────────────────┬───────────────────────────────────────┤
│                 │                                       │
│   Productos     │            Carrito                    │
│   (2 columnas)  │         (Sidebar)                     │
│                 │                                       │
└─────────────────┴───────────────────────────────────────┘

Mobile (sm:)
┌─────────────────────────────────────────────────────────┐
│ Header con CartIcon                                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│              Productos                                  │
│             (1 columna)                                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
│                                                         │
│              Modal del Carrito                          │
│            (Se abre al hacer clic)                      │
└─────────────────────────────────────────────────────────┘
```

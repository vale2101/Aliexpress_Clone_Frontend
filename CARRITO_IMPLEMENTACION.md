# Implementación del Carrito de Compras con Zustand

## 📋 Resumen de la Implementación

Se ha implementado un sistema completo de carrito de compras utilizando Zustand como gestor de estado global, siguiendo el patrón de diseño molecular del proyecto.

## 🗂️ Estructura de Archivos

### Store (Estado Global)
- **`stores/cartStore.ts`** - Store principal de Zustand con persistencia en localStorage

### Componentes Atómicos
- **`components/atoms/CartIcon.tsx`** - Icono del carrito con contador de artículos

### Componentes Moleculares
- **`components/molecules/ProductItem.tsx`** - Componente para mostrar y gestionar productos individuales
- **`components/molecules/Cart.tsx`** - Componente principal del carrito de compras

### Páginas
- **`app/carrito/page.tsx`** - Página de demostración del carrito

## 🚀 Funcionalidades Implementadas

### ✅ Objetivos Completados

1. **✅ Instalación de Zustand** - Ya estaba instalado (v5.0.8)
2. **✅ Store de Zustand** - Implementado con persistencia en localStorage
3. **✅ Componente ProductItem** - Permite añadir productos al carrito
4. **✅ Componente Cart** - Muestra productos con cantidades y subtotales
5. **✅ Botones de control** - Incrementar, decrementar y eliminar productos
6. **✅ Cálculo dinámico** - Total general actualizado automáticamente
7. **✅ Persistencia** - Los datos se mantienen al recargar la página

### 🎯 Características Adicionales

- **Persistencia automática** con localStorage
- **Interfaz responsive** para móviles y desktop
- **Contador de artículos** en el icono del carrito
- **Modal del carrito** para dispositivos móviles
- **Validación de cantidades** (no permite cantidades negativas)
- **Cálculo automático de subtotales** y total general
- **Interfaz consistente** con el diseño molecular existente

## 🔧 Uso de los Componentes

### ProductItem
```tsx
import ProductItem from '../components/molecules/ProductItem';

<ProductItem
  product={product}
  showQuantityControls={true}
  className="custom-class"
/>
```

### Cart
```tsx
import Cart from '../components/molecules/Cart';

<Cart
  showHeader={true}
  showCheckout={true}
  className="custom-class"
/>
```

### CartIcon
```tsx
import CartIcon from '../components/atoms/CartIcon';

<CartIcon
  showCount={true}
  onClick={() => setShowCart(true)}
/>
```

## 🏪 Store de Zustand

### Estado
```typescript
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}
```

### Acciones Disponibles
- `addItem(product, quantity)` - Añadir producto al carrito
- `removeItem(productId)` - Eliminar producto del carrito
- `updateQuantity(productId, quantity)` - Actualizar cantidad
- `clearCart()` - Vaciar carrito
- `getItemQuantity(productId)` - Obtener cantidad de un producto

## 🎨 Patrón de Diseño

Se mantiene la consistencia con el patrón molecular existente:
- **Atoms**: Componentes básicos reutilizables
- **Molecules**: Componentes compuestos que combinan atoms
- **Organisms**: Componentes complejos (se pueden crear si es necesario)

## 📱 Responsive Design

- **Desktop**: Carrito en sidebar lateral
- **Mobile**: Modal deslizable desde la derecha
- **Tablet**: Adaptación automática según el tamaño de pantalla

## 🔄 Persistencia

El carrito se guarda automáticamente en localStorage con la clave `cart-storage` y se restaura al recargar la página.

## 🧪 Datos de Prueba

La página de demostración incluye 6 productos de ejemplo con:
- Imágenes de Unsplash
- Precios realistas
- Descripciones
- Ratings y reseñas
- Categorías

## 🚀 Cómo Probar

1. Navegar a `/carrito`
2. Añadir productos al carrito
3. Modificar cantidades
4. Eliminar productos
5. Recargar la página para verificar persistencia
6. Probar en diferentes tamaños de pantalla

## 🔮 Próximas Mejoras Sugeridas

- Integración con API real de productos
- Validación de stock disponible
- Cálculo de envío
- Cupones de descuento
- Wishlist (lista de deseos)
- Comparación de productos
- Historial de compras

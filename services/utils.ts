/**
 * Utilidades para los servicios
 * Funciones auxiliares para manejo de datos y validaciones
 */

import { ServiceResponse } from '../config/types';

/**
 * Crea una respuesta de servicio exitosa
 * @param data - Datos a retornar
 * @param message - Mensaje opcional
 * @returns Respuesta de servicio exitosa
 */
export function createSuccessResponse<T>(
  data: T, 
  message?: string
): ServiceResponse<T> {
  return {
    success: true,
    data,
    ...(message && { message }),
  };
}

/**
 * Crea una respuesta de servicio con error
 * @param error - Mensaje de error
 * @returns Respuesta de servicio con error
 */
export function createErrorResponse(error: string): ServiceResponse {
  return {
    success: false,
    error,
  };
}

/**
 * Valida si un email tiene formato válido
 * @param email - Email a validar
 * @returns true si es válido, false en caso contrario
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida si una contraseña cumple con los requisitos mínimos
 * @param password - Contraseña a validar
 * @returns true si es válida, false en caso contrario
 */
export function isValidPassword(password: string): boolean {
  // Mínimo 8 caracteres, al menos una letra y un número
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
}

/**
 * Formatea un precio con la moneda especificada
 * @param price - Precio a formatear
 * @param currency - Moneda (por defecto '$')
 * @param locale - Locale para formateo (por defecto 'es-CO')
 * @returns Precio formateado
 */
export function formatPrice(
  price: number, 
  currency: string = '$', 
  locale: string = 'es-CO'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency === '$' ? 'COP' : currency,
    minimumFractionDigits: 2,
  }).format(price);
}

/**
 * Debounce function para optimizar búsquedas
 * @param func - Función a ejecutar
 * @param delay - Delay en milisegundos
 * @returns Función con debounce aplicado
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Maneja errores de forma consistente
 * @param error - Error capturado
 * @param context - Contexto donde ocurrió el error
 * @returns Mensaje de error amigable
 */
export function handleError(error: unknown, context: string): string {
  console.error(`Error en ${context}:`, error);
  
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'Ha ocurrido un error inesperado';
}

/**
 * Valida si un objeto tiene las propiedades requeridas
 * @param obj - Objeto a validar
 * @param requiredProps - Propiedades requeridas
 * @returns true si tiene todas las propiedades, false en caso contrario
 */
export function hasRequiredProperties(
  obj: Record<string, any>, 
  requiredProps: string[]
): boolean {
  return requiredProps.every(prop => prop in obj && obj[prop] !== undefined);
}

/**
 * Sanitiza un string removiendo caracteres peligrosos
 * @param str - String a sanitizar
 * @returns String sanitizado
 */
export function sanitizeString(str: string): string {
  return str
    .trim()
    .replace(/[<>]/g, '') // Remover < y >
    .replace(/javascript:/gi, '') // Remover javascript:
    .replace(/on\w+=/gi, ''); // Remover event handlers
}

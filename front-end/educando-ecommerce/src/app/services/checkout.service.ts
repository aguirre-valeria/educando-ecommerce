import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Curso } from '../interfaces/cursos.interface';

@Injectable({
  providedIn: 'root'
})

export class CheckoutService {
  cursos: Curso[] = [];

  // BehaviorSubject para mantener el estado actual del carrito
  private cartSubject = new BehaviorSubject<Curso[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);

  // Propiedades de solo lectura (observables) para acceder a los sujetos (subjects)
  // Cuando trabajamos con un observable le colocamos un simbolo de dolar al final
  // Estos observables le decimos que esten disponibles para utilizarlos dentro de la app
  get totalAction$(): Observable<number> {
    return this.totalSubject.asObservable();
  }
  get quantityAction$(): Observable<number> {
    return this.quantitySubject.asObservable();
  }
  get cartAction$(): Observable<Curso[]> {
    return this.cartSubject.asObservable();
  }

  constructor() {
    this.loadCartFromLocalStorage();
   }

  // Actualiza el carrito con un nuevo curso
  updateCart(curso: Curso): void {
    if (this.isCourseInCart(curso)) {
      console.log('El curso ya está en el carrito.');
      return;
    }

    this.addToCart(curso);
    this.quantityProducts();
    this.calcTotal();
  }

  // Verifica si un curso ya está en el carrito
  isCourseInCart(curso: Curso): boolean {
    return this.cursos.some(
      ({ id_curso, id_categoria }) =>
        id_curso === curso.id_curso && id_categoria === curso.id_categoria
    );
  }

  // Elimina un curso del carrito
  removeFromCart(curso: Curso): void {
    const index = this.cursos.findIndex(
      ({ id_curso, id_categoria }) =>
        id_curso === curso.id_curso && id_categoria === curso.id_categoria
    );

    if (index !== -1) {
      this.cursos.splice(index, 1);
      this.cartSubject.next(this.cursos);
      this.quantityProducts();
      this.calcTotal();
      this.saveCartToLocalStorage();
    }
  }

  // Restablece el carrito a su estado inicial
  resetCart(): void {
    this.cursos = [];
    this.cartSubject.next([]);
    this.quantitySubject.next(0);
    this.calcTotal();
    this.removeFromLocalStorage();
  }

  // Obtiene el descuento actual (10% del total)
  getDiscount(): number {
    const total = this.totalSubject.value;
    return total * 0.1; // Retorna el 10% del totalSubject
  }

  // Agrega un curso al carrito
  private addToCart(curso: Curso): void {
    this.loadCartFromLocalStorage();

    const existingCourse = this.cursos.find(
      ({ id_curso, id_categoria }) =>
        id_curso === curso.id_curso && id_categoria === curso.id_categoria
    );

    if (existingCourse) {
      return;
    }

    this.saveCartToLocalStorage();
    this.cursos.push({ ...curso, qty: 1 });
    this.cartSubject.next(this.cursos);
    this.saveCartToLocalStorage();
  }

  // Guarda el carrito en el almacenamiento local (localStorage)
  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cursos));
  }

  // Carga el carrito desde el almacenamiento local (localStorage)
  public loadCartFromLocalStorage(): void {
    const cartString = localStorage.getItem('cart');
    if (cartString) {
      const cart = JSON.parse(cartString);
      this.cursos = cart;
      this.cartSubject.next(cart);
    }else {
      console.log('No se encontró carrito en el LocalStorage.');
    }
    this.quantityProducts();
    this.calcTotal();
  }

  // Elimina el carrito del almacenamiento local (localStorage)
  public removeFromLocalStorage(): void {
    localStorage.removeItem('cart');
  }

  // Calcula la cantidad total de productos en el carrito
  private quantityProducts(): void {
    const quantity = this.cursos.reduce((acc, prod) => acc += prod.qty, 0);
    this.quantitySubject.next(quantity);
  }

  // Calcula el total del carrito
  private calcTotal(): void {
    const total = this.cursos.reduce((acc, prod) => acc += (prod.precio * prod.qty), 0);
    this.totalSubject.next(total);
  }
}

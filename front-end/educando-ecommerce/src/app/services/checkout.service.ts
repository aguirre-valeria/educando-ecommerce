import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Curso } from '../interfaces/cursos.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  cursos: Curso[] = [];

  private cartSubject = new BehaviorSubject<Curso[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);

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

  updateCart(curso: Curso): void {
    this.addToCart(curso);
    this.quantityProducts();
    this.calcTotal();
  }

  resetCart(): void {
    this.cartSubject.next([]);
    this.totalSubject.next(0);
    this.quantitySubject.next(0);
    this.cursos = [];
  }

  getDiscount(): number {
    const total = this.totalSubject.value;
    return total * 0.1; // Retorna el 10% del totalSubject
  }

  private addToCart(curso: Curso): void {
    const isProductInCart = this.cursos.find(({ id, category }) => id == curso.id && category == curso.category)

    if (isProductInCart) {
      isProductInCart.qty += 1;
    } else {
      this.cursos.push({ ...curso, qty: 1 })
    }

    this.cartSubject.next(this.cursos);
  }

  private quantityProducts(): void {
    const quantity = this.cursos.reduce((acc, prod) => acc += prod.qty, 0);
    this.quantitySubject.next(quantity);
  }

  private calcTotal(): void {
    const total = this.cursos.reduce((acc, prod) => acc += (prod.price * prod.qty), 0);
    this.totalSubject.next(total);
  } 
  constructor() { }
}
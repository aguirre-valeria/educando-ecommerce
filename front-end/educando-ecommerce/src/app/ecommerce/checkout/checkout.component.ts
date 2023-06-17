import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/interfaces/cursos.interface';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
import axios from 'axios';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public sendContainer = false;

  public isLoggedIn = false;

  public payPalConfig ? : IPayPalConfig;

  cursos!: Curso[];

  totalValue: string = '';

  // traigo variable de service
  quantity$ = this.checkoutService.quantityAction$;
  total$ = this.checkoutService.totalAction$;
  cart$ = this.checkoutService.cartAction$;

  discount!: number;

  constructor(
    private checkoutService: CheckoutService,
    private router: Router,
    private cursosService: CursosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.estaAutenticado();
    this.authService.getCambioEstadoAutenticacion().subscribe((estado: boolean) => {
      this.isLoggedIn = estado;
    });
    this.initConfig();
    // scroll hacia el top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.discount = this.checkoutService.getDiscount();
    this.checkoutService.loadCartFromLocalStorage();
    this.cursos = this.checkoutService.cursos;
    this.cart$ = this.checkoutService.cartAction$;
    this.cart$.subscribe((cart) => {
    });

    this.total$.subscribe((value: number) => {
      this.convertCurrency('ARS', 'USD', value).then((convertedValue: number) => {
        this.totalValue = convertedValue.toFixed(2).toString();
      }).catch((error) => {
        console.error('Currency conversion failed:', error);
      });
    });
  }

  // Inicializa la configuración de PayPal para el pago
  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'AWejq8ADbqFV0wU0zS5G7oUrJq5KyL7rjiEwapFEc75q-Iiv-TPWnJf-mHI_V-nFsVpxUCEpvAKo0vpk',
        // Solicitud de orden de compra en el lado del cliente
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.totalValue,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.totalValue
                        }
                    }
                },

                items: this.getItemsList()
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data: any, actions: any) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            if (data.status === 'COMPLETED') {
              console.log('La transacción está COMPLETED');
              this.adquirirCursos()
            }
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: (data, actions) => {
        }
    };
  }

  // Realiza la adquisición de cursos después de que se haya completado una transacción de PayPal
  adquirirCursos(): void {
    const token = localStorage.getItem('accessToken');
    const cursosSeleccionados = this.cursos;

    this.cursosService.adquirirCursos(token, cursosSeleccionados).subscribe(
      (response) => {
        this.checkoutService.resetCart();
        Swal.fire({
          title: 'Compra exitosa',
          text: '¡Gracias por tu compra!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirigir al usuario a la página "Mis Cursos"
            this.router.navigate(['/mis-cursos']);
          }
        });
      },
      (error) => {
        console.error('Error al adquirir cursos:', error);
      }
    );
  }

  // Obtiene la lista de elementos del carrito en el formato requerido por PayPal
  getItemsList(): any[] {
    const items: any[] = [];

    this.cart$.subscribe((cart: Curso[]) => {
      cart.forEach((curso: Curso) => {
        this.convertCurrency('ARS', 'USD', curso.precio).then((convertedPrice: number) => {
          const item = {
            name: curso.nombre_curso,
            quantity: '1',
            unit_amount: { value: convertedPrice.toFixed(2).toString(), currency_code: 'USD' }
          };
          items.push(item);
        }).catch((error) => {
          console.error('Currency conversion failed:', error);
        });
      });
    });

    return items;
  }

  //  Convierte una cantidad de una moneda a otra utilizando una API de tipo de cambio
  async convertCurrency(from: string, to: string, amount: number): Promise<number> {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const rates = response.data.rates;

    const convertedAmount = amount * rates[to];
    return convertedAmount;
  }

  // Muestra un cuadro de diálogo de SweetAlert para iniciar sesión o registrarse antes de finalizar la compra
  showLoginPopup() {
    Swal.fire({
      title: 'Finalizar compra',
      html: 'Inicia sesión o regístrate para finalizar la compra.',
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Iniciar sesión',
      cancelButtonText: 'Registrarse',
    }).then((result) => {
      // Verificar qué botón se hizo clic
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      } else  {
        this.router.navigate(['/registro']);
      }
    });
  }
}


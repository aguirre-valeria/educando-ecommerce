import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { CheckoutService } from 'src/app/services/checkout.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public sendContainer = false;

  public sendEmail(e: Event): void {
    this.sendContainer = true;
    e.preventDefault();
    emailjs.sendForm('service_s2i6tdl', 'template_3nwt1ms', e.target as HTMLFormElement, 'sV9Ajqlig0lkp_0dX')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

  // traigo variable de service
  quantity$ = this.checkoutService.quantityAction$;
  total$ = this.checkoutService.totalAction$;
  cart$ = this.checkoutService.cartAction$;
  
  discount!: number;
  // traigo el service
  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    // scroll hacia el top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.discount = this.checkoutService.getDiscount();

  }
}

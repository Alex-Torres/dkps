import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from "@angular/core";
import { EMPTY, Subject } from "rxjs";
import { ProductService } from "../product.service";
import { catchError } from "rxjs/operators";

@Component({
  selector: "pm-product-list",
  templateUrl: "./product-list-alt.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListAltComponent {
  pageTitle = "Products";
  errorMessage$ = this.productService.errorMessage$;

  products$ = this.productService.productsWithCategory$.pipe(
    catchError((err) => {
      this.productService.processErrors(err);
      return EMPTY;
    })
  );

  selectedProduct$ = this.productService.selectedProduct$;

  constructor(private productService: ProductService) {}

  onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId);
  }
}

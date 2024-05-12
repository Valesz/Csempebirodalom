import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  products: Array<Product> = [];
  productsObs?: Observable<Array<Product>>;
  editProduct: string = "";

  nameForm = new FormControl('');
  typeForm = new FormControl('');
  imgForm = new FormControl('');
  costForm = new FormControl('');
  selectedFile?: FileList;

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe(
      next => {
        this.products = [];
        next.forEach(
          product => {
            if (product.imgUrl)
              this.productService.loadImage(product.imgUrl).subscribe(
                image => {
                    product.imgUrl = image;
                    if (this.products.filter(x => x.id === product.id).length === 0) {
                      this.products.push(product);
                      this.productsObs = of(this.products);
                    }
                    console.log(this.products)
                },
                error => {
                  console.log(error);
                });
          });
      });
  }

  openEditProduct(id: string) {
    const product = this.products.find(x => x.id === id)!;
    
    this.editProduct = id;
    this.nameForm.setValue(product.name);
    this.typeForm.setValue(product.type);
    this.costForm.setValue(product.cost.toString());
  }

  closeEditProduct(id: string) {
    this.editProduct = "";
    this.nameForm.setValue("");
    this.typeForm.setValue("");
    this.costForm.setValue("");
  }

  selectFile(event: any) {
    this.selectedFile = event.target.files;
    let extension = this.selectedFile?.item(0)?.name.split('.').at(this.selectedFile.item(0)!.name.split('.').length-1)
    if ((this.selectedFile === undefined || this.selectedFile!.item(0)!.size > 3000000) ||
        !["jpg", "jpeg", "png", "gif"].includes(extension || ""))
    {
      this.selectedFile = undefined;
      this.imgForm.setValue("");
    }
  }

  saveProduct() {
    let product:Product = {
      id: "",
      name: this.nameForm.value || "",
      type: this.typeForm.value || "",
      imgUrl: "",
      cost: Number.parseInt(this.costForm.value || "0")
    }
    if (!this.selectedFile || !product.name || !product.type) {
      console.log("Missing data!");
      return;
    }

    this.productService.save(product, this.selectedFile.item(0)!);
  }

  updateProduct(id: string) {
    let product: Product = {
      id: id, 
      name: this.nameForm.value!, 
      type: this.typeForm.value!,
      imgUrl: `${this.productService.storageUrl}/${this.selectedFile?.item(0)?.name}`, 
      cost: Number.parseInt(this.costForm.value!)
    };
    if (!product.name || !product.type) {
      console.log("Missing data!")
      return;
    }
    if (this.selectedFile) {
      this.productService.update(product, this.selectedFile!.item(0)!);
    } else {
      this.productService.update(product);
    }
    this.editProduct = "";
  }

  deleteProduct(id: string) {
    this.productService.delete(id).then(
      () => {
        
      }).catch(error => console.log(error));
  }

  checkEdit(idToCheck: string): boolean {
    return this.editProduct === idToCheck;
  }

}

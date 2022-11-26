import Iproduct from 'src/app/shared/models/product';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { mergeMap, Observable, BehaviorSubject, reduce, Subject, catchError, exhaustMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private totalCartCount$ = new Subject<number>()
  private totalCartPrice$ = new Subject<number>()

  constructor(private http: HttpClient) {
  }

  getProduct(): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>(`${environment.ROOT_API}/products`)
  }

  addToCart(product: Iproduct): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>(`${environment.ROOT_API}/cart/${product?.id}`).pipe(
      exhaustMap((data: any) => {
        console.log(data)
        let { count } = data;
        count++;
        return this.http.put<Iproduct[]>(`${environment.ROOT_API}/cart/${data?.id}`, { ...data, count })
      }),
      catchError((error) => {
        console.log(error)
        return this.http.post<Iproduct[]>(`${environment.ROOT_API}/cart/`, { ...product, count: 1 })
      })
    )
  }

  getTotalCartItem() {
    const data = this.http.get<Iproduct[]>(`${environment.ROOT_API}/cart`).pipe(
      mergeMap((data: any) => {
        return data
      })
    )
      .pipe(
        reduce(
          (acc: number, element: any) => {
            return acc = acc + element.count
          }, 0)
      )
      .subscribe((value: number) => {
        this.totalCartCount$.next(value)
      })
    return this.totalCartCount$.asObservable()
  }

  removeProduct(product: Iproduct) {
    return this.http.get<Iproduct[]>(`${environment.ROOT_API}/cart/${product?.id}`).pipe(
      exhaustMap((data: any) => {
        console.log(data)
        let { count } = data;
        count--;
        if (count >= 1) {
          return this.http.put<Iproduct[]>(`${environment.ROOT_API}/cart/${data?.id}`, { ...data, count })
        }
        else {
          let concent = confirm("Are you sure to remove item")
          if (concent)
            return this.http.delete<Iproduct[]>(`${environment.ROOT_API}/cart/${data?.id}`)
          else return product as any
        }
      })
    )

  }

  getTotalCartAmount() {
    this.http.get<Iproduct[]>(`${environment.ROOT_API}/cart`).pipe(
      mergeMap((data: any) => {
        return data
      })
    )
      .pipe(
        reduce(
          (acc: number, element: any) => {
            return acc = acc + (element.count * element.price)
          }, 0)
      )
      .subscribe((value: number) => {
        this.totalCartPrice$.next(value)
      })
    return this.totalCartPrice$.asObservable()
  }

  cartProducts(): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>(`${environment.ROOT_API}/cart`)
  }

}

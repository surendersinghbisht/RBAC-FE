import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../../api";

export interface Address {
userId: string;
    countryId: number;
    stateId: number;
    cityId: number;
    addressId:number
}
@Injectable({
  providedIn: 'root'
})
export default class LocationService {


     constructor(private http: HttpClient) { } 
          private baseUrl = `${BASE_URL}/Location`


    getCountries():Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/countries`); 
    }

    getStates(countryId:number):Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/states/${countryId}`); 
    }

    getCities(stateId: number):Observable<any> {
        console.log('stateId',stateId)
    return this.http.get<any>(`${this.baseUrl}/cities/${stateId}`); 
    }

    addAddress(addresses: any) {  
       console.log('address service',addresses);
  const userId = JSON.parse(localStorage.getItem('user') || '{}').id;


      const allAddresses = addresses.map((address:any) => ({ 
            cityId: address.city,
            stateId: address.state,
            countryId: address.country,
            userId
        
       }));
       console.log('allAddresses',allAddresses)
      
        return this.http.post<any>(`${this.baseUrl}/add-address`, allAddresses);
    }

    getAllAddresses(): Observable<any> {
          const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
        return this.http.get<any>(`${this.baseUrl}/get-addresses/${userId}`);
    }

    deleteAddress(addressId: number): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/delete-address/${addressId}`);
    }

    editAddress(address: any): Observable<any> {
        console.log('edit address service',address)
        const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
        let data:Address = {
            addressId: address.addressId,
            userId,
            countryId: address.country,
            stateId: address.state,
            cityId: address.city
        }
        console.log('edit address service',data)
        return this.http.put<any>(`${this.baseUrl}/edit-address`, data);
    }
}
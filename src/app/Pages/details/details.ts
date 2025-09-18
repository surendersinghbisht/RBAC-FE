import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import LocationService from '../../Services/LocationService';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit {
@ViewChild('addressFormContainer') addressFormContainer!: ElementRef;
  AllAddresses: any[] = [];
 countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
 form!: FormGroup;
 isEditing: boolean = false;
  constructor(
    private locationService: LocationService,
    private fb: FormBuilder
  ) { 
        this.form = this.fb.group({
        addresses: this.fb.array([])
      // country: [''],
      // state: [''],
      // city: ['']
    });

  }
  ngOnInit(): void {
    this.locationService.getAllAddresses().subscribe(res => {
      this.AllAddresses = res;
      console.log('all addresses',this.AllAddresses);
    });
   this.loadCountries();
 this.addNewAddress();  
  }

  addNewAddress() {
    this.addresses.push(this.fb.group({
      country: [''],
      state: [''],
      city: [''],
      addressId: [0]
    }));
  }

  get addresses(): FormArray {
  return this.form.get('addresses') as FormArray;
}

    loadCountries() {
    this.locationService.getCountries().subscribe(res => {this.countries = res
       console.log(this.countries)
    });
  }

   loadStates(countryId: number) {
    this.locationService.getStates(countryId).subscribe(res => this.states = res);
  }

  loadCities(stateId: number) {
    this.locationService.getCities(stateId).subscribe(res => this.cities = res);
  }

  onCountryChange(countryId: number) {
   this.loadStates(countryId);
  }

   onStateChange(stateId: number) {
   this.loadCities(stateId);
   console.log(this.cities);
  }

  deleteAddress(addressid: number, index: number) {
    this.locationService.deleteAddress(addressid).subscribe({
      next: (res) => {
           this.AllAddresses.splice(index, 1);
        alert(res.message);
        this.form.reset();
      },
      error: (err) => {
        console.error('Error deleting address', err);
        alert('Failed to delete address. Please try again.');
      }
    });
  }


  editAddress(address: any, index: number) {
console.log('asads',this.addresses)
    this.isEditing = true;
console.log('edit address',address, index)


    this.addresses.at(0).patchValue({
      country: address.countryId,
      state: address.stateId,
      city: address.cityId,
      addressId: address.addressId
    });
    console.log('updating address',this.form.value.addresses[0])
      this.onCountryChange(address.countryId);
  this.onStateChange(address.stateId);

   setTimeout(() => {
    this.addressFormContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);

  //  this.locationService.editAddress(address).subscribe({
  //     next: (res) => {
  //       alert('Address updated successfully!');
  //         this.locationService.getAllAddresses().subscribe(res => {
  //     this.AllAddresses = res;
  //   });
  //     },
  //     error: (err) => {
  //       console.error('Error updating address', err);
  //       alert('Failed to update address. Please try again.');
  //     }
  //   });
  }

   updateAddress() {
    console.log('updating address',this.form.value.addresses[0])
    this.locationService.editAddress(this.form.value.addresses[0]).subscribe({

      next: (res) => {
        alert('Address updated successfully!');
          this.locationService.getAllAddresses().subscribe(res => {
      this.AllAddresses = res;
      console.log(this.AllAddresses);
    });
    this.isEditing = false;
    this.form.reset();
      },
      error: (err) => {
        console.error('Error updating address', err);
        alert('Failed to update address. Please try again.');
      }
    });
   }

   

  submit() {
    console.log(this.form.value.addresses);
    this.locationService.addAddress(this.form.value.addresses).subscribe({
      next: (res) => {
        alert('Address added successfully!');
       this.locationService.getAllAddresses().subscribe(res => {
      this.AllAddresses = res;
      console.log(this.AllAddresses);
    });
        this.form.reset();
      },
      error: (err) => {
        console.error('Error adding address', err);
        alert('Failed to add address. Please try again.');
      }
    });
  }
}

// Fields of the checkout "Your Information" form.
export interface Address {
  firstName: string;
  lastName: string;
  postcode: string;
}

export class AddressBuilder {
  private address: Address = {
    firstName: 'John',
    lastName: 'Doe',
    postcode: '12345',
  };

  //with specific first name
  withFirstName(firstName: string): this {
    this.address.firstName = firstName;
    return this;
  }

  //without postal code
  withoutPostalCode(): this {
    this.address.postcode = '';
    return this;
  }

  build(): Address {
    return { ...this.address };
  }
}

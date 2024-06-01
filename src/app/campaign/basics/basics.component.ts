import { Component } from '@angular/core';

interface Category {
  value: string;
  viewValue: string;
}
interface SubCategory {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrl: './basics.component.sass',

})
export class BasicsComponent {
  selectedCategory?: string;
  selectedsubCategory: any;

  protected categories: Category[]=
    [
      {value: 'art', viewValue: 'Art'},
      {value: 'comics', viewValue: 'Comics'},
      {value: 'crafts', viewValue: 'Crafts'},
      {value: 'dance', viewValue: 'Dance'},
      {value: 'design', viewValue: 'Design'},
      {value: 'fashion', viewValue: 'Fashion'},
      {value: 'film', viewValue: 'Film & Video'},
      {value: 'food', viewValue: 'Food'},
      {value: 'games', viewValue: 'Games'},
      {value: 'journalism', viewValue: 'Journalism'},
      {value: 'music', viewValue: 'Music'},
      {value: 'photography', viewValue: 'Photography'},
      {value: 'publishing', viewValue: 'Publishing'},
      {value: 'technology', viewValue: 'Technology'},
      {value: 'theater', viewValue: 'Theater'}
    ];

  protected subCategories: SubCategory[]=
    [
      {value: 'art', viewValue: 'Art'},
      {value: 'comics', viewValue: 'Comics'},
      {value: 'crafts', viewValue: 'Crafts'},
      {value: 'dance', viewValue: 'Dance'},
      {value: 'design', viewValue: 'Design'},
      {value: 'fashion', viewValue: 'Fashion'},
      {value: 'film', viewValue: 'Film & Video'},
      {value: 'food', viewValue: 'Food'},
      {value: 'games', viewValue: 'Games'},
      {value: 'journalism', viewValue: 'Journalism'},
      {value: 'music', viewValue: 'Music'},
      {value: 'photography', viewValue: 'Photography'},
      {value: 'publishing', viewValue: 'Publishing'},
      {value: 'technology', viewValue: 'Technology'},
      {value: 'theater', viewValue: 'Theater'}
    ]

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file);
      // You can add more file handling logic here
    }
  }
}

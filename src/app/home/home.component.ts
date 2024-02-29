import { Component } from '@angular/core';

export interface Card {
  projectId?: number,
  image:string,
  title: string,
  description?: string,
  fundingGoal?: number,
  raisedFunds:number,
  durationDays: number,
  creatorId?: number,
  rewards?: string,
  type:string,
  careatedAt:Date
}
export interface UserComments {
  name:string,
  image:string,
  rating:number,
  duty:string,
  comment:string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})

export class HomeComponent {

  cards:Card[] = [
    {
      image:'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title:'MSV Monitor : New Gaming Experience',
      raisedFunds:50240.699,
      durationDays:30,
      type:'MSV',
      careatedAt: new Date('2024-02-20')
    },
    {
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title:'Jakob & Rryan Movies pack',
      raisedFunds:10442.699,
      durationDays:30,
      type:'You-Cinema',
      careatedAt: new Date('2024-02-10')

    }
    ,{
      image:'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title:'Green Fund : Sustain Earth Now',
      raisedFunds:50240.699,
      durationDays:60,
      type:'Wearth',
      careatedAt: new Date('2024-01-15')
    }
  ]

  userComments:UserComments[] = [
    {
      name:'Ahmed Tahiri',
      duty:'School Teacher',
      image:'/assets/user1.svg',
      rating:5,
      comment:'Thanks to BIDAYA, keep up the good work! I would like to say thank you to all your staff and all the bakers behind it.'
    },
    {
      name:'Sami Fakroun',
      duty:'Music Composer',
      image:'/assets/user2.svg',
      rating:5,
      comment:'Thanks to BIDAYA, keep up the good work! I would like to say thank you to all your staff and all the bakers behind it.'
    },
    {
      name:'Basma Loukil',
      duty:'Community Manager',
      image:'/assets/user3.svg',
      rating:5,
      comment:'Thanks to BIDAYA, keep up the good work! I would like to say thank you to all your staff and all the bakers behind it.'
    }
  ]
}

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
  type:string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})

export class HomeComponent {

  cards:Card[] = [
    {
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title:'Jakob & Rryan Movies pack',
      raisedFunds:10442.699,
      durationDays:30,
      type:'You-Cinema'
     }

  ]
}

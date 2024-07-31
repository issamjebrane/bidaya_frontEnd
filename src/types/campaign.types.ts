import {SafeUrl} from "@angular/platform-browser";
import {User} from "./user.types";

export  type Campaign = {
  basics: {
    id: number,
    cardImage: string |SafeUrl,
    title: string,
    imageData:any,
    subtitle: string,
    category: string,
    location: string,
    goal: number,
    subCategory: string,
    duration: number,
  },
  story: {
    editorContent: string,
    fileUrl: string | SafeUrl,
    questions:[
      {
        question: string,
        answer: string
      }
    ],
    videoUrl: string,
    imageData: any
  },
  rewards: [
    {
      contributionLevel: string,
      description: string,
      estimatedDeliveryDate: string,
      fileUrl: string | SafeUrl,
      title: string,
      imageData: any
    }
  ],
  userId: User,
  creationDate: string,
  status: string,
}

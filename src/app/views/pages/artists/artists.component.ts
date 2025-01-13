import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../model/firebase.service';
import { User } from '../../../interfaces/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  artists: User[] = [];

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  ngOnInit(): void {
    this.firebaseService.getArtists().subscribe((artists: User[]) => {
      this.artists = artists;
    });
  }

  onCardClick(artistId: string): void {
    this.router.navigate(['/profileartist'], { queryParams: { id: artistId } });
  }
}
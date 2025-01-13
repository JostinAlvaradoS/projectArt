import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../model/firebase.service';
import { Piece } from '../../../interfaces/piece.model';

@Component({
  selector: 'app-piece-management',
  templateUrl: './piece-management.component.html',
  styleUrls: ['./piece-management.component.css']
})
export class PieceManagementComponent implements OnInit {
  pieces: Piece[] = [];
  filteredPieces: Piece[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadPieces();
  }

  loadPieces(): void {
    this.firebaseService.getPieces().subscribe((pieces: Piece[]) => {
      this.pieces = pieces;
      this.filteredPieces = pieces;
    });
  }

  updatePieceVerification(pieceId: string, verification: boolean): void {
    this.firebaseService.updatePieceVerification(pieceId, verification).then(() => {
      this.loadPieces();
    });
  }

  filterPieces(filter: string): void {
    if (filter === 'all') {
      this.filteredPieces = this.pieces;
    } else if (filter === 'verified') {
      this.filteredPieces = this.pieces.filter(piece => piece.verification);
    } else if (filter === 'not-verified') {
      this.filteredPieces = this.pieces.filter(piece => !piece.verification);
    }
  }
}
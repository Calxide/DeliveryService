import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private socket: Socket;
  private readonly SERVER_URL = 'http://localhost:3000'; 

  constructor() {
    this.socket = io(this.SERVER_URL);
  }

  translate(text: string, targetLanguage: string): Observable<string> {
    return new Observable((observer) => {
      this.socket.emit('translate', { text, targetLanguage });

      this.socket.on('translationResult', (result: string) => {
        observer.next(result);
        observer.complete();
      });

      this.socket.on('translationError', (error: string) => {
        observer.error(error);
      });
    });
  }
}

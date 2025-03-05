import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class TtsService {
  private socket: Socket;
  private readonly SERVER_URL = 'http://localhost:3000'; // Adjust to your backend URL

  constructor() {
    this.socket = io(this.SERVER_URL);
  }

  convertTextToSpeech(text: string): Observable<any> {
    return new Observable((observer) => {
      // Emit the translation request
      this.socket.emit('translate', { text });

      // Listen for the result
      this.socket.on('translationResult', (result) => {
        observer.next(result);
        observer.complete();
      });

      // Listen for any errors
      this.socket.on('translationError', (error) => {
        observer.error(error);
      });
    });
  }
}

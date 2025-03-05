import { Component } from '@angular/core';
import { TtsService } from '../services/tts.service';

@Component({
  selector: 'app-tts',
  templateUrl: './tts.component.html',
  styleUrls: ['./tts.component.css'],
})
export class TtsComponent {
  textToConvert: string = 'Hello'; 
  audioFilePath: string | null = null;
  isLoading: boolean = false; 

  constructor(private ttsService: TtsService) {}

  convertText(): void {
    this.isLoading = true; 
    this.ttsService.convertTextToSpeech(this.textToConvert).subscribe({
      next: (response) => {
        console.log(response.message); 
        this.audioFilePath = response.audioFilePath; 
        this.isLoading = false; 
      },
      error: (err) => {
        console.error('Error converting text to speech', err);
        this.isLoading = false; 
      },
    });
  }
}

// /Users/isaias/Desktop/drmi_edu/DRMi-Dashboard/src/app/auth/SoundManager.ts

export class SoundManager {
    audioContext: AudioContext | null;
    muted: boolean;
    activeOscillators: Set<OscillatorNode>;
    notes: { [key: string]: number };
    buffers: any;
  
    constructor() {
      this.audioContext = null;
      this.muted = false;
      this.activeOscillators = new Set();
      this.notes = {
        C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
        C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
        C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77
      };
      this.buffers = {};
    }
  
    initAudioContext(): AudioContext {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      return this.audioContext;
    }
  
    toggleMute(): boolean {
      this.muted = !this.muted;
      if (this.muted && this.audioContext) {
        this.activeOscillators.forEach((osc) => {
          try { osc.stop(); } catch (e) { /* Ignorar errores */ }
        });
        this.activeOscillators.clear();
      }
      return this.muted;
    }
  
    playNote(frequency: number, type: OscillatorType = 'sine', duration = 0.3, volume = 0.5): OscillatorNode | null {
      if (this.muted) return null;
      try {
        const context = this.initAudioContext();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
  
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        gainNode.gain.setValueAtTime(volume, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);
  
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
  
        oscillator.start();
        this.activeOscillators.add(oscillator);
        oscillator.stop(context.currentTime + duration);
        oscillator.onended = () => {
          this.activeOscillators.delete(oscillator);
          oscillator.disconnect();
          gainNode.disconnect();
        };
        return oscillator;
      } catch (e) {
        console.error("Error playing sound:", e);
        return null;
      }
    }
  
    playChord(notes: { frequency: number, type?: OscillatorType, duration?: number, volume?: number }[], stagger = 80): void {
      if (this.muted) return;
      notes.forEach((note, index) => {
        setTimeout(() => {
          this.playNote(note.frequency, note.type || 'sine', note.duration || 0.3, note.volume || 0.5);
        }, index * stagger);
      });
    }
  
    playMelody(notes: { frequency: number, type?: OscillatorType, duration?: number, volume?: number, delay?: number }[]): void {
      if (this.muted) return;
      let timeOffset = 0;
      notes.forEach(note => {
        setTimeout(() => {
          this.playNote(note.frequency, note.type || 'sine', note.duration || 0.3, note.volume || 0.5);
        }, timeOffset);
        timeOffset += note.delay || 200;
      });
    }
  
    playTypingSound(char: string): void {
      if (this.muted) return;
      const notes = [this.notes.C4, this.notes.E4, this.notes.G4, this.notes.B4, this.notes.D5];
      const charCode = char.charCodeAt(0);
      const noteIndex = charCode % notes.length;
      this.playNote(notes[noteIndex], 'sine', 0.08, 0.15);
    }
  
    playTogglePasswordSound(visible: boolean): void {
      this.playNote(visible ? this.notes.F4 : this.notes.D4, 'sine', 0.15, 0.2);
    }
  
    playModeChangeSound(): void {
      this.playNote(this.notes.A4, 'sine', 0.2, 0.3);
    }
  
    playButtonHoverSound(): void {
      this.playNote(this.notes.E5, 'sine', 0.1, 0.1);
    }
  
    playButtonClickSound(): void {
      this.playNote(this.notes.G4, 'triangle', 0.2, 0.2);
    }
  
    playNotification(): void {
      this.playMelody([
        { frequency: this.notes.G4, type: 'sine', duration: 0.1, volume: 0.3 },
        { frequency: this.notes.C5, type: 'sine', duration: 0.2, volume: 0.3, delay: 150 }
      ]);
    }
  
    playSuccessSound(): void {
      this.playChord([
        { frequency: this.notes.C4, type: 'sine', duration: 0.4, volume: 0.3 },
        { frequency: this.notes.E4, type: 'sine', duration: 0.4, volume: 0.3 },
        { frequency: this.notes.G4, type: 'sine', duration: 0.6, volume: 0.3 }
      ]);
    }
  
    playErrorSound(): void {
      this.playChord([
        { frequency: this.notes.B4, type: 'sine', duration: 0.2, volume: 0.2 },
        { frequency: this.notes.F4, type: 'sine', duration: 0.3, volume: 0.2 }
      ], 60);
    }
  
    playAvatarSound(avatarId: number): void {
      if (this.muted) return;
      const sounds: { [key: number]: { melody: { frequency: number, type: OscillatorType, duration: number, volume: number, delay?: number }[] } } = {
        1: { 
          melody: [
            { frequency: this.notes.C5, type: 'sine', duration: 0.2, volume: 0.3 },
            { frequency: this.notes.E5, type: 'sine', duration: 0.2, volume: 0.3, delay: 100 }
          ]
        },
        2: { 
          melody: [
            { frequency: this.notes.D5, type: 'sine', duration: 0.2, volume: 0.3 },
            { frequency: this.notes.F5, type: 'sine', duration: 0.2, volume: 0.3, delay: 100 }
          ]
        },
        3: { 
          melody: [
            { frequency: this.notes.A5, type: 'triangle', duration: 0.1, volume: 0.2 },
            { frequency: this.notes.E5, type: 'triangle', duration: 0.2, volume: 0.2, delay: 80 }
          ]
        },
        4: { 
          melody: [
            { frequency: this.notes.G3, type: 'square', duration: 0.1, volume: 0.3 },
            { frequency: this.notes.C4, type: 'square', duration: 0.15, volume: 0.3, delay: 150 }
          ]
        },
        5: { 
          melody: [
            { frequency: this.notes.C4, type: 'sawtooth', duration: 0.1, volume: 0.2 },
            { frequency: this.notes.C5, type: 'square', duration: 0.15, volume: 0.2, delay: 100 },
            { frequency: this.notes.G4, type: 'square', duration: 0.1, volume: 0.2, delay: 80 }
          ]
        },
        6: { 
          melody: [
            { frequency: this.notes.E4, type: 'sine', duration: 0.3, volume: 0.2 },
            { frequency: this.notes.A4, type: 'sine', duration: 0.4, volume: 0.2, delay: 200 },
            { frequency: this.notes.C5, type: 'sine', duration: 0.2, volume: 0.15, delay: 150 }
          ]
        }
      };
      const sound = sounds[avatarId];
      if (sound && sound.melody) {
        this.playMelody(sound.melody);
      } else {
        this.playNote(this.notes.C5, 'sine', 0.3, 0.3);
      }
    }
  
    playDifficultySound(difficultyId: string): void {
      const sounds: { [key: string]: { frequency: number, type: OscillatorType, duration: number, volume: number } } = {
        easy: { frequency: this.notes.C4, type: 'sine', duration: 0.3, volume: 0.3 },
        medium: { frequency: this.notes.E4, type: 'sine', duration: 0.3, volume: 0.3 },
        hard: { frequency: this.notes.G4, type: 'sine', duration: 0.3, volume: 0.3 }
      };
      if (sounds[difficultyId]) {
        const sound = sounds[difficultyId];
        this.playNote(sound.frequency, sound.type, sound.duration, sound.volume);
      }
    }
  
    playPopSound(): void {
      if (this.muted) return;
      try {
        const context = this.initAudioContext();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
  
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, context.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.2, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        this.activeOscillators.add(oscillator);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.1);
        oscillator.onended = () => {
          this.activeOscillators.delete(oscillator);
          oscillator.disconnect();
          gainNode.disconnect();
        };
      } catch (e) {
        console.error("Error playing pop sound:", e);
      }
    }
  
    playRocketSound(): void {
      if (this.muted) return;
      try {
        const context = this.initAudioContext();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
  
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(200, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, context.currentTime + 0.4);
        gainNode.gain.setValueAtTime(0.2, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.4);
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        this.activeOscillators.add(oscillator);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.4);
        oscillator.onended = () => {
          this.activeOscillators.delete(oscillator);
          oscillator.disconnect();
          gainNode.disconnect();
        };
      } catch (e) {
        console.error("Error playing rocket sound:", e);
      }
    }
  
    playBubbleSound(): void {
      if (this.muted) return;
      const freq = 450 + Math.random() * 350;
      try {
        const context = this.initAudioContext();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(freq * 1.5, context.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.2);
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        this.activeOscillators.add(oscillator);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.2);
        oscillator.onended = () => {
          this.activeOscillators.delete(oscillator);
          oscillator.disconnect();
          gainNode.disconnect();
        };
      } catch (e) {
        console.error("Error playing bubble sound:", e);
      }
    }
  }
  
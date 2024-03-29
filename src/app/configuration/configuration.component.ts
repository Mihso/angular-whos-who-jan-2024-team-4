import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  sound: Howl = new Howl({
    src:['../assets/sample.mp3'],
    volume: 1,
    html5: true
  })
  currentVolume: number = 100
  currentRounds: number = 3
  currentSongChoices: number = 3

  settingsFormGroup: FormGroup = new FormGroup({
    volume: new FormControl<number>(100, [Validators.min(0), Validators.max(100)]),
    rounds: new FormControl<number>(3, [Validators.min(1), Validators.max(20)]),
    songChoices: new FormControl<number>(3, [Validators.min(2), Validators.max(10)])
  })

  constructor(private settingsData: SettingsService) { }

  ngOnInit(): void {
    this.settingsData.currentVolume.subscribe((volumeData) => {
      this.currentVolume = volumeData
      this.sound.volume(volumeData/100)
    })
    this.settingsData.currentNumRounds.subscribe((roundsData) => (this.currentRounds = roundsData))
    this.settingsData.currentNumSongChoices.subscribe((choicesData) => (this.currentSongChoices = choicesData))
    this.settingsFormGroup.setValue({
      volume: this.currentVolume,
      rounds: this.currentRounds,
      songChoices: this.currentSongChoices
    })
  }

  updateSettings(): void {
    this.settingsData.updateVolume(this.settingsFormGroup.controls['volume'].value)
    this.settingsData.updateNumRounds(this.settingsFormGroup.controls['rounds'].value)
    this.settingsData.updateNumChoices(this.settingsFormGroup.controls['songChoices'].value)
  }

  updateVolume(): void {
    this.settingsData.updateVolume(this.settingsFormGroup.controls['volume'].value)
    this.sound.volume(this.currentVolume / 100)
  }

  testSound(): void {
    this.sound.play()
  }

}

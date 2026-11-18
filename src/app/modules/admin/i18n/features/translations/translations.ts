import { Component } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';

@Component({
  imports: [Card, PIcon, ButtonModule],
  selector: 'app-translations',
  templateUrl: './translations.html',
})
export class Translations {}

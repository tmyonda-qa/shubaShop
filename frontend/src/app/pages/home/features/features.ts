import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  imports: [],
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class Features {
  features = [
    {
      icon: '🏭',
      title: 'Власне виробництво',
      description: 'Виготовляємо шуби власноруч на фабриці в Тисмениці з 1995 року',
    },
    {
      icon: '✨',
      title: 'Натуральне хутро',
      description: 'Використовуємо тільки якісне натуральне хутро від перевірених постачальників',
    },
    {
      icon: '📏',
      title: 'Індивідуальний пошив',
      description: 'Виготовимо шубу за вашими мірками та побажаннями',
    },
    {
      icon: '🚚',
      title: 'Доставка по Україні',
      description: 'Доставляємо УкрПоштою та Новою Поштою по всій Україні швидко та надійно',
    },
  ];
}
